import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { hashVoter } from "@/lib/hash";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;
    const body = await req.json();
    const optionId = body.optionId as string;
    const voterSeed =
      (body.voterSeed as string) ||
      req.headers.get("x-forwarded-for") ||
      "anon";

    if (!optionId) {
      return NextResponse.json({ error: "optionId required" }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data: poll } = await supabase
      .from("polls")
      .select("id, status, title")
      .eq("id", pollId)
      .single();

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }
    if (poll.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Poll is not accepting votes" },
        { status: 400 }
      );
    }

    const { data: option } = await supabase
      .from("poll_options")
      .select("id")
      .eq("id", optionId)
      .eq("poll_id", pollId)
      .single();

    if (!option) {
      return NextResponse.json({ error: "Invalid option" }, { status: 400 });
    }

    const voterHash = hashVoter(`online:${pollId}:${voterSeed}`);

    const { error } = await supabase.from("votes").insert({
      poll_id: pollId,
      poll_option_id: optionId,
      channel: "ONLINE",
      voter_hash: voterHash,
      status: "VALID",
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You have already voted in this poll" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Vote recorded successfully.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to record vote" }, { status: 500 });
  }
}
