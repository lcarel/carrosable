import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('carrossable_session_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('carrossable_session_id', id)
  }
  return id
}

export const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
