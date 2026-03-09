import { supabase, isSupabaseConfigured } from './supabase'
import { Review } from '@/types'

function rowToReview(row: Record<string, unknown>): Review {
  return {
    id: row.id as string,
    trailId: row.trail_id as string,
    author: row.author as string,
    rating: row.rating as number,
    comment: row.comment as string,
    strollerType: (row.stroller_type as string) || undefined,
    date: new Date(row.created_at as string).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}

export async function fetchReviews(trailId: string): Promise<Review[]> {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`reviews_${trailId}`)
    return stored ? JSON.parse(stored) : []
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('trail_id', trailId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(rowToReview)
}

export async function addReview(
  review: Omit<Review, 'id' | 'date'>
): Promise<Review> {
  if (!isSupabaseConfigured) {
    const newReview: Review = {
      ...review,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }
    const stored = localStorage.getItem(`reviews_${review.trailId}`)
    const existing: Review[] = stored ? JSON.parse(stored) : []
    localStorage.setItem(
      `reviews_${review.trailId}`,
      JSON.stringify([newReview, ...existing])
    )
    return newReview
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      trail_id: review.trailId,
      author: review.author,
      rating: review.rating,
      comment: review.comment,
      stroller_type: review.strollerType || null,
    })
    .select()
    .single()

  if (error) throw error
  return rowToReview(data)
}
