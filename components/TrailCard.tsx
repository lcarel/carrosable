import { Trail } from '@/types'
import StrollerBadge from './StrollerBadge'

interface TrailCardProps {
  trail: Trail
  avgRating?: number
  reviewCount?: number
  voteCount?: number
}

export default function TrailCard({ trail, avgRating = 0, reviewCount = 0, voteCount = 0 }: TrailCardProps) {
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
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform .2s ease, border-color .2s ease, box-shadow .2s ease',
      }}
    >
      {/* Card body */}
      <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {/* Badge row */}
        <div className="flex items-center justify-between">
          <StrollerBadge level={trail.strollerLevel} showLabel={true} />
          {voteCount > 0 && (
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
              👍 {voteCount}
            </span>
          )}
        </div>
        {/* Location */}
        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500, letterSpacing: '.01em', textTransform: 'uppercase' }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-4)', flexShrink: 0 }}>
            <use href="#i-pin" />
          </svg>
          {trail.location}, {trail.region}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.015em', margin: 0, color: 'var(--ink)' }} className="group-hover:text-[var(--accent)] transition-colors line-clamp-2">
          {trail.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {trail.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              <span style={{ color: 'var(--ink-4)' }}>#</span>{tag}
            </span>
          ))}
        </div>

        {/* Meta stats */}
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
          {avgRating > 0 && (
            <span className="ml-auto flex items-center gap-1" style={{ color: 'var(--ink-3)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#f59e0b' }}>
                <use href="#i-star" />
              </svg>
              <span style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{avgRating.toFixed(1)}</span>
              <span style={{ color: 'var(--ink-4)', fontSize: 12 }}>({reviewCount})</span>
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
