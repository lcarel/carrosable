'use client'

import { useState, useEffect } from 'react'
import { getSessionId } from '@/lib/supabase'
import { fetchVoteCounts, fetchUserVote, upsertVote } from '@/lib/votesApi'

interface VoteButtonProps {
  trailId: string
}

function Icon({ id, size = 16 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <use href={`#${id}`} />
    </svg>
  )
}

export default function VoteButton({ trailId }: VoteButtonProps) {
  const [userVote, setUserVote] = useState<1 | -1 | null>(null)
  const [votes, setVotes] = useState<{ up: number; down: number }>({ up: 0, down: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = getSessionId()
    Promise.all([fetchVoteCounts(trailId), fetchUserVote(trailId, sessionId)])
      .then(([counts, vote]) => {
        setVotes(counts)
        setUserVote(vote)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [trailId])

  const handleVote = async (value: 1 | -1) => {
    const sessionId = getSessionId()
    const newVote = userVote === value ? null : value

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
      console.error(err)
      setVotes(votes)
      setUserVote(userVote)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      {/* LHS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'var(--accent-soft)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--accent)',
            flexShrink: 0,
          }}
        >
          <Icon id="i-thumb-up" size={18} />
        </span>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', lineHeight: 1.3 }}>
            Cette balade vous a été utile ?
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
            Aidez les autres parents en partageant votre retour rapide.
          </div>
        </div>
      </div>

      {/* RHS */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => handleVote(1)}
          disabled={loading}
          style={{
            padding: '9px 16px',
            borderRadius: 999,
            border: `1.5px solid ${userVote === 1 ? 'var(--accent)' : 'var(--line)'}`,
            background: userVote === 1 ? 'var(--accent)' : 'var(--surface)',
            color: userVote === 1 ? '#fff' : 'var(--ink-2)',
            fontWeight: 600,
            fontSize: 13,
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all .15s',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Icon id="i-thumb-up" size={14} />
          Utile{votes.up > 0 ? ` · ${votes.up}` : ''}
        </button>

        <button
          onClick={() => handleVote(-1)}
          disabled={loading}
          style={{
            padding: '9px 16px',
            borderRadius: 999,
            border: `1.5px solid ${userVote === -1 ? '#c0392b' : 'var(--line)'}`,
            background: userVote === -1 ? '#c0392b' : 'var(--surface)',
            color: userVote === -1 ? '#fff' : 'var(--ink-3)',
            fontWeight: 500,
            fontSize: 13,
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all .15s',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Icon id="i-thumb-down" size={14} />
          Pas utile{votes.down > 0 ? ` · ${votes.down}` : ''}
        </button>
      </div>
    </div>
  )
}
