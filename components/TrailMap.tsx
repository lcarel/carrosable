'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Trail, StrollerLevel } from '@/types'

// Fix default Leaflet icon (webpack asset issue)
const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

const levelColors: Record<StrollerLevel, string> = {
  1: '#ef4444',
  2: '#f59e0b',
  3: '#16a34a',
}

function createMarkerIcon(level: StrollerLevel, selected = false) {
  const color = levelColors[level]
  const size = selected ? 36 : 28
  const border = selected ? '3px solid white' : '2px solid white'
  const shadow = selected
    ? '0 3px 10px rgba(0,0,0,0.5)'
    : '0 2px 4px rgba(0,0,0,0.3)'

  return L.divIcon({
    html: `<div style="
      background:${color};
      width:${size}px;
      height:${size}px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:${border};
      box-shadow:${shadow};
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
    className: '',
  })
}

// Auto-fit map bounds to visible trails
function FitBounds({ trails }: { trails: Trail[] }) {
  const map = useMap()
  const prevCount = useRef(0)

  useEffect(() => {
    if (trails.length === 0) return
    if (trails.length === prevCount.current) return
    prevCount.current = trails.length

    const bounds = L.latLngBounds(trails.map((t) => [t.coordinates.lat, t.coordinates.lng]))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
  }, [trails, map])

  return null
}

interface TrailMapProps {
  trails: Trail[]
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}

export default function TrailMap({ trails, selectedId, onSelect, className = '' }: TrailMapProps) {
  useEffect(() => {
    fixLeafletIcons()
  }, [])

  const center: [number, number] = [46.6, 2.3] // Center of France
  const firstTrail = trails[0]
  const initialCenter: [number, number] = firstTrail
    ? [firstTrail.coordinates.lat, firstTrail.coordinates.lng]
    : center

  return (
    <MapContainer
      center={initialCenter}
      zoom={6}
      className={`w-full h-full rounded-2xl z-0 ${className}`}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds trails={trails} />
      {trails.map((trail) => (
        <Marker
          key={trail.id}
          position={[trail.coordinates.lat, trail.coordinates.lng]}
          icon={createMarkerIcon(trail.strollerLevel, selectedId === trail.id)}
          eventHandlers={{
            click: () => onSelect?.(trail.id),
          }}
        >
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-bold text-sm text-gray-900 mb-0.5">{trail.name}</p>
              <p className="text-xs text-gray-500 mb-2">{trail.location}</p>
              <p className="text-xs text-gray-600 mb-2">
                {trail.distance} km · {trail.duration}
              </p>
              <a
                href={`/balades/${trail.id}`}
                className="block text-center bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-green-700"
              >
                Voir la balade →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
