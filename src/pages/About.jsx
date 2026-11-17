import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Send, Star } from 'lucide-react'
import { GOALS, AI_TARGETS } from '../data/program'
import { sendFeedback } from '../lib/supabase'
import PageHead from '../components/PageHead'
import Notice from '../components/Notice'

const BARRIERS = [
  { emoji: '💸', title: 'It costs too much', text: 'A first season runs a few thousand dollars before anyone has built anything.' },
  { emoji: '🧑‍🏫', title: 'There is no mentor', text: 'Nobody nearby has done FTC. The students and adults are willing, and nobody knows what to do on Tuesday.' },
  { emoji: '🗺️', title: 'Everything is far away', text: 'The nearest event, the nearest team, the parts, the manual in a language you read. Distance stacks up.' },
]

const PRIVACY = [
  'Teams, not people: we ask for a team name and one contact email, never students\' names, ages or photos.',
  'Requests and feedback are private. Only our team can read them; nothing is shown publicly.',
  'AI chats are not saved. The AI service has no keys or secrets in this website\'s code.',
  'An adult from your team is part of every mentoring session.',
]

function SiteFeedback() {
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [team, setTeam] = useState('')
  const [s, setS] = useState({ busy: false, done: false, error: '' })
  const submit = async (e) => {
    e.preventDefault()
    if (!rating && !message.trim()) return setS({ busy: false, done: false, error: 'Pick a rating or write something first.' })
    setS({ busy: true, done: false, error: '' })
    try {
      await sendFeedback({ kind: 'site', rating: rating || null, message: message.trim() || null, team: team.trim() || null })
      setS({ busy: false, done: true, error: '' })
      setRating(0); setMessage(''); setTeam('')
    } catch (err) {
      setS({ busy: false, done: false, error: err.message || 'Something went wrong.' })
    }
  }
  return (
    <form id="feedback" onSubmit={submit} className="card scroll-mt-24 space-y-4 p-5">
      <div>
        <h2 className="text-lg font-extrabold">Tell us how we're doing</h2>
        <p className="mt-1 text-sm text-ink-600">What helped, what didn't, what you wish was here. We read every one.</p>
      </div>
      <fieldset>
        <legend className="label">How useful is OpenPit to your team?</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} of 5`} aria-pressed={rating === n} className="rounded-lg p-1 hover:bg-honey-50">
              <Star size={26} className={n <= rating ? 'fill-honey-400 text-honey-500' : 'text-ink-300'} aria-hidden="true" />
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="label">Comments or ideas</span>
        <textarea className="input min-h-[100px]" maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="A resource we should add, something that was confusing…" />
      </label>
      <label className="block">
        <span className="label">Team name or number (optional)</span>
        <input className="input" maxLength={200} value={team} onChange={(e) => setTeam(e.target.value)} />
      </label>
      {s.error && <Notice kind="warn">{s.error}</Notice>}
      {s.done && <Notice>Thanks! Your feedback was sent.</Notice>}
      <button className="btn-primary" disabled={s.busy}><Send size={16} aria-hidden="true" /> {s.busy ? 'Sending…' : 'Send feedback'}</button>
    </form>
  )
}

export default function About() {
  return (
    <div className="space-y-12">
      <PageHead eyebrow="About Our Program" title="Students helping FTC teams grow.">
        We are FTC Team 7196, Everything That's Radical, from Pleasant Valley High School in Iowa. This year we started and mentored a brand-new team,
        38350 Prime Suspects, and built the team-management app both teams run on. OpenPit is the same idea pointed outward:
        the help we gave one team, available to any team, anywhere.
      </PageHead>

      <section aria-labelledby="why">
        <h2 id="why" className="section-title">Why teams struggle</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {BARRIERS.map((b) => (
            <div key={b.title} className="card p-5">
              <span className="text-2xl" aria-hidden="true">{b.emoji}</span>
              <p className="mt-2 font-bold">{b.title}</p>
              <p className="mt-1 text-sm text-ink-600 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="measure" className="card p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="measure" className="section-title">What we're aiming for, and how we'll know</h2>
          <span className="rounded-full border border-honey-300 px-3 py-1 text-xs font-bold text-ink-600">Goals, not results yet</span>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Six-month program goals</p>
            <ul className="space-y-2 text-sm">
              {GOALS.map((g) => <li key={g.label} className="flex gap-3"><span className="w-14 shrink-0 font-black text-honey-600">{g.value}</span><span className="text-ink-600">{g.label}</span></li>)}
            </ul>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">
              Skill growth is measured with the same assessment at the start and after six months: improvement is the final score minus the first.
              For teams that start above 75 out of 100, we also report how much of their remaining room they closed, so strong teams are judged fairly.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">AI mentor targets</p>
            <ul className="space-y-2 text-sm">
              {AI_TARGETS.map(([v, t]) => <li key={t} className="flex gap-3"><span className="w-14 shrink-0 font-black text-honey-600">{v}</span><span className="text-ink-600">{t}</span></li>)}
            </ul>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">
              Measured from the two questions under every AI answer, and from a sample of answers our team checks for accuracy.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section aria-labelledby="privacy" className="card p-6">
          <h2 id="privacy" className="text-lg font-extrabold">Privacy and safety</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-600 leading-relaxed">
            {PRIVACY.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <Link to="/roadmap" className="btn-ghost justify-between whitespace-normal text-left">Our plan for the season <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link to="/fund" className="btn-ghost justify-between whitespace-normal text-left">What a team costs, and the starter fund <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>
        <SiteFeedback />
      </div>
    </div>
  )
}
