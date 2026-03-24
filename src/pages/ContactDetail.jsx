import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase, isDemo } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { DEMO_CONTACTS } from '../lib/demoData'
import { AVATARS } from '../lib/avatars'
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react'

export default function ContactDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemo) {
      setContact(DEMO_CONTACTS.find((c) => c.id === id) || null)
      setLoading(false)
    } else {
      fetchContact()
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
              <p className="text-[11px] uppercase tracking-wide text-text-muted mb-0.5">Class</p>
              <p className="text-sm font-medium">Class of '{String(contact.grad_year).slice(-2)}</p>
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

        {/* Connect directly */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-text-muted mb-4">
            Added by <span className="text-text font-medium">{contact.profiles?.display_name || contact.profiles?.email?.split('@')[0] || 'Unknown'}</span>
          </p>

          <p className="text-sm font-medium text-text mb-3">Connect with {contact.name.split(' ')[0]}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(contact.name + ' ' + (contact.company || ''))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg min-h-[44px] no-underline"
            >
              <ExternalLink size={15} strokeWidth={2} />
              Find on LinkedIn
            </a>
            {contact.profiles?.email && (
              <a
                href={`mailto:${contact.profiles.email}?subject=CES Connect: Intro to ${contact.name}`}
                className="inline-flex items-center gap-2 border border-border hover:border-accent text-text text-sm font-medium px-5 py-2.5 rounded-lg min-h-[44px] no-underline"
              >
                <Mail size={15} strokeWidth={2} />
                Email Pedro
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
