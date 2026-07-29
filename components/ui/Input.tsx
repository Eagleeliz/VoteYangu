import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex-1 rounded-xl px-4 py-3 themed-input transition-colors",
        className
      )}
      {...props}
    />
  );
}
