'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { trails } from '@/data/trails'
import { Trail } from '@/types'
import TrailCard from '@/components/TrailCard'
import { PramMeter } from '@/components/StrollerBadge'

const CARD_BADGES: ('new' | null)[] = [null, null, 'new', null, null, null, null, 'new', null, null, null, null]
const TESTIMONIALS = [
  { quote: "On a découvert le Parc Borély grâce à Carrossable — la petite est restée debout tout le long !", name: "Marie, maman de Zoé (14 mois)", city: "Marseille", initial: "M" },
  { quote: "Enfin un site où on sait vraiment si le chemin passe avec notre poussette double.", name: "Thomas & Léa, parents de jumeaux", city: "Aix-en-Provence", initial: "T" },
  { quote: "L'application qu'on attendait sans le savoir. Simple, juste, utile.", name: "Camille, maman de deux enfants", city: "Lyon", initial: "C" },
]

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

function parseDurationMins(d: string): number {
  const [h, m] = d.replace('h', ':').split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}
const totalHours = Math.round(trails.reduce((s, t) => s + parseDurationMins(t.duration), 0) / 60)

/* ── Rating tile ──────────────────────────────────────────── */
const tileDescs: Record<number, string> = {
  1: 'Terrain difficile, tout-terrain conseillé',
  2: 'Chemin praticable, poussette robuste',
  3: 'Asphalte, toutes poussettes passent',
}
function WheelIcon({ on }: { on: boolean }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      style={{ stroke: on ? 'var(--accent)' : 'var(--line)', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="8"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
      <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7"/>
    </svg>
  )
}
function RatingTile({ level, active, onClick }: { level: number | null; active: boolean; onClick: () => void }) {
  const isAll = level === null
  return (
    <button
      onClick={onClick}
      style={{
        flex: isAll ? 'none' : 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        padding: isAll ? '14px 20px' : '14px 12px 12px',
        borderRadius: 14,
        border: `1.5px solid ${active ? '#b6d4ba' : 'var(--line)'}`,
        background: active ? 'var(--accent-soft)' : '#fff',
        cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit',
        boxShadow: active ? '0 2px 12px -4px rgba(47,93,63,.18)' : 'none',
        transition: 'all .18s ease',
        justifyContent: 'center',
      }}
    >
      {!isAll && (
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
          {[1, 2, 3].map((i) => <WheelIcon key={i} on={i <= (level ?? 0)} />)}
        </div>
      )}
      <div style={{ fontWeight: 700, fontSize: isAll ? 14 : 13, color: active ? 'var(--accent-ink)' : 'var(--ink-2)', letterSpacing: '-.01em', lineHeight: 1.2 }}>
        {isAll ? 'Toutes' : levelLabels[level!]}
      </div>
      {!isAll && (
        <div style={{ fontSize: 11.5, color: active ? 'var(--accent-ink)' : 'var(--ink-3)', lineHeight: 1.4, opacity: active ? 0.75 : 1 }}>
          {tileDescs[level!]}
        </div>
      )}
    </button>
  )
}

/* ── Main page ────────────────────────────────────────────── */
export default function HomePage() {
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedDistance, setSelectedDistance] = useState('')
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
      const matchDuration = (() => {
        if (!selectedDuration) return true
        const [h, m] = trail.duration.replace('h', ':').split(':').map(Number)
        const mins = (h || 0) * 60 + (m || 0)
        if (selectedDuration === 'short') return mins < 60
        if (selectedDuration === 'medium') return mins >= 60 && mins <= 120
        if (selectedDuration === 'long') return mins > 120
        return true
      })()
      const matchDistance = (() => {
        if (!selectedDistance) return true
        if (selectedDistance === 'short') return trail.distance < 3
        if (selectedDistance === 'medium') return trail.distance >= 3 && trail.distance <= 6
        if (selectedDistance === 'long') return trail.distance > 6
        return true
      })()
      return matchSearch && matchLevel && matchRegion && matchDuration && matchDistance
    })
  }, [search, selectedLevel, selectedRegion, selectedDuration, selectedDistance])

  const selectedTrail: Trail | undefined = selectedTrailId
    ? filtered.find((t) => t.id === selectedTrailId)
    : undefined

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ padding: '64px 0 48px' }}>
        <div className="page-container" style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, alignItems: 'center' }} className="hero-grid">
            {/* Left: text */}
            <div>
              <span
                className="inline-flex items-center gap-2"
                style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--accent)', padding: '6px 10px', border: '1px solid var(--line)', borderRadius: 999, background: 'var(--surface)' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                Printemps 2026 — {trails.length} balades vérifiées
              </span>

              <h1 style={{ fontSize: 'clamp(40px, 5vw, 58px)', lineHeight: 1.02, letterSpacing: '-.035em', fontWeight: 700, margin: '20px 0 18px', color: 'var(--ink)' }}>
                Sortir avec la poussette,{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>sans mauvaise surprise.</em>
              </h1>

              <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: '46ch', lineHeight: 1.55 }}>
                Des itinéraires testés par de vrais parents, notés à la roue de poussette. Parce que chaque sortie compte.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-3 mt-7"
                style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: '6px 6px 6px 20px', boxShadow: 'var(--shadow-sm)', maxWidth: 560 }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)', flexShrink: 0 }}>
                  <use href="#i-search" />
                </svg>
                <input
                  type="text"
                  placeholder="Un parc, une ville, un type de chemin…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, padding: '12px 0', color: 'var(--ink)', fontFamily: 'inherit' }}
                />
                <button
                  type="submit"
                  style={{ background: 'var(--accent)', color: '#fff', padding: '10px 18px', borderRadius: 999, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Trouver
                </button>
              </form>

              <div className="flex items-center gap-8 mt-9">
                {[
                  { num: `${trails.length}`, lbl: 'balades vérifiées' },
                  { num: `${totalHours}h`, lbl: 'de balade au total' },
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

            {/* Right: SVG illustration */}
            <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px -8px rgba(20,18,14,.12)' }} aria-hidden="true">
              <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
                <rect width="420" height="360" fill="#edf5ec"/>
                <circle cx="340" cy="72" r="36" fill="#f5e6c8" opacity=".9"/>
                <circle cx="340" cy="72" r="24" fill="#f0d9a0"/>
                <ellipse cx="90" cy="68" rx="38" ry="18" fill="#fff" opacity=".7"/>
                <ellipse cx="120" cy="60" rx="28" ry="16" fill="#fff" opacity=".7"/>
                <ellipse cx="62" cy="62" rx="22" ry="14" fill="#fff" opacity=".6"/>
                <rect y="240" width="420" height="120" fill="#d6e8c4" opacity=".6"/>
                <rect y="270" width="420" height="90" fill="#c8ddb0" opacity=".5"/>
                <path d="M160 360 Q200 280 240 240 Q260 220 280 360" fill="#e8dfc8"/>
                <path d="M175 360 Q210 290 245 252 Q262 234 272 360" fill="#dfd4b8" opacity=".6"/>
                <rect x="82" y="190" width="10" height="70" rx="4" fill="#8b6b3d"/>
                <ellipse cx="87" cy="175" rx="36" ry="44" fill="#3a7a4a" opacity=".9"/>
                <ellipse cx="87" cy="165" rx="28" ry="36" fill="#4a9a5a" opacity=".8"/>
                <rect x="332" y="170" width="10" height="90" rx="4" fill="#8b6b3d"/>
                <ellipse cx="337" cy="152" rx="30" ry="40" fill="#2e6e3e" opacity=".9"/>
                <ellipse cx="337" cy="140" rx="22" ry="30" fill="#3a8a4a" opacity=".8"/>
                <rect x="370" y="210" width="8" height="50" rx="3" fill="#9b7b4d"/>
                <ellipse cx="374" cy="198" rx="22" ry="28" fill="#4a8a3a" opacity=".8"/>
                <g transform="translate(188,230)">
                  <path d="M2 8 Q2 2 12 2 Q22 2 22 8 L20 24 Q20 28 12 28 Q4 28 4 24 Z" fill="#2f5d3f"/>
                  <path d="M2 8 Q2 -4 16 -4 Q26 -4 22 8Z" fill="#1e3d29"/>
                  <line x1="22" y1="8" x2="28" y2="-2" stroke="#1e3d29" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="6" cy="29" r="5" fill="none" stroke="#1e3d29" strokeWidth="2"/>
                  <circle cx="18" cy="29" r="5" fill="none" stroke="#1e3d29" strokeWidth="2"/>
                  <circle cx="6" cy="29" r="1.5" fill="#1e3d29"/>
                  <circle cx="18" cy="29" r="1.5" fill="#1e3d29"/>
                </g>
                <circle cx="145" cy="255" r="4" fill="#f5c8a0" opacity=".8"/>
                <circle cx="290" cy="262" r="3.5" fill="#f5c8d0" opacity=".8"/>
                <circle cx="310" cy="248" r="3" fill="#d4e8b0" opacity=".9"/>
                <path d="M60 110 Q65 106 70 110" stroke="#3a7a4a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M78 102 Q83 98 88 102" stroke="#3a7a4a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M48 120 Q51 117 54 120" stroke="#3a7a4a" strokeWidth="1" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ background: 'var(--accent)', padding: '48px 0' }}>
        <div className="page-container" style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="testimonials-strip" style={{ display: 'flex', alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ flex: 1, padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', borderLeft: i > 0 ? '1px solid rgba(255,255,255,.12)' : 'none' }}>
                {/* Giant opening quote */}
                <span aria-hidden="true" style={{ position: 'absolute', top: 24, left: 32, fontSize: 72, lineHeight: 1, color: 'rgba(255,255,255,.15)', fontFamily: 'Georgia,serif', pointerEvents: 'none', userSelect: 'none' }}>&ldquo;</span>
                <p style={{ flex: 1, fontSize: 16, color: 'rgba(255,255,255,.92)', lineHeight: 1.65, fontStyle: 'italic', letterSpacing: 0, margin: 0, position: 'relative', paddingTop: 8 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.2)', color: '#fff', fontWeight: 700, fontSize: 13, display: 'grid', placeItems: 'center', flexShrink: 0, border: '1.5px solid rgba(255,255,255,.3)' }}>
                    {t.initial}
                  </div>
                  <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', fontWeight: 600, lineHeight: 1.4 }}>
                    {t.name}<br />{t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERS ──────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)', position: 'sticky', top: 68, zIndex: 40 }}>
        <div className="filter-inner">

          {/* Row 1: Rating tiles */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8 }}>
              Niveau de carrossabilité
            </div>
            <div className="filter-tiles-row">
              <RatingTile level={null} active={selectedLevel === null} onClick={() => setSelectedLevel(null)} />
              {[1, 2, 3].map((level) => (
                <RatingTile key={level} level={level} active={selectedLevel === level} onClick={() => setSelectedLevel(selectedLevel === level ? null : level)} />
              ))}
            </div>
          </div>

          {/* Row 2: Selects + clear + view toggle */}
          <div className="filter-selects-row">
            {/* Region */}
            {(() => {
              const selStyle: React.CSSProperties = { appearance: 'none', WebkitAppearance: 'none', padding: '9px 36px 9px 34px', border: '1.5px solid var(--line)', background: '#fff', borderRadius: 999, font: '600 13px/1 inherit', color: 'var(--ink-2)', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }
              return (
                <>
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <svg style={{ position: 'absolute', left: 12, width: 14, height: 14, color: 'var(--ink-3)', pointerEvents: 'none', stroke: 'currentColor', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24"><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} style={selStyle}>
                      <option value="">Toutes les régions</option>
                      {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: 13, top: '50%', width: 6, height: 6, borderRight: '1.5px solid var(--ink-3)', borderBottom: '1.5px solid var(--ink-3)', transform: 'translateY(-70%) rotate(45deg)', pointerEvents: 'none' }} />
                  </div>
                  {/* Distance */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <svg style={{ position: 'absolute', left: 12, width: 14, height: 14, color: 'var(--ink-3)', pointerEvents: 'none', stroke: 'currentColor', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h4a4 4 0 0 0 0-8h0a4 4 0 0 1 0-8h4"/></svg>
                    <select value={selectedDistance} onChange={(e) => setSelectedDistance(e.target.value)} style={selStyle}>
                      <option value="">Toute distance</option>
                      <option value="short">Moins de 3 km</option>
                      <option value="medium">3 – 6 km</option>
                      <option value="long">Plus de 6 km</option>
                    </select>
                    <span style={{ position: 'absolute', right: 13, top: '50%', width: 6, height: 6, borderRight: '1.5px solid var(--ink-3)', borderBottom: '1.5px solid var(--ink-3)', transform: 'translateY(-70%) rotate(45deg)', pointerEvents: 'none' }} />
                  </div>
                  {/* Duration */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <svg style={{ position: 'absolute', left: 12, width: 14, height: 14, color: 'var(--ink-3)', pointerEvents: 'none', stroke: 'currentColor', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                    <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} style={selStyle}>
                      <option value="">Toute durée</option>
                      <option value="short">Moins d'1h</option>
                      <option value="medium">1h – 2h</option>
                      <option value="long">Plus de 2h</option>
                    </select>
                    <span style={{ position: 'absolute', right: 13, top: '50%', width: 6, height: 6, borderRight: '1.5px solid var(--ink-3)', borderBottom: '1.5px solid var(--ink-3)', transform: 'translateY(-70%) rotate(45deg)', pointerEvents: 'none' }} />
                  </div>
                </>
              )
            })()}

            {/* Clear */}
            {(search || selectedLevel !== null || selectedRegion || selectedDuration || selectedDistance) && (
              <button
                onClick={() => { setSearch(''); setSelectedLevel(null); setSelectedRegion(''); setSelectedDuration(''); setSelectedDistance('') }}
                style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'inherit' }}
              >
                Effacer
              </button>
            )}

            {/* View toggle */}
            <div style={{ marginLeft: 'auto', display: 'flex', padding: 4, background: 'var(--line-2)', borderRadius: 999 }}>
              {(['list', 'map'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: view === v ? 'var(--ink)' : 'var(--ink-3)', background: view === v ? '#fff' : 'transparent', boxShadow: view === v ? 'var(--shadow-sm)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <use href={v === 'list' ? '#i-list' : '#i-map'} />
                  </svg>
                  <span className="hidden sm:inline">{v === 'list' ? 'Liste' : 'Carte'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────────── */}
      <section style={{ padding: '32px 0 96px' }}>
        <div className="page-container" style={{ maxWidth: 1240, margin: '0 auto' }}>
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
            <div className="cards-grid">
              {filtered.map((trail, i) => (
                <TrailCard key={trail.id} trail={trail} badge={CARD_BADGES[i % CARD_BADGES.length]} />
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
      <section className="page-container" style={{ maxWidth: 1240, margin: '0 auto', paddingBottom: 64, paddingTop: 0 }}>
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
      <section id="about" className="page-container" style={{ borderTop: '1px solid var(--line)', paddingTop: 64, paddingBottom: 64, background: 'var(--surface)' }}>
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
