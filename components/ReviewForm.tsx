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

const ratingLabels: Record<number, string> = {
  1: 'Peu carrossable',
  2: 'Carrossable',
  3: 'Très carrossable',
}

const conditionTags = [
  { label: 'Ombragé', icon: 'i-tree' },
  { label: 'Ensoleillé', icon: 'i-sun' },
  { label: 'Près de l\'eau', icon: 'i-water' },
  { label: 'Tout-terrain', icon: 'i-stroller-wide' },
  { label: 'Citadine', icon: 'i-stroller-narrow' },
  { label: 'Porte-bébé', icon: 'i-baby-carrier' },
]

export default function ReviewForm({ trailId, onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [strollerType, setStrollerType] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const displayRating = hoverRating || rating

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim()) return setError('Merci de renseigner votre prénom.')
    if (rating === 0) return setError('Merci de donner une note.')
    if (!comment.trim()) return setError('Merci de laisser un commentaire.')

    setSubmitting(true)
    setError('')
    try {
      await onSubmit({ trailId, author: author.trim(), rating, comment: comment.trim(), strollerType: strollerType || undefined })
      setSubmitted(true)
      setAuthor(''); setRating(0); setComment(''); setStrollerType(''); setSelectedTags([])
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      setError('Une erreur est survenue. Merci de réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 10,
    padding: '12px 14px', fontSize: 14, outline: 'none', width: '100%',
    fontFamily: 'inherit', color: 'var(--ink)', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 0,
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-.015em' }}>Laisser un avis</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>Quelques secondes — ça aide énormément les autres parents.</div>
        </div>
      </div>

      {submitted && (
        <div style={{ background: 'var(--accent-soft)', border: '1px solid #cfdfd0', borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 500, color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon id="i-check" size={14} />
          Merci pour votre avis ! Il a bien été enregistré.
        </div>
      )}
      {error && (
        <div style={{ background: '#fff5f5', border: '1px solid #fcc', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#c0392b' }}>
          {error}
        </div>
      )}

      {/* Name + stroller type */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={labelStyle}>
            Votre prénom <span style={{ color: 'var(--accent)', fontWeight: 700 }}>*</span>
          </label>
          <input style={inputStyle} placeholder="Marie" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={labelStyle}>
            Type de poussette <span style={{ color: 'var(--ink-4)', fontWeight: 500, fontSize: 12, marginLeft: 4 }}>(facultatif)</span>
          </label>
          <div style={{ position: 'relative' }}>
            <select
              style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none', paddingRight: 40, cursor: 'pointer' }}
              value={strollerType}
              onChange={(e) => setStrollerType(e.target.value)}
            >
              <option value="">Sélectionner</option>
              <option>Poussette citadine</option>
              <option>Poussette tout-terrain</option>
              <option>Trio / combinée</option>
              <option>Porte-bébé</option>
            </select>
            <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-70%) rotate(45deg)', width: 8, height: 8, borderRight: '1.5px solid var(--ink-3)', borderBottom: '1.5px solid var(--ink-3)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* Pram rating */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>
          Votre note de carrossabilité <span style={{ color: 'var(--accent)', fontWeight: 700 }}>*</span>
        </label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[1, 2, 3].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRating(r)}
              onMouseEnter={() => setHoverRating(r)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={ratingLabels[r]}
              style={{
                width: 42, height: 42, borderRadius: 10, border: '1px solid var(--line)', background: displayRating >= r ? 'var(--accent-soft)' : '#fff',
                display: 'grid', placeItems: 'center', color: displayRating >= r ? 'var(--accent)' : 'var(--ink-4)',
                borderColor: displayRating >= r ? '#cfdfd0' : 'var(--line)', cursor: 'pointer', transition: 'all .15s',
              }}
            >
              <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <use href="#i-pram-wheel" />
              </svg>
            </button>
          ))}
          <span style={{ marginLeft: 6, fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}>
            {displayRating > 0 ? ratingLabels[displayRating] : 'Cliquez pour noter de 1 à 3 roues'}
          </span>
        </div>
      </div>

      {/* Condition tags */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>
          Conditions rencontrées <span style={{ color: 'var(--ink-4)', fontWeight: 500, fontSize: 12, marginLeft: 4 }}>(facultatif)</span>
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {conditionTags.map(({ label, icon }) => {
            const active = selectedTags.includes(label)
            return (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedTags(active ? selectedTags.filter(t => t !== label) : [...selectedTags, label])}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 999,
                  border: `1px solid ${active ? '#cfdfd0' : 'var(--line)'}`, background: active ? 'var(--accent-soft)' : 'var(--surface)',
                  fontSize: 13, color: active ? 'var(--accent-ink)' : 'var(--ink-2)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>
          Votre avis <span style={{ color: 'var(--accent)', fontWeight: 700 }}>*</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Décrivez votre expérience : état du chemin, passages délicats, points d'intérêt, conseils pour les parents…"
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 120, lineHeight: 1.55 }}
        />
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 8 }}>
        <p style={{ fontSize: 12, color: 'var(--ink-3)', maxWidth: '36ch', margin: 0 }}>
          En publiant, vous acceptez nos règles de la communauté. Votre prénom seul est affiché.
        </p>
        <button
          type="submit"
          disabled={submitting}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999,
            background: submitting ? 'var(--ink-3)' : 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 14,
            border: 'none', cursor: submitting ? 'default' : 'pointer', fontFamily: 'inherit', flexShrink: 0,
          }}
        >
          <Icon id="i-check" size={15} />
          {submitting ? 'Publication…' : 'Publier mon avis'}
        </button>
      </div>
    </form>
  )
}
