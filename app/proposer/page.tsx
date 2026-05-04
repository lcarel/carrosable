export default function ProposerPage() {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-soft)', border: '1.5px solid #cfdfd0', display: 'grid', placeItems: 'center', margin: '0 auto 28px', color: 'var(--accent)' }}>
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <use href="#i-leaf" />
        </svg>
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.03em', margin: '0 0 12px', color: 'var(--ink)' }}>
        Proposer une balade
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '38ch', margin: '0 auto 28px' }}>
        Pour proposer une balade, envoyez-nous un mail avec le nom, la localisation et quelques infos sur le parcours.
      </p>
      <a
        href="mailto:balade-carrosable@gmail.com"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 15 }}
      >
        balade-carrosable@gmail.com
      </a>
      <div style={{ marginTop: 40 }}>
        <a href="/" style={{ fontSize: 13, color: 'var(--ink-4)' }}>← Retour aux balades</a>
      </div>
    </div>
  )
}
