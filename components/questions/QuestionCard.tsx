"use client";

import { cn } from "@/lib/utils";
import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  rank?: number;
  isUpvoted: boolean;
  onUpvote: () => void;
}

export function QuestionCard({ question, rank, isUpvoted, onUpvote }: QuestionCardProps) {
  return (
    <div
      className="question-card flex items-start gap-3 p-3 rounded-xl border theme-transition"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {rank && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm"
          style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)" }}
        >
          {rank}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>
          {question.questionText}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onUpvote}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              isUpvoted && "text-vb-accent"
            )}
            style={{ color: isUpvoted ? "#ff6b4a" : "var(--text-dim)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>{question.upvotes + (isUpvoted ? 1 : 0)}</span>
          </button>
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>{question.channel}</span>
          {question.featured && (
            <span className="text-xs text-vb-gold">★ Featured</span>
          )}
        </div>
      </div>
    </div>
  );
}
