import { useState } from 'react'
import { CalendarClock, Video, ClipboardList } from 'lucide-react'
import { supabase } from '../lib/supabase'
import PageHead from '../components/PageHead'
import Notice from '../components/Notice'

const TOPICS = ['Robot design review', 'Code review', 'Business plan / sponsors', 'Engineering portfolio', 'Judging practice', 'Just getting started']
const TIMES = ['Weekday after school (US Central)', 'Weekday evening (US Central)', 'Saturday morning', 'Saturday afternoon', 'Sunday afternoon']

export default function Meetings() {
  const [f, setF] = useState({ team: '', contact: '', email: '', country: '', topic: TOPICS[0], times: [], notes: '' })
  const [s, setS] = useState({ busy: false, done: false, error: '' })
  const toggle = (t) => setF({ ...f, times: f.times.includes(t) ? f.times.filter((x) => x !== t) : [...f.times, t] })

  const submit = async (e) => {
    e.preventDefault()
    setS({ busy: true, done: false, error: '' })
    try {
      if (!supabase) throw new Error('Not connected yet.')
      const { error } = await supabase.from('op_meeting_requests').insert({
        team: f.team.trim(), contact: f.contact.trim(), email: f.email.trim(), country: f.country.trim() || null,
        topic: f.topic, times: f.times, notes: f.notes.trim() || null,
      })
      if (error) throw error
      setS({ busy: false, done: true, error: '' })
      setF({ team: '', contact: '', email: '', country: '', topic: TOPICS[0], times: [], notes: '' })
    } catch (err) {
      setS({ busy: false, done: false, error: err.message || 'Something went wrong.' })
    }
  }

  return (
    <div>
      <PageHead eyebrow="Monthly Review" title="Once a month, a real review.">
        Book a video call with one of our mentors. Bring the robot, the code, the portfolio or the plan, and get it critiqued the way judges and
        experienced teams would. Calls are in English for now; we'll add languages as we add mentors.
      </PageHead>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            [CalendarClock, 'How it works', 'Tell us what you want reviewed and when you\'re free. We match you with a mentor and email a video link within a week.'],
            [Video, 'The call', '45 minutes. Ten of yours showing what you have, the rest is questions and suggestions. Record it if you like.'],
            [ClipboardList, 'After', 'You get a short written summary of what we suggested, and a two-question feedback form so we get better at this.'],
          ].map(([Icon, t, d]) => (
            <div key={t} className="card flex gap-3 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-spark-500/15 text-spark-400"><Icon size={20} /></div>
              <div><p className="font-bold">{t}</p><p className="text-sm text-pit-100/70 leading-relaxed">{d}</p></div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="card space-y-3 p-4 lg:col-span-2">
          <p className="eyebrow">Request a review</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="label">Team (number or name)</label><input className="input" required value={f.team} onChange={(e) => setF({ ...f, team: e.target.value })} /></div>
            <div><label className="label">Country / region</label><input className="input" value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} placeholder="so we get the time zone right" /></div>
            <div><label className="label">Your name</label><input className="input" required value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} /></div>
            <div><label className="label">Email</label><input className="input" type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          </div>
          <div>
            <label className="label">What should we look at?</label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => <button type="button" key={t} onClick={() => setF({ ...f, topic: t })} className={`btn ${f.topic === t ? 'bg-spark-500 text-pit-950' : 'border border-white/15 hover:bg-white/10'}`}>{t}</button>)}
            </div>
          </div>
          <div>
            <label className="label">When are you usually free? (pick any)</label>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((t) => <button type="button" key={t} onClick={() => toggle(t)} className={`btn ${f.times.includes(t) ? 'bg-white/20' : 'border border-white/15 hover:bg-white/10'}`}>{t}</button>)}
            </div>
          </div>
          <div><label className="label">Anything we should know first</label><textarea className="input min-h-[90px]" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="Links to your code, photos, what you're stuck on." /></div>
          {s.error && <Notice kind="warn">{s.error}</Notice>}
          {s.done && <Notice>Request sent. Watch your email for a time and a link.</Notice>}
          <button className="btn-primary" disabled={s.busy}>{s.busy ? 'Sending…' : 'Request a review'}</button>
        </form>
      </div>
    </div>
  )
}
