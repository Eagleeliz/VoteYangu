"use client";

import { cn } from "@/lib/utils";
import type { PollOption } from "@/types";

interface VoteOptionProps {
  option: PollOption;
  isSelected: boolean;
  totalVotes: number;
  onSelect: () => void;
  disabled?: boolean;
}

export function VoteOption({ option, isSelected, totalVotes, onSelect, disabled }: VoteOptionProps) {
  const pct = totalVotes > 0 ? (((option.voteCount || 0) / totalVotes) * 100).toFixed(1) : "0.0";

  return (
    <div
      onClick={() => !disabled && onSelect()}
      className={cn(
        "option-card relative rounded-xl border p-4 cursor-pointer overflow-hidden theme-transition",
        isSelected && "selected",
        disabled && "opacity-60 cursor-default"
      )}
      style={{
        borderColor: isSelected ? "#ff6b4a" : "var(--border-medium)",
        background: isSelected ? "rgba(255, 107, 74, 0.08)" : "transparent",
      }}
    >
      {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-vb-accent/5 to-transparent" />}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
            style={{
              borderColor: isSelected ? "#ff6b4a" : "var(--text-dim)",
              background: isSelected ? "#ff6b4a" : "transparent",
            }}
          >
            {isSelected && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="font-medium" style={{ color: isSelected ? "#ff6b4a" : "var(--text-primary)" }}>
            {option.name}
          </span>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>
            {pct}%
          </div>
          <div className="text-xs" style={{ color: "var(--text-dim)" }}>
            {(option.voteCount || 0).toLocaleString()} votes
          </div>
        </div>
      </div>
      <div className="mt-3 h-2 chart-bar-bg rounded-full overflow-hidden">
        <div
          className="h-full rounded-full vote-bar"
          style={{ width: `${pct}%`, backgroundColor: "#ff6b4a" }}
        />
      </div>
    </div>
  );
}
