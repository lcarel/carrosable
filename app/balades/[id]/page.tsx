import { trails, getTrailById } from '@/data/trails'
import { notFound } from 'next/navigation'
import TrailPageClient from './TrailPageClient'

export async function generateStaticParams() {
  return trails.map((trail) => ({ id: trail.id }))
}

export default function TrailPage({ params }: { params: { id: string } }) {
  const trail = getTrailById(params.id)
  if (!trail) notFound()
  return <TrailPageClient trail={trail!} />
}
