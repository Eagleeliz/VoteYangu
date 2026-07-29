import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "live" | "scheduled" | "ended" | "accent" | "cyan" | "gold";
  className?: string;
}

export function Badge({ children, variant = "accent", className }: BadgeProps) {
  const variants = {
    live: "bg-red-500/10 text-red-400 border-red-500/20",
    scheduled: "bg-vb-cyan/10 text-vb-cyan border-vb-cyan/20",
    ended: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    accent: "themed-badge",
    cyan: "bg-vb-cyan/10 text-vb-cyan border-vb-cyan/20",
    gold: "bg-vb-gold/10 text-vb-gold border-vb-gold/20",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
