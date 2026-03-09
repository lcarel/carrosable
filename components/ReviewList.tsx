import { Review } from '@/types'
import StarRating from './StarRating'

interface ReviewListProps {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p className="text-4xl mb-3">💬</p>
        <p className="font-medium">Aucun avis pour le moment</p>
        <p className="text-sm mt-1">Soyez le premier à partager votre expérience !</p>
      </div>
    )
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
          <StarRating value={Math.round(avgRating)} readonly size="sm" />
          <p className="text-xs text-gray-500 mt-1">{reviews.length} avis</p>
        </div>
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length
            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
            return (
              <div key={star} className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 w-4 text-right">{star}</span>
                <span className="text-amber-400 text-xs">★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-400 h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-5">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                  {review.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-900">{review.author}</span>
              </div>
              {review.strollerType && (
                <span className="text-xs text-gray-500 ml-10">🛺 {review.strollerType}</span>
              )}
            </div>
            <div className="flex flex-col items-end gap-1">
              <StarRating value={review.rating} readonly size="sm" />
              <span className="text-xs text-gray-400">{review.date}</span>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
