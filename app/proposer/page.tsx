'use client'

import { useState } from 'react'
import { submitProposal } from '@/lib/proposalsApi'

/* ── helpers ─────────────────────────────────── */

function Icon({ id, size = 18 }: { id: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <use href={`#${id}`} />
    </svg>
  )
}

function PramWheelIcon({ active, size = 18 }: { active: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? 'var(--accent)' : 'var(--line)'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
    </svg>
  )
}

const REGIONS = [
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  "Provence-Alpes-Côte d'Azur",
  'Occitanie',
  'Nouvelle-Aquitaine',
  'Bretagne',
  'Normandie',
  'Hauts-de-France',
  'Grand Est',
  'Pays de la Loire',
  'Centre-Val de Loire',
  'Bourgogne-Franche-Comté',
  'Corse',
]

const STROLLER_LEVELS = [
  {
    value: 1 as const,
    label: 'Peu carrossable',
    desc: 'Sentiers avec obstacles, cailloux, forte pente. Poussette tout-terrain obligatoire.',
  },
  {
    value: 2 as const,
    label: 'Carrossable',
    desc: 'Chemin en terre ou stabilisé. Poussette robuste conseillée. Quelques passages délicats.',
  },
  {
    value: 3 as const,
    label: 'Très carrossable',
    desc: "Chemin asphalté, piste cyclable ou allée large et lisse. Toutes les poussettes passent.",
  },
]

const initialForm = {
  name: '',
  location: '',
  region: '',
  description: '',
  distance: '',
  elevation: '',
  duration: '',
  strollerLevel: null as 1 | 2 | 3 | null,
  tags: '',
  lat: '',
  lng: '',
  submitterName: '',
  submitterEmail: '',
}

/* ── shared input style ───────────────────────── */

const inputCss: React.CSSProperties = {
  background: 'var(--bg)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
  color: 'var(--ink)',
  boxSizing: 'border-box',
  transition: 'border-color .15s, box-shadow .15s, background .15s',
}

const labelCss: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--ink-2)',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
}

/* ── sub-components ───────────────────────────── */

function CardHead({ icon, title, sub }: { icon: string; title: React.ReactNode; sub: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 22,
        borderBottom: '1px solid var(--line-2)',
      }}
    >
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'var(--accent-soft)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--accent)',
          flexShrink: 0,
        }}
      >
        <Icon id={icon} size={20} />
      </span>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.015em' }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  )
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>
      <span style={{ marginTop: 1 }}><Icon id="i-info" size={14} /></span>
      {children}
    </div>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p style={{ fontSize: 12, color: '#c0392b', marginTop: 2 }}>{msg}</p>
}

/* ── main page ────────────────────────────────── */

export default function ProposerPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({})

  function set(field: keyof typeof initialForm, value: string | number | null) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate() {
    const e: Partial<Record<keyof typeof initialForm, string>> = {}
    if (!form.name.trim()) e.name = 'Le nom est requis.'
    if (!form.location.trim()) e.location = 'Le lieu est requis.'
    if (!form.region) e.region = 'La région est requise.'
    if (!form.description.trim()) e.description = 'La description est requise.'
    if (!form.distance || isNaN(Number(form.distance)) || Number(form.distance) <= 0)
      e.distance = 'Distance invalide.'
    if (!form.elevation || isNaN(Number(form.elevation)) || Number(form.elevation) < 0)
      e.elevation = 'Dénivelé invalide.'
    if (!form.duration.trim()) e.duration = 'La durée est requise (ex : 1h30).'
    if (!form.strollerLevel) e.strollerLevel = 'Choisissez un niveau.'
    if (form.lat && isNaN(Number(form.lat))) e.lat = 'Latitude invalide.'
    if (form.lng && isNaN(Number(form.lng))) e.lng = 'Longitude invalide.'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('loading')
    try {
      await submitProposal({
        name: form.name.trim(),
        location: form.location.trim(),
        region: form.region,
        description: form.description.trim(),
        distance: Number(form.distance),
        elevation: Number(form.elevation),
        duration: form.duration.trim(),
        strollerLevel: form.strollerLevel!,
        tags: form.tags.trim(),
        lat: Number(form.lat),
        lng: Number(form.lng),
        submitterName: form.submitterName.trim(),
        submitterEmail: form.submitterEmail.trim(),
      })
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  /* success state */
  if (status === 'success') {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--accent-soft)',
            border: '1.5px solid #cfdfd0',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 24px',
            color: 'var(--accent)',
          }}
        >
          <Icon id="i-check" size={28} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.03em', margin: '0 0 10px', color: 'var(--ink)' }}>
          Merci pour votre proposition !
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '44ch', margin: '0 auto 32px' }}>
          Votre balade a bien été transmise. Elle sera examinée et ajoutée au site si elle répond à nos critères.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => setStatus('idle')}
            style={{
              padding: '11px 22px',
              borderRadius: 999,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <Icon id="i-plus" size={14} />
            Proposer une autre balade
          </button>
          <a
            href="/"
            style={{
              padding: '11px 22px',
              borderRadius: 999,
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              color: 'var(--ink-2)',
              fontWeight: 600,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    )
  }

  const card: React.CSSProperties = {
    background: 'var(--surface)',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
    marginBottom: 16,
  }

  const field: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8 }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 32px 96px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-3)', fontSize: 13, marginBottom: 20 }}>
        <a href="/" style={{ color: 'var(--ink-3)' }} className="hover:text-[var(--ink)] transition-colors">
          Explorer
        </a>
        <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-4)', transform: 'rotate(-90deg)' }}>
          <use href="#i-chev" />
        </svg>
        <span style={{ color: 'var(--ink-2)' }}>Proposer une balade</span>
      </nav>

      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-.03em', margin: '0 0 10px', color: 'var(--ink)' }}>
          Proposer une balade
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '52ch', margin: 0 }}>
          Vous connaissez un parcours carrossable ? Partagez-le avec la communauté. Nous vérifierons chaque soumission avant publication.
        </p>
      </div>

      {/* Step progress */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36 }}>
        {[
          { n: 1, label: 'Informations', active: true },
          { n: 2, label: 'Caractéristiques', active: false },
          { n: 3, label: 'GPS & envoi', active: false },
        ].map((step, i) => (
          <div key={step.n} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: step.active ? 'var(--accent)' : 'var(--ink-4)' }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: `1.5px solid ${step.active ? 'var(--accent)' : 'var(--line)'}`,
                  background: step.active ? 'var(--accent)' : 'transparent',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: step.active ? '#fff' : 'var(--ink-4)',
                  flexShrink: 0,
                }}
              >
                {step.n}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 1, background: 'var(--line)', margin: '0 12px' }} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>

        {/* ── Card 1: Informations générales ── */}
        <div style={card}>
          <CardHead icon="i-text" title="Informations générales" sub="Nom, lieu et description du parcours" />

          <div style={field}>
            <label style={labelCss}>
              Nom de la balade <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ex : Promenade des bords de Loire"
              style={{ ...inputCss, borderColor: errors.name ? '#e74c3c' : undefined }}
            />
            <FieldError msg={errors.name} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={field}>
              <label style={labelCss}>
                Lieu / Ville <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', display: 'flex' }}>
                  <Icon id="i-pin" size={15} />
                </span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                  placeholder="Ex : Orléans"
                  style={{ ...inputCss, paddingLeft: 36, borderColor: errors.location ? '#e74c3c' : undefined }}
                />
              </div>
              <FieldError msg={errors.location} />
            </div>

            <div style={field}>
              <label style={labelCss}>
                Région <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={form.region}
                  onChange={(e) => set('region', e.target.value)}
                  style={{
                    ...inputCss,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    paddingRight: 40,
                    cursor: 'pointer',
                    borderColor: errors.region ? '#e74c3c' : undefined,
                  }}
                >
                  <option value="">Sélectionner une région</option>
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-60%) rotate(45deg)', width: 7, height: 7, borderRight: '1.5px solid var(--ink-3)', borderBottom: '1.5px solid var(--ink-3)', pointerEvents: 'none' }} />
              </div>
              <FieldError msg={errors.region} />
            </div>
          </div>

          <div style={field}>
            <label style={labelCss}>
              Description <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Décrivez le parcours : type de chemin, points d'intérêt, accessibilité, ambiance…"
              rows={4}
              style={{ ...inputCss, resize: 'vertical', minHeight: 110, lineHeight: 1.6, borderColor: errors.description ? '#e74c3c' : undefined }}
            />
            <FieldHint>Pensez à mentionner l'état du sol, les passages difficiles et les équipements à proximité.</FieldHint>
            <FieldError msg={errors.description} />
          </div>
        </div>

        {/* ── Card 2: Caractéristiques ── */}
        <div style={card}>
          <CardHead icon="i-route" title="Caractéristiques" sub="Distance, dénivelé, durée et mots-clés" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {[
              { field: 'distance' as const, label: 'Distance (km)', icon: 'i-route', placeholder: '5', type: 'number', min: '0', step: '0.1' },
              { field: 'elevation' as const, label: 'Dénivelé (m)', icon: 'i-elev', placeholder: '80', type: 'number', min: '0' },
              { field: 'duration' as const, label: 'Durée', icon: 'i-clock', placeholder: '1h30', type: 'text' },
            ].map(({ field: f, label, icon, placeholder, type, min, step }) => (
              <div key={f} style={field}>
                <label style={labelCss}>
                  {label} <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', display: 'flex' }}>
                    <Icon id={icon} size={15} />
                  </span>
                  <input
                    type={type}
                    min={min}
                    step={step}
                    value={form[f] as string}
                    onChange={(e) => set(f, e.target.value)}
                    placeholder={placeholder}
                    style={{ ...inputCss, paddingLeft: 36, borderColor: errors[f] ? '#e74c3c' : undefined }}
                  />
                </div>
                <FieldError msg={errors[f]} />
              </div>
            ))}
          </div>

          <div style={field}>
            <label style={labelCss}>
              Mots-clés{' '}
              <span style={{ color: 'var(--ink-4)', fontWeight: 500, fontSize: 12 }}>(séparés par des virgules)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', display: 'flex' }}>
                <Icon id="i-tag" size={15} />
              </span>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="forêt, rivière, ombragé, plat"
                style={{ ...inputCss, paddingLeft: 36 }}
              />
            </div>
            <FieldHint>Ces mots-clés aident les parents à filtrer et trouver la balade.</FieldHint>
          </div>
        </div>

        {/* ── Card 3: Niveau de carrossabilité ── */}
        <div style={card}>
          <CardHead
            icon="i-pram-wheel"
            title={<>Niveau de carrossabilité <span style={{ color: 'var(--accent)', marginLeft: 2 }}>*</span></>}
            sub="Évaluez honnêtement la praticabilité du parcours"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STROLLER_LEVELS.map((lvl) => {
              const on = form.strollerLevel === lvl.value
              return (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => set('strollerLevel', lvl.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '16px 18px',
                    borderRadius: 10,
                    border: `1.5px solid ${on ? '#cfdfd0' : 'var(--line)'}`,
                    background: on ? 'var(--accent-soft)' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'border-color .15s, background .15s',
                    fontFamily: 'inherit',
                    width: '100%',
                  }}
                >
                  {/* Check circle */}
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `1.5px solid ${on ? 'var(--accent)' : 'var(--line)'}`,
                      background: on ? 'var(--accent)' : 'transparent',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                      transition: 'all .15s',
                    }}
                  >
                    <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: on ? 1 : 0, transition: 'opacity .15s' }}>
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>

                  {/* Pram wheel icon */}
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: on ? '#fff' : 'var(--line-2)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                      transition: 'background .15s',
                    }}
                  >
                    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={on ? 'var(--accent)' : 'var(--ink-3)'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                      <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
                    </svg>
                  </span>

                  {/* Label + desc */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-.01em', color: on ? 'var(--accent-ink)' : 'var(--ink)', marginBottom: 3 }}>
                      {lvl.label}
                    </div>
                    <div style={{ fontSize: 13, color: on ? 'var(--accent-ink)' : 'var(--ink-3)', opacity: on ? 0.8 : 1, lineHeight: 1.5 }}>
                      {lvl.desc}
                    </div>
                  </div>

                  {/* Meter */}
                  <span style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {[1, 2, 3].map((i) => (
                      <PramWheelIcon key={i} active={i <= lvl.value} size={18} />
                    ))}
                  </span>
                </button>
              )
            })}
          </div>
          <FieldError msg={errors.strollerLevel} />
        </div>

        {/* ── Card 4: Coordonnées GPS ── */}
        <div style={card}>
          <CardHead
            icon="i-gps"
            title={<>Coordonnées GPS <span style={{ color: 'var(--ink-4)', fontWeight: 500, fontSize: 14 }}>(facultatif)</span></>}
            sub="Point de départ du parcours"
          />

          {/* Info box */}
          <div
            style={{
              background: 'var(--accent-soft)',
              border: '1px solid #cfdfd0',
              borderRadius: 10,
              padding: '16px 18px',
              display: 'flex',
              gap: 14,
            }}
          >
            <span style={{ color: 'var(--accent)', marginTop: 2 }}>
              <Icon id="i-info" size={16} />
            </span>
            <div style={{ fontSize: 13, color: 'var(--accent-ink)', lineHeight: 1.6 }}>
              <strong style={{ fontWeight: 700, display: 'block', marginBottom: 4 }}>Comment trouver les coordonnées ?</strong>
              <ol style={{ margin: '6px 0 0', paddingLeft: 16 }}>
                <li style={{ marginBottom: 2 }}>Rendez-vous sur <a href="https://openstreetmap.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'rgba(47,93,63,.3)' }}>openstreetmap.org</a></li>
                <li style={{ marginBottom: 2 }}>Naviguez jusqu'au point de départ de la balade</li>
                <li style={{ marginBottom: 2 }}>Faites un <strong>clic droit</strong> → « Afficher l'adresse »</li>
                <li>Copiez la latitude et la longitude qui apparaissent</li>
              </ol>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { f: 'lat' as const, label: 'Latitude', placeholder: '48.8566', req: false },
              { f: 'lng' as const, label: 'Longitude', placeholder: '2.3522', req: false },
            ].map(({ f, label, placeholder }) => (
              <div key={f} style={field}>
                <label style={labelCss}>{label}</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', display: 'flex' }}>
                    <Icon id="i-pin" size={15} />
                  </span>
                  <input
                    type="number"
                    step="any"
                    value={form[f]}
                    onChange={(e) => set(f, e.target.value)}
                    placeholder={placeholder}
                    style={{ ...inputCss, paddingLeft: 36, borderColor: errors[f] ? '#e74c3c' : undefined }}
                  />
                </div>
                <FieldError msg={errors[f]} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Card 5: Vos coordonnées (facultatif) ── */}
        <div style={card}>
          <CardHead
            icon="i-check"
            title={<>Vos coordonnées <span style={{ color: 'var(--ink-4)', fontWeight: 500, fontSize: 14 }}>(facultatif)</span></>}
            sub="Pour vous prévenir quand votre balade est publiée"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={field}>
              <label style={labelCss}>Prénom</label>
              <input
                type="text"
                value={form.submitterName}
                onChange={(e) => set('submitterName', e.target.value)}
                placeholder="Marie"
                style={inputCss}
              />
            </div>
            <div style={field}>
              <label style={labelCss}>Email</label>
              <input
                type="email"
                value={form.submitterEmail}
                onChange={(e) => set('submitterEmail', e.target.value)}
                placeholder="marie@exemple.fr"
                style={inputCss}
              />
            </div>
          </div>
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff5f5',
              border: '1px solid #fcc',
              borderRadius: 10,
              padding: '14px 18px',
              marginBottom: 16,
              fontSize: 14,
              color: '#c0392b',
            }}
          >
            <Icon id="i-info" size={16} />
            Une erreur s'est produite. Vérifiez votre connexion et réessayez.
          </div>
        )}

        {/* Form footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginTop: 8,
            paddingTop: 28,
            borderTop: '1px solid var(--line)',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', maxWidth: '40ch', lineHeight: 1.5, margin: 0, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <span style={{ marginTop: 1 }}><Icon id="i-shield" size={13} /></span>
            Chaque soumission est vérifiée manuellement avant publication. Vos données ne sont pas revendues.
          </p>
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 24px',
              borderRadius: 999,
              border: 'none',
              background: status === 'loading' ? 'var(--ink-3)' : 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              cursor: status === 'loading' ? 'default' : 'pointer',
              fontFamily: 'inherit',
              transition: 'background .15s',
              flexShrink: 0,
            }}
          >
            <Icon id="i-check" size={18} />
            {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma balade'}
          </button>
        </div>

      </form>
    </div>
  )
}
