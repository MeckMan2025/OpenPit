import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, ExternalLink, CheckSquare, PlayCircle } from 'lucide-react'
import { RESOURCES, CATEGORIES, LEVELS, SOURCES, categoryById } from '../data/resources'
import { TRACKS, CHECKLIST } from '../data/tutorials'
import PageHead from '../components/PageHead'

const LEVEL_STYLE = { Beginner: 'bg-mint-100 text-mint-800', Intermediate: 'bg-honey-100 text-honey-900', Advanced: 'bg-ink-100 text-ink-600' }

function ResourceCard({ r }) {
  const cat = categoryById(r.category)
  const src = SOURCES[r.source]
  return (
    <a href={r.url} target="_blank" rel="noreferrer" className="card group flex flex-col p-4 transition-colors hover:border-honey-400 hover:bg-honey-50">
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
        <span className="tag">{cat.emoji} {cat.name}</span>
        <span className={`rounded-full px-2 py-0.5 ${LEVEL_STYLE[r.level]}`}>{r.level}</span>
        <span className="ml-auto flex items-center gap-1 text-ink-500"><Clock size={12} aria-hidden="true" /> ~{r.minutes} min</span>
      </div>
      <p className="mt-3 flex items-start gap-1.5 font-bold leading-snug">
        {r.title} <ExternalLink size={14} className="mt-1 shrink-0 text-ink-400 group-hover:text-honey-600" aria-label="opens in a new tab" />
      </p>
      <p className="mt-1 flex-1 text-sm text-ink-600 leading-relaxed">{r.description}</p>
      <p className="mt-3 text-xs text-ink-500"><span className="font-semibold">Skills:</span> {r.skills.join(', ')}</p>
      <p className="mt-1 text-xs text-ink-500"><span className="font-semibold text-ink-600">{src.name}</span> · {src.note}</p>
    </a>
  )
}

export default function Learn() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [level, setLevel] = useState('all')

  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return RESOURCES.filter((r) => {
      if (cat !== 'all' && r.category !== cat) return false
      if (level !== 'all' && r.level !== level) return false
      const hay = [r.title, r.description, ...r.skills, categoryById(r.category).name].join(' ').toLowerCase()
      return words.every((w) => hay.includes(w))
    })
  }, [q, cat, level])

  const count = (id) => RESOURCES.filter((r) => r.category === id).length
  const catName = cat === 'all' ? null : categoryById(cat).name

  return (
    <div>
      <PageHead eyebrow="Learning Resources" title="Guides worth your team's time.">
        Free guides from FIRST and the FTC community, sorted by topic and difficulty. We've checked every link, and each card says who wrote it:
        only FTC Docs is official <i>FIRST</i> material.
      </PageHead>

      <div className="card mb-6 space-y-3 p-4">
        <label className="relative block">
          <span className="sr-only">Search resources</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input className="input !pl-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, e.g. PID, sponsors, wiring" />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          <button aria-pressed={cat === 'all'} onClick={() => setCat('all')} className={`chip ${cat === 'all' ? 'chip-on' : ''}`}>All topics</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={`chip ${cat === c.id ? 'chip-on' : ''}`}>
              {c.emoji} {c.name} <span className="text-xs text-ink-400">{count(c.id)}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Difficulty">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">Level</span>
          {['all', ...LEVELS].map((l) => (
            <button key={l} aria-pressed={level === l} onClick={() => setLevel(l)} className={`chip py-1 text-xs ${level === l ? 'chip-on' : ''}`}>{l === 'all' ? 'Any' : l}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-3 text-sm text-ink-500" aria-live="polite">{shown.length} of {RESOURCES.length} resources</p>
          {shown.length ? (
            <div className="grid gap-4 sm:grid-cols-2">{shown.map((r) => <ResourceCard key={r.url} r={r} />)}</div>
          ) : (
            <div className="card p-6 text-center text-sm text-ink-600">
              {catName && count(cat) === 0 ? (
                <>
                  <p className="font-bold text-ink-900">No {catName} resources yet</p>
                  <p className="mt-1">We haven't found one we trust enough to list. If you know a good one,{' '}
                    <Link to="/about#feedback" className="font-semibold text-honey-600 underline">tell us</Link>, or{' '}
                    <Link to="/mentors" className="font-semibold text-honey-600 underline">ask a mentor</Link>.</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-ink-900">Nothing matches</p>
                  <button onClick={() => { setQ(''); setCat('all'); setLevel('all') }} className="mt-2 font-semibold text-honey-600 underline">Clear filters</button>
                </>
              )}
            </div>
          )}

          <section className="mt-10" aria-labelledby="ours">
            <h2 id="ours" className="text-lg font-extrabold">Our own video guides</h2>
            <p className="mt-1 text-sm text-ink-600">Short videos our team is planning, each answering one question. None are recorded yet.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {TRACKS.map((t) => (
                <div key={t.id} className="card p-4">
                  <p className="font-bold">{t.emoji} {t.name}</p>
                  <ul className="mt-2 space-y-1.5">
                    {t.items.map((v) => (
                      <li key={v.title} className="flex gap-2 text-sm text-ink-600">
                        <PlayCircle size={16} className={`mt-0.5 shrink-0 ${v.url ? 'text-honey-600' : 'text-ink-300'}`} aria-hidden="true" />
                        {v.url ? <a href={v.url} target="_blank" rel="noreferrer" className="font-semibold hover:text-honey-600">{v.title}</a> : <span>{v.title} <span className="text-xs text-ink-400">· planned</span></span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="card h-fit p-4">
          <p className="eyebrow mb-2">New team? Start here</p>
          <p className="mb-3 text-sm text-ink-600">The checklist we'd hand a brand-new team for its first weeks.</p>
          <ol className="space-y-2">
            {CHECKLIST.map((c, i) => (
              <li key={c} className="flex gap-2 text-sm leading-snug"><CheckSquare size={16} className="mt-0.5 shrink-0 text-honey-600" aria-hidden="true" /><span><span className="font-bold text-ink-400">{i + 1}.</span> {c}</span></li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  )
}
