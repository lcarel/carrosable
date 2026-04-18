import { StrollerLevel } from '@/types'

/* Pram wheel icon — matching i-pram-wheel from the design */
export function PramWheel({ active, size = 16 }: { active: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: active ? 'var(--accent)' : 'var(--line)', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
    </svg>
  )
}

/* Row of 1–3 pram wheels */
export function PramMeter({ level, size = 16 }: { level: StrollerLevel; size?: number }) {
  return (
    <span className="flex items-center gap-1">
      {([1, 2, 3] as StrollerLevel[]).map((i) => (
        <PramWheel key={i} active={i <= level} size={size} />
      ))}
    </span>
  )
}

const levelLabel: Record<StrollerLevel, string> = {
  1: 'Peu carrossable',
  2: 'Carrossable',
  3: 'Très carrossable',
}

const levelDescription: Record<StrollerLevel, string> = {
  1: 'Terrain difficile – poussette tout-terrain recommandée',
  2: 'Praticable – poussette robuste conseillée',
  3: 'Idéal – toutes les poussettes passent',
}

interface StrollerBadgeProps {
  level: StrollerLevel
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function StrollerBadge({ level, showLabel = true, size = 'md' }: StrollerBadgeProps) {
  const wheelSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16

  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        padding: '5px 10px',
        borderRadius: 999,
        background: 'rgba(255,255,255,.95)',
        border: '1px solid var(--line)',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--accent-ink)',
        letterSpacing: 0,
      }}
    >
      <PramMeter level={level} size={wheelSize} />
      {showLabel && <span>{levelLabel[level]}</span>}
    </span>
  )
}

export function StrollerLevelInfo({ level }: { level: StrollerLevel }) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: '1px solid var(--line)',
        padding: '16px',
        background: 'var(--accent-soft)',
      }}
    >
      <div className="flex items-start gap-3">
        <PramMeter level={level} size={20} />
        <div>
          <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', margin: 0 }}>
            {levelLabel[level]}
          </p>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>
            {levelDescription[level]}
          </p>
        </div>
      </div>
    </div>
  )
}
