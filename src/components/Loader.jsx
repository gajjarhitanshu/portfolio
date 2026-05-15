import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let start = null
    const duration = 2000

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(100)
        setTimeout(() => {
          setVisible(false)
          setTimeout(onDone, 600)
        }, 300)
      }
    }

    requestAnimationFrame(step)
  }, [onDone])

  if (!visible) return null

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
      transition: 'opacity 0.6s ease',
      opacity: visible ? 1 : 0,
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
