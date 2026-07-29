-- VoteBridge schema — run in Supabase SQL Editor

create extension if not exists "pgcrypto";

-- Profiles (organisers)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organisation_name text not null default 'My Organisation',
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  organiser_id uuid references profiles(id) on delete set null,
  name text not null,
  description text default '',
  slug text not null unique,
  status text not null default 'LIVE' check (status in ('DRAFT','SCHEDULED','LIVE','ENDED')),
  ussd_code text default '*384*123#',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists polls (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  title text not null,
  description text default '',
  status text not null default 'ACTIVE' check (status in ('DRAFT','SCHEDULED','ACTIVE','PAUSED','CLOSED')),
  voting_rule text not null default 'ONE_VOTE_PER_USER',
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls(id) on delete cascade,
  name text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls(id) on delete cascade,
  poll_option_id uuid not null references poll_options(id) on delete cascade,
  channel text not null check (channel in ('ONLINE','USSD')),
  voter_hash text not null,
  ussd_session_id text,
  status text not null default 'VALID' check (status in ('VALID','PENDING_REVIEW','FLAGGED','INVALID')),
  created_at timestamptz not null default now(),
  unique (poll_id, voter_hash)
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  question_text text not null,
  channel text not null check (channel in ('ONLINE','USSD')),
  submitter_hash text not null,
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED','FEATURED','ANSWERED')),
  upvote_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists question_upvotes (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions(id) on delete cascade,
  voter_hash text not null,
  channel text not null check (channel in ('ONLINE','USSD')),
  created_at timestamptz not null default now(),
  unique (question_id, voter_hash)
);

create table if not exists ussd_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  phone_hash text not null,
  phone_e164 text,
  event_id uuid references events(id) on delete set null,
  current_step text not null default 'MAIN_MENU',
  context jsonb not null default '{}'::jsonb,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','COMPLETED','CANCELLED','EXPIRED')),
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists sms_logs (
  id uuid primary key default gen_random_uuid(),
  phone_hash text not null,
  message_type text not null,
  message text not null,
  status text not null default 'PENDING',
  provider_message_id text,
  created_at timestamptz not null default now()
);

create index if not exists idx_events_organiser on events(organiser_id);
create index if not exists idx_polls_event on polls(event_id);
create index if not exists idx_votes_poll on votes(poll_id);
create index if not exists idx_votes_channel on votes(poll_id, channel);
create index if not exists idx_questions_event on questions(event_id);
create index if not exists idx_ussd_session on ussd_sessions(session_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, organisation_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'organisation_name', 'My Organisation')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table profiles enable row level security;
alter table events enable row level security;
alter table polls enable row level security;
alter table poll_options enable row level security;
alter table votes enable row level security;
alter table questions enable row level security;
alter table question_upvotes enable row level security;
alter table ussd_sessions enable row level security;
alter table sms_logs enable row level security;

-- Profiles
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- Events: organisers manage own; public can read LIVE
create policy "events_select_public_or_own" on events for select using (
  status = 'LIVE' or organiser_id = auth.uid()
);
create policy "events_insert_own" on events for insert with check (organiser_id = auth.uid());
create policy "events_update_own" on events for update using (organiser_id = auth.uid());
create policy "events_delete_own" on events for delete using (organiser_id = auth.uid());

-- Polls: public read ACTIVE; organiser manage via event ownership
create policy "polls_select_public_or_own" on polls for select using (
  status in ('ACTIVE','CLOSED','PAUSED')
  or exists (select 1 from events e where e.id = event_id and e.organiser_id = auth.uid())
);
create policy "polls_insert_own" on polls for insert with check (
  exists (select 1 from events e where e.id = event_id and e.organiser_id = auth.uid())
);
create policy "polls_update_own" on polls for update using (
  exists (select 1 from events e where e.id = event_id and e.organiser_id = auth.uid())
);
create policy "polls_delete_own" on polls for delete using (
  exists (select 1 from events e where e.id = event_id and e.organiser_id = auth.uid())
);

-- Poll options: public read; organiser write
create policy "options_select_all" on poll_options for select using (true);
create policy "options_insert_own" on poll_options for insert with check (
  exists (
    select 1 from polls p
    join events e on e.id = p.event_id
    where p.id = poll_id and e.organiser_id = auth.uid()
  )
);
create policy "options_delete_own" on poll_options for delete using (
  exists (
    select 1 from polls p
    join events e on e.id = p.event_id
    where p.id = poll_id and e.organiser_id = auth.uid()
  )
);

-- Votes: anyone can insert (API validates); public aggregate read via API with service role preferred
create policy "votes_select_all" on votes for select using (true);
create policy "votes_insert_anon" on votes for insert with check (true);

-- Questions
create policy "questions_select_approved_or_own" on questions for select using (
  status in ('APPROVED','FEATURED','ANSWERED')
  or exists (select 1 from events e where e.id = event_id and e.organiser_id = auth.uid())
);
create policy "questions_insert_anon" on questions for insert with check (true);
create policy "questions_update_own" on questions for update using (
  exists (select 1 from events e where e.id = event_id and e.organiser_id = auth.uid())
);

create policy "upvotes_select_all" on question_upvotes for select using (true);
create policy "upvotes_insert_anon" on question_upvotes for insert with check (true);

-- USSD/SMS: service role only in production; allow for MVP demo with anon for server routes using service key
create policy "ussd_all_service" on ussd_sessions for all using (true) with check (true);
create policy "sms_all_service" on sms_logs for all using (true) with check (true);
