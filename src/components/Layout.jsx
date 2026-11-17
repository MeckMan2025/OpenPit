import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Bot, Users, GraduationCap, LayoutDashboard, Info, Menu, X, ArrowRight } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/mentor', label: 'AI Mentorship', icon: Bot },
  { to: '/mentors', label: 'Find a Mentor', icon: Users },
  { to: '/learn', label: 'Learning Resources', icon: GraduationCap },
  { to: '/dashboard', label: 'Team Dashboard', icon: LayoutDashboard, soon: true },
  { to: '/about', label: 'About', icon: Info },
]

const FOOTER = [
  ['/about', 'About our program'],
  ['/roadmap', 'Roadmap'],
  ['/fund', 'Fund a Team'],
  ['/translate', 'Translate the manual'],
  ['/about#feedback', 'Send feedback'],
]

export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-honey-400 text-ink-900 font-black shadow-sm">OP</span>
      <span className="text-lg font-extrabold tracking-tight">Open<span className="text-honey-600">Pit</span></span>
    </Link>
  )
}

function NavItems({ onClick }) {
  const link = ({ isActive }) =>
    `flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-honey-100 text-ink-900' : 'text-ink-600 hover:bg-honey-50 hover:text-ink-900'}`
  return NAV.map(({ to, label, icon: Icon, end, soon }) => (
    <NavLink key={to} to={to} end={end} className={link} onClick={onClick}>
      <Icon size={16} aria-hidden="true" /> {label}
      {soon && <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-500">Soon</span>}
    </NavLink>
  ))
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  // New page: start at the top, or at the section the link names (e.g. /about#feedback).
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="field-grid flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:shadow">Skip to content</a>
      <header className="sticky top-0 z-30 border-b border-honey-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Logo />
          <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 xl:flex">
            <NavItems />
          </nav>
          <Link to="/mentors" className="btn-primary ml-auto hidden sm:inline-flex xl:ml-1">Get Started <ArrowRight size={16} aria-hidden="true" /></Link>
          <button className="ml-auto rounded-xl p-2 hover:bg-honey-100 sm:ml-0 xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav aria-label="Main" className="space-y-1 border-t border-honey-200 px-4 py-2 xl:hidden">
            <NavItems onClick={() => setOpen(false)} />
            <Link to="/mentors" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full justify-center sm:hidden">Get Started <ArrowRight size={16} aria-hidden="true" /></Link>
          </nav>
        )}
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:py-12">
        <Outlet />
      </main>
      <footer className="border-t border-honey-200 bg-white/70 py-8 text-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER.map(([to, label]) => <Link key={to} to={to} className="font-semibold text-ink-600 hover:text-ink-900">{label}</Link>)}
          </nav>
          <p className="text-xs text-ink-500">
            Run by students of FTC Team 7196, Everything That's Radical, Bettendorf, Iowa. Not affiliated with <i>FIRST</i>.
          </p>
        </div>
      </footer>
    </div>
  )
}
