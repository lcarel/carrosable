import { Review } from '@/types'
import { PramMeter } from './StrollerBadge'

interface ReviewListProps {
  reviews: Review[]
}

function Icon({ id, size = 14 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <use href={`#${id}`} />
    </svg>
  )
}

const strollerIconMap: Record<string, string> = {
  'Poussette citadine': 'i-stroller-narrow',
  'Poussette tout-terrain': 'i-stroller-wide',
  'Poussette sport / jogging': 'i-stroller-wide',
  'Poussette double': 'i-stroller-wide',
  'Porte-bébé': 'i-baby-carrier',
  'Trio / combinée': 'i-stroller-wide',
  'Autre': 'i-pram',
}

function pramLevel(rating: number): 1 | 2 | 3 {
  if (rating <= 1) return 1
  if (rating <= 2) return 2
  return 3
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div style={{ background: 'var(--surface)', border: '1px dashed var(--line)', borderRadius: 14, padding: '48px 24px', textAlign: 'center', color: 'var(--ink-3)' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
          <Icon id="i-chat" size={22} />
        </div>
        <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>Aucun avis pour le moment</p>
        <p style={{ fontSize: 13 }}>Soyez le premier à partager votre expérience.</p>
      </div>
    )
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  const avgPram = pramLevel(avg)

  return (
    <div>
      {/* Summary card */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 24, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 32, alignItems: 'center', marginBottom: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1, color: 'var(--ink)' }}>
            {avg.toFixed(1)}<small style={{ fontSize: 18, color: 'var(--ink-3)', fontWeight: 600, marginLeft: 2 }}>/3</small>
          </div>
          <PramMeter level={avgPram} size={18} />
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>basé sur {reviews.length} avis</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {([3, 2, 1] as const).map((level) => {
            const count = reviews.filter((r) => pramLevel(r.rating) === level).length
            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
            return (
              <div key={level} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 36px', gap: 10, alignItems: 'center', fontSize: 12, color: 'var(--ink-3)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: 'var(--ink-2)', fontWeight: 600 }}>
                  {Array.from({ length: level }).map((_, i) => (
                    <svg key={i} width={13} height={13} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <use href="#i-pram-wheel" />
                    </svg>
                  ))}
                </span>
                <div style={{ height: 6, background: 'var(--line-2)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 999 }} />
                </div>
                <span>{Math.round(pct)}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Review items */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {reviews.map((review, i) => (
          <div
            key={review.id}
            style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, padding: '22px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}
          >
            {/* Avatar */}
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent-ink)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 15, letterSpacing: '-.01em' }}>
              {review.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{review.author}</span>
                <span style={{ display: 'inline-flex', gap: 3, marginLeft: 4 }}>
                  <PramMeter level={pramLevel(review.rating)} size={14} />
                </span>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{review.date}</span>
                {review.strollerType && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--line-2)', color: 'var(--ink-2)', borderRadius: 999, padding: '3px 9px', fontSize: 11, fontWeight: 600 }}>
                    <Icon id={strollerIconMap[review.strollerType] ?? 'i-pram'} size={12} />
                    {review.strollerType}
                  </span>
                )}
              </div>
              <p style={{ marginTop: 6, color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.6, maxWidth: '60ch', marginBottom: 10 }}>
                {review.comment}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--ink-3)', fontSize: 12.5 }}>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-3)', fontSize: 12.5, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Icon id="i-thumb-up" size={13} /> Utile
                </button>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-3)', fontSize: 12.5, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Icon id="i-chat" size={13} /> Répondre
                </button>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-3)', fontSize: 12.5, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginLeft: 'auto' }}>
                  <Icon id="i-flag" size={13} /> Signaler
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
