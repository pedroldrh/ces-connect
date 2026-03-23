import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Home, Users, Plus, User, LogOut } from 'lucide-react'

export default function Layout() {
  const { signOut } = useAuth()

  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-5 py-2 rounded-full text-[15px] font-medium min-h-[44px] justify-center transition-all duration-200 ${
      isActive
        ? 'bg-accent text-white shadow-sm'
        : 'text-text-muted hover:text-text hover:bg-black/[0.04]'
    }`

  return (
    <div className="min-h-dvh flex flex-col">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className="sticky top-0 z-50">
        {/* Frosted glass bar */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-black/[0.06]">
          <div className="max-w-[1080px] mx-auto px-6 h-[68px] flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 no-underline group" aria-label="CES Connect home">
              <img src="/logo.png" alt="CES Connect" className="w-12 h-12 object-contain" />
              <span className="font-serif text-[20px] tracking-[-0.3px] text-text">
                CES <em className="text-text-muted group-hover:text-text transition-colors">Connect</em>
              </span>
            </NavLink>

            {/* Nav — pill container */}
            <nav className="flex items-center gap-1 bg-surface-lighter/80 rounded-full px-1.5 py-1.5" aria-label="Main navigation">
              <NavLink to="/" end className={linkClass}>
                <Home size={17} strokeWidth={2} />
                <span className="hidden sm:inline">Home</span>
              </NavLink>
              <NavLink to="/directory" className={linkClass}>
                <Users size={17} strokeWidth={2} />
                <span className="hidden sm:inline">Directory</span>
              </NavLink>
              <NavLink to="/add" className={linkClass}>
                <Plus size={17} strokeWidth={2} />
                <span className="hidden sm:inline">Add</span>
              </NavLink>
              <NavLink to="/my-contacts" className={linkClass}>
                <User size={17} strokeWidth={2} />
                <span className="hidden sm:inline">Mine</span>
              </NavLink>
            </nav>

            {/* Sign out */}
            <button
              onClick={signOut}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-text-muted hover:text-text hover:bg-black/[0.04] transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1 max-w-[1080px] w-full mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
