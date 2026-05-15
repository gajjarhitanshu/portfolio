import { useEffect, useRef, useState } from 'react'
import { ABOUT, STATS } from '../data'

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
      flex: 1,
      padding: '32px 24px',
      borderLeft: '1px solid var(--ink-muted)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        color: 'var(--accent)',
        fontSize: '1.2rem',
        lineHeight: 1,
        opacity: 0.6,
      }}>+</div>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(3rem, 7vw, 6rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: 'var(--cream)',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--cream-muted)',
        marginTop: '8px',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section" style={{ paddingBottom: 0 }}>
      {/* Label */}
      <div className="section-label">{ABOUT.label}</div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'start',
      }}>
        {/* Left — headline */}
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
        }}>
          {ABOUT.headline[0]}<br />
          <span style={{ color: 'var(--accent)' }}>{ABOUT.headline[1]}</span><br />
          {ABOUT.headline[2]}
        </h2>

        {/* Right — bio */}
        <div style={{ paddingTop: '8px' }}>
          {ABOUT.body.map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: i === 0 ? 'var(--cream)' : 'var(--cream-muted)',
              marginBottom: i < ABOUT.body.length - 1 ? '1.4rem' : 0,
            }}
              dangerouslySetInnerHTML={{
                __html: para
                  .replace(/React\.js & Next\.js/, '<strong>React.js & Next.js</strong>')
                  .replace(/Generative AI/, '<strong>Generative AI</strong>')
                  .replace(/Hitanshu Gajjar/, '<strong>Hitanshu Gajjar</strong>'),
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        marginTop: '80px',
        borderTop: '1px solid var(--ink-muted)',
      }}>
        {STATS.map(s => (
          <Counter key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
