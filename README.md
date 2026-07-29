# VoteBridge Frontend

> A Next.js 14 frontend for the VoteBridge unified audience engagement platform.

## Features

- **Next.js 14** with App Router
- **TypeScript** throughout
- **Tailwind CSS** with custom theme system
- **Dark / Light / System** theme toggle with persistence
- **Full demo data layer** — works without a backend
- **API client** pre-wired for backend integration
- **Auth context** (JWT ready)
- **Toast notifications**
- **Poll voting** with live results
- **Question submission & upvoting**
- **Question moderation** (approve / reject / feature)
- **USSD simulator** with state machine
- **Organiser dashboard** with analytics
- **Mobile responsive**

## Pages

| Route | Description |
|---|---|
| `/` | Home / Landing |
| `/event` | Live Event — voting & Q&A |
| `/dashboard` | Organiser Dashboard |
| `/ussd` | USSD Simulator |

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Connect Your Backend

Each hook has a `USE_DEMO_DATA = true` flag at the top. To connect to your real backend:

1. Set your API URL in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

2. Flip the switches in each hook:
   - `hooks/usePoll.ts`
   - `hooks/useQuestions.ts`
   - `hooks/useAnalytics.ts`
   - `hooks/useEvents.ts`

3. The `lib/api.ts` file already has all endpoints pre-wired to match your VoteBridge backend spec.

## Project Structure

```
app/              # Next.js App Router pages
components/       # React components
  ui/             # Reusable UI primitives
  polls/          # Poll-related components
  questions/      # Question-related components
  dashboard/      # Dashboard-specific components
  home/           # Home page sections
  ussd/           # USSD simulator components
context/          # React Context providers
hooks/            # Custom React hooks
lib/              # Utilities, API client, demo data
types/            # TypeScript type definitions
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Axios (API client)
- clsx + tailwind-merge
