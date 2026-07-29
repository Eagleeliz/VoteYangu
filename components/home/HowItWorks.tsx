import { Globe, Smartphone, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Globe,
    iconColor: "text-vb-accent",
    bgColor: "bg-vb-accent/10",
    hoverBg: "group-hover:bg-vb-accent/20",
    title: "Online Participation",
    description: "Smartphone users vote, ask questions, and view live results through a modern web interface.",
  },
  {
    icon: Smartphone,
    iconColor: "text-vb-cyan",
    bgColor: "bg-vb-cyan/10",
    hoverBg: "group-hover:bg-vb-cyan/20",
    title: "USSD Access",
    description: "Feature phone users dial a short code to vote and submit questions. No internet required.",
  },
  {
    icon: BarChart3,
    iconColor: "text-vb-gold",
    bgColor: "bg-vb-gold/10",
    hoverBg: "group-hover:bg-vb-gold/20",
    title: "Unified Insights",
    description: "Organisers see everything in one dashboard — live results, audience questions, and channel analytics.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            How VoteBridge Works
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Seamlessly connect online and offline audiences into one unified experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-8 hover:border-vb-accent/30 transition-all group theme-transition"
            >
              <div className={`w-12 h-12 rounded-xl ${f.bgColor} flex items-center justify-center mb-6 ${f.hoverBg} transition-colors`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
