"use client";

import type { PollOption } from "@/types";

interface LiveResultsProps {
  options: PollOption[];
  totalVotes: number;
}

export function LiveResults({ options, totalVotes }: LiveResultsProps) {
  return (
    <div className="glass rounded-2xl p-6 theme-transition">
      <h3 className="font-display font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <svg className="w-4 h-4 text-vb-accent live-indicator" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Live Results
      </h3>
      <div className="space-y-4">
        {options.map((opt) => {
          const pct = totalVotes > 0 ? (((opt.voteCount || 0) / totalVotes) * 100).toFixed(1) : "0.0";
          return (
            <div key={opt.id}>
              <div className="flex justify-between text-sm mb-1.5">
                <span style={{ color: "var(--text-secondary)" }}>{opt.name}</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{pct}%</span>
              </div>
              <div className="h-2 chart-bar-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full vote-bar"
                  style={{ width: `${pct}%`, backgroundColor: "#ff6b4a" }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 themed-divider text-center">
        <div className="text-2xl font-display font-bold" style={{ color: "var(--text-primary)" }}>
          {totalVotes.toLocaleString()}
        </div>
        <div className="text-xs" style={{ color: "var(--text-dim)" }}>Total Votes</div>
      </div>
    </div>
  );
}
