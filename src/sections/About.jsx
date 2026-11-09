import { useEffect, useRef, useState } from 'react'
import { ABOUT, STATS } from '../data'
import useIsMobile from '../hooks/useIsMobile'
import useScrollReveal from '../hooks/useScrollReveal'

function Counter({ value, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = null
        const duration = 1600
        const step = (ts) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * value))
          if (p < 1) requestAnimationFrame(step)
          else setCount(value)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref}>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 900,
        fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--cream)',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--cream-muted)',
        marginTop: '10px',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function About() {
  const isMobile = useIsMobile()
  const headlineRef = useScrollReveal()
  const ruleRef = useRef(null)
  const bodyRef = useScrollReveal({ threshold: 0.1 })
  const statsRef = useScrollReveal({ threshold: 0.1 })

  /* Orange rule scaleX animation */
  useEffect(() => {
    if (!ruleRef.current) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ruleRef.current.style.transform = 'scaleX(1)'
        observer.disconnect()
      }
    }, { threshold: 0.4 })
    observer.observe(ruleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section" style={{ paddingBottom: 0 }}>
      <style>{`
        .about-rule {
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .stat-cell {
          position: relative;
          padding: ${isMobile ? '28px 20px' : '44px 36px'};
          border-right: 1px solid rgba(245,241,232,0.07);
          border-bottom: 1px solid rgba(245,241,232,0.07);
        }
        .stat-cell:last-child { border-right: none; }
        @media (max-width: 600px) {
          .stat-cell:nth-child(2n) { border-right: none; }
          .stat-cell:nth-last-child(-n+2) { border-bottom: none; }
        }
        @media (min-width: 601px) {
          .stat-cell:nth-last-child(-n+4) { border-bottom: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-rule { transform: scaleX(1) !important; transition: none !important; }
        }
      `}</style>

      <div className="section-label">{ABOUT.label}</div>

      {/* Two-column: big pull-quote left, body right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr',
        gap: isMobile ? '36px' : '80px',
        alignItems: 'start',
        marginBottom: isMobile ? '56px' : '0',
      }}>

        {/* Left — pull-quote */}
        <div ref={headlineRef} className="reveal">
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            margin: 0,
          }}>
            {ABOUT.headline[0]}<br />
            <span style={{ color: 'var(--accent)' }}>{ABOUT.headline[1]}</span>
            {' '}
            <span style={{ fontWeight: 700 }}>{ABOUT.headline[2]}</span>
          </h2>

          {/* 2px orange rule — scaleX animated */}
          <div
            ref={ruleRef}
            className="about-rule"
            style={{
              width: '56px',
              height: '2px',
              background: 'var(--accent)',
              marginTop: '32px',
            }}
          />

          {/* Section number watermark */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.2)',
            marginTop: '24px',
          }}>
            Section 01 of 06
          </div>
        </div>

        {/* Right — bio */}
        <div ref={bodyRef} className="reveal" style={{ paddingTop: isMobile ? 0 : '6px' }}>
          {ABOUT.body.map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.975rem',
              lineHeight: 1.78,
              color: i === 0 ? 'var(--cream)' : 'var(--cream-muted)',
              marginBottom: i < ABOUT.body.length - 1 ? '1.5rem' : 0,
              margin: i < ABOUT.body.length - 1 ? '0 0 1.5rem' : 0,
            }}
              dangerouslySetInnerHTML={{
                __html: para
                  .replace(/React\.js & Next\.js/, '<strong style="color:var(--cream)">React.js & Next.js</strong>')
                  .replace(/Generative AI/, '<strong style="color:var(--accent)">Generative AI</strong>')
                  .replace(/Hitanshu Gajjar/, '<strong style="color:var(--cream)">Hitanshu Gajjar</strong>'),
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats grid — border-line cells, no gap hack */}
      <div
        ref={statsRef}
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(245,241,232,0.07)',
          marginTop: isMobile ? 0 : '80px',
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="stat-cell">
            <Counter {...s} />
          </div>
        ))}
      </div>
    </section>
  )
}
