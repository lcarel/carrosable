'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { trails, getTrailById } from '@/data/trails'
import { Review } from '@/types'
import StrollerBadge, { StrollerLevelInfo, PramMeter } from '@/components/StrollerBadge'
import VoteButton from '@/components/VoteButton'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import StarRating from '@/components/StarRating'
import { notFound } from 'next/navigation'
import { fetchReviews, addReview } from '@/lib/reviewsApi'

const TrailDetailMap = dynamic(() => import('@/components/TrailDetailMap'), {
  ssr: false,
  loading: () => (
    <div
      className="animate-pulse"
      style={{ height: 200, borderRadius: 14, background: 'var(--line-2)', border: '1px solid var(--line)' }}
    />
  ),
})

interface PageProps {
  params: { id: string }
}

/* Inline SVG helper */
function Icon({ id, size = 16 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <use href={`#${id}`} />
    </svg>
  )
}

export default function TrailPage({ params }: PageProps) {
  const trail = getTrailById(params.id)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  useEffect(() => {
    if (!trail) return
    fetchReviews(trail.id)
      .then(setReviews)
      .catch(console.error)
      .finally(() => setReviewsLoading(false))
  }, [trail])

  if (!trail) return notFound()

  const avgRating =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0

  const handleNewReview = async (review: Omit<Review, 'id' | 'date'>) => {
    const saved = await addReview(review)
    setReviews((prev) => [saved, ...prev])
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 32px 96px' }}>
      {/* Back */}
      <a
        href="/"
        className="inline-flex items-center gap-2 group mb-8"
        style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)', textDecoration: 'none' }}
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">
          <Icon id="i-arrow-left" size={16} />
        </span>
        Retour aux balades
      </a>

      {/* Header */}
      <header className="mb-8">
        <StrollerBadge level={trail.strollerLevel} size="md" />
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-.03em', margin: '14px 0 10px', color: 'var(--ink)' }}>
          {trail.name}
        </h1>
        <div className="flex items-center gap-1.5" style={{ fontSize: 14, color: 'var(--ink-3)' }}>
          <Icon id="i-pin" size={14} />
          {trail.location}, {trail.region}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Left column ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { iconId: 'i-route', value: `${trail.distance} km`, label: 'Distance' },
              { iconId: 'i-clock', value: trail.duration, label: 'Durée' },
              { iconId: 'i-elev', value: `+${trail.elevation} m`, label: 'Dénivelé' },
            ].map(({ iconId, value, label }) => (
              <div
                key={label}
                className="text-center"
                style={{
                  background: 'var(--accent-soft)',
                  border: '1px solid #cfdfd0',
                  borderRadius: 14,
                  padding: '16px 12px',
                }}
              >
                <div className="flex justify-center mb-2" style={{ color: 'var(--accent)' }}>
                  <Icon id={iconId} size={18} />
                </div>
                <p style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>{value}</p>
                <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.01em', color: 'var(--ink)', marginBottom: 10 }}>Description</h2>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.65, fontSize: 15 }}>{trail.description}</p>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 mb-3" style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}>
              <Icon id="i-tag" size={14} />
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {trail.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 13,
                    color: 'var(--ink-3)',
                    padding: '5px 12px',
                    borderRadius: 999,
                    border: '1px solid var(--line)',
                    background: 'var(--surface)',
                  }}
                >
                  <span style={{ color: 'var(--ink-4)' }}>#</span>{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Vote */}
          <div
            style={{
              background: 'var(--bg)',
              borderRadius: 14,
              padding: '20px',
              border: '1px solid var(--line)',
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 12 }}>
              Cette balade vous a été utile ?
            </h2>
            <VoteButton trailId={trail.id} />
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.01em', color: 'var(--ink)', margin: 0 }}>
                Avis{' '}
                <span style={{ color: 'var(--ink-4)', fontWeight: 500 }}>
                  ({reviewsLoading ? '…' : reviews.length})
                </span>
              </h2>
              {avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating value={Math.round(avgRating)} readonly size="sm" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
                    {avgRating.toFixed(1)}/5
                  </span>
                </div>
              )}
            </div>
            {reviewsLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse" style={{ height: 96, borderRadius: 14, background: 'var(--line-2)' }} />
                ))}
              </div>
            ) : (
              <ReviewList reviews={reviews} />
            )}
          </div>

          <ReviewForm trailId={trail.id} onSubmit={handleNewReview} />
        </div>

        {/* ── Sidebar ──────────────────────────────────── */}
        <div className="space-y-6">
          {/* Stroller level */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 10 }}>
              Niveau carrossabilité
            </h3>
            <StrollerLevelInfo level={trail.strollerLevel} />
          </div>

          {/* Map */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 10 }}>
              Localisation
            </h3>
            <TrailDetailMap trail={trail} />
          </div>

          {/* Other trails */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 10 }}>
              Autres balades
            </h3>
            <div className="space-y-2">
              {trails
                .filter((t) => t.id !== trail.id)
                .slice(0, 4)
                .map((t) => (
                  <a
                    key={t.id}
                    href={`/balades/${t.id}`}
                    className="flex items-start gap-3 group"
                    style={{
                      padding: '12px 14px',
                      background: 'var(--surface)',
                      borderRadius: 12,
                      border: '1px solid var(--line)',
                      transition: 'border-color .15s, background .15s',
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        className="group-hover:text-[var(--accent)] transition-colors">
                        {t.name}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{t.location}</p>
                      <div className="mt-2">
                        <PramMeter level={t.strollerLevel} size={13} />
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
