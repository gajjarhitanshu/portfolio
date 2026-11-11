import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState('in') // 'in' | 'out'

  useEffect(() => {
    let start = null
    const duration = 400 // was 2000ms — reduced to keep LCP under 2.5s Good threshold

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(100)
        setTimeout(() => {
          setPhase('out')
          setTimeout(onDone, 300)
        }, 80)
      }
    }

    requestAnimationFrame(step)
  }, [onDone])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      opacity: phase === 'out' ? 0 : 1,
      transition: 'opacity 0.3s ease',
      pointerEvents: phase === 'out' ? 'none' : 'auto',
    }}>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(4rem, 15vw, 12rem)',
        fontWeight: 700,
        color: 'var(--cream)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>
        {String(count).padStart(2, '0')}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        color: 'var(--cream-muted)',
        marginTop: '1rem',
        textTransform: 'uppercase',
      }}>
        INITIALISING SCENE
      </div>
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        color: 'var(--cream-muted)',
        textTransform: 'uppercase',
      }}>
        HG / PORTFOLIO 2026
      </div>
    </div>
  )
}
