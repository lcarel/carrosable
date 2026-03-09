export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <p className="text-6xl mb-4">🗺️</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Balade introuvable</h1>
        <p className="text-gray-500 mb-6">Cette balade n&apos;existe pas ou a été supprimée.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  )
}
