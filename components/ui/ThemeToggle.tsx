"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "var(--toggle-bg)",
          border: "1px solid var(--toggle-border)",
        }}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:rotate-12"
      style={{
        background: "var(--toggle-bg)",
        border: "1px solid var(--toggle-border)",
        color: "var(--text-muted)",
      }}
      title="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
