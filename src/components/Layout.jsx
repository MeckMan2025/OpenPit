import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { Bot, Users, CalendarClock, Languages, GraduationCap, Coins, Map, Menu, X } from 'lucide-react'

const NAV = [
  { to: '/mentor', label: 'AI Mentor', icon: Bot },
  { to: '/mentors', label: 'Mentors', icon: Users },
  { to: '/meetings', label: 'Monthly Review', icon: CalendarClock },
  { to: '/translate', label: 'Translate', icon: Languages },
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/fund', label: 'Fund a Team', icon: Coins },
  { to: '/roadmap', label: 'Roadmap', icon: Map },
]

export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-spark-500 text-pit-950 font-black">OP</span>
      <span className="text-lg font-extrabold tracking-tight">Open<span className="text-spark-400">Pit</span></span>
    </Link>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const link = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-pit-100/70 hover:bg-white/5 hover:text-white'}`
  return (
    <div className="field-grid min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-pit-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Logo />
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={link}><Icon size={16} /> {label}</NavLink>
            ))}
          </nav>
          <button className="ml-auto rounded-xl p-2 hover:bg-white/10 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-white/10 px-4 py-2 lg:hidden">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={link} onClick={() => setOpen(false)}><Icon size={16} /> {label}</NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-xs text-pit-100/50">
        OpenPit is run by students of FTC Team 7196, Everything That's Radical, Bettendorf, Iowa. Not affiliated with FIRST.
      </footer>
    </div>
  )
}
