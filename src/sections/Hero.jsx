import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero3D from '../components/Hero3D'
import { META, ROLES } from '../data'
import useIsMobile from '../hooks/useIsMobile'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % ROLES.length)
        setRoleVisible(true)
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
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h-fade { opacity: 0; }
        .h-fade.in { animation: heroFadeUp 0.9s var(--reveal-easing) both; }

        @keyframes displayDrop {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h-name { opacity: 0; }
        .h-name.in { animation: displayDrop 1s var(--reveal-easing) both; }

        .role-swap { transition: opacity 0.3s ease, transform 0.3s ease; }
        .role-swap.out { opacity: 0; transform: translateY(-6px); }

        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .scroll-bounce { animation: scrollBounce 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .h-fade, .h-name { opacity: 1; animation: none; }
          .scroll-bounce { animation: none; }
        }
      `}</style>

      {/* Full-bleed 3D canvas */}
      <Hero3D />

      {/* Top metadata row */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '24px' : '36px',
        left: isMobile ? '20px' : '36px',
        right: isMobile ? '20px' : '36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.1s' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.35)' }}>
            {META.portfolio}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.35)', marginTop: '2px' }}>
            {META.edition}
          </div>
        </div>
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.2s', textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.35)' }}>
            {META.location}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.35)', marginTop: '2px' }}>
            {META.title}
          </div>
        </div>
      </div>

      {/* Giant centred name */}
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
        <div className={`h-name${mounted ? ' in' : ''}`} style={{ animationDelay: '0.3s', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(4rem, 13vw, 14rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            color: 'var(--cream)',
          }}>
            HITANSHU
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(4rem, 13vw, 14rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            color: 'var(--accent)',
          }}>
            GAJJAR.
          </div>
        </div>
      </div>

      {/* Divider line */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '140px',
          left: '36px',
          right: '36px',
          height: '1px',
          background: 'rgba(245,241,232,0.08)',
        }} />
      )}

      {/* Bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '24px' : '36px',
        left: isMobile ? '20px' : '36px',
        right: isMobile ? '20px' : '36px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        justifyContent: 'space-between',
        gap: isMobile ? '16px' : '24px',
      }}>
        {/* Left — availability + tagline */}
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.65s', maxWidth: '340px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '10px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', display: 'inline-block' }} />
            {META.availability}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--cream-muted)' }}>
            {META.tagline}
          </p>
        </div>

        {/* Centre — scroll / role */}
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.75s', textAlign: isMobile ? 'left' : 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.3)', marginBottom: '4px' }}>
            // CURRENTLY
          </div>
          <div style={{ width: '1px', height: '28px', background: 'rgba(245,241,232,0.18)', margin: '0 auto 4px' }} />
          <div className={`role-swap${roleVisible ? '' : ' out'}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--cream)' }}>
            {ROLES[roleIndex]}
          </div>
        </div>

        {/* Right — CTAs */}
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.85s', display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
          <Link to="/projects" className="pill pill-outline" style={{ fontSize: '0.65rem' }}>
            SEE THE WORK ↗
          </Link>
          <a href="#contact" className="pill pill-accent" style={{ fontSize: '0.65rem' }}>
            CONTACT
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      {!isMobile && (
        <div className="scroll-bounce" style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, rgba(245,241,232,0.25), transparent)',
        }} />
      )}
    </section>
  )
}
