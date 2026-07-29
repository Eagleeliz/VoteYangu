# VoteBridge

**One Audience. Every Channel.**

Unified audience engagement for web + USSD (Africa's Talking) + SMS, backed by Supabase.

## What you get in this MVP

- Organiser signup / login (Supabase Auth)
- Create event + poll → **QR code** to the vote page
- Online voting + live results (online vs USSD split)
- Audience questions + organiser moderation
- Africa's Talking **USSD** callback + **SMS** vote/question confirmations

## 1. Supabase setup (2 min)

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → paste and run `supabase/schema.sql`
3. Copy Project URL, `anon` key, and `service_role` key from **Settings → API**

## 2. Environment

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
PHONE_HASH_SALT=any-long-random-string

AFRICASTALKING_USERNAME=sandbox
AFRICASTALKING_API_KEY=
AFRICASTALKING_SMS_FROM=VoteBridge
AFRICASTALKING_USSD_CODE=*384*123#
```

Without AT credentials, SMS is logged to the console / `sms_logs` (votes still succeed).

## 3. Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 4. Demo flow (hackathon)

1. Sign up as organiser → Dashboard
2. Create **Kenya Music Awards 2026** poll with Artist A/B/C
3. Scan / open the **QR** → vote online
4. Point Africa's Talking USSD callback to:

```text
POST https://YOUR_PUBLIC_URL/api/integrations/africastalking/ussd
```

5. Dial your sandbox USSD code → Vote / Ask / Results
6. Dashboard shows unified Online + USSD counts

### Simulate USSD locally

```bash
curl -X POST http://localhost:3000/api/integrations/africastalking/ussd \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "sessionId=test-1&phoneNumber=+254700000001&text="
```

Then continue the session by appending menu choices, e.g. `text=1`, `text=1*1`, `text=1*1*1`, `text=1*1*1*1`.

## Africa's Talking

| Channel | Endpoint / usage |
|--------|-------------------|
| USSD | `POST /api/integrations/africastalking/ussd` |
| SMS | Sent after USSD vote / question (non-blocking) |

## Project structure

```text
src/app/                  # Next.js App Router pages + API
src/lib/africastalking/   # USSD state machine + SMS
src/lib/supabase/         # Browser / server / service clients
supabase/schema.sql       # Database + RLS
```

## Notes

- Duplicate votes blocked with `UNIQUE(poll_id, voter_hash)`
- Phone numbers are hashed; raw numbers never shown to organisers
- A successful vote stays valid even if SMS fails
