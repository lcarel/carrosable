import { StrollerLevel } from '@/types'

interface StrollerBadgeProps {
  level: StrollerLevel
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const levelConfig = {
  1: {
    label: 'Peu carrossable',
    description: 'Terrain difficile – poussette tout-terrain recommandée',
    color: 'bg-red-100 text-red-700 border-red-200',
    dotColor: 'bg-red-500',
  },
  2: {
    label: 'Carrossable',
    description: 'Praticable – poussette robuste conseillée',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
  },
  3: {
    label: 'Très carrossable',
    description: 'Idéal – toutes les poussettes passent',
    color: 'bg-green-100 text-green-700 border-green-200',
    dotColor: 'bg-green-500',
  },
}

function StrollerIcon({ filled = false, size = 'md' }: { filled?: boolean; size?: string }) {
  const dim = size === 'sm' ? 16 : size === 'lg' ? 28 : 20
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? '' : 'opacity-30'}
    >
      {/* Stroller body */}
      <path d="M3 3h2l3.5 9H16a2 2 0 0 0 2-2V6" />
      <circle cx="8" cy="19" r="2" />
      <circle cx="16" cy="19" r="2" />
      <path d="M8.5 12 7 8" />
      {/* Hood */}
      <path d="M18 6c0-3-3-5-6-5" />
    </svg>
  )
}

export default function StrollerBadge({
  level,
  showLabel = true,
  size = 'md',
}: StrollerBadgeProps) {
  const config = levelConfig[level]

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-semibold ${config.color}`}
      >
        <div className="flex items-center gap-0.5">
          {[1, 2, 3].map((i) => (
            <span key={i} className={i <= level ? '' : 'opacity-25'}>
              <StrollerIcon filled={i <= level} size={size} />
            </span>
          ))}
        </div>
        {showLabel && <span className="ml-1">{config.label}</span>}
      </div>
    </div>
  )
}

export function StrollerLevelInfo({ level }: { level: StrollerLevel }) {
  const config = levelConfig[level]
  return (
    <div className={`rounded-xl border p-4 ${config.color}`}>
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-0.5 mt-0.5">
          {[1, 2, 3].map((i) => (
            <span key={i} className={i <= level ? '' : 'opacity-25'}>
              <StrollerIcon filled={i <= level} size="lg" />
            </span>
          ))}
        </div>
        <div>
          <p className="font-bold text-base">{config.label}</p>
          <p className="text-sm mt-0.5 opacity-80">{config.description}</p>
        </div>
      </div>
    </div>
  )
}
