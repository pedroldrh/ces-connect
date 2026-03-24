import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Home, Users, Plus, User, LogOut } from 'lucide-react'

export default function Layout() {
  const { signOut } = useAuth()

  const topLinkClass = ({ isActive }) =>
    `hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[15px] font-medium min-h-[44px] justify-center transition-all duration-200 ${
      isActive
        ? 'bg-accent text-white shadow-sm'
        : 'text-text-muted hover:text-text hover:bg-black/[0.04]'
    }`

  const bottomLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-0.5 py-2 px-3 text-[10px] font-medium transition-colors min-w-[56px] ${
      isActive ? 'text-accent' : 'text-text-muted'
    }`

  return (
    <div className="min-h-dvh flex flex-col pb-16 sm:pb-0 overflow-x-hidden">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Top header */}
      <header className="sticky top-0 z-50">
        <div className="bg-white/70 backdrop-blur-xl border-b border-black/[0.06]">
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 h-[56px] sm:h-[68px] flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 no-underline group" aria-label="CES Connect home">
              <img src="/logo.png" alt="CES Connect" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
              <span className="font-serif text-[17px] sm:text-[20px] tracking-[-0.3px] text-text">
                CES <em className="text-text-muted group-hover:text-text transition-colors">Connect</em>
              </span>
            </NavLink>

            {/* Desktop nav — pill container */}
            <nav className="hidden sm:flex items-center gap-1 bg-surface-lighter/80 rounded-full px-1.5 py-1.5" aria-label="Main navigation">
              <NavLink to="/" end className={topLinkClass}>
                <Home size={17} strokeWidth={2} />
                <span>Home</span>
              </NavLink>
              <NavLink to="/directory" className={topLinkClass}>
                <Users size={17} strokeWidth={2} />
                <span>Directory</span>
              </NavLink>
              <NavLink to="/add" className={topLinkClass}>
                <Plus size={17} strokeWidth={2} />
                <span>Add</span>
              </NavLink>
              <NavLink to="/my-contacts" className={topLinkClass}>
                <User size={17} strokeWidth={2} />
                <span>Mine</span>
              </NavLink>
            </nav>

            {/* Sign out */}
            <button
              onClick={signOut}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-text-muted hover:text-text hover:bg-black/[0.04] transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1 max-w-[1080px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-black/[0.06] flex justify-around px-2 safe-bottom" aria-label="Mobile navigation">
        <NavLink to="/" end className={bottomLinkClass}>
          <Home size={20} strokeWidth={2} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/directory" className={bottomLinkClass}>
          <Users size={20} strokeWidth={2} />
          <span>Directory</span>
        </NavLink>
        <NavLink to="/add" className={bottomLinkClass}>
          <Plus size={20} strokeWidth={2} />
          <span>Add</span>
        </NavLink>
        <NavLink to="/my-contacts" className={bottomLinkClass}>
          <User size={20} strokeWidth={2} />
          <span>Mine</span>
        </NavLink>
      </nav>
    </div>
  )
}
