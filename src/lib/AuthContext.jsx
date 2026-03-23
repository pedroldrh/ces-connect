import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isDemo } from './supabase'
import { DEMO_USER } from './demoData'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(isDemo ? DEMO_USER : null)
  const [loading, setLoading] = useState(!isDemo)

  useEffect(() => {
    if (isDemo) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    if (!isDemo) await supabase.auth.signOut()
    setUser(isDemo ? null : null)
    if (isDemo) window.location.reload()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, isDemo }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
