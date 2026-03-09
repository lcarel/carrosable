import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carrossable – Balades en poussette',
  description:
    'Trouvez les meilleures balades et randonnées adaptées aux poussettes. Consultez, votez et partagez vos avis.',
  keywords: ['poussette', 'balade', 'randonnée', 'famille', 'bébé', 'carrossable'],
  openGraph: {
    title: 'Carrossable – Balades en poussette',
    description: 'Trouvez les meilleures balades adaptées aux poussettes.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🛺</span>
              <div>
                <span className="text-xl font-bold text-green-700 group-hover:text-green-600 transition-colors">
                  Carrossable
                </span>
                <p className="text-xs text-gray-500 leading-none">Balades en poussette</p>
              </div>
            </a>
            <nav className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
              >
                Explorer
              </a>
              <a
                href="/#about"
                className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
              >
                À propos
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center">
            <p className="text-gray-500 text-sm">
              🛺 <strong>Carrossable</strong> — Partagez les balades adaptées aux familles
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Fait avec ❤️ pour tous les parents aventuriers
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
