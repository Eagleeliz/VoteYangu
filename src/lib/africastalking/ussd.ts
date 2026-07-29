import { createServiceClient } from "@/lib/supabase/admin";
import { hashPhone } from "@/lib/hash";
import { sendQuestionConfirmation, sendVoteConfirmation } from "./sms";

type UssdContext = {
  pollId?: string;
  optionId?: string;
  eventId?: string;
};

function con(text: string) {
  return `CON ${text}`;
}

function end(text: string) {
  return `END ${text}`;
}

export async function handleUssd(params: {
  sessionId: string;
  phoneNumber: string;
  text: string;
  serviceCode?: string;
}): Promise<string> {
  const { sessionId, phoneNumber, text } = params;
  const supabase = createServiceClient();
  const phoneHash = hashPhone(phoneNumber);
  const parts = text === "" ? [] : text.split("*");
  const input = parts[parts.length - 1] ?? "";

  let { data: session } = await supabase
    .from("ussd_sessions")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (!session) {
    const { data: created } = await supabase
      .from("ussd_sessions")
      .insert({
        session_id: sessionId,
        phone_hash: phoneHash,
        phone_e164: phoneNumber,
        current_step: "MAIN_MENU",
        context: {},
        status: "ACTIVE",
      })
      .select()
      .single();
    session = created;
  }

  const context = (session?.context || {}) as UssdContext;

  async function save(step: string, ctx: UssdContext, status = "ACTIVE") {
    await supabase
      .from("ussd_sessions")
      .update({
        current_step: step,
        context: ctx,
        status,
        completed_at: status === "COMPLETED" ? new Date().toISOString() : null,
      })
      .eq("session_id", sessionId);
  }

  // Level 0 — main menu
  if (parts.length === 0) {
    await save("MAIN_MENU", context);
    return con(
      `Welcome to VoteBridge\n1. Vote\n2. Ask a Question\n3. View Results\n4. Exit`
    );
  }

  const choice = parts[0];

  // Exit
  if (choice === "4") {
    await save("EXIT", context, "COMPLETED");
    return end("Thank you for using VoteBridge.\nOne Audience. Every Channel.");
  }

  // VOTE flow
  if (choice === "1") {
    const { data: polls } = await supabase
      .from("polls")
      .select("id, title, event_id, poll_options(id, name, display_order)")
      .eq("status", "ACTIVE")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!polls?.length) {
      return end("No active polls right now. Try again later.");
    }

    if (parts.length === 1) {
      const menu = polls
        .map((p, i) => `${i + 1}. ${p.title}`)
        .join("\n");
      return con(`ACTIVE POLLS\n${menu}\n0. Back`);
    }

    const pollIndex = parseInt(parts[1], 10) - 1;
    if (parts[1] === "0") {
      return con(
        `Welcome to VoteBridge\n1. Vote\n2. Ask a Question\n3. View Results\n4. Exit`
      );
    }

    const poll = polls[pollIndex];
    if (!poll) return end("Invalid poll selection.");

    const options = (poll.poll_options || []).sort(
      (a: { display_order: number }, b: { display_order: number }) =>
        a.display_order - b.display_order
    );

    if (parts.length === 2) {
      await save("SELECT_OPTION", { ...context, pollId: poll.id, eventId: poll.event_id });
      const menu = options
        .map((o: { name: string }, i: number) => `${i + 1}. ${o.name}`)
        .join("\n");
      return con(`${poll.title}\n${menu}\n0. Cancel`);
    }

    if (parts[2] === "0") return end("Vote cancelled.");

    const optionIndex = parseInt(parts[2], 10) - 1;
    const option = options[optionIndex];
    if (!option) return end("Invalid option.");

    if (parts.length === 3) {
      await save("CONFIRM_VOTE", {
        ...context,
        pollId: poll.id,
        optionId: option.id,
        eventId: poll.event_id,
      });
      return con(`You selected:\n${option.name}\n1. Confirm\n2. Cancel`);
    }

    if (parts[3] === "2") {
      await save("CANCELLED", context, "CANCELLED");
      return end("Vote cancelled.");
    }

    if (parts[3] !== "1") return end("Invalid choice.");

    const { error } = await supabase.from("votes").insert({
      poll_id: poll.id,
      poll_option_id: option.id,
      channel: "USSD",
      voter_hash: phoneHash,
      ussd_session_id: sessionId,
      status: "VALID",
    });

    if (error) {
      if (error.code === "23505") {
        await save("DONE", context, "COMPLETED");
        return end("You have already voted in this poll.");
      }
      console.error(error);
      return end("Could not record your vote. Please try again.");
    }

    await save("DONE", context, "COMPLETED");
    // Fire-and-forget SMS — vote stays valid if SMS fails
    void sendVoteConfirmation(phoneNumber, poll.title, option.name);
    return end(
      `Vote recorded for ${option.name}.\nYou will receive an SMS confirmation.\nThank you!`
    );
  }

  // ASK QUESTION
  if (choice === "2") {
    const { data: events } = await supabase
      .from("events")
      .select("id, name")
      .eq("status", "LIVE")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!events?.length) return end("No live events right now.");

    if (parts.length === 1) {
      const menu = events.map((e, i) => `${i + 1}. ${e.name}`).join("\n");
      return con(`ASK A QUESTION\nSelect event:\n${menu}`);
    }

    const event = events[parseInt(parts[1], 10) - 1];
    if (!event) return end("Invalid event.");

    if (parts.length === 2) {
      await save("ENTER_QUESTION", { ...context, eventId: event.id });
      return con("Type your question then send:");
    }

    const questionText = parts.slice(2).join(" ").trim();
    if (!questionText || questionText.length < 3) {
      return end("Question too short. Please try again.");
    }

    await supabase.from("questions").insert({
      event_id: event.id,
      question_text: questionText.slice(0, 280),
      channel: "USSD",
      submitter_hash: phoneHash,
      status: "PENDING",
    });

    await save("DONE", context, "COMPLETED");
    void sendQuestionConfirmation(phoneNumber, event.name);
    return end("Question submitted. Pending organiser approval. Thank you!");
  }

  // VIEW RESULTS
  if (choice === "3") {
    const { data: polls } = await supabase
      .from("polls")
      .select("id, title, poll_options(id, name)")
      .in("status", ["ACTIVE", "CLOSED"])
      .order("created_at", { ascending: false })
      .limit(5);

    if (!polls?.length) return end("No results available.");

    if (parts.length === 1) {
      const menu = polls.map((p, i) => `${i + 1}. ${p.title}`).join("\n");
      return con(`RESULTS\n${menu}`);
    }

    const poll = polls[parseInt(parts[1], 10) - 1];
    if (!poll) return end("Invalid poll.");

    const { data: votes } = await supabase
      .from("votes")
      .select("poll_option_id")
      .eq("poll_id", poll.id)
      .eq("status", "VALID");

    const counts = new Map<string, number>();
    for (const v of votes || []) {
      counts.set(v.poll_option_id, (counts.get(v.poll_option_id) || 0) + 1);
    }
    const total = votes?.length || 0;
    const lines = (poll.poll_options || [])
      .map((o: { id: string; name: string }) => {
        const c = counts.get(o.id) || 0;
        const pct = total ? Math.round((c / total) * 100) : 0;
        return `${o.name}: ${c} (${pct}%)`;
      })
      .join("\n");

    await save("DONE", context, "COMPLETED");
    return end(`${poll.title}\n${lines}\nTotal: ${total}`);
  }

  return end("Invalid option. Dial again to restart.");
}
