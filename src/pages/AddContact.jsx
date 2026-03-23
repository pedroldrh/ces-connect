import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isDemo } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { X } from 'lucide-react'

const INDUSTRIES = [
  'Finance', 'Tech', 'Consulting', 'Healthcare', 'Law',
  'Real Estate', 'Startup', 'Non-Profit', 'Media', 'Other'
]

export default function AddContact() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [form, setForm] = useState({
    name: '',
    grad_year: '',
    company: '',
    role: '',
    industry: '',
    how_they_help: '',
    tags: [],
  })

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !form.tags.includes(tag)) {
      updateField('tags', [...form.tags, tag])
    }
    setTagInput('')
  }

  const removeTag = (tag) => updateField('tags', form.tags.filter((t) => t !== tag))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (isDemo) {
      alert('Contact added! (demo mode)')
      navigate('/')
      return
    }

    const { error } = await supabase.from('contacts').insert({
      name: form.name,
      grad_year: form.grad_year ? parseInt(form.grad_year) : null,
      company: form.company || null,
      role: form.role || null,
      industry: form.industry || null,
      how_they_help: form.how_they_help || null,
      tags: form.tags.length > 0 ? form.tags : null,
      added_by: user.id,
    })

    if (error) {
      alert('Error adding contact: ' + error.message)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-white border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-muted/40 focus:outline-none focus:border-accent min-h-[44px]"

  return (
    <div className="max-w-[480px] mx-auto">
      <h1 className="font-serif text-[28px] tracking-[-0.5px] mb-1">Add a Contact</h1>
      <p className="text-text-muted text-sm mb-8">Share a connection with CES members.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">Name <span className="text-text-muted">*</span></label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="John Smith"
            className={inputClass}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="grad_year" className="block text-sm font-medium text-text mb-1.5">Grad Year</label>
            <input
              id="grad_year"
              type="number"
              value={form.grad_year}
              onChange={(e) => updateField('grad_year', e.target.value)}
              placeholder="2020"
              min="1900"
              max="2030"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-text mb-1.5">Industry</label>
            <select
              id="industry"
              value={form.industry}
              onChange={(e) => updateField('industry', e.target.value)}
              className={inputClass}
            >
              <option value="">Select...</option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-text mb-1.5">Company</label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => updateField('company', e.target.value)}
              placeholder="Goldman Sachs"
              className={inputClass}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-text mb-1.5">Role</label>
            <input
              id="role"
              type="text"
              value={form.role}
              onChange={(e) => updateField('role', e.target.value)}
              placeholder="VP of Engineering"
              className={inputClass}
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <label htmlFor="how_they_help" className="block text-sm font-medium text-text mb-1.5">How can they help?</label>
          <textarea
            id="how_they_help"
            value={form.how_they_help}
            onChange={(e) => updateField('how_they_help', e.target.value)}
            placeholder="Open to coffee chats, can intro to VCs, hiring interns..."
            rows={3}
            className={inputClass + " resize-none min-h-[88px]"}
          />
        </div>

        <div>
          <label htmlFor="tag-input" className="block text-sm font-medium text-text mb-1.5">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              id="tag-input"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="e.g. fintech, mentor, hiring"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addTag}
              className="shrink-0 border border-border text-text hover:bg-surface-lighter px-4 rounded-lg text-sm font-medium min-h-[44px] cursor-pointer"
            >
              Add
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-surface-lighter text-text text-xs rounded-full px-3 py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-text-muted hover:text-text min-w-[20px] min-h-[20px] inline-flex items-center justify-center cursor-pointer"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg text-sm min-h-[44px] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Contact'}
        </button>
      </form>
    </div>
  )
}
