import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isDemo } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { DEMO_CONTACTS, DEMO_REQUESTS } from '../lib/demoData'
import { Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'

export default function MyContacts() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState([])
  const [requests, setRequests] = useState({})
  const [expanded, setExpanded] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemo) {
      const myContacts = DEMO_CONTACTS.filter((c) => c.added_by === user.id)
      setContacts(myContacts)
      const grouped = {}
      for (const r of DEMO_REQUESTS) {
        if (myContacts.some((c) => c.id === r.contact_id)) {
          if (!grouped[r.contact_id]) grouped[r.contact_id] = []
          grouped[r.contact_id].push(r)
        }
      }
      setRequests(grouped)
      setLoading(false)
    } else {
      fetchMyContacts()
    }
  }, [])

  async function fetchMyContacts() {
    const { data: myContacts } = await supabase
      .from('contacts')
      .select('*')
      .eq('added_by', user.id)
      .order('created_at', { ascending: false })

    setContacts(myContacts || [])

    if (myContacts?.length > 0) {
      const ids = myContacts.map((c) => c.id)
      const { data: reqs } = await supabase
        .from('intro_requests')
        .select('*, profiles:requester_id(display_name, email)')
        .in('contact_id', ids)
        .order('created_at', { ascending: false })

      const grouped = {}
      for (const r of reqs || []) {
        if (!grouped[r.contact_id]) grouped[r.contact_id] = []
        grouped[r.contact_id].push(r)
      }
      setRequests(grouped)
    }

    setLoading(false)
  }

  async function updateRequestStatus(requestId, status) {
    if (isDemo) {
      setRequests((prev) => {
        const updated = { ...prev }
        for (const key in updated) {
          updated[key] = updated[key].map((r) =>
            r.id === requestId ? { ...r, status } : r
          )
        }
        return updated
      })
      return
    }

    await supabase
      .from('intro_requests')
      .update({ status })
      .eq('id', requestId)

    fetchMyContacts()
  }

  async function deleteContact(contactId) {
    if (!confirm('Delete this contact? This cannot be undone.')) return

    if (isDemo) {
      setContacts((prev) => prev.filter((c) => c.id !== contactId))
      return
    }

    await supabase.from('contacts').delete().eq('id', contactId)
    setContacts((prev) => prev.filter((c) => c.id !== contactId))
  }

  if (loading) {
    return (
      <div className="max-w-[560px] mx-auto space-y-3 animate-pulse">
        {[1,2].map(i => <div key={i} className="h-20 bg-surface-lighter rounded-xl" />)}
      </div>
    )
  }

  return (
    <div className="max-w-[560px] mx-auto">
      <h1 className="font-serif text-[28px] tracking-[-0.5px] mb-1">My Partners</h1>
      <p className="text-text-muted text-sm mb-8">Partners you've added to the network.</p>

      {contacts.length === 0 ? (
        <div className="text-center py-24 text-text-muted">
          <p className="text-sm">You haven't added any contacts yet.</p>
          <Link to="/add" className="text-text text-sm font-medium hover:underline mt-2 inline-block">
            Add your first contact
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {contacts.map((contact) => {
            const reqs = requests[contact.id] || []
            const pendingCount = reqs.filter((r) => r.status === 'pending').length
            const isExpanded = expanded === contact.id

            return (
              <div key={contact.id} className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-surface-light text-left min-h-[64px]"
                  onClick={() => setExpanded(isExpanded ? null : contact.id)}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-surface-lighter rounded-full flex items-center justify-center font-serif text-text text-base italic shrink-0">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-text">{contact.name}</p>
                      {(contact.role || contact.company) && (
                        <p className="text-xs text-text-muted">
                          {[contact.role, contact.company].filter(Boolean).join(' at ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {pendingCount > 0 && (
                      <span className="bg-accent text-white text-[11px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
                        {pendingCount}
                      </span>
                    )}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => { e.stopPropagation(); deleteContact(contact.id) }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); deleteContact(contact.id) }}}
                      className="text-text-muted/30 hover:text-red-500 p-1 min-w-[28px] min-h-[28px] flex items-center justify-center"
                      aria-label={`Delete ${contact.name}`}
                    >
                      <Trash2 size={13} strokeWidth={2} />
                    </span>
                    {isExpanded
                      ? <ChevronUp size={14} className="text-text-muted" />
                      : <ChevronDown size={14} className="text-text-muted" />
                    }
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-4 py-4">
                    {reqs.length === 0 ? (
                      <p className="text-sm text-text-muted">No intro requests yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {reqs.map((req) => (
                          <div key={req.id} className="bg-surface-light rounded-lg p-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-text">
                                {req.profiles?.display_name || req.profiles?.email?.split('@')[0] || 'Unknown'}
                              </span>
                              <span className={`text-xs capitalize flex items-center gap-1 ${
                                req.status === 'accepted' ? 'text-text' : 'text-text-muted'
                              }`}>
                                {req.status === 'pending' && <Clock size={11} />}
                                {req.status === 'accepted' && <CheckCircle size={11} />}
                                {req.status === 'declined' && <XCircle size={11} />}
                                {req.status}
                              </span>
                            </div>
                            <p className="text-xs text-text-muted leading-relaxed mb-3">{req.message}</p>
                            {req.status === 'pending' && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => updateRequestStatus(req.id, 'accepted')}
                                  className="bg-accent text-white text-xs font-medium px-3 py-1.5 rounded-lg min-h-[32px] hover:bg-accent-hover cursor-pointer"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => updateRequestStatus(req.id, 'declined')}
                                  className="bg-white border border-border text-text-muted text-xs font-medium px-3 py-1.5 rounded-lg min-h-[32px] hover:text-text cursor-pointer"
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
