'use client'

import { useState } from 'react'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: 8,
          borderRadius: 8,
          color: 'var(--ink-2)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Menu"
      >
        {open ? (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="absolute left-0 right-0"
          style={{
            top: 68,
            background: 'var(--surface)',
            borderBottom: '1px solid var(--line)',
            boxShadow: 'var(--shadow)',
            zIndex: 50,
            padding: '12px 24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {[
            { href: '/', label: 'Explorer' },
            { href: '/#about', label: 'À propos' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                padding: '12px 0',
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--ink-2)',
                borderBottom: '1px solid var(--line-2)',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="/proposer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 mt-3"
            style={{
              padding: '12px 20px',
              borderRadius: 999,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <use href="#i-plus" />
            </svg>
            Proposer une balade
          </a>
        </div>
      )}
    </div>
  )
}
