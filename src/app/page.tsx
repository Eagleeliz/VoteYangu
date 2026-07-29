import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader
        right={
          <Link href="/dashboard" className="btn btn-primary">
            Create poll
          </Link>
        }
      />

      <section className="relative mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rise">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            Sports · Music · Entertainment
          </p>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            VoteBridge
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl" style={{ color: "var(--muted)" }}>
            One Audience. Every Channel.
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            Create a poll, share a QR code for smartphones, and open the same vote
            on USSD for feature phones — powered by Africa&apos;s Talking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn btn-primary">
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="rise rise-delay-1 relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--bg-elevated)] p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,184,74,0.2), transparent 40%), linear-gradient(225deg, rgba(91,159,212,0.25), transparent 45%)",
            }}
          />
          <div className="relative space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                Unified channels
              </p>
              <h2 className="font-display mt-2 text-3xl">Web + USSD + SMS</h2>
            </div>
            <div className="grid gap-3">
              {[
                { label: "Online votes", value: "Smartphones & browsers", tone: "var(--online)" },
                { label: "USSD votes", value: "Dial *384*123#", tone: "var(--ussd)" },
                { label: "SMS confirm", value: "Africa's Talking delivery", tone: "var(--accent)" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-2xl border border-[var(--line)] px-4 py-3"
                  style={{ background: "rgba(11,31,26,0.45)" }}
                >
                  <div>
                    <p className="font-medium">{row.label}</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {row.value}
                    </p>
                  </div>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: row.tone }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
