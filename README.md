# OpenPit

An online mentor for FIRST Tech Challenge teams that can't find one: teams starting with no coach, no budget and no team nearby.

Run by students of FTC Team 7196, Everything That's Radical (Bettendorf, Iowa). Not affiliated with FIRST.

## What's in it

- **Home** — what the program does, how it works, and the six-month goals (labelled as goals, not results).
- **AI Mentorship** — a coaching chat through the `op-mentor` edge function, which calls Claude. Two feedback questions under every answer go to `op_feedback`. The page asks the function whether it's switched on and says "prototype" when it isn't.
- **Find a Mentor** — a mentorship request form (writes to `op_meeting_requests`). No mentors are listed until `MENTORS_CONFIRMED` in `src/data/program.js` is true.
- **Learning Resources** — the library in `src/data/resources.js`, with search and filters. Add a resource there; check the link loads and say who publishes it.
- **Team Dashboard** — phase 2; the page says what's coming.
- **About** — who we are, how the goals are measured, privacy, and a site feedback form (`op_feedback`).
- Also kept: **Translate**, **Fund a Team** and **Roadmap** (linked from the footer and About).

Database setup: run `supabase/openpit.sql`, then `supabase/openpit_phase1.sql`. Read requests and feedback in the Supabase dashboard; the public can only insert.

## Run it

```
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in the Supabase URL and anon key. The AI pages need the `ANTHROPIC_API_KEY` secret set on the Supabase project for the `op-mentor` function.

## Deploy

`npm run build` makes `dist/`. `base: './'` in `vite.config.js` means it works from GitHub Pages or any static host. Routes use the hash (`/#/mentor`) so no server rewrites are needed.
