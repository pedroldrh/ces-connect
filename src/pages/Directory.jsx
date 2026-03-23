import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isDemo } from '../lib/supabase'
import { DEMO_CONTACTS } from '../lib/demoData'
import { AVATARS } from '../lib/avatars'
import { Search, ArrowUpRight, Plus } from 'lucide-react'

const INDUSTRIES = [
  'All', 'Finance', 'Tech', 'Consulting', 'Healthcare', 'Law',
  'Real Estate', 'Startup', 'Non-Profit', 'Media', 'Other'
]

export default function Directory() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemo) {
      setContacts(DEMO_CONTACTS)
      setLoading(false)
    } else {
      fetchContacts()
    }
  }, [])

  async function fetchContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*, profiles:added_by(display_name, email)')
      .order('created_at', { ascending: false })

    if (!error) setContacts(data || [])
    setLoading(false)
  }

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase()
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q) ||
      c.role?.toLowerCase().includes(q) ||
      c.tags?.some(t => t.toLowerCase().includes(q))

    const matchesIndustry = industry === 'All' || c.industry === industry
    return matchesSearch && matchesIndustry
  })

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1,2,3].map(i => (
          <div key={i} className="h-24 bg-surface-lighter rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-[28px] tracking-[-0.5px]">Directory</h1>
          <p className="text-text-muted text-sm mt-1">{contacts.length} shared connections</p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium no-underline min-h-[44px]"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add Contact
        </Link>
      </div>

      {isDemo && (
        <p className="text-text-muted text-xs bg-surface-light rounded-lg px-4 py-2.5 mb-6 border border-border">
          Demo mode — connect Supabase to go live
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="search"
            placeholder="Search name, company, role, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search contacts"
            className="w-full bg-white border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-accent min-h-[44px]"
          />
        </div>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          aria-label="Filter by industry"
          className="bg-white border border-border rounded-lg px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent min-h-[44px]"
        >
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-text-muted">
          <p className="text-sm">No contacts found.</p>
          {contacts.length === 0 && (
            <Link to="/add" className="text-text text-sm font-medium hover:underline mt-2 inline-block">
              Be the first to add one
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((contact) => (
            <Link
              key={contact.id}
              to={`/contact/${contact.id}`}
              className="group block bg-white border border-border hover:border-accent rounded-xl p-5 no-underline"
            >
              <div className="flex items-start justify-between mb-4">
                {AVATARS[contact.id] ? (
                  <img src={AVATARS[contact.id]} alt={contact.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-10 h-10 bg-surface-lighter rounded-full flex items-center justify-center font-serif text-text text-lg italic">
                    {contact.name.charAt(0)}
                  </div>
                )}
                <ArrowUpRight size={14} strokeWidth={2} className="text-text-muted/0 group-hover:text-text-muted transition-colors" />
              </div>

              <p className="font-medium text-[15px] text-text leading-tight group-hover:underline">
                {contact.name}
              </p>

              {(contact.role || contact.company) && (
                <p className="text-sm text-text-muted mt-0.5 leading-snug">
                  {[contact.role, contact.company].filter(Boolean).join(' at ')}
                </p>
              )}

              {contact.grad_year && (
                <p className="text-xs text-text-muted mt-1">Class of {contact.grad_year}</p>
              )}

              {contact.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {contact.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-text-muted bg-surface-lighter rounded-full px-2.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                  {contact.tags.length > 3 && (
                    <span className="text-xs text-text-muted">+{contact.tags.length - 3}</span>
                  )}
                </div>
              )}

              <p className="text-[11px] text-text-muted/50 mt-4 leading-none">
                via {contact.profiles?.display_name || contact.profiles?.email?.split('@')[0] || 'Unknown'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
