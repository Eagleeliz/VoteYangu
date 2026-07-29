"use client";

interface PollChartProps {
  data: number[];
}

export function PollChart({ data }: PollChartProps) {
  return (
    <div className="h-48 flex items-end gap-2">
      {data.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end gap-1">
          <div
            className="w-full bg-gradient-to-t from-vb-accent to-vb-gold rounded-t-md vote-bar"
            style={{ height: `${h}%`, opacity: 0.5 + i / 24 }}
          />
        </div>
      ))}
    </div>
  );
}
