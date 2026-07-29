import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const admin = createServiceClient();

    const { data: events, error } = await admin
      .from("events")
      .select("*, polls(*, poll_options(id))")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const rows = events || [];
    const eventIds = rows.map((e) => e.id);
    const pollIds = rows.flatMap(
      (e) => (e.polls || []).map((p: { id: string }) => p.id)
    );

    let questions: unknown[] = [];
    let stats = { total: 0, online: 0, ussd: 0 };

    if (eventIds.length) {
      const { data: qs } = await admin
        .from("questions")
        .select("*")
        .in("event_id", eventIds)
        .order("created_at", { ascending: false });
      questions = qs || [];
    }

    if (pollIds.length) {
      const { data: votes } = await admin
        .from("votes")
        .select("channel")
        .in("poll_id", pollIds)
        .eq("status", "VALID");
      const online = (votes || []).filter((v) => v.channel === "ONLINE").length;
      const ussd = (votes || []).filter((v) => v.channel === "USSD").length;
      stats = { total: online + ussd, online, ussd };
    }

    return NextResponse.json({ events: rows, questions, stats });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}
