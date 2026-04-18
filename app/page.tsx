'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { trails } from '@/data/trails'
import { Trail } from '@/types'
import TrailCard from '@/components/TrailCard'
import { PramMeter } from '@/components/StrollerBadge'

const TrailMap = dynamic(() => import('@/components/TrailMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full animate-pulse flex items-center justify-center"
      style={{ height: 600, background: 'var(--line-2)', borderRadius: 14, color: 'var(--ink-4)', fontSize: 14 }}
    >
      Chargement de la carte…
    </div>
  ),
})

const levelLabels: Record<number, string> = {
  1: 'Peu carrossable',
  2: 'Carrossable',
  3: 'Très carrossable',
}

const regions = Array.from(new Set(trails.map((t) => t.region))).sort()

/* ── Filter chip ──────────────────────────────────────────── */
function LevelChip({ level, active, onClick }: { level: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 transition-all"
      style={{
        padding: '8px 14px',
        borderRadius: 999,
        border: `1px solid ${active ? '#cfdfd0' : 'var(--line)'}`,
        background: active ? 'var(--accent-soft)' : 'var(--surface)',
        fontSize: 13,
        fontWeight: 500,
        color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
        cursor: 'pointer',
      }}
    >
      <PramMeter level={level as 1 | 2 | 3} size={13} />
      <span className="hidden sm:inline">{levelLabels[level]}</span>
    </button>
  )
}

/* ── Main page ────────────────────────────────────────────── */
export default function HomePage() {
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [view, setView] = useState<'list' | 'map'>('list')
  const [selectedTrailId, setSelectedTrailId] = useState<string | undefined>()

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
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ padding: '72px 0 56px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: 680 }}>
            <div>
              {/* Eyebrow */}
              <span
                className="inline-flex items-center gap-2"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.04em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  padding: '6px 10px',
                  border: '1px solid var(--line)',
                  borderRadius: 999,
                  background: 'var(--surface)',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                Balades testées par des parents
              </span>

              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(40px, 5vw, 58px)',
                  lineHeight: 1.02,
                  letterSpacing: '-.035em',
                  fontWeight: 700,
                  margin: '20px 0 18px',
                  color: 'var(--ink)',
                }}
              >
                Des balades pensées{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>pour les poussettes.</em>
              </h1>

              {/* Lede */}
              <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: '46ch', lineHeight: 1.55 }}>
                Trouvez des itinéraires carrossables, testés et notés par des parents, pour profiter de la nature sans galère de roues.
              </p>

              {/* Search */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-3 mt-7"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 999,
                  padding: '6px 6px 6px 20px',
                  boxShadow: 'var(--shadow-sm)',
                  maxWidth: 520,
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)', flexShrink: 0 }}>
                  <use href="#i-search" />
                </svg>
                <input
                  type="text"
                  placeholder="Lieu, région, type de terrain…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 15,
                    padding: '10px 0',
                    color: 'var(--ink)',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: 999,
                    fontWeight: 600,
                    fontSize: 14,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Chercher
                </button>
              </form>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-9">
                {[
                  { num: `${trails.length}`, lbl: 'balades' },
                  { num: `${regions.length}`, lbl: 'régions' },
                ].map(({ num, lbl }, i) => (
                  <div key={lbl} className="flex items-center gap-8">
                    {i > 0 && <div style={{ width: 1, height: 32, background: 'var(--line)' }} />}
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.02em', color: 'var(--ink)' }}>{num}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '.02em', textTransform: 'uppercase', fontWeight: 600 }}>{lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTERS ──────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          background: 'var(--surface)',
          position: 'sticky',
          top: 68,
          zIndex: 40,
        }}
      >
        <div
          style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}
          className="flex flex-wrap items-center gap-3 py-3.5"
        >
          {/* Sliders icon */}
          <button
            className="flex items-center justify-center transition-colors"
            style={{
              padding: '8px 10px',
              borderRadius: 999,
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              color: 'var(--ink-2)',
              cursor: 'pointer',
            }}
            title="Filtres"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <use href="#i-sliders" />
            </svg>
          </button>

          {/* Level chips */}
          {[1, 2, 3].map((level) => (
            <LevelChip
              key={level}
              level={level}
              active={selectedLevel === level}
              onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
            />
          ))}

          {/* Region select */}
          <div className="flex items-center gap-2" style={{ position: 'relative' }}>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                padding: '8px 32px 8px 14px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--ink-2)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            >
              <option value="">Toutes les régions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <svg
              width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', right: 12, pointerEvents: 'none', color: 'var(--ink-3)' }}
            >
              <use href="#i-chev" />
            </svg>
          </div>

          {/* Clear */}
          {(search || selectedLevel || selectedRegion) && (
            <button
              onClick={() => { setSearch(''); setSelectedLevel(null); setSelectedRegion('') }}
              style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'inherit' }}
            >
              Effacer
            </button>
          )}

          {/* View toggle */}
          <div
            className="ml-auto flex items-center"
            style={{ background: 'var(--line-2)', borderRadius: 999, padding: 4 }}
          >
            {(['list', 'map'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="flex items-center gap-1.5"
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  color: view === v ? 'var(--ink)' : 'var(--ink-3)',
                  background: view === v ? '#fff' : 'transparent',
                  boxShadow: view === v ? 'var(--shadow-sm)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all .15s ease',
                }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <use href={v === 'list' ? '#i-list' : '#i-map'} />
                </svg>
                <span className="hidden sm:inline">{v === 'list' ? 'Liste' : 'Carte'}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────────── */}
      <section style={{ padding: '32px 0 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
          {/* Results header */}
          <div className="flex items-baseline justify-between mb-5">
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-.01em', color: 'var(--ink)' }}>
              {filtered.length} balade{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
              {' '}<span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>
                {selectedRegion ? `· ${selectedRegion}` : ''}
                {selectedLevel ? ` · ${levelLabels[selectedLevel]}` : ''}
              </span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24" style={{ color: 'var(--ink-4)' }}>
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4" style={{ color: 'var(--line)' }}>
                <use href="#i-map" />
              </svg>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink-3)' }}>Aucune balade trouvée</p>
              <p style={{ fontSize: 14, marginTop: 6 }}>Essayez de modifier vos filtres.</p>
            </div>
          ) : view === 'list' ? (
            <div
              className="grid gap-5"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
              {filtered.map((trail) => (
                <TrailCard key={trail.id} trail={trail} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1" style={{ height: 600 }}>
                <TrailMap trails={filtered} selectedId={selectedTrailId} onSelect={setSelectedTrailId} />
              </div>
              <div className="lg:w-80">
                {selectedTrail ? (
                  <div className="sticky top-40">
                    <p style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.04em', marginBottom: 10 }}>
                      Balade sélectionnée
                    </p>
                    <TrailCard trail={selectedTrail} />
                    <button
                      onClick={() => setSelectedTrailId(undefined)}
                      style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-4)', background: 'none', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}
                    >
                      Désélectionner
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-center py-12"
                    style={{ border: '2px dashed var(--line)', borderRadius: 14, color: 'var(--ink-4)' }}
                  >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3" style={{ opacity: .4 }}>
                      <use href="#i-map" />
                    </svg>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>Cliquez sur un marqueur</p>
                    <p style={{ fontSize: 12, marginTop: 4 }}>pour voir la balade</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA PROPOSER ─────────────────────────────────── */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 64px' }}>
        <div
          style={{
            background: 'var(--accent)',
            borderRadius: 20,
            padding: '48px 40px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4" style={{ opacity: .7 }}>
            <use href="#i-leaf" />
          </svg>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-.01em' }}>
            Vous connaissez une balade carrossable ?
          </h2>
          <p style={{ fontSize: 15, opacity: .8, marginBottom: 24, maxWidth: '42ch', margin: '0 auto 24px' }}>
            Partagez-la avec la communauté. Nous l'ajouterons après vérification.
          </p>
          <a
            href="/proposer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 999,
              background: '#fff',
              color: 'var(--accent-ink)',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <use href="#i-plus" />
            </svg>
            Proposer une balade
          </a>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section id="about" style={{ borderTop: '1px solid var(--line)', padding: '64px 32px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.015em', marginBottom: 8, color: 'var(--ink)' }}>
            Comment fonctionne la classification ?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-3)', marginBottom: 40 }}>
            Chaque balade est notée de 1 à 3 roues selon l'accessibilité du terrain.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {([1, 2, 3] as const).map((level) => {
              const labels = ['Peu carrossable', 'Carrossable', 'Très carrossable']
              const descs = [
                'Sentiers avec obstacles, forte pente, terrain naturel. Poussette tout-terrain obligatoire.',
                'Chemin en terre ou stabilisé. Poussette robuste conseillée. Quelques passages délicats.',
                'Piste asphaltée, voie verte, allée large et lisse. Toutes les poussettes passent.',
              ]
              return (
                <div
                  key={level}
                  style={{
                    borderRadius: 14,
                    border: '1px solid var(--line)',
                    padding: '20px',
                    background: 'var(--bg)',
                  }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                      <use href="#i-pram-wheel" />
                    </svg>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                      Niveau {level}
                    </span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{labels[level - 1]}</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{descs[level - 1]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
