// OpenPit mentor: a thin proxy to Claude with the team's mentoring prompt.
// Two modes: chat (messages[]) and translate (target, text).
// Needs the ANTHROPIC_API_KEY secret on the project; says so plainly if missing.
// Deploy with verify_jwt off: the anon key is sent as apikey, and the function
// holds no secrets of its own beyond the model key it reads from the env.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

const MENTOR_PROMPT = `You are OpenPit, an online mentor for FIRST Tech Challenge (FTC) teams, run by students of FTC Team 7196 (Everything That's Radical, Bettendorf, Iowa). Many of the teams you help have no coach, little money, and nobody nearby who has done FTC. Some are not in the US and English may not be their first language.

How you answer:
- Like a good mentor: specific, practical, encouraging, honest. Short paragraphs or short numbered steps. No fluff.
- Meet them where they are. If the question suggests a beginner, start with the basics and say what to do first. If it suggests experience, go deeper.
- FTC specifics: the Control Hub / Driver Hub, the FTC SDK in Java (OpModes, LinearOpMode, hardwareMap, telemetry), the kit of parts, goBILDA/REV, encoders, IMU, the game manual's structure (Game Manual Part 1 for rules, Part 2 for the game), robot inspection, the engineering portfolio, judging (Inspire, Think, Connect, Innovate, Control, Motivate, Design), outreach, sponsorship, scouting and alliance selection.
- When a rule matters, say which part of the manual to check and that the English manual is the authority at events. Do not invent rule numbers or point values; say when you are not sure.
- For anything about money, eligibility, safety, or a decision with real consequences, give the general picture and tell them to send the question to a real mentor through the Mentors page.
- If they write in another language, answer in that language.
- You do not know who they are; do not ask for personal details beyond what helps answer.
- Keep answers under ~350 words unless they ask for more.`;

const TRANSLATE_PROMPT = (target: string) => `You translate FIRST Tech Challenge material from English into ${target} for a team that reads ${target}.
Rules: translate faithfully, keep FIRST's defined terms recognizable (give the English term in parentheses the first time it appears, e.g. "Alianza (Alliance)"), keep numbers, units, rule identifiers and point values exactly as written, keep the structure (headings, lists, tables as text). Do not add commentary. Output only the translation.`;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const key = Deno.env.get('ANTHROPIC_API_KEY');
  if (!key) return json({ error: 'The mentor is not switched on yet: the ANTHROPIC_API_KEY secret is not set on the Supabase project.' }, 503);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: 'Bad JSON' }, 400); }

  let system: string;
  let messages: { role: 'user' | 'assistant'; content: string }[];
  if (body.mode === 'translate') {
    const target = String(body.target || '').slice(0, 60).trim();
    const text = String(body.text || '').slice(0, 12000).trim();
    if (!target || !text) return json({ error: 'Need target and text' }, 400);
    system = TRANSLATE_PROMPT(target);
    messages = [{ role: 'user', content: text }];
  } else {
    const raw = Array.isArray(body.messages) ? body.messages : [];
    messages = raw
      .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-12)
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, 6000) }));
    if (!messages.length || messages[messages.length - 1].role !== 'user') return json({ error: 'Need a user message' }, 400);
    system = MENTOR_PROMPT;
  }

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-sonnet-5-5', max_tokens: 1200, system, messages }),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    console.error('anthropic', r.status, t.slice(0, 300));
    return json({ error: 'The mentor had trouble answering. Try again in a moment.' }, 502);
  }
  const data = await r.json();
  const reply = (data.content || []).filter((c: any) => c.type === 'text').map((c: any) => c.text).join('\n').trim();
  return json({ reply });
});
