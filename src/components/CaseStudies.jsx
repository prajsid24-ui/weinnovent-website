import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const cases = [
  { num: '01', client: 'Koncept Homes', category: 'Residential Real Estate', title: 'Brand Identity for a Premium Residential Developer', tags: ['Brand Identity', 'Digital Strategy', 'Social Media'], result: 'Identity Built', color: '#0C6867', glow: 'rgba(12,104,103,0.35)' },
  { num: '02', client: 'Nandi Realty', category: 'Real Estate', title: 'End-to-End Digital Presence and Lead Acquisition', tags: ['Performance Marketing', 'Lead Generation', 'Creative Direction'], result: 'Pipeline Activated', color: '#c9a96e', glow: 'rgba(201,169,110,0.35)' },
  { num: '03', client: 'Spaceware Dezigns', category: 'Interior Design', title: 'Portfolio Identity for a Premium Interiors Studio', tags: ['Brand Identity', 'Website Design', 'Visual Content'], result: 'Identity Launched', color: '#5bb3e4', glow: 'rgba(91,179,228,0.35)' },
  { num: '04', client: 'Artefact Buildcon', category: 'Construction & Development', title: 'Brand Positioning for a Firm Entering the Premium Segment', tags: ['Brand Strategy', 'Visual Identity', 'Digital Presence'], result: 'Market Positioned', color: '#a78bfa', glow: 'rgba(167,139,250,0.35)' },
  { num: '05', client: 'Breathing Bricks', category: 'Sustainable Architecture', title: 'Editorial Voice and Category Authority for a Green Architecture Studio', tags: ['Content Strategy', 'Brand Storytelling', 'Social Media'], result: 'Category Authority', color: '#34d399', glow: 'rgba(52,211,153,0.35)' },
  { num: '06', client: 'Flipscape', category: 'Property Services', title: 'Acquisition Strategy for a Property Discovery Platform', tags: ['Performance Marketing', 'Creative Direction', 'Digital Strategy'], result: 'Sales Pipeline', color: '#f97316', glow: 'rgba(249,115,22,0.35)' },
]

// 3D tilt card with glass morphism
function GlassCard({ item, index }) {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), spring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), spring)
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), spring)
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), spring)

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { rawX.set(0); rawY.set(0); setHovered(false) }
  const onEnter = () => setHovered(true)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: 24,
          padding: '32px 28px',
          cursor: 'pointer',
          // Glass morphism
          background: hovered
            ? 'rgba(255,255,255,0.18)'
            : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: hovered
            ? `1px solid rgba(255,255,255,0.4)`
            : '1px solid rgba(255,255,255,0.15)',
          boxShadow: hovered
            ? `0 32px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)`
            : `0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)`,
          transition: 'background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic glow that follows mouse */}
        <motion.div style={{
          position: 'absolute',
          width: 200, height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)`,
          left: glowX,
          top: glowY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        }} />

        {/* Shine line at top */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          borderRadius: 999,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              color: item.color,
              background: `rgba(${hexToRgb(item.color)},0.12)`,
              border: `1px solid rgba(${hexToRgb(item.color)},0.25)`,
              padding: '4px 12px', borderRadius: 999,
            }}>{item.num}</span>

            <motion.span
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: item.color,
              }}
            >{item.result} →</motion.span>
          </div>

          {/* Category + client */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)',
            marginBottom: 10,
          }}>{item.category} · {item.client}</p>

          {/* Title */}
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
            fontWeight: 700, letterSpacing: '-0.02em',
            color: '#1a1a1a', lineHeight: 1.35,
            marginBottom: 20,
          }}>{item.title}</h3>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {item.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 10, color: 'rgba(0,0,0,0.5)',
                padding: '4px 10px', borderRadius: 999,
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(0,0,0,0.1)',
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.03em',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* 3D depth layer — subtle bottom bar */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
            transformOrigin: 'left',
            borderRadius: '0 0 24px 24px',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Convert hex color to rgb string for rgba usage
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : '0,0,0'
}

export default function CaseStudies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" style={{
      position: 'relative',
      padding: '120px 0',
      overflow: 'hidden',
    }}>
      {/* Gradient mesh background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #f0f9ff 0%, #fafaf7 30%, #f5f0ff 60%, #f0faf5 100%)',
      }} />

      {/* Floating orbs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,104,103,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 14 }}
            >Selected Work</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a1a1a' }}
            >Work we stand<br />behind.</motion.h2>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{
              fontSize: 13, fontWeight: 600, color: '#1a1a1a',
              padding: '11px 24px', borderRadius: 999,
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.1)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'none' }}
          >Work With Us →</motion.a>
        </div>

        {/* Glass cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="cases-grid">
          {cases.map((item, i) => (
            <GlassCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cases-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .cases-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
