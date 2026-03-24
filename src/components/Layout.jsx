import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Home, Users, Plus, User, LogOut, Menu, X } from 'lucide-react'

export default function Layout() {
  const { signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const topLinkClass = ({ isActive }) =>
    `hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[15px] font-medium min-h-[44px] justify-center transition-all duration-200 ${
      isActive
        ? 'bg-accent text-white shadow-sm'
        : 'text-text-muted hover:text-text hover:bg-black/[0.04]'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] font-medium transition-colors ${
      isActive
        ? 'bg-accent text-white'
        : 'text-text hover:bg-surface-lighter'
    }`

  return (
    <div className="min-h-dvh flex flex-col overflow-x-hidden">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Top header */}
      <header className="sticky top-0 z-50">
        <div className="bg-white/70 backdrop-blur-xl border-b border-black/[0.06]">
          <div className="max-w-[1080px] mx-auto px-4 sm:px-6 h-[56px] sm:h-[68px] flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 no-underline group" aria-label="CES Connect home" onClick={() => setMenuOpen(false)}>
              <img src="/logo.png" alt="CES Connect" className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
              <span className="font-serif text-[17px] sm:text-[20px] tracking-[-0.3px] text-text">
                CES <em className="text-text-muted group-hover:text-text transition-colors">Connect</em>
              </span>
            </NavLink>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-1 bg-surface-lighter/80 rounded-full px-1.5 py-1.5" aria-label="Main navigation">
              <NavLink to="/" end className={topLinkClass}>
                <Home size={17} strokeWidth={2} />
                <span>Home</span>
              </NavLink>
              <NavLink to="/directory" className={topLinkClass}>
                <Users size={17} strokeWidth={2} />
                <span>Partners</span>
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

            {/* Desktop sign out */}
            <button
              onClick={signOut}
              className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full text-text-muted hover:text-text hover:bg-black/[0.04] transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={18} strokeWidth={2} />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-text hover:bg-black/[0.04] transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="sm:hidden bg-white/95 backdrop-blur-xl border-b border-black/[0.06]">
            <nav className="max-w-[1080px] mx-auto px-4 py-3 space-y-1" aria-label="Mobile navigation">
              <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                <Home size={20} strokeWidth={2} />
                Home
              </NavLink>
              <NavLink to="/directory" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                <Users size={20} strokeWidth={2} />
                Partners
              </NavLink>
              <NavLink to="/add" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                <Plus size={20} strokeWidth={2} />
                Add Partner
              </NavLink>
              <NavLink to="/my-contacts" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                <User size={20} strokeWidth={2} />
                My Partners
              </NavLink>
              <button
                onClick={() => { signOut(); setMenuOpen(false) }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[16px] font-medium text-text-muted hover:bg-surface-lighter transition-colors w-full"
              >
                <LogOut size={20} strokeWidth={2} />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      <main id="main" className="flex-1 max-w-[1080px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
