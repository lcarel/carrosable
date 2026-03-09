'use client'

import { useState } from 'react'
import StarRating from './StarRating'
import { Review } from '@/types'

interface ReviewFormProps {
  trailId: string
  onSubmit: (review: Review) => void
}

const strollerTypes = [
  'Poussette citadine',
  'Poussette tout-terrain',
  'Poussette sport / jogging',
  'Poussette double',
  'Tricycle enfant',
  'Autre',
]

export default function ReviewForm({ trailId, onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [strollerType, setStrollerType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim()) return setError('Merci de renseigner votre prénom.')
    if (rating === 0) return setError('Merci de donner une note.')
    if (!comment.trim()) return setError('Merci de laisser un commentaire.')

    const review: Review = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      trailId,
      author: author.trim(),
      rating,
      comment: comment.trim(),
      strollerType,
      date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
    }

    onSubmit(review)
    setSubmitted(true)
    setAuthor('')
    setRating(0)
    setComment('')
    setStrollerType('')
    setError('')
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-2xl p-5 border border-gray-200"
    >
      <h3 className="font-bold text-gray-900 mb-4 text-lg">Laisser un avis</h3>

      {submitted && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
          ✅ Merci pour votre avis ! Il a bien été enregistré.
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Votre prénom *</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Marie"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note *</label>
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de poussette</label>
          <select
            value={strollerType}
            onChange={(e) => setStrollerType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">Sélectionner (facultatif)</option>
            {strollerTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Votre avis *</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Décrivez votre expérience... L'état du chemin, la difficulté pour la poussette, les points d'intérêt..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
        >
          Publier mon avis
        </button>
      </div>
    </form>
  )
}
