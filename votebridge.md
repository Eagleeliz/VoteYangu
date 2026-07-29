# VoteBridge
## One Audience. Every Channel.

> A unified audience engagement platform that allows people to vote, ask questions, and participate in live events through either the web or USSD — regardless of whether they have a smartphone or internet connection.

---

# 1. Project Overview

VoteBridge is a multi-channel audience engagement platform built for the **Sports, Music, and Entertainment** industry.

The platform allows an event organiser, artist, sports team, radio station, TV show, media company, or brand to create an interactive event experience where audiences can participate through:

- A web application
- USSD
- SMS notifications

The core principle is:

> **Everyone should be able to participate, regardless of the device or connectivity they have.**

A smartphone user with internet access can:

- Vote online
- Ask questions online
- View live results
- View and upvote audience questions

A user with a basic feature phone and no internet connection can:

- Vote through USSD
- Submit questions through USSD
- Receive vote confirmation through SMS
- Receive question submission confirmation through SMS
- Receive final poll results through SMS

Both audiences participate in the **same event** and their interactions are stored in the same backend.

---

# 2. Product Vision

VoteBridge should become a **unified digital and mobile audience engagement platform**.

Instead of having separate systems for online and USSD participation, VoteBridge combines everything:

```text
                    VOTEBRIDGE

            ONE AUDIENCE. EVERY CHANNEL.

          ┌──────────────────────────┐
          │          ONLINE          │
          │                          │
          │  Vote                    │
          │  Ask Questions           │
          │  View Results            │
          │  Upvote Questions        │
          └────────────┬─────────────┘
                       │
                       ▼
              UNIFIED BACKEND
                       ▲
                       │
          ┌────────────┴─────────────┐
          │           USSD           │
          │                          │
          │  Vote                    │
          │  Ask Questions           │
          │  View Results            │
          │  Upvote Questions        │
          └──────────────────────────┘
                       │
                       ▼
                 SMS NOTIFICATIONS
```

The platform removes the barrier between:

> **People who are online**

and

> **People who are not online.**

---

# 3. Problem Statement

Many modern audience engagement platforms assume that users have:

- A smartphone
- Internet access
- Mobile data
- A web browser
- A social media account

This excludes a significant portion of potential participants.

For example, imagine a music awards event asking:

> "Who should win Best New Artist?"

An online-only voting system may only reach people who have internet access.

A USSD-only system may be accessible to more people but provide a limited experience.

VoteBridge combines both.

A person with a smartphone can visit the website.

A person with a basic phone can dial a USSD code.

Both participate in the **same poll**.

The same principle applies to audience questions.

An online user can type:

> "What inspired your latest album?"

A USSD user can submit the same type of question through their phone.

Both questions appear in the organiser's dashboard.

---

# 4. Core Product Concept

VoteBridge has four core components:

## 4.1 Unified Voting

Users can vote through:

- Online web interface
- USSD

All votes are stored in one central database.

---

## 4.2 Unified Q&A

Users can submit questions through:

- Online web interface
- USSD

All questions are stored in one central database.

---

## 4.3 SMS Communication

USSD users receive SMS notifications for:

- Vote confirmation
- Question submission confirmation
- Final poll results

SMS is also available for optional event notifications.

---

## 4.4 Organiser Dashboard

Organisers can see:

- Live poll results
- Total votes
- Online votes
- USSD votes
- Audience questions
- Popular questions
- Online vs USSD engagement
- Poll analytics
- Question analytics

---

# 5. Target Users

## 5.1 Event Organisers

Examples:

- Music award organisers
- Concert organisers
- Sports event organisers
- Fan clubs
- Entertainment events
- Conferences
- Festivals

---

## 5.2 Artists

Artists can use VoteBridge to:

- Run fan polls
- Ask fans questions
- Collect audience questions
- Engage fans during live events
- Run competitions

---

## 5.3 Sports Teams and Organisations

Examples:

- Football teams
- Basketball teams
- Athletics events
- Sports leagues

Use cases:

- Man of the Match voting
- Player of the Month
- Fan polls
- Audience Q&A
- Fan engagement

---

## 5.4 Radio and TV Stations

Use cases:

- Song voting
- Audience polls
- Live Q&A
- Listener interaction
- Show feedback

---

## 5.5 Brands

Brands can use the platform for:

- Product polls
- Customer feedback
- Event engagement
- Audience surveys
- Campaign participation

---

# 6. Primary User Types

The system has three main user types.

## 6.1 Voter / Audience Member

Can:

- Vote online
- Vote via USSD
- Submit questions online
- Submit questions via USSD
- View results
- Receive SMS notifications

---

## 6.2 Organiser

Can:

- Create events
- Create polls
- Add poll options
- Open and close polls
- View live results
- Manage audience questions
- Feature questions
- View analytics

---

## 6.3 Administrator

Can:

- Manage users
- Manage organisers
- Monitor events
- Review suspicious activity
- Manage system configuration
- Monitor Africa's Talking integrations

---

# 7. Example Event

Create an event:

```text
Kenya Music Awards 2026
```

The organiser creates a poll:

```text
Who should win Best New Artist?

1. Artist A
2. Artist B
3. Artist C
```

The organiser also enables Q&A.

The event page displays:

```text
KENYA MUSIC AWARDS 2026

LIVE POLL

Who should win Best New Artist?

[ Artist A ]
[ Artist B ]
[ Artist C ]

ASK A QUESTION

What would you like to ask the artists?

[ Type your question ]

[ Submit Question ]

USSD PARTICIPATION

No internet?

Dial *123#
```

---

# 8. Online User Journey

## 8.1 Voting

The user visits:

```text
/polls/best-new-artist
```

They see:

```text
Who should win Best New Artist?

○ Artist A
○ Artist B
○ Artist C

[ Vote ]
```

The user selects Artist A.

The backend:

1. Validates the poll.
2. Validates the user.
3. Checks voting restrictions.
4. Records the vote.
5. Returns confirmation.

The user sees:

```text
Your vote has been recorded successfully.

Thank you for participating.
```

---

## 8.2 Asking a Question

The user sees:

```text
Ask the Artists

[ What would you like to ask? ]

[ Submit Question ]
```

They submit:

```text
What inspired your latest album?
```

The backend records:

```text
channel = ONLINE
```

The user sees:

```text
Your question has been submitted successfully.
```

The question appears in the organiser dashboard.

---

# 9. USSD User Journey

The USSD user dials:

```text
*123#
```

The system displays:

```text
Welcome to VoteBridge

1. Vote
2. Ask a Question
3. View Results
4. Exit
```

---

## 9.1 USSD Voting

User selects:

```text
1
```

The system displays:

```text
ACTIVE POLL

Best New Artist

1. Artist A
2. Artist B
3. Artist C
```

User selects:

```text
2
```

The system displays:

```text
You selected:

Artist B

1. Confirm
2. Cancel
```

User selects:

```text
1
```

The backend:

1. Validates the poll.
2. Checks the poll is active.
3. Identifies the voter.
4. Checks voting restrictions.
5. Records the vote.
6. Sends SMS confirmation.

USSD response:

```text
Vote recorded successfully.

Thank you for participating.
```

SMS:

```text
Your vote for Artist B in
"Best New Artist" has been recorded successfully.

Thank you for participating in VoteBridge.
```

---

# 10. USSD Question Submission

User dials:

```text
*123#
```

Selects:

```text
2. Ask a Question
```

System displays:

```text
Ask a Question

Please enter your question:
```

The user enters:

```text
What inspired your latest album?
```

The backend records the question.

USSD response:

```text
Your question has been submitted successfully.

Thank you.
```

SMS:

```text
Your question has been submitted successfully.

Thank you for participating in VoteBridge.
```

---

# 11. Viewing Results via USSD

The user can select:

```text
3. View Results
```

The system displays:

```text
CURRENT RESULTS

Best New Artist

1. Artist A - 45%
2. Artist B - 35%
3. Artist C - 20%

1. More
2. Back
```

Because USSD messages are limited in length, results should be paginated if necessary.

The user can optionally receive detailed results through SMS.

Example:

```text
Current results:

Artist A - 45%
Artist B - 35%
Artist C - 20%

VoteBridge
```

---

# 12. SMS Results

When a poll closes, the system can send a final SMS to eligible USSD participants.

Example:

```text
The results are in!

Artist A has won Best New Artist with 45% of the votes.

Thank you for participating in VoteBridge.
```

The SMS system should support:

- Vote confirmation
- Question confirmation
- Final results

---

# 13. Online Results

Online users can see:

```text
LIVE RESULTS

Artist A
45%
██████████████████

Artist B
35%
██████████████

Artist C
20%
████████
```

The dashboard should show the same unified result.

---

# 14. Unified Voting Model

Online and USSD votes must use the same database.

Example:

```text
ONLINE VOTES

Artist A = 6,000
Artist B = 3,000
Artist C = 1,000
```

```text
USSD VOTES

Artist A = 2,000
Artist B = 3,000
Artist C = 2,000
```

Unified:

```text
Artist A = 8,000
Artist B = 6,000
Artist C = 3,000
```

Total:

```text
17,000 votes
```

The official result is calculated from all valid votes.

---

# 15. Channel Analytics

Every interaction must record its source.

Possible channels:

```text
ONLINE
USSD
```

Future:

```text
VOICE
SMS
WHATSAPP
```

For the MVP, only:

```text
ONLINE
USSD
```

are required.

---

# 16. Audience Insights

The organiser should see:

```text
TOTAL ENGAGEMENT

Votes: 10,000
Questions: 1,250
```

Channel breakdown:

```text
ONLINE

Votes: 6,000
Questions: 900

USSD

Votes: 4,000
Questions: 350
```

---

# 17. Digital Inclusion Metric

One of VoteBridge's strongest metrics is:

> **USSD Participation Rate**

Formula:

```text
USSD Votes / Total Votes × 100
```

Example:

```text
USSD Votes = 4,000
Total Votes = 10,000

USSD Participation Rate = 40%
```

Dashboard:

```text
DIGITAL INCLUSION

40%

of all votes were submitted through USSD.
```

This communicates the impact of reaching people without internet access.

---

# 18. Online vs USSD Voting Preferences

The dashboard can compare results by channel.

Example:

```text
OVERALL

Artist A  50%
Artist B  30%
Artist C  20%
```

Online:

```text
Artist A  65%
Artist B  25%
Artist C  10%
```

USSD:

```text
Artist A  35%
Artist B  40%
Artist C  25%
```

This helps organisers understand differences in audience preferences.

---

# 19. Unified Q&A

Questions from both channels appear in the same dashboard.

Example:

```text
AUDIENCE QUESTIONS

1. What inspired your latest album?
   Source: Online

2. When are you performing in Mombasa?
   Source: USSD

3. Who is your biggest musical influence?
   Source: Online

4. Will you release a new album this year?
   Source: USSD
```

The organiser should not need to know which system the question came from unless they specifically want to inspect the source.

---

# 20. Question Moderation

Questions should have statuses:

```text
PENDING
APPROVED
REJECTED
FEATURED
ANSWERED
```

Default flow:

```text
User submits question
        ↓
PENDING
        ↓
Organiser reviews
        ↓
APPROVED
        ↓
Question appears publicly
```

The organiser can:

- Approve
- Reject
- Feature
- Mark as answered

---

# 21. Popular Questions

Online users can upvote questions.

Example:

```text
What inspired your latest album?

👍 235
```

Questions can be ranked by popularity.

The organiser dashboard displays:

```text
TOP QUESTIONS

1. What inspired your latest album?
   235 votes

2. When is your next concert?
   187 votes

3. Who is your biggest influence?
   150 votes
```

---

# 22. USSD Question Upvoting

USSD users should also be able to participate in question prioritisation.

USSD menu:

```text
1. Vote
2. Ask Question
3. View Results
4. Popular Questions
5. Exit
```

Select:

```text
4
```

Display:

```text
POPULAR QUESTIONS

1. What inspired your album?
2. When is your next concert?
3. Who is your biggest influence?

Select question:
```

User selects:

```text
1
```

System:

```text
You selected:

What inspired your album?

1. Upvote
2. Back
```

User selects:

```text
1
```

The question receives an upvote.

The backend records:

```text
channel = USSD
```

This allows online and offline audiences to help prioritise questions.

---

# 23. Q&A Voting Rules

The system should prevent repeated question upvotes.

Default:

```text
One upvote per user per question
```

For USSD:

```text
One phone number = One upvote
```

For online:

```text
One authenticated user = One upvote
```

The organiser may configure alternative rules in the future.

---

# 24. Organiser Dashboard

The dashboard should contain:

## Overview

```text
ACTIVE EVENTS
3

TOTAL VOTES
25,400

TOTAL QUESTIONS
3,200

ONLINE VOTES
15,200

USSD VOTES
10,200

USSD PARTICIPATION
40.2%
```

---

## Live Poll

Display:

```text
Best New Artist

Artist A  45%
Artist B  35%
Artist C  20%
```

---

## Channel Breakdown

```text
ONLINE
60%

USSD
40%
```

---

## Questions

Display:

```text
1,250 Questions

Pending
200

Approved
800

Featured
50

Answered
200
```

---

## Top Questions

Display questions sorted by upvotes.

---

## Analytics

Display:

- Votes over time
- Questions over time
- Online vs USSD
- USSD participation rate
- USSD completion rate
- Question engagement
- Question upvotes

---

# 25. Event Model

VoteBridge should use an Event as the top-level entity.

Example:

```text
Kenya Music Awards 2026
```

An event can contain:

- Polls
- Questions
- Q&A
- Results

Future events may have multiple polls.

Example:

```text
Kenya Music Awards 2026

Poll 1
Best New Artist

Poll 2
Best Gospel Artist

Poll 3
Best Song

Q&A
Ask the Artists
```

---

# 26. Event Page

The public event page should display:

```text
KENYA MUSIC AWARDS 2026

[ LIVE ]

--------------------------------

POLL

Who should win Best New Artist?

[ Artist A ]
[ Artist B ]
[ Artist C ]

--------------------------------

ASK A QUESTION

[ Type your question ]

[ Submit ]

--------------------------------

TOP QUESTIONS

1. What inspired your latest album?
👍 235

2. When is your next concert?
👍 187

--------------------------------

CURRENT RESULTS

Artist A 45%
Artist B 35%
Artist C 20%

--------------------------------

NO INTERNET?

Dial *123#
```

---

# 27. Event Creation

Organisers should be able to create:

```text
Event Name
Event Description
Event Image
Start Date
End Date
```

Example:

```text
Name:
Kenya Music Awards 2026

Description:
The official audience engagement platform
for the Kenya Music Awards.
```

---

# 28. Poll Creation

Each poll contains:

```text
Title
Description
Category
Start Date
End Date
Options
Voting Rule
Status
```

Example:

```text
Title:
Who should win Best New Artist?

Category:
Music

Options:
Artist A
Artist B
Artist C

Voting Rule:
One vote per user

Status:
ACTIVE
```

---

# 29. Poll Status

Possible statuses:

```text
DRAFT
SCHEDULED
ACTIVE
PAUSED
CLOSED
```

Rules:

- DRAFT polls are not public.
- SCHEDULED polls become active at the configured time.
- ACTIVE polls accept votes.
- PAUSED polls temporarily stop voting.
- CLOSED polls reject new votes.

---

# 30. Africa's Talking APIs

The MVP should use two primary Africa's Talking APIs.

## 30.1 USSD API

Purpose:

- Voting
- Question submission
- Viewing results
- Question upvoting

USSD is the primary interaction channel for users without internet access.

---

## 30.2 SMS API

Purpose:

- Vote confirmation
- Question confirmation
- Final poll results
- Optional event notifications

SMS provides feedback to users after their USSD interaction.

---

# 31. Africa's Talking Insights

Insights should be treated as an optional analytics enhancement.

The core system should not depend on Insights for vote counting.

VoteBridge's own backend is the source of truth.

The system should internally track:

- Votes
- Questions
- Question upvotes
- Channel
- Session completion
- Poll engagement

Africa's Talking Insights can supplement this with available communication and engagement data.

Possible dashboard metrics:

```text
USSD SESSIONS STARTED
USSD SESSIONS COMPLETED
USSD SESSION COMPLETION RATE
```

The system can also compare:

```text
ONLINE ENGAGEMENT
vs
USSD ENGAGEMENT
```

---

# 32. USSD Session Funnel

Track:

```text
USSD Sessions Started
10,000

Reached Voting Menu
9,500

Selected Option
9,000

Confirmed Vote
8,500
```

Calculate:

```text
Completion Rate =
Successful Votes / Started Sessions × 100
```

Display:

```text
USSD COMPLETION RATE

85%
```

This helps organisers understand whether the USSD experience is easy to use.

---

# 33. Database Design

Recommended database:

```text
PostgreSQL
```

Recommended hosted option:

```text
Supabase
```

---

## users

```text
id
name
email
phone
password_hash
role
created_at
updated_at
```

Roles:

```text
ADMIN
ORGANISER
```

---

## organisers

```text
id
user_id
organisation_name
logo_url
description
created_at
updated_at
```

---

## events

```text
id
organiser_id
name
description
image_url
start_at
end_at
status
created_at
updated_at
```

Statuses:

```text
DRAFT
SCHEDULED
LIVE
ENDED
```

---

## polls

```text
id
event_id
title
description
category
start_at
end_at
status
voting_rule
created_at
updated_at
```

---

## poll_options

```text
id
poll_id
name
description
image_url
display_order
created_at
updated_at
```

---

## votes

```text
id
poll_id
poll_option_id
channel
voter_hash
ussd_session_id
online_session_id
status
created_at
```

Channel:

```text
ONLINE
USSD
```

Status:

```text
VALID
PENDING_REVIEW
FLAGGED
INVALID
```

---

## questions

```text
id
event_id
question_text
channel
submitter_hash
status
created_at
updated_at
```

Statuses:

```text
PENDING
APPROVED
REJECTED
FEATURED
ANSWERED
```

---

## question_upvotes

```text
id
question_id
voter_hash
channel
created_at
```

Recommended unique constraint:

```text
UNIQUE(question_id, voter_hash)
```

---

## ussd_sessions

```text
id
session_id
phone_hash
event_id
current_step
status
started_at
completed_at
```

Statuses:

```text
ACTIVE
COMPLETED
CANCELLED
EXPIRED
```

---

## sms_logs

```text
id
phone_hash
message_type
message
status
provider_message_id
created_at
```

Message types:

```text
VOTE_CONFIRMATION
QUESTION_CONFIRMATION
FINAL_RESULTS
EVENT_NOTIFICATION
```

---

## analytics_events

```text
id
event_id
event_type
channel
metadata
created_at
```

Event types:

```text
EVENT_VIEW
POLL_VIEW
VOTE_STARTED
VOTE_COMPLETED
QUESTION_SUBMITTED
QUESTION_UPVOTED
USSD_SESSION_STARTED
USSD_SESSION_COMPLETED
SMS_SENT
```

---

# 34. Data Privacy

The platform should minimise personal data collection.

For USSD:

- Hash phone numbers where possible.
- Do not expose phone numbers publicly.
- Do not show phone numbers to organisers.
- Use phone hashes for duplicate detection.

Example:

```text
SHA256(phone_number + application_salt)
```

The application should not unnecessarily store raw phone numbers.

SMS sending may require the original phone number at the integration layer, but it should not be exposed through the application UI.

---

# 35. Vote Integrity

When recording a vote:

```text
1. Verify event exists.
2. Verify poll exists.
3. Verify poll is active.
4. Verify current time is within voting period.
5. Validate selected option.
6. Identify voter.
7. Check voting rules.
8. Check duplicate vote.
9. Create vote.
10. Commit transaction.
11. Record analytics event.
12. Send SMS if required.
```

If validation fails:

```text
Do not record the vote.
Return a clear error.
```

---

# 36. Duplicate Voting

For:

```text
ONE_VOTE_PER_USER
```

The database should enforce uniqueness.

For USSD:

```text
UNIQUE(poll_id, voter_hash)
```

For online:

Use:

```text
user_id
```

or:

```text
verified_phone_hash
```

depending on the authentication system.

---

# 37. Question Moderation

The system must prevent inappropriate or unwanted questions from automatically appearing publicly.

Default:

```text
PENDING
```

Organiser approves:

```text
APPROVED
```

Organiser can feature:

```text
FEATURED
```

Organiser can mark:

```text
ANSWERED
```

Rejected questions:

```text
REJECTED
```

Questions from both online and USSD must go through the same moderation workflow.

---

# 38. API Architecture

Recommended architecture:

```text
                   FRONTEND
                      │
                      ▼
                   REST API
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
   Poll Service   Vote Service   Q&A Service
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
                  DATABASE
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
  Africa's Talking          Analytics
      USSD
      SMS
```

---

# 39. REST API

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

---

## Events

```text
GET /api/events
POST /api/events
GET /api/events/:id
PUT /api/events/:id
DELETE /api/events/:id
POST /api/events/:id/publish
POST /api/events/:id/close
```

---

## Polls

```text
GET /api/events/:eventId/polls
POST /api/events/:eventId/polls
GET /api/polls/:id
PUT /api/polls/:id
DELETE /api/polls/:id
POST /api/polls/:id/publish
POST /api/polls/:id/pause
POST /api/polls/:id/close
```

---

## Voting

```text
POST /api/polls/:id/vote
```

Request:

```json
{
  "optionId": "option-uuid",
  "channel": "ONLINE"
}
```

Response:

```json
{
  "success": true,
  "message": "Vote recorded successfully."
}
```

---

## Results

```text
GET /api/polls/:id/results
```

Example response:

```json
{
  "pollId": "poll-uuid",
  "totalVotes": 10000,
  "channels": {
    "online": 6000,
    "ussd": 4000
  },
  "options": [
    {
      "id": "option-a",
      "name": "Artist A",
      "votes": 5000,
      "percentage": 50
    },
    {
      "id": "option-b",
      "name": "Artist B",
      "votes": 3000,
      "percentage": 30
    }
  ]
}
```

---

## Questions

```text
GET /api/events/:eventId/questions
POST /api/events/:eventId/questions
PUT /api/questions/:id
POST /api/questions/:id/approve
POST /api/questions/:id/reject
POST /api/questions/:id/feature
POST /api/questions/:id/answer
POST /api/questions/:id/upvote
```

---

## Analytics

```text
GET /api/events/:id/analytics
GET /api/events/:id/analytics/channels
GET /api/events/:id/analytics/trends
GET /api/events/:id/analytics/questions
GET /api/events/:id/analytics/ussd-funnel
```

---

# 40. Africa's Talking USSD Callback

The USSD callback endpoint should:

```text
POST /api/integrations/africastalking/ussd
```

The backend should:

1. Receive USSD session.
2. Identify session.
3. Identify phone number.
4. Hash phone number for identity.
5. Load session state.
6. Display menu.
7. Process user input.
8. Continue session.
9. Record vote or question.
10. Trigger SMS where appropriate.
11. End session.

---

# 41. USSD State Machine

The USSD session should follow a predictable state machine.

```text
START
  │
  ▼
MAIN_MENU
  │
  ├── VOTE
  │     │
  │     ▼
  │  SELECT_POLL
  │     │
  │     ▼
  │  SELECT_OPTION
  │     │
  │     ▼
  │  CONFIRM_VOTE
  │     │
  │     ▼
  │  RECORD_VOTE
  │     │
  │     ▼
  │  SEND_SMS
  │
  ├── ASK_QUESTION
  │     │
  │     ▼
  │  ENTER_QUESTION
  │     │
  │     ▼
  │  RECORD_QUESTION
  │     │
  │     ▼
  │  SEND_SMS
  │
  ├── VIEW_RESULTS
  │
  └── EXIT
```

---

# 42. SMS Service

Create a dedicated SMS service.

Example:

```text
sendVoteConfirmation(phone, poll, option)
sendQuestionConfirmation(phone, event)
sendFinalResults(phone, poll, results)
```

The SMS service should:

- Use Africa's Talking SMS API.
- Log every message.
- Handle failures gracefully.
- Never cause a valid vote to become invalid if SMS fails.

Important:

```text
Vote recording and SMS delivery are separate operations.
```

If the vote succeeds but SMS fails:

```text
Vote = VALID
SMS = FAILED
```

The system should retry the SMS if appropriate.

---

# 43. Final Results SMS

When a poll closes:

```text
Poll Closed
    ↓
Calculate Final Results
    ↓
Identify Eligible USSD Participants
    ↓
Send SMS Results
```

Example:

```text
The results are in!

Best New Artist:

Artist A - 45%
Artist B - 35%
Artist C - 20%

Thank you for participating in VoteBridge.
```

For the MVP, it is acceptable to send final results to a controlled test number or a limited group of participants.

For production, implement a proper notification queue.

---

# 44. Real-Time Results

For the MVP:

```text
Frontend
    ↓
GET /api/polls/:id/results
    ↓
Refresh every 5–10 seconds
```

Future:

```text
Vote Recorded
    ↓
WebSocket Event
    ↓
Connected Clients
    ↓
Instant Result Update
```

---

# 45. Technology Stack

Recommended:

## Frontend

```text
Next.js
TypeScript
Tailwind CSS
```

## Backend

Recommended:

```text
Node.js
Express
TypeScript
```

Alternative:

```text
Laravel
PHP
```

The team may choose Laravel if it is more familiar.

---

## Database

```text
PostgreSQL
```

Recommended:

```text
Supabase
```

---

## Authentication

```text
Supabase Auth
```

or:

```text
JWT
```

---

## Charts

```text
Recharts
```

---

## Deployment

Frontend:

```text
Vercel
```

Backend:

```text
Render
Railway
```

Database:

```text
Supabase
```

The deployment platform can be changed depending on the team's familiarity.

---

# 46. Environment Variables

Example:

```env
DATABASE_URL=

AFRICASTALKING_USERNAME=
AFRICASTALKING_API_KEY=

AFRICASTALKING_USSD_CODE=
AFRICASTALKING_SHORTCODE=

AFRICASTALKING_SMS_SENDER_ID=

JWT_SECRET=

NEXT_PUBLIC_API_URL=
```

Never hardcode credentials.

Never commit `.env`.

Create:

```text
.env.example
```

with placeholder values.

---

# 47. Recommended Project Structure

```text
votebridge/
│
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── polls/
│   │   ├── questions/
│   │   ├── dashboard/
│   │   └── ui/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   │   ├── voting/
│   │   ├── questions/
│   │   ├── analytics/
│   │   └── notifications/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── integrations/
│   │   └── africastalking/
│   │       ├── ussd/
│   │       └── sms/
│   └── utils/
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── docs/
│
├── .env.example
├── docker-compose.yml
└── README.md
```

---

# 48. MVP Scope

The hackathon MVP must implement:

## Required

- [ ] Organiser registration
- [ ] Organiser login
- [ ] Event creation
- [ ] Poll creation
- [ ] Poll options
- [ ] Online voting
- [ ] USSD voting
- [ ] Unified vote storage
- [ ] Duplicate vote prevention
- [ ] Online results
- [ ] USSD result viewing
- [ ] Online question submission
- [ ] USSD question submission
- [ ] Question moderation
- [ ] Question upvoting online
- [ ] Question upvoting via USSD
- [ ] SMS vote confirmation
- [ ] SMS question confirmation
- [ ] Organiser dashboard
- [ ] Online vs USSD analytics

---

# 49. Optional MVP Features

If time allows:

- [ ] SMS final results
- [ ] USSD result SMS
- [ ] Live result updates
- [ ] USSD session funnel
- [ ] Africa's Talking Insights integration
- [ ] Question search
- [ ] Question filtering
- [ ] Event branding
- [ ] Poll scheduling

---

# 50. Do Not Build for Initial Hackathon MVP

Do not prioritise:

- AI/ML
- Voice voting
- Airtime rewards
- Data rewards
- WhatsApp integration
- Complex recommendation engines
- Advanced fraud detection
- Multi-country support
- Complex billing
- Full SaaS subscription system

These can be future features.

The MVP should prove the core idea:

```text
ONLINE
   +
USSD
   ↓
UNIFIED VOTING
   +
UNIFIED Q&A
   ↓
SMS COMMUNICATION
   ↓
ORGANISER INSIGHTS
```

---

# 51. Hackathon Demo Scenario

Use a fictional event:

```text
Kenya Music Awards 2026
```

Create:

```text
Poll:
Who is Kenya's Favourite Emerging Artist?

Options:
Artist A
Artist B
Artist C
```

Enable:

```text
Q&A:
Ask the Artists
```

---

## Demo 1 — Online User

Vote:

```text
Artist A
```

Submit:

```text
What inspired your latest album?
```

---

## Demo 2 — USSD User

Dial:

```text
*123#
```

Vote:

```text
Artist B
```

Submit:

```text
When is your next concert?
```

The backend now contains:

```text
Votes:
Artist A - 1 Online
Artist B - 1 USSD

Questions:
What inspired your latest album? - Online
When is your next concert? - USSD
```

---

## Demo 3 — Dashboard

Show:

```text
TOTAL VOTES
2

ONLINE
1

USSD
1

TOTAL QUESTIONS
2

ONLINE QUESTIONS
1

USSD QUESTIONS
1
```

---

## Demo 4 — SMS

Show the USSD user's phone receiving:

```text
Your vote for Artist B has been recorded successfully.

Thank you for participating in VoteBridge.
```

---

## Demo 5 — Unified Results

Dashboard:

```text
Artist A
50%

Artist B
50%
```

Explain:

> "The online voter and the USSD voter are participating in the same poll. Neither audience is excluded from the final result."

---

# 52. Hackathon Pitch

## Problem

> Traditional online engagement excludes people without reliable internet access. USSD systems can reach feature phones but often exist separately from modern online experiences.

## Solution

> VoteBridge combines online and USSD participation into one unified audience engagement platform.

> Audiences can vote and ask questions whether they are online or using a basic feature phone.

> Organisers see everything in one dashboard.

> USSD participants receive confirmations and results through SMS.

---

# 53. 30-Second Pitch

> **VoteBridge is a unified audience engagement platform built for sports, music, and entertainment.**
>
> Imagine you're watching a music awards show. If you have internet, you can vote and ask questions online. If you only have a basic phone, you can dial a USSD code and do the exact same thing.
>
> Both audiences participate in the same poll, their questions appear in the same dashboard, and USSD users receive confirmations and results through SMS.
>
> We use Africa's Talking USSD and SMS APIs to make sure that access to the internet doesn't determine whether your voice is heard.

---

# 54. Key Innovation

The product should NOT be positioned as:

> "An online polling platform with USSD."

Instead position it as:

> **"A unified audience engagement platform that connects online and offline audiences."**

The innovation is:

```text
           ONLINE AUDIENCE
                  │
                  ▼
             ┌─────────┐
             │         │
             │ UNIFIED │
             │ AUDIENCE│
             │         │
             └─────────┘
                  ▲
                  │
           USSD AUDIENCE
```

Everyone gets access to:

- Voting
- Questions
- Results
- Participation

---

# 55. Future Expansion

## Voice

Users could call and vote.

```text
Call
 ↓
Voice Prompt
 ↓
Press 1
 ↓
Vote Recorded
```

---

## Airtime Rewards

Users could receive rewards after voting.

```text
Vote
 ↓
Random Selection
 ↓
Airtime Reward
```

---

## Data Rewards

Reward users with mobile data.

---

## WhatsApp

Users could participate through WhatsApp.

---

## AI/ML

Potential future applications:

- Fraud detection
- Audience segmentation
- Question classification
- Automatic question moderation
- Question clustering
- Sentiment analysis
- Audience preference prediction

AI should only be added when it solves a genuine product problem.

---

# 56. Long-Term Product Vision

VoteBridge should evolve into a multi-channel audience engagement platform.

```text
                 VOTEBRIDGE

       ┌──────────┬───────────┬──────────┐
       │          │           │          │
     WEB        USSD         SMS       VOICE
       │          │           │          │
       └──────────┴───────────┴──────────┘
                    │
                    ▼
             UNIFIED AUDIENCE
                    │
          ┌─────────┴─────────┐
          │                   │
        VOTING               Q&A
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
            ORGANISER DASHBOARD
                    │
                    ▼
             AUDIENCE INSIGHTS
```

The long-term goal is:

> **Every audience member should have a way to participate, regardless of their device, connectivity, or access to the internet.**

---

# 57. Product Tagline

Primary:

> **One Audience. Every Channel.**

Alternative:

> **One Event. Every Voice.**

Alternative:

> **Everyone Can Participate.**

Alternative:

> **Your Audience, Connected.**

Recommended:

# VoteBridge

## One Audience. Every Channel.

---

# 58. Cursor Implementation Instructions

When implementing this project, follow these rules:

1. Build the MVP before adding advanced features.
2. Prioritise online and USSD voting.
3. Prioritise online and USSD question submission.
4. Use Africa's Talking USSD API for USSD interaction.
5. Use Africa's Talking SMS API for notifications.
6. Keep online and USSD votes in the same `votes` table.
7. Keep online and USSD questions in the same `questions` table.
8. Always record the interaction channel.
9. Use the backend database as the source of truth.
10. Do not use Africa's Talking Insights as the source of truth for vote counts.
11. Ensure voting rules apply consistently across online and USSD.
12. Validate poll status before accepting votes.
13. Use database transactions when recording votes.
14. Prevent duplicate votes according to the configured voting rule.
15. Hash phone numbers for voter identity where appropriate.
16. Never expose voter phone numbers to organisers.
17. Keep all API credentials in environment variables.
18. Never commit secrets to Git.
19. Keep USSD flows short and easy to navigate.
20. Make the public event page mobile-first.
21. Make the organiser dashboard responsive.
22. Handle Africa's Talking API failures gracefully.
23. A successful vote must remain valid even if SMS delivery fails.
24. Log SMS delivery failures for retry or review.
25. Moderate questions before displaying them publicly.
26. Allow both online and USSD users to participate in question prioritisation.
27. Display unified results while preserving channel-level analytics.
28. Clearly show the percentage of participation coming through USSD.
29. Keep the code modular so Voice and other channels can be added later.
30. Do not implement AI/ML unless explicitly requested.
31. Do not implement Voice voting unless explicitly requested.
32. Do not implement Airtime rewards unless explicitly requested.
33. Build clean reusable components.
34. Add loading, error, and empty states.
35. Validate all API inputs.
36. Implement authentication and role-based access control.
37. Use secure password hashing.
38. Implement rate limiting on public APIs.
39. Add proper database indexes for frequently queried fields.
40. Write clear setup and deployment documentation.

---

# 59. Definition of Done

The MVP is complete when the following end-to-end flow works:

```text
ORGANISER
    │
    ▼
Creates Event
    │
    ▼
Creates Poll
    │
    ▼
Publishes Event
    │
    ├────────────────────────────┐
    │                            │
    ▼                            ▼
ONLINE USER                  USSD USER
    │                            │
    ▼                            ▼
Votes Online                 Dials *123#
    │                            │
    │                            ▼
    │                         Votes
    │                            │
    └────────────┬───────────────┘
                 │
                 ▼
           UNIFIED DATABASE
                 │
                 ▼
           UNIFIED RESULTS
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   ONLINE RESULTS     SMS RESULT
        │                 │
        └────────┬────────┘
                 │
                 ▼
          ORGANISER DASHBOARD
```

The following Q&A flow must also work:

```text
ONLINE USER                  USSD USER
    │                            │
    ▼                            ▼
Ask Question                 Dial *123#
    │                            │
    │                            ▼
    │                       Ask Question
    │                            │
    └────────────┬───────────────┘
                 │
                 ▼
          UNIFIED QUESTIONS
                 │
                 ▼
          ORGANISER MODERATION
                 │
                 ▼
         APPROVED QUESTIONS
                 │
                 ▼
          QUESTION UPVOTES
                 │
        ┌────────┴────────┐
        │                 │
      ONLINE             USSD
        │                 │
        └────────┬────────┘
                 │
                 ▼
          POPULAR QUESTIONS
```

---

# 60. Final Product Definition

VoteBridge is a **unified, multi-channel audience engagement platform**.

It allows:

### Online users to:

- Vote
- Ask questions
- View results
- Upvote questions

### USSD users to:

- Vote
- Ask questions
- View results
- Upvote questions

### USSD users receive:

- Vote confirmations via SMS
- Question confirmations via SMS
- Final results via SMS

### Organisers receive:

- Unified votes
- Unified questions
- Live results
- Online vs USSD analytics
- Digital inclusion metrics
- Question moderation
- Popular question rankings

The core technology stack for the hackathon is:

```text
WEB
+
AFRICA'S TALKING USSD
+
AFRICA'S TALKING SMS
+
UNIFIED BACKEND
+
DATABASE
+
ORGANISER DASHBOARD
```

The core idea is:

> **People shouldn't need a smartphone or internet connection to have a voice in the events they care about.**

# VoteBridge

## One Audience. Every Channel.
