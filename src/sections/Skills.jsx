import { SKILLS } from '../data'
import useIsMobile from '../hooks/useIsMobile'
import useScrollReveal from '../hooks/useScrollReveal'

const SKILL_GROUPS = [
  { domain: 'Frontend',    tags: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { domain: 'Mobile',      tags: ['React Native', 'Swift', 'Kotlin · Java', 'NativeBase'] },
  { domain: 'State & Data',tags: ['Redux · Saga · Thunk', 'React Query', 'Context API', 'GraphQL', 'MongoDB · SQL'] },
  { domain: 'AI & Cloud',  tags: ['Generative AI', 'OpenAI', 'Gemini', 'Claude', 'Firebase'] },
  { domain: 'Tools',       tags: ['Node.js', 'Python', 'Jest · RTL', 'Git', 'ESLint'] },
]

export default function Skills() {
  const isMobile = useIsMobile()
  const headRef  = useScrollReveal()
  const gridRef  = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="skills" className="section">
      <style>{`
        .skill-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 7px 15px;
          border-radius: 999px;
          border: 1px solid rgba(245,241,232,0.1);
          color: var(--cream-muted);
          background: transparent;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .skill-tag:hover {
          border-color: var(--accent);
          color: var(--cream);
          background: rgba(255,107,61,0.07);
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-tag { transition: none; }
        }
      `}</style>

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
          marginBottom: '48px',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'var(--cream)',
          margin: 0,
        }}>
          {SKILLS.headline}
        </h2>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(245,241,232,0.3)',
          flexShrink: 0,
        }}>
          {SKILLS.sub}
        </div>
      </div>

      {/* Separator */}
      <div style={{
        height: '1px',
        background: 'rgba(245,241,232,0.07)',
        marginBottom: '48px',
      }} />

      {/* Grouped domain rows */}
      <div ref={gridRef} className="reveal">
        {SKILL_GROUPS.map((group, gi) => (
          <div
            key={group.domain}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
              gap: isMobile ? '14px' : '40px',
              alignItems: 'flex-start',
              padding: isMobile ? '20px 0' : '24px 0',
              borderBottom: gi < SKILL_GROUPS.length - 1 ? '1px solid rgba(245,241,232,0.06)' : 'none',
            }}
          >
            {/* Domain label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '2px',
                height: '14px',
                background: 'var(--accent)',
                flexShrink: 0,
              }} />
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--cream-muted)',
              }}>
                {String(gi + 1).padStart(2, '0')} · {group.domain}
              </div>
            </div>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {group.tags.map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
