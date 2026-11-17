import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, Bot, User, Sparkles, Languages, ShieldCheck, PowerOff } from 'lucide-react'
import { callMentor, sendFeedback } from '../lib/supabase'
import useAiStatus from '../components/useAiStatus'
import PageHead from '../components/PageHead'
import Notice from '../components/Notice'

const STARTERS = {
  Technical: [
    'Our robot drives but the autonomous does nothing. Where do I start?',
    'Our arm drops when the motor stops. What could cause that?',
    'What should a first drivetrain be built from?',
  ],
  Business: [
    'How do we ask a local company to sponsor us?',
    'We have four students and one parent. How should we organize the team?',
    'What should our team post on social media?',
  ],
}

const HOW = [
  'Asks what is happening and what you have already tried',
  'Names the problem back to you so you can correct it',
  'Explains the likely causes and how to tell them apart',
  'Suggests fixes that fit your time and budget, and why they should work',
  'Ends with next steps to test, and asks you to report back',
]

const RESOLVED = [
  ['fully', 'Fully resolved'],
  ['partially', 'Partially resolved'],
  ['not', 'Not resolved'],
  ['not_tried', 'Not attempted yet'],
]

// The two feedback questions under each AI answer. One row is saved when the
// second question is answered (or skipped), so a half-answer isn't counted.
function AnswerFeedback() {
  const [helpful, setHelpful] = useState(null)
  const [state, setState] = useState('ask') // ask | saving | done | error
  const save = async (resolved) => {
    setState('saving')
    try { await sendFeedback({ kind: 'chat', helpful, resolved }); setState('done') } catch { setState('error') }
  }
  if (state === 'done') return <p className="mt-2 text-xs font-semibold text-mint-800">Thanks, that helps us improve the mentor.</p>
  if (state === 'error') return <p className="mt-2 text-xs text-ink-500">Couldn't save your feedback. It's fine to carry on.</p>
  const pill = 'rounded-lg border border-honey-300 bg-white px-2.5 py-1 text-xs font-semibold hover:bg-honey-50 disabled:opacity-50'
  return (
    <div className="mt-2 space-y-2 text-xs text-ink-600">
      {helpful === null ? (
        <div className="flex flex-wrap items-center gap-2">
          <span>Was this response helpful?</span>
          <button className={pill} onClick={() => setHelpful(true)}>Yes</button>
          <button className={pill} onClick={() => setHelpful(false)}>No</button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <span>Did this help resolve your problem?</span>
          {RESOLVED.map(([id, label]) => <button key={id} className={pill} disabled={state === 'saving'} onClick={() => save(id)}>{label}</button>)}
          <button className="px-1 text-ink-400 underline hover:text-ink-600" disabled={state === 'saving'} onClick={() => save(null)}>Skip</button>
        </div>
      )}
    </div>
  )
}

export default function Mentor() {
  const status = useAiStatus()
  const off = status === 'off'
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)

  // Keep the newest message in view inside the chat box, without scrolling the whole page.
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, busy])

  const ask = async (text) => {
    const q = (text ?? input).trim()
    if (!q || busy || off) return
    setInput('')
    setError('')
    const next = [...messages, { role: 'user', content: q }]
    setMessages(next)
    setBusy(true)
    try {
      const data = await callMentor({ messages: next.slice(-12) })
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
      <PageHead eyebrow="AI Mentorship" title="Work through the problem, not just the answer.">
        Ask about programming, robot design, autonomous, outreach, fundraising or running your team. The AI mentor coaches you through it
        the way an experienced mentor would, so your team gets better at solving the next problem on its own.
      </PageHead>

      {off && (
        <div className="mb-6 flex gap-3 rounded-2xl border border-honey-400 bg-honey-50 p-4 text-sm">
          <PowerOff size={20} className="mt-0.5 shrink-0 text-honey-600" aria-hidden="true" />
          <div>
            <p className="font-bold">Prototype: the AI mentor isn't switched on yet.</p>
            <p className="mt-1 text-ink-600 leading-relaxed">
              The chat is built, but it needs an AI service connected before it can answer, so it can't take questions right now.
              Until then, <Link to="/mentors" className="font-semibold text-honey-600 underline hover:text-honey-900">request help from a person</Link> or
              browse the <Link to="/learn" className="font-semibold text-honey-600 underline hover:text-honey-900">learning resources</Link>.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className={`card flex h-[600px] max-h-[75vh] flex-col lg:col-span-2 ${off ? 'opacity-60' : ''}`}>
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && (
              <div className="grid h-full place-items-center text-center">
                <div className="max-w-sm">
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-honey-100 text-honey-600"><Sparkles size={22} aria-hidden="true" /></div>
                  <p className="font-bold">Describe what's going on</p>
                  <p className="mt-1 text-sm text-ink-500">What you expected, what actually happens, and what you've already tried. Or pick an example.</p>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                {m.role !== 'user' && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-honey-400 text-ink-900"><Bot size={16} aria-hidden="true" /></div>}
                <div className="max-w-[85%]">
                  <div className={`whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-honey-400 text-ink-900' : 'bg-honey-100'}`}>{m.content}</div>
                  {m.role === 'assistant' && <AnswerFeedback />}
                </div>
                {m.role === 'user' && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-honey-100"><User size={16} aria-hidden="true" /></div>}
              </div>
            ))}
            {busy && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-honey-400 text-ink-900"><Bot size={16} aria-hidden="true" /></div>
                <div className="rounded-2xl bg-honey-100 px-4 py-2.5 text-sm text-ink-500">thinking…</div>
              </div>
            )}
          </div>
          {error && <div className="px-4 pb-2"><Notice kind="warn">{error}</Notice></div>}
          <form onSubmit={(e) => { e.preventDefault(); ask() }} className="flex gap-2 border-t border-honey-200 p-3">
            <label htmlFor="ask" className="sr-only">Your question</label>
            <input id="ask" className="input" value={input} disabled={off} onChange={(e) => setInput(e.target.value)}
              placeholder={off ? 'The AI mentor is not switched on yet' : 'What is happening, and what have you tried?'} />
            <button className="btn-primary shrink-0" disabled={off || busy || !input.trim()}><Send size={16} aria-hidden="true" /> Ask</button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <p className="eyebrow mb-2">Try an example</p>
            {Object.entries(STARTERS).map(([group, list]) => (
              <div key={group} className="mb-3 last:mb-0">
                <p className="mb-1.5 text-xs font-bold text-ink-500">{group}</p>
                <div className="space-y-2">
                  {list.map((s) => (
                    <button key={s} disabled={off} onClick={() => ask(s)} className="block w-full rounded-xl border border-honey-200 px-3 py-2 text-left text-sm hover:border-honey-400 hover:bg-honey-50 disabled:cursor-not-allowed disabled:opacity-60">{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="card p-4 text-sm">
            <p className="eyebrow mb-2">How it helps</p>
            <ol className="list-decimal space-y-1 pl-5 text-ink-600 leading-relaxed">
              {HOW.map((h) => <li key={h}>{h}</li>)}
            </ol>
          </div>
          <div className="card flex gap-3 p-4 text-sm text-ink-600 leading-relaxed">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-mint-500" aria-hidden="true" />
            <p>
              Don't type names, ages, schools or contact details. Chats aren't saved; only your answers to the two feedback questions are, with nothing
              that identifies you. The AI can be wrong: test its suggestions, and for safety, rules or money ask a person.
            </p>
          </div>
          <Link to="/translate" className="card flex items-center gap-3 p-4 text-sm font-semibold hover:border-honey-400 hover:bg-honey-50">
            <Languages size={18} className="text-honey-600" aria-hidden="true" /> Need the game manual in your language?
          </Link>
        </div>
      </div>
    </div>
  )
}
