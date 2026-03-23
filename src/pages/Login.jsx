import { useState } from 'react'
import { supabase, isDemo } from '../lib/supabase'
import { Mail, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.endsWith('@mail.wlu.edu')) {
      setError('Please use your @mail.wlu.edu email')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        <div className="mb-12">
          <h1 className="font-serif text-[40px] tracking-[-1px] leading-[1.1] mb-3">
            CES <em>Connect</em>
          </h1>
          <p className="text-text-muted text-[15px] leading-relaxed">
            Share and discover alumni connections within the Center for Entrepreneurship Society.
          </p>
        </div>

        {sent ? (
          <div>
            <div className="w-12 h-12 rounded-full bg-surface-lighter flex items-center justify-center mb-5">
              <Mail size={20} strokeWidth={2} />
            </div>
            <h2 className="text-lg font-semibold mb-1">Check your email</h2>
            <p className="text-text-muted text-sm">
              We sent a login link to <span className="text-text font-medium">{email}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
              W&L Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@mail.wlu.edu"
              className="w-full bg-white border border-border rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-accent min-h-[44px]"
              required
              autoComplete="email"
            />
            {error && (
              <p className="text-sm text-red-600 mt-2" role="alert">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 text-sm mt-4 min-h-[44px] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Continue with email'}
              {!loading && <ArrowRight size={14} strokeWidth={2.5} />}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
