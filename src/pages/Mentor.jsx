import { useEffect, useRef, useState } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { FUNCTIONS_URL, ANON_KEY } from '../lib/supabase'
import PageHead from '../components/PageHead'
import Notice from '../components/Notice'

const STARTERS = [
  'Our robot drives but the autonomous does nothing. Where do I start?',
  'How do we ask a local company to sponsor us?',
  'What should a first drivetrain be built from?',
  'What goes in an engineering portfolio?',
  'We have four students and one parent. Is that enough to start?',
]

export default function Mentor() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, busy])

  const ask = async (text) => {
    const q = (text ?? input).trim()
    if (!q || busy) return
    setInput('')
    setError('')
    const next = [...messages, { role: 'user', content: q }]
    setMessages(next)
    setBusy(true)
    try {
      if (!FUNCTIONS_URL) throw new Error('OpenPit is not connected to its backend yet.')
      const res = await fetch(`${FUNCTIONS_URL}/op-mentor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
        body: JSON.stringify({ messages: next.slice(-12) }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `The mentor didn't answer (${res.status}).`)
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(e.message)
      setMessages(messages)
      setInput(q)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHead eyebrow="AI Mentor" title="Ask anything. Any hour. Any language.">
        It knows the FTC Tech Challenge: the SDK, the kit of parts, the inspection sheet, how judging works, how teams run.
        It answers the way a mentor would, and it will tell you when a question needs a real person.
      </PageHead>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card flex min-h-[520px] flex-col lg:col-span-2">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-spark-500/15 text-spark-400"><Sparkles size={22} /></div>
                  <p className="font-bold">Start with a question</p>
                  <p className="mt-1 text-sm text-pit-100/60">Or tap one of the examples on the right.</p>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                {m.role !== 'user' && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-spark-500 text-pit-950"><Bot size={16} /></div>}
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-pit-700 text-white' : 'bg-white/10'}`}>{m.content}</div>
                {m.role === 'user' && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10"><User size={16} /></div>}
              </div>
            ))}
            {busy && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-spark-500 text-pit-950"><Bot size={16} /></div>
                <div className="rounded-2xl bg-white/10 px-4 py-2.5 text-sm text-pit-100/60">thinking…</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {error && <div className="px-4 pb-2"><Notice kind="warn">{error}</Notice></div>}
          <form onSubmit={(e) => { e.preventDefault(); ask() }} className="flex gap-2 border-t border-white/10 p-3">
            <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about code, the robot, judging, sponsors, anything FTC…" />
            <button className="btn-primary shrink-0" disabled={busy || !input.trim()}><Send size={16} /> Ask</button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <p className="eyebrow mb-2">Try one</p>
            <div className="space-y-2">
              {STARTERS.map((s) => (
                <button key={s} onClick={() => ask(s)} className="block w-full rounded-xl border border-white/10 px-3 py-2 text-left text-sm hover:border-spark-500/50 hover:bg-white/5">{s}</button>
              ))}
            </div>
          </div>
          <div className="card p-4 text-sm text-pit-100/70 leading-relaxed">
            <p className="eyebrow mb-2">How it's built</p>
            The mentor runs on Claude, with a system prompt written by our team about how FTC works and how we'd answer. It does not see your name or team unless you type it.
            For anything about safety, eligibility or money, it will send you to a real mentor.
          </div>
        </div>
      </div>
    </div>
  )
}
