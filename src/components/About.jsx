import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const pillars = [
  { num: '01', title: 'Strategy First', desc: 'Every engagement begins with research. We understand your market, audience, and competitors before a single creative decision is made.', color: '#0C6867', glow: 'rgba(12,104,103,0.3)', icon: '◎' },
  { num: '02', title: 'Creative Discipline', desc: 'We obsess over quality. Every brand film, ad creative, and line of copy is crafted to capture attention and communicate something worth saying.', color: '#c9a96e', glow: 'rgba(201,169,110,0.3)', icon: '✦' },
  { num: '03', title: 'Measurable Outcomes', desc: 'We track what moves your business — leads, revenue, ROAS, and retention. Results, not reports.', color: '#a78bfa', glow: 'rgba(167,139,250,0.3)', icon: '◈' },
]

function GlassPillar({ item, index }) {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), spring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), spring)

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { rawX.set(0); rawY.set(0); setHovered(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: 24, padding: '36px 32px',
          cursor: 'default',
          background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: hovered ? '1px solid rgba(255,255,255,0.45)' : '1px solid rgba(255,255,255,0.18)',
          boxShadow: hovered
            ? `0 32px 64px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)`
            : `0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.25)`,
          transition: 'background 0.4s, border 0.4s, box-shadow 0.4s',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {/* Shine */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }} />

        {/* Glow on hover */}
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} style={{
          position: 'absolute', top: -80, right: -80, width: 240, height: 240,
          borderRadius: '50%', background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: `rgba(${hexToRgb(item.color)},0.12)`,
              border: `1px solid rgba(${hexToRgb(item.color)},0.25)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: item.color,
              backdropFilter: 'blur(8px)',
            }}>{item.icon}</div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: item.color }}>{item.num}</span>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#1a1a1a', marginBottom: 14, lineHeight: 1.2 }}>{item.title}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(0,0,0,0.55)' }}>{item.desc}</p>
        </div>

        <motion.div animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.4, ease }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, transformOrigin: 'left', borderRadius: '0 0 24px 24px' }} />
      </motion.div>
    </motion.div>
  )
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '0,0,0'
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      {/* Gradient mesh bg */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, #fdf4ff 0%, #f0f9ff 40%, #f5fff8 80%, #fffbf0 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,104,103,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 72 }} className="about-header">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 16 }}>
              Why Weinnovent Studios
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1, ease }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a1a1a' }}>
              We don't deliver services.<br />We deliver <span style={{ color: '#0C6867' }}>outcomes.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease }}
            style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(0,0,0,0.55)', fontWeight: 400 }}>
            Average agencies give you deliverables. We give you a creative partner embedded in your growth — one that measures its success by yours.
          </motion.p>
        </div>

        {/* Glass pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="pillars-grid">
          {pillars.map((p, i) => <GlassPillar key={p.num} item={p} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
