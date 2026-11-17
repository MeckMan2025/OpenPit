import { useState } from 'react'
import { Send, Clock, Inbox, ShieldCheck } from 'lucide-react'
import { MENTOR_CATEGORIES, MENTORS_CONFIRMED } from '../data/program'
import { MENTORS, AREAS } from '../data/mentors'
import { supabase } from '../lib/supabase'
import PageHead from '../components/PageHead'
import Avatar from '../components/Avatar'
import Notice from '../components/Notice'

const TIMES = ['Weekday afternoons', 'Weekday evenings', 'Saturday', 'Sunday']
const EMPTY = { team: '', country: '', category: '', challenge: '', attempted: '', times: [], timeNote: '', email: '', adult: false }

const STEPS = [
  [Inbox, 'We read every request', 'A student on our team reads it and replies by email within about a week.'],
  [Clock, 'About 20 minutes', 'One focused video session on your challenge, with a mentor who knows that area.'],
  [ShieldCheck, 'An adult joins', 'A coach or other adult from your team should be on the call. We never meet students alone.'],
]

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-500">{hint}</span>}
    </label>
  )
}

export default function Mentors() {
  const [f, setF] = useState(EMPTY)
  const [s, setS] = useState({ busy: false, done: false, error: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const toggle = (t) => setF({ ...f, times: f.times.includes(t) ? f.times.filter((x) => x !== t) : [...f.times, t] })

  const submit = async (e) => {
    e.preventDefault()
    if (!f.category) return setS({ busy: false, done: false, error: 'Pick what you need help with.' })
    setS({ busy: true, done: false, error: '' })
    try {
      if (!supabase) throw new Error('Not connected yet.')
      const { error } = await supabase.from('op_meeting_requests').insert({
        team: f.team.trim(), country: f.country.trim(), email: f.email.trim(),
        topic: f.category, challenge: f.challenge.trim(), attempted: f.attempted.trim() || null,
        times: f.times, notes: f.timeNote.trim() || null, adult_aware: f.adult,
      })
      if (error) throw error
      setS({ busy: false, done: true, error: '' })
      setF(EMPTY)
    } catch (err) {
      setS({ busy: false, done: false, error: err.message || 'Something went wrong. Try again.' })
    }
  }

  return (
    <div>
      <PageHead eyebrow="Find a Mentor" title="Get time with a person who has done it.">
        Tell us what your team is stuck on and we'll set up a 20-minute session with someone who knows that area.
        We're recruiting mentors now, so for the moment this is a request form: every request helps us find the right people first.
      </PageHead>

      {MENTORS_CONFIRMED && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MENTORS.map((m) => (
            <div key={m.id} className="card flex gap-3 p-4">
              <Avatar name={m.name} photo={m.photo} />
              <div className="min-w-0">
                <p className="font-bold">{m.name}</p>
                <div className="mt-1 flex flex-wrap gap-1">{m.areas.map((a) => <span key={a} className="tag">{AREAS[a].name}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          {STEPS.map(([Icon, t, d]) => (
            <div key={t} className="card flex gap-3 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey-100 text-honey-600"><Icon size={20} aria-hidden="true" /></div>
              <div><p className="font-bold">{t}</p><p className="text-sm text-ink-600 leading-relaxed">{d}</p></div>
            </div>
          ))}
          <p className="px-1 text-xs text-ink-500 leading-relaxed">
            We only ask for what we need to help. Please don't include students' full names, ages or phone numbers.
            Requests are private: only our team can read them.
          </p>
        </div>

        <form onSubmit={submit} className="card space-y-4 p-5 lg:col-span-2" aria-labelledby="req-title">
          <h2 id="req-title" className="text-lg font-extrabold">Request mentorship</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Team name or number"><input className="input" required maxLength={200} value={f.team} onChange={set('team')} placeholder="e.g. 12345, or a new team" /></Field>
            <Field label="Country" hint="So we pick a time that works in your time zone."><input className="input" required maxLength={100} value={f.country} onChange={set('country')} /></Field>
          </div>
          <fieldset>
            <legend className="label">What do you need help with?</legend>
            <div className="flex flex-wrap gap-2">
              {MENTOR_CATEGORIES.map((c) => (
                <button type="button" key={c.id} aria-pressed={f.category === c.id} onClick={() => setF({ ...f, category: c.id })}
                  className={`chip ${f.category === c.id ? 'chip-on' : ''}`}>{c.emoji} {c.name}</button>
              ))}
            </div>
          </fieldset>
          <Field label="Describe the challenge" hint="What's happening, and what you want to happen instead.">
            <textarea className="input min-h-[110px]" required minLength={10} maxLength={4000} value={f.challenge} onChange={set('challenge')} />
          </Field>
          <Field label="What has your team already tried?" hint="Optional, but it helps the mentor skip what you've ruled out.">
            <textarea className="input min-h-[80px]" maxLength={4000} value={f.attempted} onChange={set('attempted')} />
          </Field>
          <fieldset>
            <legend className="label">When is your team usually free?</legend>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((t) => (
                <button type="button" key={t} aria-pressed={f.times.includes(t)} onClick={() => toggle(t)} className={`chip ${f.times.includes(t) ? 'chip-on' : ''}`}>{t}</button>
              ))}
            </div>
            <input className="input mt-2" maxLength={300} value={f.timeNote} onChange={set('timeNote')} placeholder="Times and time zone, e.g. Tue/Thu 4–6 pm, GMT+3" aria-label="Times and time zone" />
          </fieldset>
          <Field label="Email for our reply" hint="A coach's or team email is best.">
            <input className="input" type="email" required maxLength={200} value={f.email} onChange={set('email')} />
          </Field>
          <label className="flex items-start gap-2 text-sm text-ink-600">
            <input type="checkbox" required checked={f.adult} onChange={set('adult')} className="mt-1 h-4 w-4 accent-honey-500" />
            <span>An adult coach or mentor on our team knows about this request and can join the session.</span>
          </label>
          {s.error && <Notice kind="warn">{s.error}</Notice>}
          {s.done && <Notice>Request received. We'll reply by email, usually within a week.</Notice>}
          <button className="btn-primary" disabled={s.busy}><Send size={16} aria-hidden="true" /> {s.busy ? 'Sending…' : 'Send request'}</button>
        </form>
      </div>
    </div>
  )
}
