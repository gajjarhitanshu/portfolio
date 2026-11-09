import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { META } from '../data'
import useIsMobile from '../hooks/useIsMobile'

const HOME_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Work',       href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

const PROJECTS_LINKS = [
  { label: 'Featured', href: '#featured' },
  { label: 'Archive',  href: '#archive' },
]

export default function Nav() {
  const location   = useLocation()
  const isProjects = location.pathname === '/projects'
  const [active,   setActive]   = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile  = useIsMobile()
  const rafRef    = useRef(null)

  const links = isProjects ? PROJECTS_LINKS : HOME_LINKS

  /* Scroll tracking — RAF-throttled */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80)
        const ids = links.map(l => l.href.replace('#', ''))
        for (const id of [...ids].reverse()) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 100) {
            setActive(`#${id}`)
            rafRef.current = null
            return
          }
        }
        setActive('')
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [links])

  /* Lock body scroll while mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleAnchor = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navBg      = scrolled || menuOpen ? 'rgba(10,10,12,0.92)' : 'transparent'
  const navBlur    = scrolled || menuOpen ? 'blur(14px)'          : 'none'
  const navBorder  = scrolled || menuOpen ? '1px solid rgba(245,241,232,0.06)' : '1px solid transparent'

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,241,232,0.5);
          text-decoration: none;
          padding-bottom: 2px;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover      { color: var(--cream); }
        .nav-link.active     { color: var(--cream); }
        .nav-link.active::after { transform: scaleX(1); }

        /* Mobile overlay links */
        .mob-link {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: clamp(2rem, 10vw, 3rem);
          letter-spacing: -0.03em;
          color: rgba(245,241,232,0.35);
          text-decoration: none;
          transition: color 0.2s ease;
          opacity: 0;
          transform: translateY(20px);
          transition: color 0.2s ease, opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .mob-link:hover  { color: var(--cream); }
        .mob-link.active { color: var(--accent); }
        .mob-link.visible { opacity: 1; transform: translateY(0); }

        /* Hamburger lines */
        .hb-bar {
          display: block;
          width: 24px;
          height: 1.5px;
          background: var(--cream);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-link, .nav-link::after, .mob-link, .hb-bar { transition: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 20px' : '0 36px',
        height: '60px',
        background: navBg,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
        borderBottom: navBorder,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}>

        {/* Monogram */}
        <Link to="/" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--cream)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="0.5" y="0.5" width="17" height="17" stroke="rgba(245,241,232,0.2)" strokeWidth="1"/>
            <text x="9" y="13" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="500" fill="var(--cream)">HG</text>
          </svg>
          {META.logo}
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {isProjects && (
              <Link to="/" className="nav-link">↖ Home</Link>
            )}
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link${active === l.href ? ' active' : ''}`}
                onClick={e => handleAnchor(e, l.href)}
              >
                {l.label}
              </a>
            ))}
            {!isProjects && (
              <Link to="/projects" className="nav-link" style={{ color: 'var(--accent)', opacity: 1 }}>
                Projects ↗
              </Link>
            )}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '6px',
              padding: '8px',
            }}
          >
            <span className="hb-bar" style={{
              transform: menuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
            }} />
            <span className="hb-bar" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="hb-bar" style={{
              transform: menuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        )}
      </nav>

      {/* Mobile overlay */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'var(--ink)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 32px',
          gap: '4px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.3)',
            marginBottom: '32px',
          }}>
            {META.logo} · Navigation
          </div>

          {isProjects && (
            <Link
              to="/"
              className={`mob-link${menuOpen ? ' visible' : ''}`}
              style={{ transitionDelay: '0.05s' }}
              onClick={() => setMenuOpen(false)}
            >← Home</Link>
          )}

          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={`mob-link${active === l.href ? ' active' : ''}${menuOpen ? ' visible' : ''}`}
              style={{ transitionDelay: `${0.05 + i * 0.06}s` }}
              onClick={e => { handleAnchor(e, l.href); setMenuOpen(false) }}
            >
              {l.label}
            </a>
          ))}

          {!isProjects && (
            <Link
              to="/projects"
              className={`mob-link${menuOpen ? ' visible' : ''}`}
              style={{ color: 'var(--accent)', opacity: 0, transitionDelay: `${0.05 + links.length * 0.06}s` }}
              onClick={() => setMenuOpen(false)}
            >
              Projects ↗
            </Link>
          )}

          <div style={{
            marginTop: '48px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'rgba(245,241,232,0.2)',
          }}>
            hitanshu.hexxum@gmail.com
          </div>
        </div>
      )}
    </>
  )
}
