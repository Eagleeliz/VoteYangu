-- Run this in Supabase SQL Editor (auth removed for MVP demo)

alter table events
  alter column organiser_id drop not null;

-- Allow public read of all events / questions for open dashboard
drop policy if exists "events_select_public_or_own" on events;
create policy "events_select_all" on events for select using (true);

drop policy if exists "questions_select_approved_or_own" on questions;
create policy "questions_select_all" on questions for select using (true);

drop policy if exists "polls_select_public_or_own" on polls;
create policy "polls_select_all" on polls for select using (true);
