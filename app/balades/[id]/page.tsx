'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { trails, getTrailById } from '@/data/trails'
import { Review } from '@/types'
import StrollerBadge, { StrollerLevelInfo, PramMeter } from '@/components/StrollerBadge'
import VoteButton from '@/components/VoteButton'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
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

function Icon({ id, size = 16 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <use href={`#${id}`} />
    </svg>
  )
}

function Stars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= value ? '#f5a623' : 'none'} stroke="#f5a623" strokeWidth={1.5}>
          <use href="#i-star" />
        </svg>
      ))}
    </span>
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
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px 96px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-3)', marginBottom: 24 }}>
        <a href="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }} className="hover:text-[var(--accent)] transition-colors">
          Balades
        </a>
        <span style={{ color: 'var(--line)' }}>/</span>
        <span style={{ color: 'var(--ink-2)', fontWeight: 500 }}>{trail.name}</span>
      </nav>

      {/* Page header */}
      <header style={{ marginBottom: 28 }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
          <StrollerBadge level={trail.strollerLevel} size="md" />
          <span style={{ width: 1, height: 16, background: 'var(--line)', flexShrink: 0 }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--ink-3)' }}>
            <Icon id="i-pin" size={13} />
            {trail.location}, {trail.region}
          </span>
          {avgRating > 0 && (
            <>
              <span style={{ width: 1, height: 16, background: 'var(--line)', flexShrink: 0 }} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Stars value={Math.round(avgRating)} size={13} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
                  {avgRating.toFixed(1)}
                </span>
                <span style={{ fontSize: 13, color: 'var(--ink-4)' }}>
                  ({reviewsLoading ? '…' : reviews.length})
                </span>
              </span>
            </>
          )}
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-.03em', margin: '0 0 16px', color: 'var(--ink)', lineHeight: 1.15 }}>
          {trail.name}
        </h1>

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { icon: 'i-route', value: `${trail.distance} km`, label: 'Distance' },
            { icon: 'i-clock', value: trail.duration, label: 'Durée' },
            { icon: 'i-elev', value: `+${trail.elevation} m`, label: 'Dénivelé' },
          ].map(({ icon, value, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 14px',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 999,
                fontSize: 13,
              }}
            >
              <span style={{ color: 'var(--accent)' }}><Icon id={icon} size={14} /></span>
              <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{value}</span>
              <span style={{ color: 'var(--ink-4)' }}>{label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Main column ──────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Description */}
          <section>
            <h2 style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.01em', color: 'var(--ink)', marginBottom: 10 }}>
              Description
            </h2>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              {trail.description}
            </p>
          </section>

          {/* Tags */}
          {trail.tags.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 12, color: 'var(--ink-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                <Icon id="i-tag" size={13} />
                Caractéristiques
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
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
            </section>
          )}

          {/* Helpful / Vote */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              padding: '18px 20px',
            }}
          >
            <VoteButton trailId={trail.id} />
          </section>

          {/* Divider */}
          <div style={{ borderTop: '1px solid var(--line)' }} />

          {/* Reviews */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-.01em', color: 'var(--ink)', margin: 0 }}>
                Avis{' '}
                <span style={{ color: 'var(--ink-4)', fontWeight: 500 }}>
                  ({reviewsLoading ? '…' : reviews.length})
                </span>
              </h2>
            </div>
            {reviewsLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse" style={{ height: 100, borderRadius: 14, background: 'var(--line-2)' }} />
                ))}
              </div>
            ) : (
              <ReviewList reviews={reviews} />
            )}
          </section>

          {/* Review form */}
          <ReviewForm trailId={trail.id} onSubmit={handleNewReview} />
        </div>

        {/* ── Sidebar ──────────────────────────────────── */}
        <div className="space-y-6 lg:sticky lg:top-[88px] lg:self-start">

          {/* Stroller level */}
          <section>
            <h3 style={{ fontWeight: 700, fontSize: 11, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Niveau carrossabilité
            </h3>
            <StrollerLevelInfo level={trail.strollerLevel} />
          </section>

          {/* Map */}
          <section>
            <h3 style={{ fontWeight: 700, fontSize: 11, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Localisation
            </h3>
            <TrailDetailMap trail={trail} />
          </section>

          {/* Other trails */}
          <section>
            <h3 style={{ fontWeight: 700, fontSize: 11, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Autres balades
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {trails
                .filter((t) => t.id !== trail.id)
                .slice(0, 4)
                .map((t) => (
                  <a
                    key={t.id}
                    href={`/balades/${t.id}`}
                    className="group"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '12px 14px',
                      background: 'var(--surface)',
                      borderRadius: 12,
                      border: '1px solid var(--line)',
                      textDecoration: 'none',
                      transition: 'border-color .15s',
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        className="group-hover:text-[var(--accent)] transition-colors"
                      >
                        {t.name}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{t.location}</p>
                      <div style={{ marginTop: 6 }}>
                        <PramMeter level={t.strollerLevel} size={12} />
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
