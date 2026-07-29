import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { hashVoter } from "@/lib/hash";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const body = await req.json();
    const questionText = (body.questionText as string)?.trim();
    const voterSeed =
      (body.voterSeed as string) ||
      req.headers.get("x-forwarded-for") ||
      "anon";

    if (!questionText || questionText.length < 3) {
      return NextResponse.json({ error: "Question too short" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { data: event } = await supabase
      .from("events")
      .select("id, status")
      .eq("id", eventId)
      .single();

    if (!event || event.status !== "LIVE") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("questions")
      .insert({
        event_id: eventId,
        question_text: questionText.slice(0, 500),
        channel: "ONLINE",
        submitter_hash: hashVoter(`q:${eventId}:${voterSeed}:${Date.now()}`),
        status: "PENDING",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      question: data,
      message: "Question submitted. Pending approval.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to submit question" }, { status: 500 });
  }
}
