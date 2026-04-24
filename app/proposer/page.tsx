'use client'

import { useState, useEffect, useRef } from 'react'
import { submitProposal } from '@/lib/proposalsApi'

function Icon({ id, size = 16 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <use href={`#${id}`} />
    </svg>
  )
}

const REGIONS = [
  'Île-de-France', 'Auvergne-Rhône-Alpes', "Provence-Alpes-Côte d'Azur", 'Occitanie',
  'Nouvelle-Aquitaine', 'Bretagne', 'Normandie', 'Hauts-de-France', 'Grand Est',
  'Pays de la Loire', 'Centre-Val de Loire', 'Bourgogne-Franche-Comté', 'Corse',
]

const LEVELS = [
  { value: 1 as const, label: 'Peu carrossable', desc: 'Obstacles, cailloux, forte pente. Poussette tout-terrain obligatoire.' },
  { value: 2 as const, label: 'Carrossable', desc: 'Chemin en terre ou stabilisé. Poussette robuste conseillée.' },
  { value: 3 as const, label: 'Très carrossable', desc: 'Asphalte ou piste lisse. Toutes les poussettes passent.' },
]

const initialForm = {
  name: '', location: '', region: '', description: '',
  distance: '', duration: '', strollerLevel: null as 1 | 2 | 3 | null,
  lat: '', lng: '',
}

const inputCss: React.CSSProperties = {
  background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 10,
  padding: '12px 14px', fontSize: 14, outline: 'none', width: '100%',
  fontFamily: 'inherit', color: 'var(--ink)', boxSizing: 'border-box',
  transition: 'border-color .15s',
}
const labelCss: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }
const fieldCss: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8 }

export default function ProposerPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const regionAutoFilled = useRef(false)

  function set(field: keyof typeof initialForm, value: string | number | null) {
    if (field === 'region') regionAutoFilled.current = false
    setForm((p) => ({ ...p, [field]: value }))
    setErrors((p) => ({ ...p, [field]: undefined }))
  }

  useEffect(() => {
    const city = form.location.trim()
    if (!city || city.length < 2) return
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(city)}&fields=region&boost=population&limit=1`
        )
        const data = await res.json()
        const regionName: string | undefined = data[0]?.region?.name
        if (regionName && REGIONS.includes(regionName) && !regionAutoFilled.current) {
          regionAutoFilled.current = true
          setForm((p) => ({ ...p, region: regionName }))
          setErrors((p) => ({ ...p, region: undefined }))
        }
      } catch { /* silently ignore */ }
    }, 500)
    return () => clearTimeout(timer)
  }, [form.location])

  function validate() {
    const e: Partial<Record<keyof typeof initialForm, string>> = {}
    if (!form.name.trim()) e.name = 'Requis'
    if (!form.location.trim()) e.location = 'Requis'
    if (!form.region) e.region = 'Requis'
    if (!form.description.trim()) e.description = 'Requis'
    if (form.distance && (isNaN(Number(form.distance)) || Number(form.distance) <= 0)) e.distance = 'Distance invalide'
    if (!form.strollerLevel) e.strollerLevel = 'Choisissez un niveau'
    if (form.lat && isNaN(Number(form.lat))) e.lat = 'Latitude invalide'
    if (form.lng && isNaN(Number(form.lng))) e.lng = 'Longitude invalide'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('loading')
    try {
      await submitProposal({
        name: form.name.trim(), location: form.location.trim(), region: form.region,
        description: form.description.trim(), distance: form.distance ? Number(form.distance) : 0,
        elevation: 0, duration: form.duration.trim() || '—', strollerLevel: form.strollerLevel!,
        tags: '', lat: Number(form.lat) || 0, lng: Number(form.lng) || 0,
        submitterName: '', submitterEmail: '',
      })
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-soft)', border: '1.5px solid #cfdfd0', display: 'grid', placeItems: 'center', margin: '0 auto 24px', color: 'var(--accent)' }}>
          <Icon id="i-check" size={28} />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.03em', margin: '0 0 10px' }}>Merci !</h1>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '38ch', margin: '0 auto 32px' }}>
          Votre balade a été transmise. Elle sera examinée et ajoutée si elle répond à nos critères.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <button onClick={() => setStatus('idle')} style={{ padding: '11px 22px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            Proposer une autre balade
          </button>
          <a href="/" style={{ padding: '11px 22px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--ink-2)', fontWeight: 600, fontSize: 14 }}>
            Retour à l'accueil
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 32px 96px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }} className="hover:text-[var(--ink)] transition-colors">
          <Icon id="i-back" size={14} /> Explorer
        </a>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-.03em', margin: '0 0 8px', color: 'var(--ink)' }}>
          Proposer une balade
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-3)', margin: 0, lineHeight: 1.55 }}>
          Quelques infos suffisent — on s'occupe du reste.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: '32px 28px' }}>

        {/* Nom */}
        <div style={fieldCss}>
          <label style={labelCss}>Nom de la balade <span style={{ color: 'var(--accent)' }}>*</span></label>
          <input
            type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
            placeholder="Ex : Promenade des bords de Loire"
            style={{ ...inputCss, borderColor: errors.name ? '#e74c3c' : undefined }}
          />
          {errors.name && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.name}</span>}
        </div>

        {/* Lieu + Région */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={fieldCss}>
            <label style={labelCss}>Ville <span style={{ color: 'var(--accent)' }}>*</span></label>
            <input
              type="text" value={form.location} onChange={(e) => set('location', e.target.value)}
              placeholder="Ex : Orléans"
              style={{ ...inputCss, borderColor: errors.location ? '#e74c3c' : undefined }}
            />
            {errors.location && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.location}</span>}
          </div>
          <div style={fieldCss}>
            <label style={labelCss}>Région <span style={{ color: 'var(--accent)' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <select
                value={form.region} onChange={(e) => set('region', e.target.value)}
                style={{ ...inputCss, appearance: 'none', WebkitAppearance: 'none', paddingRight: 40, cursor: 'pointer', borderColor: errors.region ? '#e74c3c' : undefined }}
              >
                <option value="">Sélectionner</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-60%) rotate(45deg)', width: 7, height: 7, borderRight: '1.5px solid var(--ink-3)', borderBottom: '1.5px solid var(--ink-3)', pointerEvents: 'none' }} />
            </div>
            {errors.region && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.region}</span>}
          </div>
        </div>

        {/* Description */}
        <div style={fieldCss}>
          <label style={labelCss}>Description <span style={{ color: 'var(--accent)' }}>*</span></label>
          <textarea
            value={form.description} onChange={(e) => set('description', e.target.value)}
            placeholder="Type de chemin, points d'intérêt, accessibilité, ambiance…"
            rows={3}
            style={{ ...inputCss, resize: 'vertical', minHeight: 90, lineHeight: 1.6, borderColor: errors.description ? '#e74c3c' : undefined }}
          />
          {errors.description && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.description}</span>}
        </div>

        {/* Distance + Durée */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={fieldCss}>
            <label style={labelCss}>Distance (km) <span style={{ fontSize: 12, color: 'var(--ink-4)', fontWeight: 400 }}>facultatif</span></label>
            <input
              type="number" min="0" step="0.1" value={form.distance} onChange={(e) => set('distance', e.target.value)}
              placeholder="Ex : 5"
              style={{ ...inputCss, borderColor: errors.distance ? '#e74c3c' : undefined }}
            />
            {errors.distance && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.distance}</span>}
          </div>
          <div style={fieldCss}>
            <label style={labelCss}>Durée <span style={{ fontSize: 12, color: 'var(--ink-4)', fontWeight: 400 }}>facultatif</span></label>
            <input
              type="text" value={form.duration} onChange={(e) => set('duration', e.target.value)}
              placeholder="Ex : 1h30"
              style={{ ...inputCss, borderColor: errors.duration ? '#e74c3c' : undefined }}
            />
            {errors.duration && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.duration}</span>}
          </div>
        </div>

        {/* Séparateur */}
        <div style={{ borderTop: '1px solid var(--line-2)' }} />

        {/* Niveau carrossabilité */}
        <div style={fieldCss}>
          <label style={labelCss}>Niveau de carrossabilité <span style={{ color: 'var(--accent)' }}>*</span></label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {LEVELS.map((lvl) => {
              const on = form.strollerLevel === lvl.value
              return (
                <button
                  key={lvl.value} type="button" onClick={() => set('strollerLevel', lvl.value)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 10,
                    border: `1.5px solid ${on ? '#cfdfd0' : 'var(--line)'}`,
                    background: on ? 'var(--accent-soft)' : 'var(--surface)',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', width: '100%', transition: 'all .15s',
                  }}
                >
                  {/* Wheels */}
                  <span style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                    {[1, 2, 3].map((i) => (
                      <svg key={i} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={i <= lvl.value ? (on ? 'var(--accent)' : 'var(--ink-3)') : 'var(--line)'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                        <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
                      </svg>
                    ))}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: on ? 'var(--accent-ink)' : 'var(--ink)' }}>{lvl.label}</div>
                    <div style={{ fontSize: 12, color: on ? 'var(--accent-ink)' : 'var(--ink-3)', opacity: on ? 0.85 : 1, marginTop: 2 }}>{lvl.desc}</div>
                  </div>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${on ? 'var(--accent)' : 'var(--line)'}`, background: on ? 'var(--accent)' : 'transparent', display: 'grid', placeItems: 'center', flexShrink: 0, transition: 'all .15s' }}>
                    <svg width={10} height={10} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: on ? 1 : 0 }}>
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                </button>
              )
            })}
          </div>
          {errors.strollerLevel && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.strollerLevel}</span>}
        </div>

        {/* Séparateur */}
        <div style={{ borderTop: '1px solid var(--line-2)' }} />

        {/* GPS optionnel */}
        <div style={fieldCss}>
          <label style={{ ...labelCss, display: 'flex', alignItems: 'center', gap: 8 }}>
            Coordonnées GPS du départ
            <span style={{ fontSize: 12, color: 'var(--ink-4)', fontWeight: 400 }}>facultatif</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input
              type="number" step="any" value={form.lat} onChange={(e) => set('lat', e.target.value)}
              placeholder="Latitude — ex : 48.8566"
              style={{ ...inputCss, borderColor: errors.lat ? '#e74c3c' : undefined }}
            />
            <input
              type="number" step="any" value={form.lng} onChange={(e) => set('lng', e.target.value)}
              placeholder="Longitude — ex : 2.3522"
              style={{ ...inputCss, borderColor: errors.lng ? '#e74c3c' : undefined }}
            />
          </div>
          {(errors.lat || errors.lng) && <span style={{ fontSize: 12, color: '#c0392b' }}>{errors.lat || errors.lng}</span>}
          <span style={{ fontSize: 12, color: 'var(--ink-4)', lineHeight: 1.5 }}>
            Sur Google Maps : clic droit sur le point de départ → "Plus d'infos sur cet endroit"
          </span>
        </div>

        {/* Error */}
        {status === 'error' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff5f5', border: '1px solid #fcc', borderRadius: 10, padding: '14px 18px', fontSize: 14, color: '#c0392b' }}>
            <Icon id="i-info" size={16} />
            Une erreur s'est produite. Vérifiez votre connexion et réessayez.
          </div>
        )}

        {/* Submit */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 8, borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
          <p style={{ fontSize: 12, color: 'var(--ink-4)', maxWidth: '38ch', lineHeight: 1.5, margin: 0 }}>
            Chaque proposition est vérifiée manuellement avant publication.
          </p>
          <button
            type="submit" disabled={status === 'loading'}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 999, border: 'none', background: status === 'loading' ? 'var(--ink-3)' : 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: status === 'loading' ? 'default' : 'pointer', fontFamily: 'inherit' }}
          >
            <Icon id="i-check" size={16} />
            {status === 'loading' ? 'Envoi…' : 'Envoyer'}
          </button>
        </div>

      </form>
    </div>
  )
}
