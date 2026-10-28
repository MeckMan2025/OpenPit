import { PlayCircle, Clock, CheckSquare } from 'lucide-react'
import { TRACKS, CHECKLIST } from '../data/tutorials'
import PageHead from '../components/PageHead'

export default function Learn() {
  return (
    <div>
      <PageHead eyebrow="Learn" title="How to build a team, on video.">
        Short tutorials, each answering one question, in four tracks: starting a team, the robot, the code, the business side.
        We're recording them this season; the ones without a play button yet are coming.
      </PageHead>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {TRACKS.map((t) => (
            <div key={t.id}>
              <h2 className="mb-3 text-lg font-extrabold">{t.emoji} {t.name}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {t.items.map((v) => (
                  <a key={v.title} href={v.url || undefined} target={v.url ? '_blank' : undefined} rel="noreferrer"
                    className={`card flex gap-3 p-4 ${v.url ? 'hover:border-honey-400 hover:bg-honey-100' : 'opacity-80'}`}>
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${v.url ? 'bg-honey-100 text-honey-600' : 'bg-honey-50 text-ink-300'}`}><PlayCircle size={20} /></div>
                    <div>
                      <p className="text-sm font-bold leading-snug">{v.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-ink-400"><Clock size={12} /> {v.minutes} min {v.url ? '' : '· coming soon'}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="card h-fit p-4">
          <p className="eyebrow mb-2">Your first weeks</p>
          <p className="mb-3 text-sm text-ink-600">The checklist we'd hand a brand-new team.</p>
          <ol className="space-y-2">
            {CHECKLIST.map((c, i) => (
              <li key={c} className="flex gap-2 text-sm leading-snug"><CheckSquare size={16} className="mt-0.5 shrink-0 text-honey-600" /><span><span className="font-bold text-ink-400">{i + 1}.</span> {c}</span></li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
