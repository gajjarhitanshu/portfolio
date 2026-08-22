import { useRef } from 'react'
import useIsMobile from '../hooks/useIsMobile'

const SITES = [
  {
    title: 'Harsha Deesigns',
    subtitle: 'Texture & Finish Studio · Anand, Gujarat',
    description:
      'Boutique website for a luxury wall-finish studio — lime wash, stucco, decorative paint and DUCO hand-finished by 35 artisans across 450+ homes, hotels and studios in Gujarat.',
    url: 'https://harsha-deesigns.netlify.app',
    screenshot: '/screenshots/harsha-deesigns.png',
    tags: ['HTML · CSS · JS', 'Netlify', 'Live Project'],
    year: '2025',
  },
  {
    title: 'Regent Parfums',
    subtitle: 'Maison de Niche · Eau de Parfum',
    description:
      'Editorial fragrance brand site for Regent — four niche perfumes cast in the form of a chess king, with a cinematic scroll-driven presentation and product showcase.',
    url: 'https://regent-perfume.netlify.app',
    screenshot: '/screenshots/regent-perfume.png',
    tags: ['HTML · CSS · JS', 'Netlify', 'Live Project'],
    year: '2025',
  },
]

function BrowserCard({ site, isMobile }) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg) translateY(-4px)`
    })
  }
  const handleMouseLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)'
  }

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="client-card"
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(245,241,232,0.08)',
        background: 'rgba(255,255,255,0.02)',
        transition: 'border-color 0.3s, transform 0.15s ease, box-shadow 0.3s',
        cursor: 'none',
      }}
    >
      <style>{`
        .client-card:hover {
          border-color: rgba(255,107,61,0.35) !important;
          box-shadow: 0 0 40px rgba(255,107,61,0.08);
        }
        .client-card:hover .cc-overlay { opacity: 1; }
      `}</style>

      {/* Browser chrome */}
      <div style={{
        background: 'rgba(245,241,232,0.04)',
        borderBottom: '1px solid rgba(245,241,232,0.07)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['rgba(255,96,92,0.7)', 'rgba(255,189,68,0.7)', 'rgba(39,201,63,0.7)'].map((c, i) => (
            <span key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, flexShrink: 0 }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          background: 'rgba(245,241,232,0.06)',
          borderRadius: '5px',
          padding: '3px 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: 'rgba(245,241,232,0.35)',
          letterSpacing: '0.04em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {site.url.replace('https://', '')}
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--accent)',
        }}>↗</span>
      </div>

      {/* Screenshot */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
        <img
          src={site.screenshot}
          alt={site.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
        {/* Hover overlay */}
        <div className="cc-overlay" style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,107,61,0.08)',
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Card content */}
      <div style={{ padding: isMobile ? '20px' : '28px 32px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '8px',
        }}>
          {site.year} · {site.subtitle}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
          letterSpacing: '-0.025em',
          color: 'var(--cream)',
          marginBottom: '10px',
          lineHeight: 1.1,
        }}>
          {site.title}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          lineHeight: 1.65,
          color: 'var(--cream-muted)',
          marginBottom: '20px',
        }}>
          {site.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {site.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--cream-muted)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>{t}</span>
            ))}
          </div>
          <span className="cc-visit" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '10px 22px',
            borderRadius: '999px',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            background: 'transparent',
            transition: 'background 0.2s, color 0.2s',
            flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--ink)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
          >
            VISIT SITE ↗
          </span>
        </div>
      </div>
    </a>
  )
}

export default function ClientSites() {
  const isMobile = useIsMobile()

  return (
    <section
      id="client-sites"
      style={{
        background: 'var(--ink)',
        padding: isMobile ? '80px 20px' : '100px 60px',
        borderTop: '1px solid rgba(245,241,232,0.06)',
      }}
    >
      {/* Section label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--cream-muted)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ width: '2rem', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
        03 · WEB PORTFOLIO
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '56px',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'var(--cream)',
        }}>
          Shipped to<br />production.
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          color: 'var(--cream-muted)',
          maxWidth: '340px',
          textAlign: isMobile ? 'left' : 'right',
        }}>
          Websites designed, coded and deployed from scratch — live on the web.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '20px',
      }}>
        {SITES.map(site => (
          <BrowserCard key={site.url} site={site} isMobile={isMobile} />
        ))}
      </div>
    </section>
  )
}
