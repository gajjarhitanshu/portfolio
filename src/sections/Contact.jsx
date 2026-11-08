import { Link } from 'react-router-dom'
import { META, LINKS } from '../data'
import useIsMobile from '../hooks/useIsMobile'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const isMobile = useIsMobile()
  const headRef = useScrollReveal()
  const ctaRef = useScrollReveal({ threshold: 0.1 })
  const footerRef = useScrollReveal({ threshold: 0.05 })

  return (
    <section
      id="contact"
      style={{
        background: 'var(--ink)',
        padding: isMobile ? '80px 24px 48px' : '120px 60px 60px',
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
        07 · CONTACT
      </div>

      {/* Display headline */}
      <div ref={headRef} className="reveal" style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: isMobile ? 'clamp(3.5rem, 14vw, 7rem)' : 'clamp(4rem, 10vw, 10rem)',
          letterSpacing: '-0.03em',
          lineHeight: 0.92,
          color: 'var(--cream)',
        }}>
          Let's build<br />
          <span style={{ color: 'var(--accent)' }}>something</span><br />
          <span style={{ fontStyle: 'normal', fontWeight: 700, color: 'rgba(245,241,232,0.3)' }}>fast.</span>
        </h2>
      </div>

      {/* Oversized email link */}
      <div ref={ctaRef} className="reveal" style={{ marginBottom: '80px' }}>
        <a
          href={LINKS.email}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: isMobile ? 'clamp(1rem, 4.5vw, 1.4rem)' : 'clamp(1.1rem, 2.5vw, 2rem)',
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            borderBottom: '2px solid var(--accent)',
            paddingBottom: '4px',
            transition: 'color 0.2s',
            lineHeight: 1,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
        >
          {META.email} ↗
        </a>

        {/* Social pills */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'LinkedIn', href: LINKS.linkedin },
            { label: 'GitHub', href: LINKS.github },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="pill pill-outline"
              style={{ fontSize: '0.62rem' }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Footer grid */}
      <div
        ref={footerRef}
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr auto auto auto',
          gap: isMobile ? '32px' : '48px',
          borderTop: '1px solid var(--ink-muted)',
          paddingTop: '48px',
          alignItems: 'start',
        }}
      >
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
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                className="link-hover"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--cream)', transition: 'color 0.2s' }}
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
                ? <Link key={l.label} to={l.to}
                    className="link-hover"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--cream)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
                  >{l.label}</Link>
                : <a key={l.label} href={l.href}
                    className="link-hover"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--cream)', transition: 'color 0.2s' }}
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
            fontSize: '0.6rem',
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
