import { SKILLS } from '../data'
import useIsMobile from '../hooks/useIsMobile'
import useScrollReveal from '../hooks/useScrollReveal'

const SKILL_GROUPS = [
  {
    domain: 'Frontend',
    tags: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    domain: 'Mobile',
    tags: ['React Native', 'Swift', 'Kotlin · Java', 'NativeBase'],
  },
  {
    domain: 'State & Data',
    tags: ['Redux · Saga · Thunk', 'React Query', 'Context API', 'GraphQL', 'MongoDB · SQL'],
  },
  {
    domain: 'AI & Cloud',
    tags: ['Generative AI', 'OpenAI', 'Gemini', 'Claude', 'Firebase'],
  },
  {
    domain: 'Tools',
    tags: ['Node.js', 'Python', 'Jest · RTL', 'Git', 'ESLint'],
  },
]

export default function Skills() {
  const isMobile = useIsMobile()
  const headRef = useScrollReveal()
  const gridRef = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="skills" className="section">
      <div className="section-label">{SKILLS.label}</div>

      {/* Heading row */}
      <div
        ref={headRef}
        className="reveal"
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
          marginBottom: '56px',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'var(--cream)',
        }}>
          {SKILLS.headline}
        </h2>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--cream-muted)',
        }}>
          {SKILLS.sub}
        </div>
      </div>

      <hr style={{ marginBottom: '48px' }} />

      {/* Grouped domains */}
      <div ref={gridRef} className="reveal">
        {SKILL_GROUPS.map((group, gi) => (
          <div
            key={group.domain}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '160px 1fr',
              gap: isMobile ? '12px' : '32px',
              alignItems: 'center',
              paddingBottom: '24px',
              marginBottom: '24px',
              borderBottom: gi < SKILL_GROUPS.length - 1 ? '1px solid rgba(245,241,232,0.06)' : 'none',
            }}
          >
            {/* Domain label */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              flexShrink: 0,
            }}>
              {String(gi + 1).padStart(2, '0')} · {group.domain}
            </div>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: '1px solid var(--ink-muted)',
                    color: 'var(--cream-muted)',
                    background: 'transparent',
                    cursor: 'none',
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--cream)'
                    e.currentTarget.style.background = 'rgba(255,107,61,0.07)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--ink-muted)'
                    e.currentTarget.style.color = 'var(--cream-muted)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
