import { Link } from 'react-router-dom'
import { Bot, Users, CalendarClock, Languages, GraduationCap, Coins, ArrowRight } from 'lucide-react'

const BARRIERS = [
  { emoji: '💸', title: 'It costs too much', text: 'A first season runs a few thousand dollars before anyone has built anything. Most schools that don\'t have a team don\'t have that.' },
  { emoji: '🧑‍🏫', title: 'There is no mentor', text: 'Nobody nearby has done FTC. The kids are willing, the adults are willing, and nobody knows what to do on Tuesday.' },
  { emoji: '🗺️', title: 'Everything is far away', text: 'The nearest event, the nearest team, the parts, the manual in a language you read. Distance stacks up.' },
]

const OFFERS = [
  { to: '/mentor', icon: Bot, title: 'An AI mentor that knows FTC', text: 'Ask anything about programming, building or running a team, any hour, in your language. It answers like a mentor would, and tells you when to ask a person.' },
  { to: '/mentors', icon: Users, title: 'Real mentors, one message away', text: 'Our team\'s leads, listed by what they\'re good at. Send a question straight to the right one.' },
  { to: '/meetings', icon: CalendarClock, title: 'A monthly review', text: 'Book a video call once a month. Bring your robot, your code or your plan and get it critiqued.' },
  { to: '/translate', icon: Languages, title: 'The manual, in your language', text: 'Paste a section of the game manual or a rule and read it in your language, with FIRST\'s terms kept straight.' },
  { to: '/learn', icon: GraduationCap, title: 'How to start, on video', text: 'Short tutorials on starting a team, the robot, the code and the business side, plus a first-weeks checklist.' },
  { to: '/fund', icon: Coins, title: 'Help with the money', text: 'What a team actually costs, and a fund that helps teams with a plan and no budget get started.' },
]

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">For teams that can't find a mentor</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Every FTC team deserves someone to ask.
          </h1>
          <p className="mt-4 text-lg text-pit-100/75 leading-relaxed">
            OpenPit is an online mentor for FIRST Tech Challenge teams that are starting with no coach, no budget and no team nearby.
            Ask a question, book a review, read the manual in your language, and learn how to build a team that lasts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/mentor" className="btn-primary">Ask the mentor <ArrowRight size={16} /></Link>
            <Link to="/learn" className="btn-ghost">Start a team</Link>
          </div>
          <p className="mt-4 text-xs text-pit-100/50">Free. Run by students of FTC Team 7196. English today, more languages on the roadmap.</p>
        </div>
        <div className="card p-6">
          <p className="eyebrow mb-3">Why teams never start</p>
          <div className="space-y-4">
            {BARRIERS.map((b) => (
              <div key={b.title} className="flex gap-3">
                <span className="text-2xl leading-none">{b.emoji}</span>
                <div>
                  <p className="font-bold">{b.title}</p>
                  <p className="text-sm text-pit-100/70 leading-relaxed">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <p className="eyebrow mb-2">What OpenPit does about it</p>
        <h2 className="text-2xl font-extrabold tracking-tight">Six things, all free</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map(({ to, icon: Icon, title, text }) => (
            <Link key={to} to={to} className="card group p-5 transition-colors hover:border-spark-500/50 hover:bg-white/10">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-spark-500/15 text-spark-400"><Icon size={20} /></div>
              <p className="font-bold">{title}</p>
              <p className="mt-1 text-sm text-pit-100/70 leading-relaxed">{text}</p>
              <p className="mt-3 text-xs font-semibold text-spark-400 opacity-0 transition-opacity group-hover:opacity-100">Open →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="eyebrow mb-2">Who we are</p>
            <h2 className="text-2xl font-extrabold tracking-tight">Students who started a second team, and want to start more</h2>
            <p className="mt-3 text-pit-100/75 leading-relaxed">
              We are FTC Team 7196, Everything That's Radical, from Pleasant Valley High School in Iowa. This year we started and mentored a brand-new team,
              38350 Prime Suspects, and built the team-management app both teams run on. OpenPit is the same idea pointed outward:
              the help we gave one team, available to any team.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 text-sm">
            <Link to="/roadmap" className="btn-ghost justify-between">Our plan for the season <ArrowRight size={16} /></Link>
            <Link to="/mentors" className="btn-ghost justify-between">Meet the mentors <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
