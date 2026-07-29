"use client";

import { VoteOption } from "@/components/polls/VoteOption";
import { LiveResults } from "@/components/polls/LiveResults";
import { QuestionForm } from "@/components/questions/QuestionForm";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { usePoll } from "@/hooks/usePoll";
import { useQuestions } from "@/hooks/useQuestions";
import { DEMO_POLL_ID, DEMO_EVENT_ID, AT_USSD_CODE } from "@/lib/constants";
import Link from "next/link";

export default function EventPage() {
  const { poll, options, results, userVote, selectedOption, selectOption, submitVote } = usePoll(DEMO_POLL_ID);
  const { questions, upvotedIds, submitQuestion, upvoteQuestion } = useQuestions(DEMO_EVENT_ID);

  const approvedQuestions = questions
    .filter((q) => q.status === "APPROVED")
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);

  return (
    <div className="page-transition min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <div className="absolute inset-0 event-hero-overlay z-10" />
        <img
          src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1200&h=400&fit=crop"
          className="w-full h-full object-cover opacity-60"
          alt="Event"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                style={{ background: "var(--live-badge-bg)", border: "1px solid var(--live-badge-border)", color: "var(--live-badge-text)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full live-indicator" style={{ background: "var(--live-dot)" }} />
                LIVE
              </span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Kenya Music Awards 2026</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
              {poll?.title || "Loading..."}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 -mt-4 relative z-30">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6 theme-transition">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <svg className="w-5 h-5 text-vb-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cast Your Vote
                </h2>
                <span className="text-sm" style={{ color: "var(--text-dim)" }}>{results?.totalVotes.toLocaleString() || 0} votes</span>
              </div>

              <div className="space-y-3">
                {options.map((opt) => (
                  <VoteOption
                    key={opt.id}
                    option={opt}
                    isSelected={selectedOption === opt.id}
                    totalVotes={results?.totalVotes || 0}
                    onSelect={() => selectOption(opt.id)}
                    disabled={!!userVote}
                  />
                ))}
              </div>

              <button
                onClick={submitVote}
                disabled={!selectedOption || !!userVote}
                className="w-full mt-6 btn-primary py-4 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {userVote ? "Vote Recorded ✓" : "Select an option to vote"}
              </button>

              {userVote && (
                <div className="mt-4 p-4 rounded-xl bg-vb-accent2/10 border border-vb-accent2/20 text-center">
                  <p className="text-vb-accent2 text-sm font-medium">Your vote has been recorded successfully!</p>
                </div>
              )}
            </div>

            <QuestionForm onSubmit={submitQuestion} />

            <div className="glass rounded-2xl p-6 theme-transition">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2 mb-4" style={{ color: "var(--text-primary)" }}>
                <svg className="w-5 h-5 text-vb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Top Questions
              </h2>
              <div className="space-y-3">
                {approvedQuestions.map((q, i) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    rank={i + 1}
                    isUpvoted={upvotedIds.has(q.id)}
                    onUpvote={() => upvoteQuestion(q.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 glow-cyan theme-transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-vb-cyan/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-vb-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-semibold" style={{ color: "var(--text-primary)" }}>No Internet?</h3>
                  <p className="text-xs" style={{ color: "var(--text-dim)" }}>Use USSD instead</p>
                </div>
              </div>
              <div className="rounded-xl p-4 text-center border" style={{ background: "var(--bg-tertiary)", borderColor: "var(--border-subtle)" }}>
                <div className="text-2xl font-display font-bold text-vb-cyan tracking-wider">{AT_USSD_CODE}</div>
                <p className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>Dial to participate</p>
              </div>
              <Link href="/ussd" className="w-full mt-4 btn-secondary py-2.5 rounded-lg text-sm font-medium text-center block">
                Try USSD Simulator
              </Link>
            </div>

            {results && <LiveResults options={options} totalVotes={results.totalVotes} />}

            <div className="glass rounded-2xl p-6 theme-transition">
              <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>Participation</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-vb-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 019 9" />
                    </svg>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Online</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>10,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-vb-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>USSD</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>7,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
