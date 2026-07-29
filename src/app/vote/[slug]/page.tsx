"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { PollQR } from "@/components/PollQR";
import { useVoterSeed } from "@/hooks/useVoterSeed";
import type { Poll, PollOption, PollResults } from "@/lib/types";

export default function VotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("");
  const [poll, setPoll] = useState<(Poll & { poll_options: PollOption[] }) | null>(
    null
  );
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<PollResults | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const voterSeed = useVoterSeed();

  useEffect(() => {
    void params.then((p) => setSlug(p.slug));
  }, [params]);

  const loadResults = useCallback(async (pollId: string) => {
    const res = await fetch(`/api/polls/${pollId}/results`);
    if (res.ok) setResults(await res.json());
  }, []);

  useEffect(() => {
    if (!slug) return;
    const supabase = createClient();
    void (async () => {
      const { data } = await supabase
        .from("polls")
        .select("*, poll_options(*)")
        .eq("slug", slug)
        .single();
      if (data) {
        const ordered = {
          ...data,
          poll_options: [...(data.poll_options || [])].sort(
            (a: PollOption, b: PollOption) => a.display_order - b.display_order
          ),
        };
        setPoll(ordered);
        await loadResults(data.id);
      }
    })();
  }, [slug, loadResults]);

  useEffect(() => {
    if (!poll?.id) return;
    const t = setInterval(() => void loadResults(poll.id), 8000);
    return () => clearInterval(t);
  }, [poll?.id, loadResults]);

  async function vote() {
    if (!poll || !selected || !voterSeed) return;
    setSubmitting(true);
    setError("");
    setMessage("");
    const res = await fetch(`/api/polls/${poll.id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId: selected, voterSeed }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error || "Vote failed");
      return;
    }
    setMessage(data.message);
    await loadResults(poll.id);
  }

  const voteUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `${process.env.NEXT_PUBLIC_APP_URL || ""}/vote/${slug}`;

  if (!poll) {
    return (
      <main className="min-h-screen px-5 py-20 text-center" style={{ color: "var(--muted)" }}>
        Loading poll…
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16">
      <SiteHeader
        right={
          <button className="btn btn-ghost" onClick={() => setShowQr((v) => !v)}>
            {showQr ? "Hide QR" : "Show QR"}
          </button>
        }
      />

      <div className="mx-auto grid max-w-5xl gap-8 px-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="panel rise p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
            Live poll · {poll.status}
          </p>
          <h1 className="font-display mt-3 text-3xl sm:text-4xl">{poll.title}</h1>
          {poll.description && (
            <p className="mt-2" style={{ color: "var(--muted)" }}>
              {poll.description}
            </p>
          )}

          <div className="mt-6 space-y-3">
            {poll.poll_options.map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition"
                style={{
                  borderColor:
                    selected === opt.id ? "var(--accent)" : "var(--line)",
                  background:
                    selected === opt.id
                      ? "rgba(232,184,74,0.1)"
                      : "rgba(11,31,26,0.35)",
                }}
              >
                <input
                  type="radio"
                  name="option"
                  value={opt.id}
                  checked={selected === opt.id}
                  onChange={() => setSelected(opt.id)}
                />
                <span className="font-medium">{opt.name}</span>
              </label>
            ))}
          </div>

          <button
            className="btn btn-primary mt-6"
            disabled={!selected || submitting || poll.status !== "ACTIVE"}
            onClick={vote}
          >
            {submitting ? "Recording…" : "Vote"}
          </button>

          {message && (
            <p className="mt-4 text-sm" style={{ color: "var(--online)" }}>
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}

          <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
            No smartphone? Dial{" "}
            <strong style={{ color: "var(--ussd)" }}>
              {process.env.NEXT_PUBLIC_USSD_CODE || "*384*123#"}
            </strong>{" "}
            to vote on USSD.
          </p>
        </section>

        <aside className="space-y-6">
          {showQr && (
            <div className="panel rise rise-delay-1 flex justify-center p-6">
              <PollQR url={voteUrl} label="Share this QR at your event" />
            </div>
          )}

          <div className="panel rise rise-delay-2 p-6">
            <h2 className="font-display text-2xl">Live results</h2>
            {results ? (
              <>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  {results.totalVotes} votes · Online {results.channels.online} ·
                  USSD {results.channels.ussd}
                </p>
                <div className="mt-5 space-y-4">
                  {results.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{opt.name}</span>
                        <span style={{ color: "var(--muted)" }}>
                          {opt.votes} · {opt.percentage}%
                        </span>
                      </div>
                      <div
                        className="h-2 overflow-hidden rounded-full"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <div
                          className="result-bar h-full rounded-full"
                          style={{
                            width: `${opt.percentage}%`,
                            background:
                              "linear-gradient(90deg, var(--online), var(--accent))",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-2" style={{ color: "var(--muted)" }}>
                No votes yet.
              </p>
            )}
            <Link
              href={`/e/${poll.event_id}`}
              className="btn btn-ghost mt-5"
              style={{ display: "none" }}
            >
              Event
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
