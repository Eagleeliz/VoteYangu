import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import type { PollResults } from "@/lib/types";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;
    const supabase = createServiceClient();

    const { data: poll } = await supabase
      .from("polls")
      .select("id, title, poll_options(id, name, display_order)")
      .eq("id", pollId)
      .single();

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    const { data: votes } = await supabase
      .from("votes")
      .select("poll_option_id, channel")
      .eq("poll_id", pollId)
      .eq("status", "VALID");

    const counts = new Map<string, number>();
    let online = 0;
    let ussd = 0;

    for (const v of votes || []) {
      counts.set(v.poll_option_id, (counts.get(v.poll_option_id) || 0) + 1);
      if (v.channel === "ONLINE") online += 1;
      else if (v.channel === "USSD") ussd += 1;
    }

    const total = votes?.length || 0;
    const options = [...(poll.poll_options || [])]
      .sort(
        (a: { display_order: number }, b: { display_order: number }) =>
          a.display_order - b.display_order
      )
      .map((o: { id: string; name: string }) => {
        const c = counts.get(o.id) || 0;
        return {
          id: o.id,
          name: o.name,
          votes: c,
          percentage: total ? Math.round((c / total) * 1000) / 10 : 0,
        };
      });

    const result: PollResults = {
      pollId: poll.id,
      title: poll.title,
      totalVotes: total,
      channels: { online, ussd },
      options,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load results" }, { status: 500 });
  }
}
