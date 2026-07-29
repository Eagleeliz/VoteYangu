interface UssdLogProps {
  logs: string[];
}

export function UssdLog({ logs }: UssdLogProps) {
  return (
    <div className="glass rounded-2xl p-6 theme-transition">
      <h3 className="font-display font-semibold text-lg mb-3" style={{ color: "var(--text-primary)" }}>Session Log</h3>
      <div className="space-y-2 text-xs font-mono max-h-48 overflow-y-auto" style={{ color: "var(--text-dim)" }}>
        {logs.map((log, i) => (
          <div key={i} className={log.includes("Sent") ? "text-vb-cyan" : log.includes("cancelled") ? "text-red-400" : ""}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
