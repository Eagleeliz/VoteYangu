interface ChannelBreakdownProps {
  ussdRate: number;
  onlineVotes: number;
  ussdVotes: number;
}

export function ChannelBreakdown({ ussdRate, onlineVotes, ussdVotes }: ChannelBreakdownProps) {
  return (
    <div className="glass rounded-2xl p-6 theme-transition">
      <h3 className="font-display font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Vote Distribution</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path style={{ color: "var(--bar-bg)" }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
            <path className="text-vb-accent" strokeDasharray={`${ussdRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-display font-bold" style={{ color: "var(--text-primary)" }}>{ussdRate}%</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-vb-cyan" />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Online: {onlineVotes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-vb-accent" />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>USSD: {ussdVotes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
