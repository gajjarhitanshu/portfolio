import { MARQUEE_ITEMS } from '../data'

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--ink-muted)',
      borderBottom: '1px solid var(--ink-muted)',
      padding: '20px 0',
      background: 'var(--ink)',
    }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        .marquee-inner:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-inner">
        {items.map((item, i) => (
          <span key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            paddingRight: '32px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            letterSpacing: '-0.02em',
            color: i % (MARQUEE_ITEMS.length * 2) < MARQUEE_ITEMS.length
              ? 'var(--cream)'
              : 'var(--cream)',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
              flexShrink: 0,
              display: 'inline-block',
            }} />
          </span>
        ))}
      </div>
    </div>
  )
}
