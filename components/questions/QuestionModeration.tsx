"use client";

import type { Question } from "@/types";

interface QuestionModerationProps {
  questions: Question[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onFeature: (id: string) => void;
}

export function QuestionModeration({ questions, onApprove, onReject, onFeature }: QuestionModerationProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden theme-transition">
      <div className="px-6 py-4 themed-divider">
        <h2 className="font-display font-semibold" style={{ color: "var(--text-primary)" }}>Question Moderation</h2>
      </div>
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {questions.map((q) => (
          <div
            key={q.id}
            className="px-6 py-4 flex items-start gap-4 hover:bg-black/5 transition-colors theme-transition"
          >
            <div className="flex-shrink-0 mt-1">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  q.channel === "ONLINE" ? "bg-vb-cyan/10 text-vb-cyan" : "bg-vb-accent/10 text-vb-accent"
                }`}
              >
                {q.channel}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>{q.questionText}</p>
              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-dim)" }}>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {q.upvotes}
                </span>
                <span>
                  Status:{" "}
                  <span
                    className={
                      q.status === "APPROVED"
                        ? "text-vb-accent2"
                        : q.status === "PENDING"
                        ? "text-vb-gold"
                        : ""
                    }
                  >
                    {q.status}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {q.status === "PENDING" ? (
                <>
                  <button
                    onClick={() => onApprove(q.id)}
                    className="p-2 rounded-lg bg-vb-accent2/10 text-vb-accent2 hover:bg-vb-accent2/20 transition-colors"
                    title="Approve"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onReject(q.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Reject"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onFeature(q.id)}
                  className="p-2 rounded-lg bg-vb-gold/10 text-vb-gold hover:bg-vb-gold/20 transition-colors"
                  title="Feature"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
