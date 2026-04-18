import { Review } from '@/types'

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

function StarBar({ value, total }: { value: number; total: number }) {
  const pct = total > 0 ? (value / total) * 100 : 0
  return (
    <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'var(--line-2)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: '#f5a623', borderRadius: 999 }} />
    </div>
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

const strollerIconMap: Record<string, string> = {
  'Poussette citadine': 'i-stroller-narrow',
  'Poussette tout-terrain': 'i-stroller-wide',
  'Poussette sport / jogging': 'i-stroller-wide',
  'Poussette double': 'i-stroller-wide',
  'Tricycle enfant': 'i-pram',
  'Autre': 'i-pram',
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--ink-4)',
          border: '1px dashed var(--line)',
          borderRadius: 14,
        }}
      >
        <div style={{ marginBottom: 10, color: 'var(--ink-3)' }}>
          <Icon id="i-chat" size={28} />
        </div>
        <p style={{ fontWeight: 500, fontSize: 14, color: 'var(--ink-3)', margin: 0 }}>Aucun avis pour le moment</p>
        <p style={{ fontSize: 13, color: 'var(--ink-4)', marginTop: 4 }}>Soyez le premier à partager votre expérience !</p>
      </div>
    )
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  return (
    <div>
      {/* Summary card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 14,
          padding: '18px 20px',
          marginBottom: 20,
        }}
      >
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--ink)', lineHeight: 1 }}>
            {avg.toFixed(1)}
          </div>
          <div style={{ marginTop: 6 }}>
            <Stars value={Math.round(avg)} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 4 }}>{reviews.length} avis</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length
            return (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)', width: 8, textAlign: 'right' }}>{star}</span>
                <svg width={11} height={11} viewBox="0 0 24 24" fill="#f5a623" stroke="#f5a623" strokeWidth={1.5}>
                  <use href="#i-star" />
                </svg>
                <StarBar value={count} total={reviews.length} />
                <span style={{ fontSize: 12, color: 'var(--ink-4)', width: 18 }}>{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Review items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              padding: '16px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Avatar */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--accent-soft)',
                    border: '1.5px solid #cfdfd0',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}
                >
                  {review.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{review.author}</div>
                  {review.strollerType && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                      <span style={{ color: 'var(--ink-3)' }}>
                        <Icon id={strollerIconMap[review.strollerType] ?? 'i-pram'} size={12} />
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{review.strollerType}</span>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <Stars value={review.rating} />
                <span style={{ fontSize: 12, color: 'var(--ink-4)' }}>{review.date}</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
