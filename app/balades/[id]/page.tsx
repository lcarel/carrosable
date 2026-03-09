'use client'

import { useState, useEffect } from 'react'
import { trails, getTrailById } from '@/data/trails'
import { Review } from '@/types'
import StrollerBadge, { StrollerLevelInfo } from '@/components/StrollerBadge'
import VoteButton from '@/components/VoteButton'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import StarRating from '@/components/StarRating'
import Image from 'next/image'
import { MapPin, Clock, TrendingUp, Route, ArrowLeft, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { id: string }
}

export default function TrailPage({ params }: PageProps) {
  const trail = getTrailById(params.id)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    if (!trail) return
    const stored = localStorage.getItem(`reviews_${trail.id}`)
    if (stored) {
      try {
        setReviews(JSON.parse(stored))
      } catch {
        setReviews([])
      }
    }
  }, [trail])

  if (!trail) return notFound()

  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0

  const handleNewReview = (review: Review) => {
    const updated = [review, ...reviews]
    setReviews(updated)
    localStorage.setItem(`reviews_${trail.id}`, JSON.stringify(updated))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back */}
      <a
        href="/"
        className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-medium text-sm mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Retour aux balades
      </a>

      {/* Hero image */}
      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden mb-8 shadow-lg">
        <Image
          src={trail.imageUrl}
          alt={trail.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="mb-2">
            <StrollerBadge level={trail.strollerLevel} size="md" />
          </div>
          <h1 className="text-white text-3xl font-bold leading-tight drop-shadow">{trail.name}</h1>
          <div className="flex items-center gap-2 mt-1 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{trail.location}, {trail.region}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Route className="w-5 h-5" />, value: `${trail.distance} km`, label: 'Distance' },
              { icon: <Clock className="w-5 h-5" />, value: trail.duration, label: 'Durée' },
              { icon: <TrendingUp className="w-5 h-5" />, value: `+${trail.elevation} m`, label: 'Dénivelé' },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center"
              >
                <div className="text-green-600 flex justify-center mb-1">{icon}</div>
                <p className="font-bold text-gray-900 text-lg leading-none">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="font-bold text-gray-900 text-xl mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{trail.description}</p>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm font-medium">
              <Tag className="w-4 h-4" />
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {trail.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-green-50 border border-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Vote */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <h2 className="font-bold text-gray-900 mb-3">Cette balade vous a été utile ?</h2>
            <VoteButton trailId={trail.id} />
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 text-xl">
                Avis ({reviews.length})
              </h2>
              {avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating value={Math.round(avgRating)} readonly size="sm" />
                  <span className="text-sm font-semibold text-gray-700">{avgRating.toFixed(1)}/5</span>
                </div>
              )}
            </div>
            <ReviewList reviews={reviews} />
          </div>

          <ReviewForm trailId={trail.id} onSubmit={handleNewReview} />
        </div>

        {/* Right column: sidebar */}
        <div className="space-y-6">
          {/* Stroller info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Niveau carrossabilité</h3>
            <StrollerLevelInfo level={trail.strollerLevel} />
          </div>

          {/* Map placeholder */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Localisation</h3>
            <div className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
              <div className="h-52 relative bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl mb-2">🗺️</p>
                  <p className="text-sm font-medium text-gray-600">{trail.location}</p>
                  <p className="text-xs text-gray-400 mt-1">{trail.region}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {trail.coordinates.lat.toFixed(4)}, {trail.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
              <a
                href={`https://www.openstreetmap.org/?mlat=${trail.coordinates.lat}&mlon=${trail.coordinates.lng}&zoom=13`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-green-700 hover:text-green-900 font-medium py-3 border-t border-gray-200"
              >
                Voir sur OpenStreetMap →
              </a>
            </div>
          </div>

          {/* Other trails */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Autres balades</h3>
            <div className="space-y-2">
              {trails
                .filter((t) => t.id !== trail.id)
                .slice(0, 4)
                .map((t) => (
                  <a
                    key={t.id}
                    href={`/balades/${t.id}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={t.imageUrl}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 truncate leading-tight">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{t.location}</p>
                      <div className="mt-0.5">
                        <StrollerBadge level={t.strollerLevel} showLabel={false} size="sm" />
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
