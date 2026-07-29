export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "VoteBridge";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const AT_USSD_CODE = process.env.NEXT_PUBLIC_AT_USSD_CODE || "*123#";

export const ROUTES = {
  home: "/",
  event: "/event",
  dashboard: "/dashboard",
  ussd: "/ussd",
} as const;

export const POLL_COLORS = ["#ff6b4a", "#22d3ee", "#fbbf24", "#a78bfa", "#4ade80", "#f472b6"];

export const DEMO_EVENT_ID = "evt-001";
export const DEMO_POLL_ID = "poll-001";
