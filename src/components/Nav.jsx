import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { META } from '../data'

const HOME_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const PROJECTS_LINKS = [
  { label: 'Featured', href: '#featured' },
  { label: 'Archive', href: '#archive' },
]

export default function Nav() {
  const location = useLocation()
  const isProjects = location.pathname === '/projects'
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const links = isProjects ? PROJECTS_LINKS : HOME_LINKS

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = links.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [links])

  const handleAnchor = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.getElementById(href.replace('#', ''))
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: '64px',
      background: scrolled ? 'rgba(13,13,16,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border 0.3s ease',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'inline-block',
          flexShrink: 0,
        }} />
        {META.logo}
      </Link>

      {/* Center links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '999px',
        padding: '4px',
      }}>
        {isProjects && (
          <>
            <Link to="/" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: '999px',
              color: 'var(--cream-muted)',
              transition: 'var(--transition-fast)',
              whiteSpace: 'nowrap',
            }}>
              ↖ Home
            </Link>
            <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.12)' }} />
          </>
        )}
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={e => handleAnchor(e, l.href)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: '999px',
              color: active === l.href ? 'var(--ink)' : 'var(--cream-muted)',
              background: active === l.href ? 'var(--cream)' : 'transparent',
              transition: 'var(--transition-fast)',
              whiteSpace: 'nowrap',
            }}
          >
            {l.label}
          </a>
        ))}
        {!isProjects && (
          <>
            <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.12)' }} />
            <Link to="/projects" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(255,107,61,0.15)',
              border: '1px solid rgba(255,107,61,0.3)',
              color: 'var(--cream)',
              transition: 'var(--transition-fast)',
              whiteSpace: 'nowrap',
            }}>
              All Projects ↗
            </Link>
          </>
        )}
      </div>

      {/* CTA */}
      <a
        href="mailto:hitanshu.hexxum@gmail.com"
        className="pill pill-outline"
        style={{ fontSize: '0.65rem' }}
      >
        Get in Touch ↗
      </a>
    </nav>
  )
}
