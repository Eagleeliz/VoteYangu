import Link from "next/link";

export function SiteHeader({
  right,
}: {
  right?: React.ReactNode;
}) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="font-display text-2xl tracking-tight">
        Vote<span style={{ color: "var(--accent)" }}>Bridge</span>
      </Link>
      <nav className="flex items-center gap-3 text-sm">
        {right}
      </nav>
    </header>
  );
}
