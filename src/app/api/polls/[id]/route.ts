import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;
    const body = await req.json();
    const {
      eventName,
      pollTitle,
      options = [],
      pollStatus,
      eventStatus,
    } = body as {
      eventName?: string;
      pollTitle?: string;
      options?: string[];
      pollStatus?: string;
      eventStatus?: string;
    };

    const cleanOptions = (options || []).map((o) => o.trim()).filter(Boolean);

    if (!eventName?.trim() || !pollTitle?.trim() || cleanOptions.length < 2) {
      return NextResponse.json(
        { error: "Event name, poll title, and at least 2 options required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data: poll, error: pollError } = await supabase
      .from("polls")
      .select("id, event_id, slug")
      .eq("id", pollId)
      .maybeSingle();

    if (pollError) throw pollError;
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    const now = new Date().toISOString();

    const { data: event, error: eventUpdateError } = await supabase
      .from("events")
      .update({
        name: eventName.trim(),
        ...(eventStatus ? { status: eventStatus } : {}),
        updated_at: now,
      })
      .eq("id", poll.event_id)
      .select()
      .single();

    if (eventUpdateError) throw eventUpdateError;

    const { data: updatedPoll, error: pollUpdateError } = await supabase
      .from("polls")
      .update({
        title: pollTitle.trim(),
        ...(pollStatus ? { status: pollStatus } : {}),
        updated_at: now,
      })
      .eq("id", pollId)
      .select()
      .single();

    if (pollUpdateError) throw pollUpdateError;

    const { data: existingOptions, error: optionsLoadError } = await supabase
      .from("poll_options")
      .select("id, name, display_order")
      .eq("poll_id", pollId)
      .order("display_order", { ascending: true });

    if (optionsLoadError) throw optionsLoadError;

    const current = existingOptions || [];
    const keepCount = Math.min(current.length, cleanOptions.length);

    // Update existing options in place so votes stay attached to option ids.
    for (let i = 0; i < keepCount; i++) {
      const { error } = await supabase
        .from("poll_options")
        .update({ name: cleanOptions[i], display_order: i })
        .eq("id", current[i].id);
      if (error) throw error;
    }

    if (cleanOptions.length > current.length) {
      const { error } = await supabase.from("poll_options").insert(
        cleanOptions.slice(current.length).map((name, i) => ({
          poll_id: pollId,
          name,
          display_order: current.length + i,
        }))
      );
      if (error) throw error;
    }

    if (current.length > cleanOptions.length) {
      const idsToRemove = current.slice(cleanOptions.length).map((o) => o.id);
      const { error } = await supabase
        .from("poll_options")
        .delete()
        .in("id", idsToRemove);
      if (error) throw error;
    }

    const { data: pollOptions, error: finalOptionsError } = await supabase
      .from("poll_options")
      .select("*")
      .eq("poll_id", pollId)
      .order("display_order", { ascending: true });

    if (finalOptionsError) throw finalOptionsError;

    const appUrl = req.nextUrl.origin;

    return NextResponse.json({
      event,
      poll: updatedPoll,
      options: pollOptions,
      voteUrl: `${appUrl}/vote/${updatedPoll.slug}`,
      eventUrl: `${appUrl}/e/${event.slug}`,
    });
  } catch (err) {
    console.error("Failed to update poll:", err);
    return NextResponse.json({ error: "Failed to update poll" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;
    const supabase = createServiceClient();

    const { data: poll, error: pollError } = await supabase
      .from("polls")
      .select("id, event_id")
      .eq("id", pollId)
      .maybeSingle();

    if (pollError) throw pollError;

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    // A dashboard poll represents its event. Deleting the event also removes
    // its polls, options, votes, and questions through the database cascades,
    // so it disappears from every USSD menu as well as the web dashboard.
    const { data: deletedEvent, error: deleteError } = await supabase
      .from("events")
      .delete()
      .eq("id", poll.event_id)
      .select("id")
      .maybeSingle();

    if (deleteError) throw deleteError;

    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete poll:", err);
    return NextResponse.json({ error: "Failed to delete poll" }, { status: 500 });
  }
}
