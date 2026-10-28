import { useState } from 'react'
import { Send } from 'lucide-react'
import { MENTORS, AREAS } from '../data/mentors'
import { supabase } from '../lib/supabase'
import PageHead from '../components/PageHead'
import Avatar from '../components/Avatar'
import Notice from '../components/Notice'

export default function Mentors() {
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ mentor: '', team: '', email: '', area: 'programming', question: '' })
  const [state, setState] = useState({ busy: false, done: false, error: '' })
  const shown = filter === 'all' ? MENTORS : MENTORS.filter((m) => m.areas.includes(filter))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.question.trim() || !form.email.trim()) return
    setState({ busy: true, done: false, error: '' })
    try {
      if (!supabase) throw new Error('Not connected yet.')
      const { error } = await supabase.from('op_questions').insert({
        mentor_id: form.mentor || null, team: form.team.trim() || null, email: form.email.trim(), area: form.area, question: form.question.trim(),
      })
      if (error) throw error
      setState({ busy: false, done: true, error: '' })
      setForm({ mentor: '', team: '', email: '', area: 'programming', question: '' })
    } catch (err) {
      setState({ busy: false, done: false, error: err.message || 'Something went wrong. Try again.' })
    }
  }

  return (
    <div>
      <PageHead eyebrow="Mentors" title="Real people, one message away.">
        Our team's leads, listed by what they're good at. Pick the person who fits, or leave it to us and we'll route it.
        You'll get an answer by email, usually within a few days. (English only for now.)
      </PageHead>

      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={`btn ${filter === 'all' ? 'bg-white/15' : 'border border-white/15 hover:bg-white/10'}`}>Everyone</button>
        {Object.entries(AREAS).map(([id, a]) => (
          <button key={id} onClick={() => setFilter(id)} className={`btn ${filter === id ? 'bg-white/15' : 'border border-white/15 hover:bg-white/10'}`}>{a.emoji} {a.name}</button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {shown.map((m) => (
            <div key={m.id} className="card p-4">
              <div className="flex items-start gap-3">
                <Avatar name={m.name} photo={m.photo} />
                <div className="min-w-0">
                  <p className="font-bold">{m.name} <span className="text-xs font-semibold text-pit-100/50">· Team {m.team}</span></p>
                  <p className="text-xs text-pit-100/60">{m.role}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {m.areas.map((a) => <span key={a} className="rounded-full bg-spark-500/15 px-2 py-0.5 text-[11px] font-semibold text-spark-400">{AREAS[a].emoji} {AREAS[a].name}</span>)}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-pit-100/70 leading-relaxed">{m.bio}</p>
              <button onClick={() => { setForm({ ...form, mentor: m.id, area: m.areas[0] }); document.getElementById('ask')?.scrollIntoView({ behavior: 'smooth' }) }} className="mt-3 text-xs font-bold text-spark-400 hover:text-spark-300">Ask {m.name} →</button>
            </div>
          ))}
        </div>

        <form id="ask" onSubmit={submit} className="card h-fit space-y-3 p-4">
          <p className="eyebrow">Send a question</p>
          <div>
            <label className="label">To</label>
            <select className="input" value={form.mentor} onChange={(e) => setForm({ ...form, mentor: e.target.value })}>
              <option value="">Whoever fits best</option>
              {MENTORS.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.role.split('·')[0].trim()}</option>)}
            </select>
          </div>
          <div>
            <label className="label">About</label>
            <select className="input" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
              {Object.entries(AREAS).map(([id, a]) => <option key={id} value={id}>{a.emoji} {a.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Your team (number or name, optional)</label>
            <input className="input" value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} placeholder="e.g. 12345, or 'starting one in Nairobi'" />
          </div>
          <div>
            <label className="label">Email for the answer</label>
            <input className="input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@school.org" />
          </div>
          <div>
            <label className="label">Your question</label>
            <textarea className="input min-h-[120px]" required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="What's happening, what you've tried, what you want to happen." />
          </div>
          {state.error && <Notice kind="warn">{state.error}</Notice>}
          {state.done && <Notice>Sent. A mentor will reply by email.</Notice>}
          <button className="btn-primary w-full justify-center" disabled={state.busy}><Send size={16} /> {state.busy ? 'Sending…' : 'Send to a mentor'}</button>
        </form>
      </div>
    </div>
  )
}
