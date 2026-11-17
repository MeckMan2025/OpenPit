-- OpenPit phase 1: mentorship requests ask for the challenge and what the team
-- already tried, a personal name is no longer required, and one table holds
-- feedback (on AI answers and on the site). Anyone may insert; nobody can read
-- through the API. Read them in the Supabase dashboard.
alter table public.op_meeting_requests alter column contact drop not null;
alter table public.op_meeting_requests add column if not exists challenge text;
alter table public.op_meeting_requests add column if not exists attempted text;
alter table public.op_meeting_requests add column if not exists adult_aware boolean not null default false;
drop policy if exists op_meetings_insert on public.op_meeting_requests;
create policy op_meetings_insert on public.op_meeting_requests for insert to anon, authenticated with check (
  length(email) between 5 and 200 and length(team) between 1 and 200
  and (challenge is null or length(challenge) between 10 and 4000)
  and (attempted is null or length(attempted) <= 4000)
);

create table if not exists public.op_feedback (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  kind        text not null check (kind in ('chat', 'site')),
  helpful     boolean,                                   -- chat: was this response helpful?
  resolved    text check (resolved in ('fully', 'partially', 'not', 'not_tried')),
  rating      smallint check (rating between 1 and 5),   -- site: how useful is OpenPit?
  message     text check (length(message) <= 2000),
  team        text check (length(team) <= 200)
);
alter table public.op_feedback enable row level security;
drop policy if exists op_feedback_insert on public.op_feedback;
create policy op_feedback_insert on public.op_feedback for insert to anon, authenticated with check (true);
revoke all on public.op_feedback from anon, authenticated;
grant insert on public.op_feedback to anon, authenticated;
-- no select policy: feedback is read in the dashboard only.
