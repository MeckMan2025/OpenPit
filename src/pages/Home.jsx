import { Link } from 'react-router-dom'
import { Bot, Users, GraduationCap, LineChart, ClipboardCheck, MessageSquareText, Wrench, TrendingUp, ArrowRight } from 'lucide-react'
import { GOALS } from '../data/program'

const STEPS = [
  { icon: ClipboardCheck, title: 'Assess', text: 'Tell us where your team is today: what works, what doesn\'t, and what you want to get better at.' },
  { icon: MessageSquareText, title: 'Get guidance', text: 'Work through the problem with the AI mentor, or request 20 minutes with a person who has done it.' },
  { icon: Wrench, title: 'Apply it', text: 'Make the change on your robot, your code or your team, then test whether it worked.' },
  { icon: TrendingUp, title: 'Track and repeat', text: 'Note what changed and what you learned, and pick the next thing to improve.' },
]

const FEATURES = [
  { to: '/mentor', icon: Bot, title: 'AI-powered assistance', text: 'An FTC mentor that asks what you\'ve tried, explains likely causes and helps you plan next steps, instead of handing over an answer.' },
  { to: '/mentors', icon: Users, title: 'Specialized human mentorship', text: 'Request a 20-minute session on programming, design, CAD, autonomous, outreach, fundraising, social media or running a team.' },
  { to: '/learn', icon: GraduationCap, title: 'FTC learning resources', text: 'Guides we\'ve checked, from FIRST and the FTC community, sorted by topic and difficulty.' },
  { to: '/dashboard', icon: LineChart, title: 'Team progress tracking', text: 'Skill assessments and weekly progress reports, so you can see your team improve.', soon: true },
]

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="eyebrow mb-3">Free mentorship for FIRST Tech Challenge teams</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Help your FTC team grow, with someone to ask.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-600 leading-relaxed">
            OpenPit helps FTC teams anywhere get better at programming, robot design and running a team.
            We don't just give answers: we help your team understand the problem, try a fix, and get better at solving the next one on its own.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/mentors" className="btn-primary px-5 py-3 text-base">Get Started <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/learn" className="btn-ghost px-5 py-3 text-base">Explore Resources</Link>
          </div>
          <p className="mt-4 text-sm text-ink-500">Free. Run by students of FTC Team 7196. No accounts needed.</p>
        </div>
        <div className="card p-6 md:col-span-2">
          <p className="eyebrow mb-4">Where teams ask for help</p>
          <ul className="grid grid-cols-2 gap-2 text-sm font-semibold">
            {['💻 Programming', '🔧 Robot design', '📐 CAD', '🧭 Autonomous', '📣 Outreach', '💰 Fundraising', '📱 Social media', '🗂️ Team management'].map((t) => (
              <li key={t} className="rounded-xl bg-honey-50 px-3 py-2.5">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how">
        <p className="eyebrow mb-2">How it works</p>
        <h2 id="how" className="section-title">Four steps, then again</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="card p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-honey-400 text-sm font-black text-ink-900">{i + 1}</span>
                <Icon size={20} className="text-honey-600" aria-hidden="true" />
              </div>
              <p className="font-bold">{title}</p>
              <p className="mt-1 text-sm text-ink-600 leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="features">
        <p className="eyebrow mb-2">What you get</p>
        <h2 id="features" className="section-title">Everything is free</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURES.map(({ to, icon: Icon, title, text, soon }) => (
            <Link key={to} to={to} className="card group flex gap-4 p-5 transition-colors hover:border-honey-400 hover:bg-honey-50">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-honey-100 text-honey-600"><Icon size={22} aria-hidden="true" /></div>
              <div>
                <p className="font-bold">{title} {soon && <span className="ml-1 rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-bold text-ink-500">Coming soon</span>}</p>
                <p className="mt-1 text-sm text-ink-600 leading-relaxed">{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="goals" className="card p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="eyebrow mb-2">Program impact</p>
            <h2 id="goals" className="section-title">Our goals for the first six months</h2>
          </div>
          <span className="rounded-full border border-honey-300 px-3 py-1 text-xs font-bold text-ink-600">Goals, not results yet</span>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((g) => (
            <div key={g.label} className="rounded-2xl bg-honey-50 p-4">
              <dt className="sr-only">{g.label}</dt>
              <dd className="text-3xl font-black text-honey-600">{g.value}</dd>
              <dd className="mt-1 text-sm text-ink-600 leading-snug">{g.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-ink-500">
          These are targets we set ourselves. We'll publish real numbers here once we have them and have checked them.{' '}
          <Link to="/about" className="font-semibold text-honey-600 hover:text-honey-900">How we'll measure it →</Link>
        </p>
      </section>
    </div>
  )
}
