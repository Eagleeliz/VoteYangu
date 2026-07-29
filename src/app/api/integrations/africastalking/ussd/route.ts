import { NextRequest, NextResponse } from "next/server";
import { handleUssd } from "@/lib/africastalking/ussd";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let sessionId = "";
    let phoneNumber = "";
    let text = "";
    let serviceCode = "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      sessionId = body.sessionId || body.sessionID || "";
      phoneNumber = body.phoneNumber || "";
      text = body.text ?? "";
      serviceCode = body.serviceCode || "";
    } else {
      const form = await req.formData();
      sessionId = String(form.get("sessionId") || form.get("sessionID") || "");
      phoneNumber = String(form.get("phoneNumber") || "");
      text = String(form.get("text") ?? "");
      serviceCode = String(form.get("serviceCode") || "");
    }

    if (!sessionId || !phoneNumber) {
      return new NextResponse("END Invalid USSD request.", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const response = await handleUssd({
      sessionId,
      phoneNumber,
      text,
      serviceCode,
    });

    return new NextResponse(response, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("USSD error:", err);
    return new NextResponse("END Service temporarily unavailable.", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
