'use client'

import { useState } from 'react'
import { Review } from '@/types'

interface ReviewFormProps {
  trailId: string
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => Promise<void>
}

function Icon({ id, size = 16 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <use href={`#${id}`} />
    </svg>
  )
}

const strollerTypes = [
  { label: 'Poussette citadine', icon: 'i-stroller-narrow' },
  { label: 'Poussette tout-terrain', icon: 'i-stroller-wide' },
  { label: 'Poussette sport / jogging', icon: 'i-stroller-wide' },
  { label: 'Poussette double', icon: 'i-stroller-wide' },
  { label: 'Autre', icon: 'i-pram' },
]

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
        >
          <svg
            width={26}
            height={26}
            viewBox="0 0 24 24"
            fill={i <= (hover || value) ? '#f5a623' : 'none'}
            stroke="#f5a623"
            strokeWidth={1.5}
            style={{ transition: 'fill .1s' }}
          >
            <use href="#i-star" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function ReviewForm({ trailId, onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [strollerType, setStrollerType] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim()) return setError('Merci de renseigner votre prénom.')
    if (rating === 0) return setError('Merci de donner une note.')
    if (!comment.trim()) return setError('Merci de laisser un commentaire.')

    setSubmitting(true)
    setError('')

    try {
      await onSubmit({
        trailId,
        author: author.trim(),
        rating,
        comment: comment.trim(),
        strollerType: strollerType || undefined,
      })
      setSubmitted(true)
      setAuthor('')
      setRating(0)
      setComment('')
      setStrollerType('')
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      setError('Une erreur est survenue. Merci de réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid var(--line)',
    borderRadius: 10,
    fontSize: 14,
    color: 'var(--ink)',
    background: 'var(--bg)',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--ink-2)',
    marginBottom: 6,
    display: 'block',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 16,
        padding: '24px',
      }}
    >
      <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)', margin: '0 0 20px' }}>
        Laisser un avis
      </h3>

      {submitted && (
        <div
          style={{
            marginBottom: 16,
            background: 'var(--accent-soft)',
            border: '1px solid #cfdfd0',
            borderRadius: 10,
            padding: '12px 16px',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--accent-ink)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Icon id="i-check" size={14} />
          Merci pour votre avis ! Il a bien été enregistré.
        </div>
      )}

      {error && (
        <div
          style={{
            marginBottom: 16,
            background: '#fff5f5',
            border: '1px solid #fcc',
            borderRadius: 10,
            padding: '12px 16px',
            fontSize: 13,
            color: '#c0392b',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Name */}
        <div>
          <label style={labelStyle}>Votre prénom *</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Marie"
            style={inputStyle}
          />
        </div>

        {/* Rating */}
        <div>
          <label style={labelStyle}>Note *</label>
          <StarPicker value={rating} onChange={setRating} />
        </div>

        {/* Stroller type chips */}
        <div>
          <label style={labelStyle}>Type de poussette</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {strollerTypes.map(({ label, icon }) => {
              const active = strollerType === label
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStrollerType(active ? '' : label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 12px',
                    borderRadius: 999,
                    border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                    background: active ? 'var(--accent-soft)' : 'var(--bg)',
                    color: active ? 'var(--accent)' : 'var(--ink-3)',
                    fontSize: 12,
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  <Icon id={icon} size={13} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label style={labelStyle}>Votre avis *</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Décrivez votre expérience... L'état du chemin, la difficulté pour la poussette, les points d'intérêt..."
            rows={4}
            style={{ ...inputStyle, resize: 'none' }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 10,
            border: 'none',
            background: submitting ? 'var(--ink-3)' : 'var(--accent)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            cursor: submitting ? 'default' : 'pointer',
            fontFamily: 'inherit',
            transition: 'background .15s',
          }}
        >
          {submitting ? 'Publication en cours…' : 'Publier mon avis'}
        </button>
      </div>
    </form>
  )
}
