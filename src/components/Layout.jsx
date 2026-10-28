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
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-honey-400 text-ink-900 font-black shadow-sm">OP</span>
      <span className="text-lg font-extrabold tracking-tight">Open<span className="text-honey-600">Pit</span></span>
    </Link>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const link = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-honey-100 text-ink-900' : 'text-ink-600 hover:bg-honey-50 hover:text-ink-900'}`
  return (
    <div className="field-grid min-h-screen">
      <header className="sticky top-0 z-30 border-b border-honey-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Logo />
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={link}><Icon size={16} /> {label}</NavLink>
            ))}
          </nav>
          <button className="ml-auto rounded-xl p-2 hover:bg-honey-100 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-honey-200 px-4 py-2 lg:hidden">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={link} onClick={() => setOpen(false)}><Icon size={16} /> {label}</NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-honey-200 py-8 text-center text-xs text-ink-400">
        OpenPit is run by students of FTC Team 7196, Everything That's Radical, Bettendorf, Iowa. Not affiliated with FIRST.
      </footer>
    </div>
  )
}
