import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "accent" | "cyan" | "none";
}

export function GlassCard({ children, className, glow = "none" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 theme-transition",
        glow === "accent" && "glow-accent",
        glow === "cyan" && "glow-cyan",
        className
      )}
    >
      {children}
    </div>
  );
}
