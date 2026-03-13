'use client'

import { useState } from 'react'
import { submitProposal } from '@/lib/proposalsApi'
import { MapPin, Ruler, TrendingUp, Clock, Tag, Image, Navigation, CheckCircle, AlertCircle } from 'lucide-react'

const strollerLevels = [
  {
    value: 1 as const,
    icon: '🛺',
    label: 'Peu carrossable',
    desc: 'Sentiers avec obstacles, cailloux, forte pente. Poussette tout-terrain obligatoire.',
    color: 'border-red-300 bg-red-50 text-red-800',
    activeColor: 'border-red-500 bg-red-100 ring-2 ring-red-400',
  },
  {
    value: 2 as const,
    icon: '🛺🛺',
    label: 'Carrossable',
    desc: 'Chemin en terre ou stabilisé. Poussette robuste conseillée. Quelques passages délicats.',
    color: 'border-amber-300 bg-amber-50 text-amber-800',
    activeColor: 'border-amber-500 bg-amber-100 ring-2 ring-amber-400',
  },
  {
    value: 3 as const,
    icon: '🛺🛺🛺',
    label: 'Très carrossable',
    desc: 'Chemin asphalté, piste cyclable ou allée large et lisse. Toutes les poussettes passent.',
    color: 'border-green-300 bg-green-50 text-green-800',
    activeColor: 'border-green-500 bg-green-100 ring-2 ring-green-500',
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
  imageUrl: '',
  lat: '',
  lng: '',
  submitterName: '',
  submitterEmail: '',
}

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
    if (!form.region.trim()) e.region = 'La région est requise.'
    if (!form.description.trim()) e.description = 'La description est requise.'
    if (!form.distance || isNaN(Number(form.distance)) || Number(form.distance) <= 0)
      e.distance = 'Distance invalide.'
    if (!form.elevation || isNaN(Number(form.elevation)) || Number(form.elevation) < 0)
      e.elevation = 'Dénivelé invalide.'
    if (!form.duration.trim()) e.duration = 'La durée est requise (ex : 1h30).'
    if (!form.strollerLevel) e.strollerLevel = 'Choisissez un niveau.'
    if (!form.lat || isNaN(Number(form.lat))) e.lat = 'Latitude invalide.'
    if (!form.lng || isNaN(Number(form.lng))) e.lng = 'Longitude invalide.'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setStatus('loading')
    try {
      await submitProposal({
        name: form.name.trim(),
        location: form.location.trim(),
        region: form.region.trim(),
        description: form.description.trim(),
        distance: Number(form.distance),
        elevation: Number(form.elevation),
        duration: form.duration.trim(),
        strollerLevel: form.strollerLevel!,
        tags: form.tags.trim(),
        imageUrl: form.imageUrl.trim(),
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

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Merci pour votre proposition !</h1>
        <p className="text-gray-500 mb-8">
          Votre balade a bien été transmise. Elle sera examinée et ajoutée au site si elle répond à
          nos critères.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Proposer une autre balade
          </button>
          <a
            href="/"
            className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-4xl mb-3">🗺️</p>
          <h1 className="text-3xl font-bold mb-2">Proposer une balade</h1>
          <p className="text-green-100 text-base">
            Vous connaissez un parcours carrossable ? Partagez-le avec la communauté ! Nous
            l'ajouterons manuellement après vérification.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* Informations générales */}
          <fieldset className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <legend className="text-lg font-bold text-gray-900 px-1">
              Informations générales
            </legend>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nom de la balade <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Ex : Promenade des bords de Loire"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <MapPin className="inline w-3.5 h-3.5 mr-1" />
                  Lieu / Ville <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                  placeholder="Ex : Orléans"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.location ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Région <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.region}
                  onChange={(e) => set('region', e.target.value)}
                  placeholder="Ex : Centre-Val de Loire"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.region ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={4}
                placeholder="Décrivez le parcours : type de chemin, points d'intérêt, accessibilité, ambiance..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
              )}
            </div>
          </fieldset>

          {/* Caractéristiques */}
          <fieldset className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <legend className="text-lg font-bold text-gray-900 px-1">Caractéristiques</legend>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <Ruler className="inline w-3.5 h-3.5 mr-1" />
                  Distance (km) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.distance}
                  onChange={(e) => set('distance', e.target.value)}
                  placeholder="5"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.distance ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.distance && <p className="text-xs text-red-500 mt-1">{errors.distance}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <TrendingUp className="inline w-3.5 h-3.5 mr-1" />
                  Dénivelé (m) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.elevation}
                  onChange={(e) => set('elevation', e.target.value)}
                  placeholder="80"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.elevation ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.elevation && (
                  <p className="text-xs text-red-500 mt-1">{errors.elevation}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <Clock className="inline w-3.5 h-3.5 mr-1" />
                  Durée <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => set('duration', e.target.value)}
                  placeholder="1h30"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.duration ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Tag className="inline w-3.5 h-3.5 mr-1" />
                Mots-clés{' '}
                <span className="font-normal text-gray-400">(séparés par des virgules)</span>
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="forêt, rivière, ombragé, plat"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </fieldset>

          {/* Niveau de carrossabilité */}
          <fieldset className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <legend className="text-lg font-bold text-gray-900 px-1">
              Niveau de carrossabilité <span className="text-red-500">*</span>
            </legend>
            <div className="space-y-3">
              {strollerLevels.map((lvl) => (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => set('strollerLevel', lvl.value)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                    form.strollerLevel === lvl.value ? lvl.activeColor : lvl.color
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lvl.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{lvl.label}</p>
                      <p className="text-xs opacity-80 mt-0.5">{lvl.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {errors.strollerLevel && (
              <p className="text-xs text-red-500">{errors.strollerLevel}</p>
            )}
          </fieldset>

          {/* Coordonnées GPS */}
          <fieldset className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <legend className="text-lg font-bold text-gray-900 px-1">
              <Navigation className="inline w-4 h-4 mr-1" />
              Coordonnées GPS <span className="text-red-500">*</span>
            </legend>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
              <strong>Comment trouver les coordonnées ?</strong>
              <ol className="list-decimal ml-5 mt-2 space-y-1 text-blue-600">
                <li>
                  Rendez-vous sur{' '}
                  <a
                    href="https://www.openstreetmap.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    openstreetmap.org
                  </a>
                </li>
                <li>Naviguez jusqu'au point de départ de la balade</li>
                <li>
                  Faites un <strong>clic droit</strong> → <strong>« Afficher l'adresse »</strong>
                </li>
                <li>Copiez la latitude et la longitude qui apparaissent</li>
              </ol>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={form.lat}
                  onChange={(e) => set('lat', e.target.value)}
                  placeholder="48.8566"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.lat ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.lat && <p className="text-xs text-red-500 mt-1">{errors.lat}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={form.lng}
                  onChange={(e) => set('lng', e.target.value)}
                  placeholder="2.3522"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.lng ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.lng && <p className="text-xs text-red-500 mt-1">{errors.lng}</p>}
              </div>
            </div>
          </fieldset>

          {/* Photo */}
          <fieldset className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <legend className="text-lg font-bold text-gray-900 px-1">
              <Image className="inline w-4 h-4 mr-1" />
              Photo{' '}
              <span className="font-normal text-gray-400 text-base">(facultatif)</span>
            </legend>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
              <strong>Comment trouver une photo ?</strong>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-500">
                <li>
                  Rendez-vous sur{' '}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-green-700"
                  >
                    unsplash.com
                  </a>{' '}
                  (gratuit) et cherchez un paysage similaire
                </li>
                <li>
                  Copiez l'URL de la photo et ajoutez <code className="bg-gray-200 px-1 rounded">?w=800</code> à la fin
                </li>
                <li>Ou laissez vide et nous choisirons une photo adaptée</li>
              </ul>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">URL de la photo</label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => set('imageUrl', e.target.value)}
                placeholder="https://images.unsplash.com/photo-XXXXXXXX?w=800"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <legend className="text-lg font-bold text-gray-900 px-1">
              Vos coordonnées{' '}
              <span className="font-normal text-gray-400 text-base">(facultatif)</span>
            </legend>
            <p className="text-sm text-gray-500">
              Pour vous prévenir quand votre balade est publiée, ou pour vous créditer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={form.submitterName}
                  onChange={(e) => set('submitterName', e.target.value)}
                  placeholder="Marie"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.submitterEmail}
                  onChange={(e) => set('submitterEmail', e.target.value)}
                  placeholder="marie@exemple.fr"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </fieldset>

          {status === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              Une erreur s'est produite. Vérifiez votre connexion et réessayez.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 rounded-2xl bg-green-600 text-white font-bold text-base hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma proposition'}
          </button>

          <p className="text-xs text-center text-gray-400">
            Vos données sont utilisées uniquement pour traiter votre proposition et ne seront pas
            partagées.
          </p>
        </form>
      </div>
    </>
  )
}
