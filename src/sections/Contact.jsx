import { Link } from 'react-router-dom'
import { META, LINKS } from '../data'
import useIsMobile from '../hooks/useIsMobile'

export default function Contact() {
  const isMobile = useIsMobile()
  return (
    <section
      id="contact"
      style={{
        background: 'var(--ink)',
        padding: isMobile ? '80px 20px 48px' : '100px 60px 60px',
        borderTop: '1px solid var(--ink-muted)',
      }}
    >
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
        05 · CONTACT
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 'clamp(3rem, 9vw, 9rem)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: 'var(--cream)',
        marginBottom: '40px',
      }}>
        Let's build<br />
        something<br />
        <span style={{ color: 'var(--accent)' }}>fast.</span>
      </h2>

      {/* Email CTA */}
      <a
        href={LINKS.email}
        className="pill pill-outline"
        style={{
          fontSize: '0.7rem',
          padding: '14px 28px',
          marginBottom: '80px',
          display: 'inline-flex',
        }}
      >
        {META.email.toUpperCase()} ↗
      </a>

      {/* Footer grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr auto auto auto',
        gap: isMobile ? '32px' : '48px',
        borderTop: '1px solid var(--ink-muted)',
        paddingTop: '48px',
        alignItems: 'start',
      }}>
        {/* Copyright */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '8px',
          }}>
            © 2026 Hitanshu Gajjar
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'rgba(200,196,188,0.4)',
          }}>
            Designed & built by HG
          </div>
        </div>

        {/* Elsewhere */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '16px',
          }}>
            Elsewhere
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'LinkedIn', href: LINKS.linkedin },
              { label: 'GitHub', href: LINKS.github },
              { label: 'Email', href: LINKS.email },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--cream)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '16px',
          }}>
            Navigate
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Projects', to: '/projects' },
              { label: 'About', href: '#about' },
              { label: 'Experience', href: '#experience' },
            ].map(l => (
              l.to
                ? <Link key={l.label} to={l.to} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--cream)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
                  >{l.label}</Link>
                : <a key={l.label} href={l.href} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--cream)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
                  >{l.label}</a>
            ))}
          </div>
        </div>

        {/* Now */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '16px',
          }}>
            Now
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--cream)', lineHeight: 1.5 }}>
            Sr. Software Engineer — Fulcrum Digital
            <br />
            <span style={{ color: 'var(--cream-muted)', fontSize: '0.82rem' }}>React.js · TypeScript · Enterprise</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)', flexShrink: 0 }} />
            Open to opportunities
          </div>
        </div>
      </div>
    </section>
  )
}
