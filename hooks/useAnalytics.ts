"use client";

import { useState, useEffect, useCallback } from "react";
import type { EventAnalytics } from "@/types";
import { analyticsApi } from "@/lib/api";
import { demoAnalytics } from "@/lib/demo-data";

const USE_DEMO_DATA = true;

interface UseAnalyticsReturn {
  analytics: EventAnalytics | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useAnalytics(eventId: string): UseAnalyticsReturn {
  const [analytics, setAnalytics] = useState<EventAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_DEMO_DATA) {
        await new Promise((r) => setTimeout(r, 300));
        setAnalytics(demoAnalytics);
      } else {
        const res = await analyticsApi.get(eventId);
        setAnalytics(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { analytics, isLoading, error, refresh: fetchAnalytics };
}
