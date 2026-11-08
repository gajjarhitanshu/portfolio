import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero3D from '../components/Hero3D'
import { META, ROLES } from '../data'
import useIsMobile from '../hooks/useIsMobile'

const FIRST = 'HITANSHU'
const LAST = 'GAJJAR.'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useIsMobile()
  const rafRef = useRef(null)

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

  /* Parallax scroll tracker — RAF-throttled */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* Parallax offsets */
  const metaParallax = isMobile ? 0 : scrollY * 0.12
  const nameParallax  = isMobile ? 0 : scrollY * 0.06

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
        /* ── Metadata fade-up ── */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h-fade { opacity: 0; }
        .h-fade.in { animation: heroFadeUp 0.85s cubic-bezier(0.16,1,0.3,1) both; }

        /* ── Letter drop ── */
        @keyframes letterDrop {
          from { opacity: 0; transform: translateY(60%) skewY(4deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        .h-letter { display: inline-block; opacity: 0; }
        .h-letter.in { animation: letterDrop 0.7s cubic-bezier(0.16,1,0.3,1) both; }

        /* ── Gradient shimmer sweep on GAJJAR. ── */
        @keyframes shimmerSweep {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .h-gradient-text {
          background: linear-gradient(
            105deg,
            var(--accent) 0%,
            #ff9a5c 30%,
            #fff4e0 50%,
            #ff9a5c 70%,
            var(--accent) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .h-gradient-text.shimmer {
          animation: shimmerSweep 3.2s linear 1.2s infinite;
        }

        /* ── Availability pulse ring ── */
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(2.2); opacity: 0;   }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        .avail-dot-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; }
        .avail-dot-ring {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: var(--green);
          animation: pulseRing 2s cubic-bezier(0.215,0.61,0.355,1) infinite;
        }
        .avail-dot {
          position: relative;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 8px var(--green);
          z-index: 1;
        }

        /* ── CTA spring slide-up ── */
        @keyframes springUp {
          from { opacity: 0; transform: translateY(24px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .h-spring { opacity: 0; }
        .h-spring.in { animation: springUp 0.75s cubic-bezier(0.34,1.56,0.64,1) both; }

        /* ── Animated divider line ── */
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .h-divider {
          transform-origin: left center;
          transform: scaleX(0);
        }
        .h-divider.in {
          animation: lineGrow 1s cubic-bezier(0.16,1,0.3,1) 0.9s both;
        }

        /* ── Role swap ── */
        .role-swap { transition: opacity 0.3s ease, transform 0.3s ease; }
        .role-swap.out { opacity: 0; transform: translateY(-6px); }

        /* ── Scroll bounce ── */
        @keyframes scrollBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%     { transform: translateX(-50%) translateY(6px); }
        }
        .scroll-bounce { animation: scrollBounce 1.6s ease-in-out infinite; }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .h-fade, .h-letter, .h-spring { opacity: 1; animation: none; }
          .h-gradient-text.shimmer { animation: none; }
          .h-divider { transform: scaleX(1); animation: none; }
          .avail-dot-ring { animation: none; opacity: 0; }
          .scroll-bounce { animation: none; }
        }
      `}</style>

      {/* Full-bleed 3D canvas */}
      <Hero3D />

      {/* Top metadata — parallax float */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '24px' : '36px',
        left: isMobile ? '20px' : '36px',
        right: isMobile ? '20px' : '36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transform: `translateY(${-metaParallax}px)`,
        willChange: 'transform',
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

      {/* Giant centred name — letter stagger + parallax */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: `translateY(${-nameParallax}px)`,
        willChange: 'transform',
      }}>
        <div style={{ textAlign: 'center', overflow: 'hidden' }}>
          {/* HITANSHU — letter by letter */}
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 13vw, 14rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
          }}>
            {FIRST.split('').map((ch, i) => (
              <span
                key={i}
                className={`h-letter${mounted ? ' in' : ''}`}
                style={{
                  animationDelay: `${0.3 + i * 0.045}s`,
                  color: 'var(--cream)',
                }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* GAJJAR. — gradient shimmer */}
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 13vw, 14rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
          }}>
            {LAST.split('').map((ch, i) => {
              const delay = 0.3 + (FIRST.length + i) * 0.045
              return (
                <span
                  key={i}
                  className={`h-letter${mounted ? ' in' : ''}`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  <span
                    className={`h-gradient-text${mounted ? ' shimmer' : ''}`}
                    style={{ animationDelay: `${delay + 0.9}s` }}
                  >
                    {ch}
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Animated divider */}
      {!isMobile && (
        <div
          className={`h-divider${mounted ? ' in' : ''}`}
          style={{
            position: 'absolute',
            bottom: '140px',
            left: '36px',
            right: '36px',
            height: '1px',
            background: 'rgba(245,241,232,0.08)',
          }}
        />
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
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '10px',
          }}>
            <span className="avail-dot-wrap">
              <span className="avail-dot-ring" />
              <span className="avail-dot" />
            </span>
            {META.availability}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--cream-muted)' }}>
            {META.tagline}
          </p>
        </div>

        {/* Centre — role ticker */}
        <div className={`h-fade${mounted ? ' in' : ''}`} style={{ animationDelay: '0.75s', textAlign: isMobile ? 'left' : 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.3)', marginBottom: '4px' }}>
            // CURRENTLY
          </div>
          <div style={{ width: '1px', height: '28px', background: 'rgba(245,241,232,0.18)', margin: '0 auto 4px' }} />
          <div className={`role-swap${roleVisible ? '' : ' out'}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--cream)' }}>
            {ROLES[roleIndex]}
          </div>
        </div>

        {/* Right — CTAs with spring */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
          <Link
            to="/projects"
            className={`pill pill-outline h-spring${mounted ? ' in' : ''}`}
            style={{ fontSize: '0.65rem', animationDelay: '0.85s' }}
          >
            SEE THE WORK ↗
          </Link>
          <a
            href="#contact"
            className={`pill pill-accent h-spring${mounted ? ' in' : ''}`}
            style={{ fontSize: '0.65rem', animationDelay: '0.95s' }}
          >
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
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, rgba(245,241,232,0.25), transparent)',
        }} />
      )}
    </section>
  )
}
