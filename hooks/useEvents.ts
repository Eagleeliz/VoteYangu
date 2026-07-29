"use client";

import { useState, useEffect, useCallback } from "react";
import type { Event } from "@/types";
import { eventsApi } from "@/lib/api";
import { demoEventsList } from "@/lib/demo-data";

const USE_DEMO_DATA = true;

interface UseEventsReturn {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_DEMO_DATA) {
        await new Promise((r) => setTimeout(r, 300));
        setEvents(demoEventsList);
      } else {
        const res = await eventsApi.list();
        setEvents(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, isLoading, error, refresh: fetchEvents };
}
