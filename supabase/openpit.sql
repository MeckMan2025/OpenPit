-- OpenPit: questions to mentors and monthly review requests.
-- Anyone may submit (anon insert); only the service role / dashboard reads them.
create table if not exists public.op_questions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  mentor_id   text,
  team        text,
  email       text not null,
  area        text not null,
  question    text not null,
  status      text not null default 'new',   -- new / answered / closed
  answered_by text,
  answered_at timestamptz
);
create table if not exists public.op_meeting_requests (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  team        text not null,
  contact     text not null,
  email       text not null,
  country     text,
  topic       text not null,
  times       text[] not null default '{}',
  notes       text,
  status      text not null default 'new',   -- new / scheduled / done / declined
  scheduled_for timestamptz,
  mentor_id   text
);
alter table public.op_questions enable row level security;
alter table public.op_meeting_requests enable row level security;
drop policy if exists op_questions_insert on public.op_questions;
create policy op_questions_insert on public.op_questions for insert to anon, authenticated with check (
  length(email) between 5 and 200 and length(question) between 5 and 4000
);
drop policy if exists op_meetings_insert on public.op_meeting_requests;
create policy op_meetings_insert on public.op_meeting_requests for insert to anon, authenticated with check (
  length(email) between 5 and 200 and length(team) between 1 and 200
);
-- no select policy: the public cannot read anyone else's questions.
