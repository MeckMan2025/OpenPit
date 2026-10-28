# OpenPit

An online mentor for FIRST Tech Challenge teams that can't find one: teams starting with no coach, no budget and no team nearby.

Run by students of FTC Team 7196, Everything That's Radical (Bettendorf, Iowa). Not affiliated with FIRST.

## What's in it

- **AI Mentor** — ask anything about programming, build or business; answers via a Supabase edge function (`op-mentor`) that calls Claude.
- **Mentors** — the directory (`src/data/mentors.js`) and a question form that writes to `op_questions`.
- **Monthly Review** — request a video review; writes to `op_meeting_requests`.
- **Translate** — paste manual text, get it in your language (same edge function, `mode: 'translate'`).
- **Learn** — tutorial tracks (`src/data/tutorials.js`) and the first-weeks checklist.
- **Fund a Team** — cost breakdown (`src/data/costs.js`) and the fundraiser link.
- **Roadmap** — the season plan (`src/data/roadmap.js`).

## Run it

```
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in the Supabase URL and anon key. The AI pages need the `ANTHROPIC_API_KEY` secret set on the Supabase project for the `op-mentor` function.

## Deploy

`npm run build` makes `dist/`. `base: './'` in `vite.config.js` means it works from GitHub Pages or any static host. Routes use the hash (`/#/mentor`) so no server rewrites are needed.
