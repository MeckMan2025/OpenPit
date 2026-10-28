import { ROADMAP } from '../data/roadmap'
import PageHead from '../components/PageHead'

const DOT = { now: 'bg-mint-500 ring-mint-500/30', next: 'bg-spark-500 ring-spark-500/30', later: 'bg-white/30 ring-white/10' }
const TAG = { now: 'Now', next: 'Next', later: 'Later' }

export default function Roadmap() {
  return (
    <div>
      <PageHead eyebrow="Roadmap" title="Our plan, in public.">
        What we're building this season and when, so partner teams know what's coming and can tell us if we have the order wrong.
        Our own goals for the year: onboard five teams, collect feedback every month, complete five documented improvement cycles,
        and publish how we decide what to build next.
      </PageHead>
      <ol className="relative ml-3 border-l border-white/10">
        {ROADMAP.map((r) => (
          <li key={r.title} className="mb-8 ml-6">
            <span className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full ring-4 ${DOT[r.status]}`} />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-pit-100/50">{r.when}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${r.status === 'now' ? 'bg-mint-500/15 text-mint-500' : r.status === 'next' ? 'bg-spark-500/15 text-spark-400' : 'bg-white/10 text-pit-100/60'}`}>{TAG[r.status]}</span>
            </div>
            <h3 className="mt-1 text-lg font-extrabold">{r.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-pit-100/70 leading-relaxed">{r.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
