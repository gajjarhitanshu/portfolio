import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const pos = useRef({ cx: 0, cy: 0, tx: 0, ty: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
    }
    window.addEventListener('pointermove', onMove)

    const tick = () => {
      const p = pos.current
      p.cx += (p.tx - p.cx) * 0.38
      p.cy += (p.ty - p.cy) * 0.38
      cursor.style.transform = `translate(${p.cx}px, ${p.cy}px) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const set = (state) => {
      cursor.dataset.state = state
    }

    const attachListeners = () => {
      document.querySelectorAll('a, button, .magnetic, [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('pointerenter', () => set('hover'))
        el.addEventListener('pointerleave', () => set(''))
      })
      document.querySelectorAll('.project-card, [data-cursor="view"]').forEach((el) => {
        el.addEventListener('pointerenter', () => set('view'))
        el.addEventListener('pointerleave', () => set(''))
      })
    }
    attachListeners()

    const mo = new MutationObserver(attachListeners)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onMove)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor {
          position: fixed;
          top: 0; left: 0;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--accent);
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: width 0.22s ease, height 0.22s ease, background 0.22s ease,
                      border 0.22s ease, mix-blend-mode 0.22s;
        }
        .cursor[data-state="hover"] {
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1.5px solid var(--accent);
        }
        .cursor[data-state="view"] {
          width: 72px;
          height: 72px;
          background: var(--cream);
          border: none;
          mix-blend-mode: difference;
        }
        .cursor-label {
          font-family: var(--font-mono);
          font-size: 0.5rem;
          letter-spacing: 0.14em;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0;
          transition: opacity 0.18s;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .cursor[data-state="view"] .cursor-label {
          opacity: 1;
        }
        @media (pointer: coarse) { .cursor { display: none; } }
      `}</style>
      <div ref={cursorRef} className="cursor">
        <span className="cursor-label">VIEW</span>
      </div>
    </>
  )
}
