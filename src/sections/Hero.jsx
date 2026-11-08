import { useEffect, useRef, useState } from 'react'
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
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      overflow: 'hidden',
      background: 'var(--ink)',
    }}>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h-fade { opacity: 0; }
        .h-fade.in { animation: heroFadeUp 1s var(--reveal-easing) both; }

        @keyframes displaySlide {
          from { opacity: 0; transform: translateY(48px) skewY(2deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0); }
        }
        .h-display { opacity: 0; }
        .h-display.in { animation: displaySlide 1.1s var(--reveal-easing) both; }

        .role-swap { transition: opacity 0.3s ease, transform 0.3s ease; }
        .role-swap.out { opacity: 0; transform: translateY(-8px); }

        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .scroll-bounce { animation: scrollBounce 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .h-fade, .h-display { opacity: 1; animation: none; }
          .scroll-bounce { animation: none; }
        }
      `}</style>

      {/* Left — text content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '100px 24px 32px' : '100px 48px 48px',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Top meta */}
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.1s' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,232,0.35)',
            }}>
              {META.portfolio}
            </div>
            <div style={{ width: '1px', height: '12px', background: 'rgba(245,241,232,0.15)' }} />
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,232,0.35)',
            }}>
              {META.edition}
            </div>
          </div>
        </div>

        {/* Centre — giant display name */}
        <div>
          <div className={`h-display${mounted ? ' in' : ''}`} style={{ animationDelay: '0.3s' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: isMobile ? 'clamp(4.5rem, 18vw, 8rem)' : 'clamp(5rem, 9vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--cream)',
              marginBottom: '0.1em',
            }}>
              Hitan-
              <br />shu
            </h1>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: isMobile ? 'clamp(4.5rem, 18vw, 8rem)' : 'clamp(5rem, 9vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--accent)',
              WebkitTextStroke: '0px',
            }}>
              Gajjar.
            </h1>
          </div>

          <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.65s', marginTop: '32px' }}>
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
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--green)',
                boxShadow: '0 0 8px var(--green)',
                display: 'inline-block',
              }} />
              {META.availability}
            </div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: 'var(--cream-muted)',
              maxWidth: '340px',
            }}>
              {META.tagline}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{
          animationDelay: '0.85s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
          paddingTop: '32px',
          borderTop: '1px solid rgba(245,241,232,0.08)',
        }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/projects" className="pill pill-outline" style={{ fontSize: '0.65rem' }}>
              SEE WORK ↗
            </Link>
            <a href="#contact" className="pill pill-accent" style={{ fontSize: '0.65rem' }}>
              CONTACT
            </a>
          </div>

          {/* Animated role */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,232,0.3)',
              marginBottom: '4px',
            }}>
              // CURRENTLY
            </div>
            <div
              className={`role-swap${roleVisible ? '' : ' out'}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                color: 'var(--cream)',
                whiteSpace: 'nowrap',
              }}
            >
              {ROLES[roleIndex]}
            </div>
          </div>
        </div>
      </div>

      {/* Right — 3D canvas */}
      <div style={{
        position: isMobile ? 'absolute' : 'relative',
        inset: isMobile ? 0 : undefined,
        opacity: isMobile ? 0.18 : 1,
        pointerEvents: isMobile ? 'none' : undefined,
      }}>
        <Hero3D />
      </div>

      {/* Scroll cue */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.25)',
          }}>
            SCROLL
          </div>
          <div className="scroll-bounce" style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(245,241,232,0.3), transparent)',
          }} />
        </div>
      )}
    </section>
  )
}
