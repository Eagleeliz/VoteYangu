import { createHash } from "crypto";

export function hashPhone(phone: string): string {
  const salt = process.env.PHONE_HASH_SALT || "votebridge-dev-salt";
  const normalized = phone.replace(/\s+/g, "").trim();
  return createHash("sha256").update(`${normalized}${salt}`).digest("hex");
}

export function hashVoter(seed: string): string {
  const salt = process.env.PHONE_HASH_SALT || "votebridge-dev-salt";
  return createHash("sha256").update(`${seed}${salt}`).digest("hex");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}
