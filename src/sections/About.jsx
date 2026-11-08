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
        const duration = 1800
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
    <div ref={ref} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(3rem, 6vw, 5rem)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--cream)',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--cream-muted)',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function About() {
  const isMobile = useIsMobile()
  const headlineRef = useScrollReveal()
  const bodyRef = useScrollReveal({ threshold: 0.1 })
  const statsRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="about" className="section" style={{ paddingBottom: 0 }}>
      <div className="section-label">{ABOUT.label}</div>

      {/* Two-column: big pull-quote left, body right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
        gap: isMobile ? '36px' : '72px',
        alignItems: 'start',
        marginBottom: isMobile ? '48px' : '80px',
      }}>
        {/* Left — display pull-quote */}
        <div ref={headlineRef} className="reveal">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: isMobile ? 'clamp(3rem, 10vw, 5rem)' : 'clamp(3.5rem, 7vw, 6.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}>
            {ABOUT.headline[0]}<br />
            <span style={{ color: 'var(--accent)' }}>{ABOUT.headline[1]}</span><br />
            <span style={{ fontStyle: 'normal', fontWeight: 700 }}>{ABOUT.headline[2]}</span>
          </h2>

          {/* Accent rule */}
          <div style={{
            width: '48px',
            height: '2px',
            background: 'var(--accent)',
            marginTop: '28px',
          }} />
        </div>

        {/* Right — bio paragraphs */}
        <div ref={bodyRef} className="reveal" style={{ paddingTop: isMobile ? 0 : '8px' }}>
          {ABOUT.body.map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.975rem',
              lineHeight: 1.75,
              color: i === 0 ? 'var(--cream)' : 'var(--cream-muted)',
              marginBottom: i < ABOUT.body.length - 1 ? '1.4rem' : 0,
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

      {/* Stats row — editorial counter grid */}
      <div
        ref={statsRef}
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '1px',
          borderTop: '1px solid var(--ink-muted)',
          background: 'var(--ink-muted)',
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} style={{
            background: 'var(--ink)',
            padding: isMobile ? '28px 20px' : '40px 32px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '14px',
              color: 'var(--accent)',
              fontSize: '1rem',
              opacity: 0.5,
            }}>+</div>
            <Counter {...s} />
          </div>
        ))}
      </div>
    </section>
  )
}
