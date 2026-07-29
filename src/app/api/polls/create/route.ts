import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/hash";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventName,
      eventDescription = "",
      pollTitle,
      pollDescription = "",
      options = [],
    } = body as {
      eventName: string;
      eventDescription?: string;
      pollTitle: string;
      pollDescription?: string;
      options: string[];
    };

    const cleanOptions = options.map((o) => o.trim()).filter(Boolean);

    if (!eventName?.trim() || !pollTitle?.trim() || cleanOptions.length < 2) {
      return NextResponse.json(
        { error: "Event name, poll title, and at least 2 options required" },
        { status: 400 }
      );
    }

    const admin = createServiceClient();
    const eventSlug = `${slugify(eventName)}-${nanoid(6)}`;
    const pollSlug = `${slugify(pollTitle)}-${nanoid(6)}`;

    const { data: event, error: eventError } = await admin
      .from("events")
      .insert({
        organiser_id: null,
        name: eventName.trim(),
        description: eventDescription,
        slug: eventSlug,
        status: "LIVE",
        ussd_code: process.env.AFRICASTALKING_USSD_CODE || "*384*123#",
      })
      .select()
      .single();

    if (eventError || !event) {
      console.error(eventError);
      return NextResponse.json(
        {
          error:
            eventError?.message?.includes("organiser_id")
              ? "Run supabase/no-auth.sql in Supabase first (organiser_id must be nullable)."
              : "Failed to create event",
        },
        { status: 500 }
      );
    }

    const { data: poll, error: pollError } = await admin
      .from("polls")
      .insert({
        event_id: event.id,
        title: pollTitle.trim(),
        description: pollDescription,
        status: "ACTIVE",
        slug: pollSlug,
      })
      .select()
      .single();

    if (pollError || !poll) {
      console.error(pollError);
      return NextResponse.json({ error: "Failed to create poll" }, { status: 500 });
    }

    const { data: pollOptions, error: optError } = await admin
      .from("poll_options")
      .insert(
        cleanOptions.map((name, i) => ({
          poll_id: poll.id,
          name,
          display_order: i,
        }))
      )
      .select();

    if (optError) {
      console.error(optError);
      return NextResponse.json({ error: "Failed to create options" }, { status: 500 });
    }

    const appUrl = req.nextUrl.origin;
    const voteUrl = `${appUrl}/vote/${poll.slug}`;
    const eventUrl = `${appUrl}/e/${event.slug}`;

    return NextResponse.json({
      event,
      poll,
      options: pollOptions,
      voteUrl,
      eventUrl,
      qrTarget: voteUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
