export function StatsRow() {
  return (
    <section className="py-24" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Ready to bridge your audience?
        </h2>
        <p className="mb-8 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Create your first event and let every voice be heard — online or offline.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/dashboard" className="btn-primary px-8 py-4 rounded-xl text-white font-semibold">
            Create Event
          </a>
          <a href="/event" className="btn-secondary px-8 py-4 rounded-xl font-semibold">
            View Demo Event
          </a>
        </div>
      </div>
    </section>
  );
}
