"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Radio, LayoutDashboard, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/event", label: "Live Event" },
  { href: "/ussd", label: "USSD Sim" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b themed-divider theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-vb-accent to-vb-gold flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
              Vote<span className="text-vb-accent">Bridge</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-item text-sm font-medium transition-colors",
                  pathname === link.href && "active"
                )}
                style={{ color: pathname === link.href ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg btn-secondary text-sm font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Organiser</span>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg btn-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t themed-divider">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/5"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
