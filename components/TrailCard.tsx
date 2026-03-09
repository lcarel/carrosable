import { Trail } from '@/types'
import StrollerBadge from './StrollerBadge'
import Image from 'next/image'
import { MapPin, Clock, TrendingUp, Route } from 'lucide-react'

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
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={trail.imageUrl}
          alt={trail.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <StrollerBadge level={trail.strollerLevel} showLabel={false} size="sm" />
        </div>
        {voteCount > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700">
            👍 {voteCount}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight line-clamp-2">
            {trail.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{trail.location}, {trail.region}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Route className="w-3.5 h-3.5" />
            {trail.distance} km
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {trail.duration}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +{trail.elevation} m
          </span>
        </div>

        <div className="flex items-center justify-between">
          <StrollerBadge level={trail.strollerLevel} size="sm" />
          {avgRating > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-sm">★</span>
              <span className="text-sm font-semibold text-gray-700">{avgRating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({reviewCount})</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {trail.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
