export type StrollerLevel = 1 | 2 | 3

export interface Trail {
  id: string
  name: string
  location: string
  region: string
  description: string
  distance: number // km
  elevation: number // m
  duration: string // ex: "1h30"
  strollerLevel: StrollerLevel
  tags: string[]
  imageUrl: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Review {
  id: string
  trailId: string
  author: string
  rating: number // 1-5
  comment: string
  date: string
  strollerType?: string
}

export interface Vote {
  trailId: string
  value: 1 | -1
}
