"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { PollQR } from "@/components/PollQR";
import { useVoterSeed } from "@/hooks/useVoterSeed";
import type { Event, Poll, PollOption, Question } from "@/lib/types";

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("");
  const [event, setEvent] = useState<Event | null>(null);
  const [poll, setPoll] = useState<(Poll & { poll_options: PollOption[] }) | null>(
    null
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const voterSeed = useVoterSeed();

  useEffect(() => {
    void params.then((p) => setSlug(p.slug));
  }, [params]);

  const load = useCallback(async () => {
    if (!slug) return;
    const supabase = createClient();
    const { data: ev } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!ev) return;
    setEvent(ev);

    const { data: polls } = await supabase
      .from("polls")
      .select("*, poll_options(*)")
      .eq("event_id", ev.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (polls?.[0]) {
      setPoll({
        ...polls[0],
        poll_options: [...(polls[0].poll_options || [])].sort(
          (a: PollOption, b: PollOption) => a.display_order - b.display_order
        ),
      });
    }

    const { data: qs } = await supabase
      .from("questions")
      .select("*")
      .eq("event_id", ev.id)
      .in("status", ["APPROVED", "FEATURED", "ANSWERED"])
      .order("upvote_count", { ascending: false });
    setQuestions((qs || []) as Question[]);
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  async function submitQuestion(e: FormEvent) {
    e.preventDefault();
    if (!event || !voterSeed) return;
    setError("");
    setMsg("");
    const res = await fetch(`/api/events/${event.id}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionText, voterSeed }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed");
      return;
    }
    setMsg(data.message);
    setQuestionText("");
  }

  if (!event) {
    return (
      <main className="min-h-screen px-5 py-20 text-center" style={{ color: "var(--muted)" }}>
        Loading event…
      </main>
    );
  }

  const voteUrl = poll
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/vote/${poll.slug}`
    : "";

  return (
    <main className="min-h-screen pb-16">
      <SiteHeader
        right={
          poll ? (
            <Link href={`/vote/${poll.slug}`} className="btn btn-primary">
              Vote now
            </Link>
          ) : null
        }
      />

      <div className="mx-auto max-w-5xl space-y-8 px-5">
        <section className="rise">
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
            Live event
          </p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl">{event.name}</h1>
          {event.description && (
            <p className="mt-3 max-w-2xl" style={{ color: "var(--muted)" }}>
              {event.description}
            </p>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel rise rise-delay-1 p-6">
            <h2 className="font-display text-2xl">Live poll</h2>
            {poll ? (
              <>
                <p className="mt-2 text-lg">{poll.title}</p>
                <ul className="mt-4 space-y-2">
                  {poll.poll_options.map((o) => (
                    <li
                      key={o.id}
                      className="rounded-xl border border-[var(--line)] px-4 py-3"
                    >
                      {o.name}
                    </li>
                  ))}
                </ul>
                <Link href={`/vote/${poll.slug}`} className="btn btn-primary mt-5">
                  Cast your vote
                </Link>
              </>
            ) : (
              <p className="mt-2" style={{ color: "var(--muted)" }}>
                No active poll.
              </p>
            )}
          </div>

          <div className="panel rise rise-delay-2 flex flex-col items-center justify-center p-6">
            {voteUrl ? (
              <PollQR url={voteUrl} label="Scan to vote on this event" />
            ) : null}
            <p className="mt-4 text-center text-sm" style={{ color: "var(--muted)" }}>
              USSD: dial{" "}
              <strong style={{ color: "var(--ussd)" }}>
                {event.ussd_code || "*384*123#"}
              </strong>
            </p>
          </div>
        </section>

        <section className="panel rise rise-delay-3 p-6">
          <h2 className="font-display text-2xl">Ask a question</h2>
          <form onSubmit={submitQuestion} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              className="field"
              placeholder="What would you like to ask?"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
          {msg && (
            <p className="mt-3 text-sm" style={{ color: "var(--online)" }}>
              {msg}
            </p>
          )}
          {error && (
            <p className="mt-3 text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}

          <div className="mt-6 space-y-3">
            <h3 className="text-sm uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>
              Audience questions
            </h3>
            {questions.length === 0 && (
              <p style={{ color: "var(--muted)" }}>No approved questions yet.</p>
            )}
            {questions.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-[var(--line)] px-4 py-3"
              >
                <p>{q.question_text}</p>
                <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                  {q.channel}
                  {q.status === "FEATURED" ? " · Featured" : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
