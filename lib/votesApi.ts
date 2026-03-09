import { supabase, isSupabaseConfigured } from './supabase'

export async function fetchVoteCounts(
  trailId: string
): Promise<{ up: number; down: number }> {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`votes_${trailId}`)
    if (!stored) return { up: 0, down: 0 }
    const data = JSON.parse(stored)
    return data.counts ?? { up: 0, down: 0 }
  }

  const { data, error } = await supabase
    .from('votes')
    .select('value')
    .eq('trail_id', trailId)

  if (error) throw error

  const up = (data ?? []).filter((r) => r.value === 1).length
  const down = (data ?? []).filter((r) => r.value === -1).length
  return { up, down }
}

export async function fetchUserVote(
  trailId: string,
  sessionId: string
): Promise<1 | -1 | null> {
  if (!isSupabaseConfigured) {
    const stored = localStorage.getItem(`votes_${trailId}`)
    if (!stored) return null
    const data = JSON.parse(stored)
    return data.userVote ?? null
  }

  const { data, error } = await supabase
    .from('votes')
    .select('value')
    .eq('trail_id', trailId)
    .eq('session_id', sessionId)
    .maybeSingle()

  if (error) throw error
  return data ? (data.value as 1 | -1) : null
}

export async function upsertVote(
  trailId: string,
  sessionId: string,
  value: 1 | -1 | null
): Promise<void> {
  if (!isSupabaseConfigured) {
    const existing = localStorage.getItem(`votes_${trailId}`)
    const prev = existing ? JSON.parse(existing) : { counts: { up: 0, down: 0 }, userVote: null }
    const counts = { ...prev.counts }
    if (prev.userVote === 1) counts.up = Math.max(0, counts.up - 1)
    if (prev.userVote === -1) counts.down = Math.max(0, counts.down - 1)
    if (value === 1) counts.up += 1
    if (value === -1) counts.down += 1
    localStorage.setItem(`votes_${trailId}`, JSON.stringify({ counts, userVote: value }))
    return
  }

  if (value === null) {
    await supabase.from('votes').delete().eq('trail_id', trailId).eq('session_id', sessionId)
  } else {
    await supabase.from('votes').upsert(
      { trail_id: trailId, session_id: sessionId, value },
      { onConflict: 'trail_id,session_id' }
    )
  }
}
