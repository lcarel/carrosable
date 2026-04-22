'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Trail } from '@/types'

const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

export default function TrailDetailMap({ trail, height = 208 }: { trail: Trail; height?: number }) {
  useEffect(() => {
    fixLeafletIcons()
  }, [])

  const position: [number, number] = [trail.coordinates.lat, trail.coordinates.lng]

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: '100%', height }}
        className="z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <p className="font-semibold text-sm">{trail.name}</p>
            <p className="text-xs text-gray-500">{trail.location}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
