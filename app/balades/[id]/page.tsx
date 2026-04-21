'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { trails, getTrailById } from '@/data/trails'
import { Review } from '@/types'
import { PramMeter } from '@/components/StrollerBadge'
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

  const handleNewReview = async (review: Omit<Review, 'id' | 'date'>) => {
    const saved = await addReview(review)
    setReviews((prev) => [saved, ...prev])
  }

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px 96px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-3)', padding: '24px 0 8px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Icon id="i-back" size={14} />
        </a>
        <a href="/" className="hover:text-[var(--ink)] transition-colors">Explorer</a>
        <Icon id="i-chev" size={12} />
        <a href="/" className="hover:text-[var(--ink)] transition-colors">{trail.region}</a>
        <Icon id="i-chev" size={12} />
        <span style={{ color: 'var(--ink-2)' }}>{trail.name}</span>
      </nav>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, padding: '8px 0 28px' }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-.025em', margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.1 }}>
            {trail.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: 'var(--ink-3)', fontSize: 14, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon id="i-pin" size={15} />
              {trail.location}, {trail.region}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon id="i-route" size={15} />
              {trail.distance} km
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon id="i-clock" size={15} />
              {trail.duration}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon id="i-elev" size={15} />
              +{trail.elevation} m
            </span>
            <span title={trail.strollerLevel === 1 ? 'Peu carrossable' : trail.strollerLevel === 2 ? 'Carrossable' : 'Très carrossable'}>
              <PramMeter level={trail.strollerLevel as 1 | 2 | 3} size={15} />
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            aria-label="Sauvegarder"
            style={{ width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--ink-2)', cursor: 'pointer' }}
          >
            <Icon id="i-heart" size={16} />
          </button>
          <button
            aria-label="Partager"
            style={{ width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--ink-2)', cursor: 'pointer' }}
          >
            <Icon id="i-share" size={16} />
          </button>
        </div>
      </div>

      {/* 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, paddingTop: 36 }} className="trail-layout">

        {/* ── Left column ── */}
        <div>

          {/* Aperçu */}
          <section style={{ paddingBottom: 36, borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-3)', margin: '0 0 18px' }}>Aperçu</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.65, maxWidth: '62ch', margin: 0 }}>
              {trail.description}
            </p>
            {trail.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                {trail.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 13, color: 'var(--ink-3)', padding: '4px 12px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--surface)' }}>
                    <span style={{ color: 'var(--ink-4)' }}>#</span>{tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Helpful */}
          <section style={{ padding: '36px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
              <VoteButton trailId={trail.id} />
            </div>
          </section>

          {/* Avis */}
          <section style={{ padding: '36px 0', borderBottom: '1px solid var(--line)' }} id="avis">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>Avis</span>
                <span style={{ color: 'var(--ink-3)', fontSize: 14, fontWeight: 500 }}>
                  {reviewsLoading ? '…' : `${reviews.length} retour${reviews.length !== 1 ? 's' : ''} de parents`}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ display: 'flex', background: 'var(--line-2)', borderRadius: 999, padding: 4 }}>
                  {['Récents', 'Mieux notés'].map((label, i) => (
                    <button key={label} style={{ padding: '7px 14px', fontSize: 13, fontWeight: 600, borderRadius: 999, color: i === 0 ? 'var(--ink)' : 'var(--ink-3)', background: i === 0 ? '#fff' : 'transparent', boxShadow: i === 0 ? 'var(--shadow-sm)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                      {label}
                    </button>
                  ))}
                </div>
                <a href="#laisser" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 14 }}>
                  <Icon id="i-plus" size={14} />
                  Laisser un avis
                </a>
              </div>
            </div>

            {reviewsLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse" style={{ height: 80, borderRadius: 14, background: 'var(--line-2)' }} />
                ))}
              </div>
            ) : (
              <ReviewList reviews={reviews} />
            )}
          </section>

          {/* Form */}
          <section style={{ paddingTop: 36 }} id="laisser">
            <ReviewForm trailId={trail.id} onSubmit={handleNewReview} />
          </section>
        </div>

        {/* ── Sidebar ── */}
        <aside style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: 'i-route', label: 'Distance', value: `${trail.distance} km — boucle` },
              { icon: 'i-clock', label: 'Durée', value: `≈ ${trail.duration}` },
              { icon: 'i-elev', label: 'Dénivelé', value: `+${trail.elevation} m` },
              { icon: 'i-tree', label: 'Terrain', value: trail.tags.filter(t => ['asphalte', 'gravier', 'terre', 'piste'].includes(t)).join(', ') || trail.tags[0] || '—' },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid var(--line-2)', fontSize: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ink-3)' }}>
                  <Icon id={icon} size={15} />
                  {label}
                </span>
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid var(--line-2)', fontSize: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ink-3)' }}>
                <Icon id="i-pram" size={15} />
                Carrossable
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <PramMeter level={trail.strollerLevel as 1 | 2 | 3} size={16} />
              </span>
            </div>

            <button style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 18px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginTop: 6 }}>
              <Icon id="i-pin" size={16} />
              Voir sur la carte
            </button>
            <button style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 18px', borderRadius: 999, background: 'var(--surface)', color: 'var(--ink)', fontWeight: 600, fontSize: 15, border: '1px solid var(--line)', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Icon id="i-share" size={16} />
              Partager
            </button>
          </div>

          {/* Map */}
          <div style={{ marginTop: 16 }}>
            <TrailDetailMap trail={trail} />
          </div>

          {/* Other trails */}
          {trails.filter((t) => t.id !== trail.id).length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 11, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                Autres balades
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {trails.filter((t) => t.id !== trail.id).slice(0, 4).map((t) => (
                  <a
                    key={t.id}
                    href={`/balades/${t.id}`}
                    className="group"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--line)', textDecoration: 'none', transition: 'border-color .15s' }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="group-hover:text-[var(--accent)] transition-colors">
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
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
