import { Trail } from '@/types'
import { PramMeter } from './StrollerBadge'

const levelLabel = (l: number) =>
  l === 1 ? 'Peu carrossable' : l === 2 ? 'Carrossable' : 'Très carrossable'

interface TrailCardProps {
  trail: Trail
  badge?: 'new' | null
}

export default function TrailCard({ trail, badge = null }: TrailCardProps) {
  const shortNote = trail.description.split('.')[0]

  return (
    <a
      href={`/balades/${trail.id}`}
      className="group block"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 14,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform .2s ease, border-color .2s ease, box-shadow .2s ease',
      }}
    >
      <div style={{ padding: '22px 22px 22px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {/* Top: title block */}
        <div>
          <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500, letterSpacing: '.01em', textTransform: 'uppercase' }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-4)', flexShrink: 0 }}>
              <use href="#i-pin" />
            </svg>
            {trail.location}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.015em', margin: '4px 0 0', color: 'var(--ink)' }} className="group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            {trail.name}
          </h3>
        </div>

        {/* Short note */}
        {shortNote && (
          <p style={{ fontSize: 13, color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.45, margin: 0 }} className="line-clamp-2">
            {shortNote}.
          </p>
        )}

        {/* Rating pill + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div className="inline-flex items-center gap-2" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-ink)', background: 'var(--accent-soft)', borderRadius: 999, padding: '6px 10px' }}>
            <PramMeter level={trail.strollerLevel as 1 | 2 | 3} size={13} />
            <span style={{ letterSpacing: '.01em' }}>{levelLabel(trail.strollerLevel)}</span>
          </div>
          {badge === 'new' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, letterSpacing: '.02em', textTransform: 'uppercase', background: 'var(--accent-soft)', color: 'var(--accent-ink)', borderRadius: 999, padding: '4px 9px' }}>
              Nouveau
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {trail.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              <span style={{ color: 'var(--ink-4)' }}>#</span>{tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div
          className="flex items-center gap-4 mt-auto"
          style={{ paddingTop: 12, borderTop: '1px solid var(--line-2)', fontSize: 13, fontWeight: 500, color: 'var(--ink-2)' }}
        >
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)' }}>
              <use href="#i-route" />
            </svg>
            {trail.distance} km
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)' }}>
              <use href="#i-clock" />
            </svg>
            {trail.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)' }}>
              <use href="#i-elev" />
            </svg>
            +{trail.elevation} m
          </span>
        </div>
      </div>
    </a>
  )
}
