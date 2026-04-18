import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import MobileMenu from '@/components/MobileMenu'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

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

/* Inline SVG sprite — shared across all pages */
function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </symbol>
        <symbol id="i-route" viewBox="0 0 24 24">
          <circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" />
          <path d="M8 19h4a4 4 0 0 0 0-8h-0a4 4 0 0 1 0-8h4" />
        </symbol>
        <symbol id="i-clock" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
        </symbol>
        <symbol id="i-elev" viewBox="0 0 24 24">
          <path d="M3 20l6-10 4 6 3-4 5 8z" />
        </symbol>
        <symbol id="i-filter" viewBox="0 0 24 24">
          <path d="M3 6h18M6 12h12M10 18h4" />
        </symbol>
        <symbol id="i-chev" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </symbol>
        <symbol id="i-list" viewBox="0 0 24 24">
          <rect x="3" y="5" width="7" height="6" rx="1" />
          <rect x="14" y="5" width="7" height="6" rx="1" />
          <rect x="3" y="13" width="7" height="6" rx="1" />
          <rect x="14" y="13" width="7" height="6" rx="1" />
        </symbol>
        <symbol id="i-map" viewBox="0 0 24 24">
          <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
          <path d="M9 4v14M15 6v14" />
        </symbol>
        <symbol id="i-heart" viewBox="0 0 24 24">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </symbol>
        <symbol id="i-sort" viewBox="0 0 24 24">
          <path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4" />
        </symbol>
        <symbol id="i-leaf" viewBox="0 0 24 24">
          <path d="M5 19c8 1 14-5 14-14-8-1-14 5-14 14z" /><path d="M5 19l7-7" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </symbol>
        <symbol id="i-sliders" viewBox="0 0 24 24">
          <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h14M18 18h2" />
          <circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="16" cy="18" r="2" />
        </symbol>
        <symbol id="i-pram" viewBox="0 0 24 24">
          <path d="M4 5h3l1.5 8h9l2-6H9" />
          <circle cx="9" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
        </symbol>
        <symbol id="i-pram-wheel" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
        </symbol>
        <symbol id="i-arrow-left" viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </symbol>
        <symbol id="i-tag" viewBox="0 0 24 24">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </symbol>
        <symbol id="i-thumb-up" viewBox="0 0 24 24">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </symbol>
        <symbol id="i-thumb-down" viewBox="0 0 24 24">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
          <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
        </symbol>
      </defs>
    </svg>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={manrope.className} style={{ minHeight: '100vh' }}>
        <IconSprite />

        {/* NAV */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(250,250,247,.85)',
            backdropFilter: 'saturate(160%) blur(10px)',
            WebkitBackdropFilter: 'saturate(160%) blur(10px)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <div
            style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}
            className="flex items-center justify-between h-[68px] relative"
          >
            <a href="/" className="flex items-center gap-2.5">
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'var(--accent)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <use href="#i-pram" />
                </svg>
              </span>
              <span>
                <div style={{ fontWeight: 700, letterSpacing: '-.02em', fontSize: 17, color: 'var(--ink)' }}>
                  Carrossable
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: -2 }}>
                  Balades en poussette
                </div>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {['/', '/#about'].map((href, i) => (
                <a
                  key={i}
                  href={href}
                  style={{ padding: '8px 12px', borderRadius: 8, color: 'var(--ink-2)', fontWeight: 500, fontSize: 14 }}
                  className="hover:bg-black/[.04] hover:text-[var(--ink)] transition-colors"
                >
                  {['Explorer', 'À propos'][i]}
                </a>
              ))}
              <a
                href="/proposer"
                className="flex items-center gap-2 ml-2"
                style={{
                  padding: '10px 16px',
                  borderRadius: 999,
                  background: 'var(--accent)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '-.005em',
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <use href="#i-plus" />
                </svg>
                Proposer une balade
              </a>
            </nav>

            {/* Mobile hamburger */}
            <MobileMenu />
          </div>
        </header>

        <main>{children}</main>

        <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', marginTop: 64 }}>
          <div
            style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 32px' }}
            className="text-center"
          >
            <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>
              <strong style={{ color: 'var(--ink-2)' }}>Carrossable</strong> — Partagez les balades adaptées aux familles
            </p>
            <p style={{ color: 'var(--ink-4)', fontSize: 12, marginTop: 4 }}>
              Fait avec ❤️ pour tous les parents aventuriers
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
