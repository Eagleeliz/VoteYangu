"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { PollQR } from "@/components/PollQR";
import type { Event, Poll, Question } from "@/lib/types";

type CreatedPayload = {
  event: Event;
  poll: Poll;
  voteUrl: string;
  eventUrl: string;
};

type EventRow = Event & {
  polls: Array<Poll & { poll_options: { id: string }[] }>;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [created, setCreated] = useState<CreatedPayload | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ total: 0, online: 0, ussd: 0 });

  const [eventName, setEventName] = useState("Kenya Music Awards 2026");
  const [pollTitle, setPollTitle] = useState(
    "Who is Kenya's Favourite Emerging Artist?"
  );
  const [optionsText, setOptionsText] = useState("Artist A\nArtist B\nArtist C");

  async function load() {
    const res = await fetch("/api/dashboard");
    const data = await res.json();
    if (res.ok) {
      setEvents((data.events || []) as EventRow[]);
      setQuestions((data.questions || []) as Question[]);
      setStats(data.stats || { total: 0, online: 0, ussd: 0 });
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setCreated(null);

    const options = optionsText
      .split("\n")
      .map((o) => o.trim())
      .filter(Boolean);

    const res = await fetch("/api/polls/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        pollTitle,
        options,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Failed to create poll");
      return;
    }

    setCreated(data);
    await load();
  }

  async function moderate(id: string, action: string) {
    await fetch(`/api/questions/${id}/moderate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    await load();
  }

  if (loading) {
    return (
      <main className="min-h-screen px-5 py-20 text-center" style={{ color: "var(--muted)" }}>
        Loading dashboard…
      </main>
    );
  }

  const inclusion =
    stats.total > 0 ? Math.round((stats.ussd / stats.total) * 100) : 0;

  return (
    <main className="min-h-screen pb-16">
      <SiteHeader
        right={
          <Link href="/dashboard#create" className="btn btn-primary">
            New poll
          </Link>
        }
      />

      <div className="mx-auto grid max-w-6xl gap-6 px-5">
        <section className="rise">
          <h1 className="font-display text-4xl">Organiser dashboard</h1>
          <p className="mt-2" style={{ color: "var(--muted)" }}>
            Live unified results across online and USSD. No login required.
          </p>
        </section>

        <section className="rise rise-delay-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total votes", value: stats.total },
            { label: "Online", value: stats.online, color: "var(--online)" },
            { label: "USSD", value: stats.ussd, color: "var(--ussd)" },
            { label: "USSD inclusion", value: `${inclusion}%`, color: "var(--accent)" },
          ].map((card) => (
            <div key={card.label} className="panel p-5">
              <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                {card.label}
              </p>
              <p
                className="font-display mt-2 text-3xl"
                style={{ color: card.color || "var(--ink)" }}
              >
                {card.value}
              </p>
            </div>
          ))}
        </section>

        <section id="create" className="rise rise-delay-2 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={onCreate} className="panel p-6 space-y-4">
            <h2 className="font-display text-2xl">Create event + poll</h2>
            <div>
              <label className="label">Event name</label>
              <input
                className="field"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Poll question</label>
              <input
                className="field"
                value={pollTitle}
                onChange={(e) => setPollTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Options (one per line)</label>
              <textarea
                className="field min-h-[120px]"
                value={optionsText}
                onChange={(e) => setOptionsText(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}
            <button className="btn btn-primary" disabled={saving}>
              {saving ? "Creating…" : "Create & generate QR"}
            </button>
          </form>

          <div className="panel flex flex-col items-center justify-center gap-4 p-6">
            {created ? (
              <>
                <h2 className="font-display text-xl">Poll QR code</h2>
                <PollQR url={created.voteUrl} />
                <div className="flex flex-wrap justify-center gap-2">
                  <Link href={created.voteUrl} className="btn btn-ghost" target="_blank">
                    Open vote page
                  </Link>
                  <Link href={created.eventUrl} className="btn btn-ghost" target="_blank">
                    Event page
                  </Link>
                </div>
                <p className="text-center text-sm" style={{ color: "var(--muted)" }}>
                  No internet? Dial{" "}
                  <strong style={{ color: "var(--accent)" }}>
                    {process.env.NEXT_PUBLIC_USSD_CODE || "*384*123#"}
                  </strong>
                </p>
              </>
            ) : (
              <p className="text-center" style={{ color: "var(--muted)" }}>
                Create a poll to generate a scannable QR that opens the vote page.
              </p>
            )}
          </div>
        </section>

        <section className="rise rise-delay-3 grid gap-6 lg:grid-cols-2">
          <div className="panel p-6">
            <h2 className="font-display text-2xl">Your events</h2>
            <div className="mt-4 space-y-3">
              {events.length === 0 && (
                <p style={{ color: "var(--muted)" }}>No events yet.</p>
              )}
              {events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-[var(--line)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        {event.polls?.[0]?.title || "No poll"}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs"
                      style={{ background: "rgba(232,184,74,0.15)", color: "var(--accent)" }}
                    >
                      {event.status}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      className="btn btn-ghost"
                      style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
                      href={`/e/${event.slug}`}
                    >
                      Public page
                    </Link>
                    {event.polls?.[0] && (
                      <Link
                        className="btn btn-ghost"
                        style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
                        href={`/vote/${event.polls[0].slug}`}
                      >
                        Vote / QR
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="font-display text-2xl">Question moderation</h2>
            <div className="mt-4 space-y-3">
              {questions.length === 0 && (
                <p style={{ color: "var(--muted)" }}>No questions yet.</p>
              )}
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-[var(--line)] p-4"
                >
                  <p>{q.question_text}</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                    {q.channel} · {q.status}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["approve", "feature", "reject", "answer"].map((action) => (
                      <button
                        key={action}
                        className="btn btn-ghost"
                        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                        onClick={() => moderate(q.id, action)}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
