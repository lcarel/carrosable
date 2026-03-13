import { getSupabase, isSupabaseConfigured } from './supabase'

export interface ProposalData {
  name: string
  location: string
  region: string
  description: string
  distance: number
  elevation: number
  duration: string
  strollerLevel: 1 | 2 | 3
  tags: string
  imageUrl: string
  lat: number
  lng: number
  submitterName: string
  submitterEmail: string
}

export async function submitProposal(proposal: ProposalData): Promise<void> {
  if (!isSupabaseConfigured) {
    // Fallback : stocker localement
    const stored = localStorage.getItem('proposals')
    const existing = stored ? JSON.parse(stored) : []
    localStorage.setItem(
      'proposals',
      JSON.stringify([...existing, { ...proposal, id: Date.now(), createdAt: new Date().toISOString() }])
    )
    return
  }

  const { error } = await getSupabase().from('proposals').insert({
    name: proposal.name,
    location: proposal.location,
    region: proposal.region,
    description: proposal.description,
    distance: proposal.distance,
    elevation: proposal.elevation,
    duration: proposal.duration,
    stroller_level: proposal.strollerLevel,
    tags: proposal.tags || null,
    image_url: proposal.imageUrl || null,
    lat: proposal.lat,
    lng: proposal.lng,
    submitter_name: proposal.submitterName || null,
    submitter_email: proposal.submitterEmail || null,
  })

  if (error) throw error
}
