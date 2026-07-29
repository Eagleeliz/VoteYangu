"use client";

import { QRCodeSVG } from "qrcode.react";

export function PollQR({
  url,
  size = 200,
  label = "Scan to vote",
}: {
  url: string;
  size?: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="rounded-2xl bg-white p-4 shadow-lg"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}
      >
        <QRCodeSVG value={url} size={size} level="M" includeMargin={false} />
      </div>
      <p className="text-center text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p
        className="max-w-[240px] break-all text-center text-xs"
        style={{ color: "var(--accent)" }}
      >
        {url}
      </p>
    </div>
  );
}
