import { Link } from 'react-router-dom'
import { ClipboardCheck, NotebookPen, Target, TrendingUp } from 'lucide-react'
import PageHead from '../components/PageHead'

// Phase 2. Nothing here is live yet, and the page says so; no sample numbers.
const PLANNED = [
  [ClipboardCheck, 'Skill assessments', 'A short standardized assessment when you join, and again later, so you can see how much your team improved.'],
  [NotebookPen, 'Weekly progress reports', 'A five-minute check-in: what you learned, what got in the way, what you changed, and what\'s next.'],
  [Target, 'Goals and milestones', 'Your technical and business goals for the season, and which ones you\'ve reached.'],
  [TrendingUp, 'Progress over time', 'Simple charts built only from what your team actually submits.'],
]

export default function Dashboard() {
  return (
    <div>
      <PageHead eyebrow="Team Dashboard" title="Coming next: track your team's growth.">
        The dashboard isn't open yet. It needs team sign-in, which we're building next so each team's progress stays private to that team.
      </PageHead>
      <div className="grid gap-4 sm:grid-cols-2">
        {PLANNED.map(([Icon, t, d]) => (
          <div key={t} className="card flex gap-3 p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey-100 text-honey-600"><Icon size={20} aria-hidden="true" /></div>
            <div><p className="font-bold">{t}</p><p className="mt-1 text-sm text-ink-600 leading-relaxed">{d}</p></div>
          </div>
        ))}
      </div>
      <div className="card mt-6 flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-600">Want to be one of the first teams to use it? Send a mentorship request and say so in the challenge box.</p>
        <Link to="/mentors" className="btn-primary shrink-0">Get Started</Link>
      </div>
    </div>
  )
}
