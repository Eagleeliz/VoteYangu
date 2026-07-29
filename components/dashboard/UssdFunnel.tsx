interface UssdFunnelProps {
  sessionsStarted: number;
  completionRate: number;
}

export function UssdFunnel({ sessionsStarted, completionRate }: UssdFunnelProps) {
  return (
    <div className="glass rounded-2xl p-6 theme-transition">
      <h3 className="font-display font-semibold mb-4" style={{ color: "var(--text-primary)" }}>USSD Funnel</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: "var(--text-dim)" }}>Sessions Started</span>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>{sessionsStarted.toLocaleString()}</span>
          </div>
          <div className="h-2 chart-bar-bg rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ background: "var(--bar-bg)" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: "var(--text-dim)" }}>Reached Voting</span>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>7,800</span>
          </div>
          <div className="h-2 chart-bar-bg rounded-full overflow-hidden">
            <div className="h-full bg-vb-cyan/50 rounded-full" style={{ width: "95%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: "var(--text-dim)" }}>Confirmed Vote</span>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>{Math.floor(sessionsStarted * (completionRate / 100)).toLocaleString()}</span>
          </div>
          <div className="h-2 chart-bar-bg rounded-full overflow-hidden">
            <div className="h-full bg-vb-accent rounded-full" style={{ width: `${completionRate}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
