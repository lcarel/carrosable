'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { trails } from '@/data/trails'
import { Trail } from '@/types'
import TrailCard from '@/components/TrailCard'
import { Search, SlidersHorizontal, LayoutGrid, Map } from 'lucide-react'

const TrailMap = dynamic(() => import('@/components/TrailMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center text-gray-400">
      Chargement de la carte…
    </div>
  ),
})

const levelLabels: Record<number, string> = {
  1: 'Peu carrossable',
  2: 'Carrossable',
  3: 'Très carrossable',
}

function StrollerFilterButton({
  level,
  active,
  onClick,
}: {
  level: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
        active
          ? level === 1
            ? 'bg-red-500 border-red-500 text-white'
            : level === 2
            ? 'bg-amber-500 border-amber-500 text-white'
            : 'bg-green-600 border-green-600 text-white'
          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
      }`}
    >
      <span>{'🛺'.repeat(level)}</span>
      <span className="hidden sm:inline">{levelLabels[level]}</span>
    </button>
  )
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [view, setView] = useState<'list' | 'map'>('list')
  const [selectedTrailId, setSelectedTrailId] = useState<string | undefined>()

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

  const selectedTrail: Trail | undefined = selectedTrailId
    ? filtered.find((t) => t.id === selectedTrailId)
    : undefined

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-5xl mb-4">🛺</p>
          <h1 className="text-4xl font-bold mb-3">Balades adaptées aux poussettes</h1>
          <p className="text-green-100 text-lg mb-8">
            Découvrez et partagez les meilleures randonnées carrossables pour profiter de la
            nature en famille.
          </p>
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
        <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">
          {/* Ligne 1 : icône + niveaux + vue */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 min-w-0 pb-0.5">
              {[1, 2, 3].map((level) => (
                <StrollerFilterButton
                  key={level}
                  level={level}
                  active={selectedLevel === level}
                  onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                />
              ))}
            </div>
            <div className="shrink-0 flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Liste</span>
              </button>
              <button
                onClick={() => setView('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === 'map'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Carte</span>
              </button>
            </div>
          </div>

          {/* Ligne 2 : région */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full sm:w-auto text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {filtered.length} balade{filtered.length !== 1 ? 's' : ''} trouvée
            {filtered.length !== 1 ? 's' : ''}
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
        ) : view === 'list' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map */}
            <div className="flex-1 h-[600px]">
              <TrailMap
                trails={filtered}
                selectedId={selectedTrailId}
                onSelect={setSelectedTrailId}
              />
            </div>

            {/* Selected trail card */}
            <div className="lg:w-80">
              {selectedTrail ? (
                <div className="sticky top-40">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-3 tracking-wide">
                    Balade sélectionnée
                  </p>
                  <TrailCard trail={selectedTrail} />
                  <button
                    onClick={() => setSelectedTrailId(undefined)}
                    className="mt-2 text-xs text-gray-400 hover:text-gray-600 w-full text-center"
                  >
                    Désélectionner
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                  <Map className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">Cliquez sur un marqueur</p>
                  <p className="text-xs mt-1">pour voir la balade</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* CTA proposer une balade */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-8 text-center text-white">
          <p className="text-3xl mb-3">🗺️</p>
          <h2 className="text-xl font-bold mb-2">Vous connaissez une balade carrossable ?</h2>
          <p className="text-green-100 text-sm mb-6 max-w-md mx-auto">
            Partagez-la avec la communauté ! Remplissez le formulaire et nous l'ajouterons au site
            après vérification.
          </p>
          <a
            href="/proposer"
            className="inline-block px-6 py-3 rounded-full bg-white text-green-800 font-bold text-sm hover:bg-green-50 transition-colors shadow-md"
          >
            Proposer une balade
          </a>
        </div>
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
                icon: '🛺',
                title: 'Peu carrossable',
                desc: 'Sentiers avec obstacles, cailloux, forte pente. Poussette tout-terrain obligatoire et effort physique important.',
                color: 'border-red-200 bg-red-50',
              },
              {
                icon: '🛺🛺',
                title: 'Carrossable',
                desc: 'Chemin en terre ou stabilisé. Poussette robuste conseillée. Quelques passages délicats mais praticable.',
                color: 'border-amber-200 bg-amber-50',
              },
              {
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
