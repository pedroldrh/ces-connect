import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase, isDemo } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { DEMO_CONTACTS } from '../lib/demoData'
import { AVATARS } from '../lib/avatars'
import { ArrowLeft, Send, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function ContactDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [myRequest, setMyRequest] = useState(null)

  useEffect(() => {
    if (isDemo) {
      setContact(DEMO_CONTACTS.find((c) => c.id === id) || null)
      setLoading(false)
    } else {
      fetchContact()
      fetchMyRequest()
    }
  }, [id])

  async function fetchContact() {
    const { data } = await supabase
      .from('contacts')
      .select('*, profiles:added_by(display_name, email)')
      .eq('id', id)
      .single()
    setContact(data)
    setLoading(false)
  }

  async function fetchMyRequest() {
    const { data } = await supabase
      .from('intro_requests')
      .select('*')
      .eq('contact_id', id)
      .eq('requester_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    setMyRequest(data)
  }

  async function requestIntro(e) {
    e.preventDefault()
    if (!message.trim()) return

    if (isDemo) {
      setMyRequest({ id: 'demo', status: 'pending', message: message.trim() })
      setMessage('')
      return
    }

    setSending(true)
    const { data, error } = await supabase.from('intro_requests').insert({
      requester_id: user.id,
      contact_id: id,
      message: message.trim(),
      status: 'pending',
    }).select().single()

    if (!error) {
      setMyRequest(data)
      setMessage('')
    }
    setSending(false)
  }

  if (loading) {
    return (
      <div className="max-w-[560px] mx-auto animate-pulse space-y-4">
        <div className="h-6 w-16 bg-surface-lighter rounded" />
        <div className="h-12 w-48 bg-surface-lighter rounded" />
        <div className="h-32 bg-surface-lighter rounded-xl" />
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="max-w-[560px] mx-auto text-center py-24">
        <p className="text-text-muted text-sm">Contact not found</p>
        <Link to="/directory" className="text-text text-sm font-medium hover:underline mt-2 inline-block">Back to directory</Link>
      </div>
    )
  }

  const isOwner = contact.added_by === user.id

  return (
    <div className="max-w-[560px] mx-auto">
      <Link to="/directory" className="inline-flex items-center gap-1 text-text-muted hover:text-text text-sm mb-8 no-underline min-h-[44px]">
        <ArrowLeft size={14} strokeWidth={2} />
        Back
      </Link>

      <div className="flex items-center gap-4 mb-8">
        {AVATARS[contact.id] ? (
          <img src={AVATARS[contact.id]} alt={contact.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-14 h-14 bg-surface-lighter rounded-full flex items-center justify-center font-serif text-text text-2xl italic shrink-0">
            {contact.name.charAt(0)}
          </div>
        )}
        <div>
          <h1 className="font-serif text-[24px] tracking-[-0.3px]">{contact.name}</h1>
          {(contact.role || contact.company) && (
            <p className="text-text-muted text-sm mt-0.5">
              {[contact.role, contact.company].filter(Boolean).join(' at ')}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Meta */}
        <div className="flex gap-8">
          {contact.grad_year && (
            <div>
              <p className="text-[11px] uppercase tracking-wide text-text-muted mb-0.5">Year</p>
              <p className="text-sm font-medium">{contact.grad_year}</p>
            </div>
          )}
          {contact.industry && (
            <div>
              <p className="text-[11px] uppercase tracking-wide text-text-muted mb-0.5">Industry</p>
              <p className="text-sm font-medium">{contact.industry}</p>
            </div>
          )}
        </div>

        {/* How they help */}
        {contact.how_they_help && (
          <div>
            <p className="text-[11px] uppercase tracking-wide text-text-muted mb-2">How they can help</p>
            <p className="text-sm text-text leading-relaxed bg-surface-light rounded-xl p-4">{contact.how_they_help}</p>
          </div>
        )}

        {/* Tags */}
        {contact.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {contact.tags.map((tag) => (
              <span key={tag} className="text-xs text-text-muted bg-surface-lighter rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Intro section */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-text-muted mb-5">
            Added by <span className="text-text font-medium">{contact.profiles?.display_name || contact.profiles?.email?.split('@')[0] || 'Unknown'}</span>
          </p>

          {isOwner ? (
            <p className="text-sm text-text-muted bg-surface-light rounded-xl p-4">
              This is your contact. You'll receive intro requests from other members.
            </p>
          ) : myRequest ? (
            <div className="bg-surface-light rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                {myRequest.status === 'pending' && <Clock size={14} className="text-text-muted" />}
                {myRequest.status === 'accepted' && <CheckCircle size={14} />}
                {myRequest.status === 'declined' && <XCircle size={14} className="text-text-muted" />}
                <span className="text-sm font-medium capitalize">{myRequest.status}</span>
              </div>
              <p className="text-xs text-text-muted">
                {myRequest.status === 'pending' && 'Your intro request is pending review.'}
                {myRequest.status === 'accepted' && 'Accepted! The contact owner will connect you.'}
                {myRequest.status === 'declined' && 'Your request was declined.'}
              </p>
            </div>
          ) : (
            <form onSubmit={requestIntro}>
              <label htmlFor="intro-message" className="block text-sm font-medium text-text mb-2">
                Request an intro
              </label>
              <textarea
                id="intro-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi! I'd love to connect with this person because..."
                rows={3}
                required
                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-accent resize-none min-h-[88px]"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg mt-3 min-h-[44px] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send size={13} strokeWidth={2.5} />
                {sending ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
