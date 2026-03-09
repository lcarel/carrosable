import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabase
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('carrossable_session_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('carrossable_session_id', id)
  }
  return id
}
