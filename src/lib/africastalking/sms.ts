import AfricasTalking from "africastalking";
import { createServiceClient } from "@/lib/supabase/admin";
import { hashPhone } from "@/lib/hash";

type ATClient = ReturnType<typeof AfricasTalking>;

function getAT(): ATClient | null {
  const username = process.env.AFRICASTALKING_USERNAME;
  const apiKey = process.env.AFRICASTALKING_API_KEY;

  if (!username || !apiKey) {
    return null;
  }

  return AfricasTalking({ username, apiKey });
}

export async function sendSMS(
  phone: string,
  message: string,
  messageType: string
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const phoneHash = hashPhone(phone);
  const supabase = createServiceClient();
  const at = getAT();

  if (!at) {
    await supabase.from("sms_logs").insert({
      phone_hash: phoneHash,
      message_type: messageType,
      message,
      status: "SKIPPED_NO_CREDENTIALS",
    });
    console.log(`[SMS:${messageType}] to ${phone}: ${message}`);
    return { ok: true, id: "dev-log" };
  }

  try {
    const result = (await at.SMS.send({
      to: [phone],
      message,
      from: process.env.AFRICASTALKING_SMS_FROM || undefined,
    })) as {
      SMSMessageData?: {
        Recipients?: Array<{ status?: string; messageId?: string | number }>;
      };
    };

    const recipient = result?.SMSMessageData?.Recipients?.[0];
    const status = recipient?.status || "SENT";
    const providerId = recipient?.messageId?.toString();

    await supabase.from("sms_logs").insert({
      phone_hash: phoneHash,
      message_type: messageType,
      message,
      status,
      provider_message_id: providerId,
    });

    return { ok: true, id: providerId };
  } catch (err) {
    const error = err instanceof Error ? err.message : "SMS failed";
    await supabase.from("sms_logs").insert({
      phone_hash: phoneHash,
      message_type: messageType,
      message,
      status: "FAILED",
    });
    console.error("SMS error:", error);
    return { ok: false, error };
  }
}

export async function sendVoteConfirmation(
  phone: string,
  pollTitle: string,
  optionName: string
) {
  return sendSMS(
    phone,
    `Your vote for ${optionName} in "${pollTitle}" has been recorded. Thank you for participating in VoteBridge.`,
    "VOTE_CONFIRMATION"
  );
}

export async function sendQuestionConfirmation(phone: string, eventName: string) {
  return sendSMS(
    phone,
    `Your question for ${eventName} was submitted. Thank you for participating in VoteBridge.`,
    "QUESTION_CONFIRMATION"
  );
}
