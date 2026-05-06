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

import { Analytics } from '@vercel/analytics/react'  // ← ajouter


import { Analytics } from "@vercel/analytics/next"

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
        <symbol id="i-back" viewBox="0 0 24 24">
          <path d="M14 6l-6 6 6 6" />
        </symbol>
        <symbol id="i-tag" viewBox="0 0 24 24">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </symbol>
        <symbol id="i-thumb-up" viewBox="0 0 24 24">
          <path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2 2v3h5a2 2 0 0 1 2 2.3l-1 6a2 2 0 0 1-2 1.7H7" />
        </symbol>
        <symbol id="i-thumb-down" viewBox="0 0 24 24">
          <path d="M17 13V4h3v9zM17 13l-4 7a2 2 0 0 1-2-2v-3H6a2 2 0 0 1-2-2.3l1-6A2 2 0 0 1 7 5h10" />
        </symbol>
        <symbol id="i-chat" viewBox="0 0 24 24">
          <path d="M4 5h16v11H8l-4 4z" /><path d="M8 10h8M8 13h5" />
        </symbol>
        <symbol id="i-share" viewBox="0 0 24 24">
          <circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 11l7.6-4M8.2 13l7.6 4" />
        </symbol>
        <symbol id="i-flag" viewBox="0 0 24 24">
          <path d="M5 21V4M5 4h12l-2 4 2 4H5" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="M5 12l4 4 10-10" />
        </symbol>
        <symbol id="i-stroller-narrow" viewBox="0 0 24 24">
          <path d="M5 4h2l3 7M19 8a5 5 0 0 0-5-5h-3l3 8h7" />
          <circle cx="9" cy="18" r="2" /><circle cx="17" cy="18" r="2" /><path d="M11 11l-1 5" />
        </symbol>
        <symbol id="i-stroller-wide" viewBox="0 0 24 24">
          <rect x="6" y="6" width="14" height="6" rx="1" /><path d="M4 6h2v6" />
          <circle cx="9" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
        </symbol>
        <symbol id="i-baby-carrier" viewBox="0 0 24 24">
          <path d="M7 4h10l-2 8a4 4 0 0 1-8 0z" /><circle cx="12" cy="16" r="3" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
        </symbol>
        <symbol id="i-tree" viewBox="0 0 24 24">
          <path d="M12 3l5 7h-3l4 6H6l4-6H7z" /><path d="M12 16v5" />
        </symbol>
        <symbol id="i-water" viewBox="0 0 24 24">
          <path d="M12 3s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13z" />
        </symbol>
        <symbol id="i-info" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" /><path d="M12 8v1M12 11v5" />
        </symbol>
        <symbol id="i-text" viewBox="0 0 24 24">
          <path d="M4 6h16M4 10h16M4 14h10" />
        </symbol>
        <symbol id="i-gps" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <path d="M12 3l8 3.5v5c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10v-5z" />
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
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: '-.02em',
                  fontFamily: 'inherit',
                }}
              >
                C
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
         <Analytics />  {/* ← ajouter juste avant </body> */}
      </body>
    </html>
  )
}
