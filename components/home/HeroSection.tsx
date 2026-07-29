import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-grid overflow-hidden">
      <div className="absolute inset-0 event-hero-overlay" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-vb-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-vb-cyan/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full themed-badge text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-vb-accent live-indicator" />
            Now Live — Kenya Music Awards 2026
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
            One Audience.<br />
            <span className="text-gradient">Every Channel.</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            The unified audience engagement platform for sports, music, and entertainment.
            Let everyone participate — whether they&apos;re online or on a basic feature phone.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/event" className="btn-primary px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-2">
              <span>Join Live Event</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="btn-secondary px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5" />
              <span>Organiser Dashboard</span>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass rounded-2xl p-4 glow-accent theme-transition">
              <div className="text-2xl font-display font-bold" style={{ color: "var(--text-primary)" }}>17.2K</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>Total Votes</div>
            </div>
            <div className="glass rounded-2xl p-4 glow-cyan theme-transition">
              <div className="text-2xl font-display font-bold" style={{ color: "var(--text-primary)" }}>40.6%</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>USSD Participation</div>
            </div>
            <div className="glass rounded-2xl p-4 theme-transition">
              <div className="text-2xl font-display font-bold" style={{ color: "var(--text-primary)" }}>1,240</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>Questions</div>
            </div>
            <div className="glass rounded-2xl p-4 theme-transition">
              <div className="text-2xl font-display font-bold" style={{ color: "var(--text-primary)" }}>87.3%</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
