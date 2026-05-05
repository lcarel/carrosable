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
        href="mailto:balade.carrossable@gmail.com"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 15 }}
      >
        balade.carrossable@gmail.com
      </a>

      <div style={{ marginTop: 48, padding: '28px 32px', borderRadius: 16, background: 'var(--warm-soft)', border: '1px solid #edd9c8', textAlign: 'left' }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--warm)', margin: '0 0 10px' }}>
          Un avis, un retour, un mot doux ?
        </p>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, margin: '0 0 16px' }}>
          Vous avez testé une balade et voulez partager votre expérience ? Une suggestion pour améliorer le site ? Ou juste l&apos;envie de nous écrire ? On lit tous les messages avec plaisir.
        </p>
        <a
          href="mailto:balade.carrossable@gmail.com"
          style={{ fontSize: 14, fontWeight: 600, color: 'var(--warm)', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          balade.carrossable@gmail.com
        </a>
      </div>

      <div style={{ marginTop: 32 }}>
        <a href="/" style={{ fontSize: 13, color: 'var(--ink-4)' }}>← Retour aux balades</a>
      </div>
    </div>
  )
}
