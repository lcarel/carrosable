'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { getSessionId } from '@/lib/supabase'
import { fetchVoteCounts, fetchUserVote, upsertVote } from '@/lib/votesApi'

interface VoteButtonProps {
  trailId: string
}

export default function VoteButton({ trailId }: VoteButtonProps) {
  const [userVote, setUserVote] = useState<1 | -1 | null>(null)
  const [votes, setVotes] = useState<{ up: number; down: number }>({ up: 0, down: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = getSessionId()
    Promise.all([fetchVoteCounts(trailId), fetchUserVote(trailId, sessionId)])
      .then(([counts, userVote]) => {
        setVotes(counts)
        setUserVote(userVote)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [trailId])

  const handleVote = async (value: 1 | -1) => {
    const sessionId = getSessionId()
    const newVote = userVote === value ? null : value

    // Optimistic update
    const newCounts = { ...votes }
    if (userVote === 1) newCounts.up = Math.max(0, newCounts.up - 1)
    if (userVote === -1) newCounts.down = Math.max(0, newCounts.down - 1)
    if (newVote === 1) newCounts.up += 1
    if (newVote === -1) newCounts.down += 1
    setVotes(newCounts)
    setUserVote(newVote)

    try {
      await upsertVote(trailId, sessionId, newVote)
    } catch (err) {
      // Rollback on error
      console.error(err)
      setVotes(votes)
      setUserVote(userVote)
    }
  }

  const score = votes.up - votes.down

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVote(1)}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-all disabled:opacity-50 ${
          userVote === 1
            ? 'bg-green-500 border-green-500 text-white shadow-md scale-105'
            : 'bg-white border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600'
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{votes.up > 0 ? `${votes.up} · ` : ''}Utile</span>
      </button>

      {score !== 0 && (
        <span className={`text-sm font-bold ${score > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {score > 0 ? `+${score}` : score}
        </span>
      )}

      <button
        onClick={() => handleVote(-1)}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-all disabled:opacity-50 ${
          userVote === -1
            ? 'bg-red-500 border-red-500 text-white shadow-md scale-105'
            : 'bg-white border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500'
        }`}
      >
        <ThumbsDown className="w-4 h-4" />
        <span>Pas utile</span>
      </button>
    </div>
  )
}
