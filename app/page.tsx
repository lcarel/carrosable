'use client'

import { useState, useMemo } from 'react'
import { trails } from '@/data/trails'
import TrailCard from '@/components/TrailCard'
import { Search, SlidersHorizontal } from 'lucide-react'

const levelLabels: Record<number, string> = {
  1: 'Peu carrossable',
  2: 'Carrossable',
  3: 'Très carrossable',
}

function StrollerFilterIcon({ level, active }: { level: number; active: boolean }) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
      active
        ? level === 1
          ? 'bg-red-500 border-red-500 text-white'
          : level === 2
          ? 'bg-amber-500 border-amber-500 text-white'
          : 'bg-green-600 border-green-600 text-white'
        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
    }`}>
      <span>{'🛺'.repeat(level)}</span>
      <span>{levelLabels[level]}</span>
    </button>
  )
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedRegion, setSelectedRegion] = useState('')

  const regions = useMemo(
    () => Array.from(new Set(trails.map((t) => t.region))).sort(),
    []
  )

  const filtered = useMemo(() => {
    return trails.filter((trail) => {
      const matchSearch =
        !search ||
        trail.name.toLowerCase().includes(search.toLowerCase()) ||
        trail.location.toLowerCase().includes(search.toLowerCase()) ||
        trail.region.toLowerCase().includes(search.toLowerCase()) ||
        trail.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      const matchLevel = selectedLevel === null || trail.strollerLevel === selectedLevel
      const matchRegion = !selectedRegion || trail.region === selectedRegion
      return matchSearch && matchLevel && matchRegion
    })
  }, [search, selectedLevel, selectedRegion])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-5xl mb-4">🛺</p>
          <h1 className="text-4xl font-bold mb-3">
            Balades adaptées aux poussettes
          </h1>
          <p className="text-green-100 text-lg mb-8">
            Découvrez et partagez les meilleures randonnées carrossables pour profiter de la nature en famille.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par lieu, région, type de terrain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-medium">Filtrer :</span>
          </div>

          {[1, 2, 3].map((level) => (
            <div
              key={level}
              onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
            >
              <StrollerFilterIcon level={level} active={selectedLevel === level} />
            </div>
          ))}

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="ml-auto text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Toutes les régions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Trail grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {filtered.length} balade{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
            {selectedLevel ? ` · ${levelLabels[selectedLevel]}` : ''}
            {selectedRegion ? ` · ${selectedRegion}` : ''}
          </h2>
          {(search || selectedLevel || selectedRegion) && (
            <button
              onClick={() => {
                setSearch('')
                setSelectedLevel(null)
                setSelectedRegion('')
              }}
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              Effacer les filtres
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🗺️</p>
            <p className="text-lg font-medium">Aucune balade trouvée</p>
            <p className="text-sm mt-2">Essayez de modifier vos filtres.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        )}
      </section>

      {/* About section */}
      <section id="about" className="bg-green-50 border-t border-green-100 py-16 px-4 mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comment fonctionne la classification ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-left">
            {[
              {
                level: 1,
                icon: '🛺',
                title: 'Peu carrossable',
                desc: 'Sentiers avec obstacles, cailloux, forte pente. Poussette tout-terrain obligatoire et effort physique important.',
                color: 'border-red-200 bg-red-50',
              },
              {
                level: 2,
                icon: '🛺🛺',
                title: 'Carrossable',
                desc: 'Chemin en terre ou stabilisé. Poussette robuste conseillée. Quelques passages délicats mais praticable.',
                color: 'border-amber-200 bg-amber-50',
              },
              {
                level: 3,
                icon: '🛺🛺🛺',
                title: 'Très carrossable',
                desc: 'Chemin asphalté, piste cyclable ou allée large et lisse. Toutes les poussettes passent sans difficulté.',
                color: 'border-green-200 bg-green-50',
              },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className={`rounded-2xl border p-5 ${color}`}>
                <p className="text-2xl mb-2">{icon}</p>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
