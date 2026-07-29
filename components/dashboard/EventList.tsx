import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import type { Event } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden theme-transition">
      <div className="px-6 py-4 themed-divider flex items-center justify-between">
        <h2 className="font-display font-semibold text-lg" style={{ color: "var(--text-primary)" }}>Your Events</h2>
        <span className="text-xs" style={{ color: "var(--text-dim)" }}>{events.length} events</span>
      </div>
      <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
        {events.map((event) => (
          <Link
            key={event.id}
            href="/event"
            className="px-6 py-4 flex items-center justify-between hover:bg-black/5 transition-colors theme-transition block"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--bg-tertiary)" }}>
                <Calendar className="w-5 h-5" style={{ color: "var(--text-dim)" }} />
              </div>
              <div>
                <h3 className="font-medium" style={{ color: "var(--text-primary)" }}>{event.name}</h3>
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                  {new Date(event.startAt).toLocaleDateString()} · {event.votes?.toLocaleString() || 0} votes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant={
                  event.status === "LIVE" ? "live" : event.status === "SCHEDULED" ? "scheduled" : "ended"
                }
              >
                {event.status}
              </Badge>
              <ChevronRight className="w-4 h-4" style={{ color: "var(--text-dim)" }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
