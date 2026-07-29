export function ChannelViz() {
  return (
    <section className="py-24" style={{ background: "var(--bg-tertiary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Digital Inclusion That <span className="text-gradient">Matters</span>
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              In many regions, a significant portion of the audience relies on basic mobile phones.
              VoteBridge ensures their voices count just as much as those with smartphones.
            </p>
            <div className="space-y-4">
              {[
                { title: "Same Poll, Same Results", desc: "Online and USSD votes feed into one unified database", color: "text-vb-accent", bg: "bg-vb-accent/10" },
                { title: "SMS Confirmations", desc: "USSD users receive vote and result confirmations via SMS", color: "text-vb-cyan", bg: "bg-vb-cyan/10" },
                { title: "Question Upvoting", desc: "Both channels can prioritize questions the audience wants answered", color: "text-vb-gold", bg: "bg-vb-gold/10" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-5 h-5 ${item.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: "var(--text-primary)" }}>{item.title}</div>
                    <div className="text-sm" style={{ color: "var(--text-dim)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-3xl p-8 glow-accent theme-transition">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-lg" style={{ color: "var(--text-primary)" }}>Channel Breakdown</h3>
                <span className="text-xs" style={{ color: "var(--text-dim)" }}>Live</span>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "var(--text-secondary)" }}>Online Votes</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>10,234 (59.4%)</span>
                  </div>
                  <div className="h-3 chart-bar-bg rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-vb-cyan to-vb-accent2 rounded-full vote-bar" style={{ width: "59.4%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "var(--text-secondary)" }}>USSD Votes</span>
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>7,000 (40.6%)</span>
                  </div>
                  <div className="h-3 chart-bar-bg rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-vb-accent to-vb-gold rounded-full vote-bar" style={{ width: "40.6%" }} />
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 themed-divider">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gradient">40.6%</div>
                  <div className="text-sm mt-1" style={{ color: "var(--text-dim)" }}>USSD Participation Rate</div>
                  <div className="text-xs text-vb-accent2 mt-2">↑ 12% from last event</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
