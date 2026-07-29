import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action } = await req.json();

    const statusMap: Record<string, string> = {
      approve: "APPROVED",
      reject: "REJECTED",
      feature: "FEATURED",
      answer: "ANSWERED",
    };

    const status = statusMap[action];
    if (!status) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const admin = createServiceClient();
    const { data, error } = await admin
      .from("questions")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ question: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
