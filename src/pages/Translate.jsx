import { useState } from 'react'
import { Languages, ArrowRight } from 'lucide-react'
import { FUNCTIONS_URL, ANON_KEY } from '../lib/supabase'
import PageHead from '../components/PageHead'
import Notice from '../components/Notice'

const LANGS = ['Spanish', 'Portuguese', 'French', 'Arabic', 'Hindi', 'Swahili', 'Mandarin Chinese', 'Turkish', 'Vietnamese', 'Indonesian', 'German', 'Other']

export default function Translate() {
  const [text, setText] = useState('')
  const [lang, setLang] = useState('Spanish')
  const [other, setOther] = useState('')
  const [out, setOut] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const target = lang === 'Other' ? other.trim() : lang

  const go = async () => {
    if (!text.trim() || !target || busy) return
    setBusy(true); setError(''); setOut('')
    try {
      if (!FUNCTIONS_URL) throw new Error('Not connected yet.')
      const res = await fetch(`${FUNCTIONS_URL}/op-mentor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
        body: JSON.stringify({ mode: 'translate', target, text }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Translation failed (${res.status}).`)
      setOut(data.reply)
    } catch (e) { setError(e.message) } finally { setBusy(false) }
  }

  return (
    <div>
      <PageHead eyebrow="Translate" title="The manual, in your language.">
        Paste a rule, a section of the game manual, or a page of the robot guide. You get it back in your language with the terms FIRST uses
        kept consistent, so "Alliance", "Match", "Scoring Element" mean what the referees mean. It's a help, not an official translation: the
        English manual is the one that counts at an event.
      </PageHead>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-3 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="grow">
              <label className="label">Into</label>
              <select className="input" value={lang} onChange={(e) => setLang(e.target.value)}>{LANGS.map((l) => <option key={l}>{l}</option>)}</select>
            </div>
            {lang === 'Other' && <div className="grow"><label className="label">Which language?</label><input className="input" value={other} onChange={(e) => setOther(e.target.value)} /></div>}
          </div>
          <div>
            <label className="label">English text</label>
            <textarea className="input min-h-[260px] font-mono text-xs" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste from the game manual…" />
          </div>
          <button onClick={go} className="btn-primary" disabled={busy || !text.trim() || !target}><Languages size={16} /> {busy ? 'Translating…' : 'Translate'} <ArrowRight size={16} /></button>
          {error && <Notice kind="warn">{error}</Notice>}
        </div>
        <div className="card p-4">
          <label className="label">{target || 'Translation'}</label>
          <div className="min-h-[300px] whitespace-pre-wrap text-sm leading-relaxed">{out || <span className="text-ink-300">The translation shows here.</span>}</div>
        </div>
      </div>
    </div>
  )
}
