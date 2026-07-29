import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  icon: ReactNode;
  iconBg?: string;
}

export function MetricCard({ title, value, subtitle, trend, icon, iconBg = "bg-vb-accent/10" }: MetricCardProps) {
  return (
    <div className="metric-card rounded-2xl p-5 theme-transition">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
          {title}
        </span>
        <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>{icon}</div>
      </div>
      <div className="text-2xl font-display font-bold" style={{ color: "var(--text-primary)" }}>
        {value}
      </div>
      {trend && <div className="text-xs text-vb-accent2 mt-1">{trend}</div>}
      {subtitle && <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>{subtitle}</div>}
    </div>
  );
}
