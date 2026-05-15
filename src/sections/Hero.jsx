import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero3D from '../components/Hero3D'
import { META, ROLES } from '../data'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % ROLES.length)
        setVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--ink)',
    }}>
      {/* 3D Canvas */}
      <Hero3D />

      {/* Star particles overlay */}
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.3} 50%{opacity:1} }
        .star { position:absolute; border-radius:50%; background:var(--cream); animation:twinkle var(--dur) ease-in-out infinite; pointer-events:none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade { animation: fadeUp 0.9s ease both; }

        @keyframes roleFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .role-text { transition: opacity 0.35s ease, transform 0.35s ease; }
        .role-text.hidden { opacity: 0; transform: translateY(-6px); }
      `}</style>

      {/* Top metadata row */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '32px',
        right: '32px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div className="hero-fade" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--cream-muted)', textTransform: 'uppercase' }}>
            {META.portfolio}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--cream-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
            {META.edition}
          </div>
        </div>
        <div className="hero-fade" style={{ animationDelay: '0.2s', opacity: 0, textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--cream-muted)', textTransform: 'uppercase' }}>
            {META.location}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--cream-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
            {META.title}
          </div>
        </div>
      </div>

      {/* Hero divider line */}
      <div style={{
        position: 'absolute',
        bottom: '160px',
        left: '32px',
        right: '32px',
        height: '1px',
        background: 'rgba(245,241,232,0.1)',
      }} />

      {/* Giant name */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(4rem, 14vw, 16rem)',
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          textAlign: 'center',
          color: 'var(--cream)',
        }}>
          HITANSHU
          <br />
          <span style={{ color: 'var(--accent)' }}>GAJJAR.</span>
        </h1>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '32px',
        right: '32px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '24px',
      }}>
        {/* Left — availability + tagline */}
        <div style={{ maxWidth: '340px' }} className="hero-fade" data-delay="0.4">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '10px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 6px var(--green)' }} />
            {META.availability}
          </div>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            lineHeight: 1.55,
            color: 'var(--cream-muted)',
          }}>
            {META.tagline}
          </p>
        </div>

        {/* Center — currently scroll */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.35)',
            marginBottom: '4px',
          }}>
            // CURRENTLY SCROLL
          </div>
          <div style={{
            width: '1px',
            height: '32px',
            background: 'rgba(245,241,232,0.2)',
            margin: '0 auto 4px',
          }} />
          <div
            className={`role-text${visible ? '' : ' hidden'}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--cream)',
            }}
          >
            {ROLES[roleIndex]}
          </div>
        </div>

        {/* Right — CTAs */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
          <Link to="/projects" className="pill pill-outline">
            SEE THE WORK ↗
          </Link>
          <a href="#contact" className="pill" style={{
            color: 'var(--cream-muted)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
          }}>
            CONTACT
          </a>
        </div>
      </div>
    </section>
  )
}
