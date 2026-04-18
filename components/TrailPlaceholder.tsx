import { StrollerLevel } from '@/types'

const config: Record<StrollerLevel, { gradient: string; emoji: string }> = {
  1: { gradient: 'from-red-400 to-orange-500', emoji: '🌿' },
  2: { gradient: 'from-amber-400 to-yellow-500', emoji: '🌳' },
  3: { gradient: 'from-green-500 to-teal-600', emoji: '🌲' },
}

interface TrailPlaceholderProps {
  level: StrollerLevel
  className?: string
  showEmoji?: boolean
}

export default function TrailPlaceholder({
  level,
  className = '',
  showEmoji = true,
}: TrailPlaceholderProps) {
  const { gradient, emoji } = config[level]
  return (
    <div
      className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}
    >
      {showEmoji && <span className="text-white/40 text-5xl select-none">{emoji}</span>}
    </div>
  )
}
