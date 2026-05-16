import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const viralStats = [
  { value: 2.0, suffix: 'M+', label: 'Organic Views', icon: '👁', color: '#0C6867', decimals: 1 },
  { value: 111,  suffix: 'K',  label: 'Likes',         icon: '♥', color: '#e11d48', decimals: 0 },
  { value: 21,   suffix: 'K',  label: 'Forwards',      icon: '↗', color: '#0ea5e9', decimals: 0 },
  { value: 32,   suffix: 'K',  label: 'Saves',         icon: '🔖', color: '#c9a96e', decimals: 0 },
  { value: 930,  suffix: '',   label: 'Reshares',      icon: '↺', color: '#a78bfa', decimals: 0 },
  { value: 50,   suffix: '',   label: 'Comments',      icon: '💬', color: '#34d399', decimals: 0 },
]

function useAnimatedCounter(target, inView, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration, decimals])
  return count
}

function StatCounter({ stat, inView, delay }) {
  const count = useAnimatedCounter(stat.value, inView, 2000, stat.decimals)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      style={{ flex: 1, minWidth: 90, textAlign: 'center', padding: '0 8px' }}
    >
      <div style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>
        <span style={{ color: stat.color }}>{stat.icon} </span>
        {stat.decimals > 0 ? count.toFixed(stat.decimals) : count}{stat.suffix}
      </div>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginTop: 7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {stat.label}
      </div>
    </motion.div>
  )
}

// ← Swap this URL once you have the real reel link
const REEL_URL = 'https://www.instagram.com/reel/DYQ-IwiC8ct/?igsh=MWx3NmduYmlzZ3g2ZQ=='

function PhoneMockup({ inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={REEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.3, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', flexShrink: 0,
        width: 300, aspectRatio: '9/16',
        borderRadius: 32, overflow: 'hidden',
        position: 'relative',
        border: hovered ? '1.5px solid rgba(12,104,103,0.7)' : '1.5px solid rgba(255,255,255,0.1)',
        boxShadow: hovered
          ? '0 40px 80px rgba(0,0,0,0.55), 0 0 0 4px rgba(12,104,103,0.15)'
          : '0 24px 56px rgba(0,0,0,0.45)',
        cursor: 'pointer',
        transition: 'box-shadow 0.35s ease, border 0.35s ease',
        textDecoration: 'none',
      }}
    >
      {/* Reel thumbnail */}
      <img src="/Reelmockup.jpg" alt="Viral reel thumbnail" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      {/* Subtle dark overlay so text/icons stay readable */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Top bar — Instagram-style */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, padding: '18px 16px 10px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #0C6867 0%, #c9a96e 100%)', border: '1.5px solid rgba(255,255,255,0.25)', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>weinnovent.studios</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Reel · 2M views</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', padding: '4px 12px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999 }}>Follow</div>
      </div>

      {/* Centered play button */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <motion.div animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.3 }} style={{ position: 'relative' }}>
          <motion.div
            animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: -14, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }}
          />
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(0,0,0,0.35)' }}>
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
              <path d="M6 4L16 10L6 16V4Z" fill="#0C6867" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Right-side engagement icons */}
      <div style={{ position: 'absolute', right: 14, bottom: 100, zIndex: 3, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        {[{ icon: '♥', val: '111K' }, { icon: '💬', val: '50' }, { icon: '↗', val: '21K' }, { icon: '🔖', val: '32K' }].map(({ icon, val }) => (
          <div key={val} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 24 }}>{icon}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Bottom overlay */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, padding: '32px 16px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 60%, transparent)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>Watch the Reel ↗</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>2M views · 48 hours · organic</div>
      </div>
    </motion.a>
  )
}

function ViralMoment() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease }}
      style={{
        gridColumn: '1 / -1',
        position: 'relative',
        borderRadius: 28,
        overflow: 'hidden',
        padding: '44px 48px 40px',
        background: 'linear-gradient(135deg, #070d0d 0%, #0f1c1c 50%, #0b1118 100%)',
        border: '1px solid rgba(12,104,103,0.28)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Background glow orbs */}
      <div style={{ position: 'absolute', top: -100, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,104,103,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: 220, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(12,104,103,0.55), transparent)' }} />

      {/* Two-column layout */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 48, alignItems: 'center' }} className="viral-layout">

        {/* LEFT — text + stats */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(12,104,103,0.18)', border: '1px solid rgba(12,104,103,0.38)', borderRadius: 999, padding: '5px 14px', marginBottom: 22 }}
          >
            <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ fontSize: 13, lineHeight: 1 }}>🔥</motion.span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867' }}>Viral Moment — 100% Organic</span>
          </motion.div>

          {/* Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.1, marginBottom: 12 }}
          >
            2M organic views.<br /><span style={{ color: '#0C6867' }}>48 hours.</span> Zero ads.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}
          >
            A client video we created went viral with pure organic reach — no paid boost, no influencer collab, no tricks. Just the right content at the right time.
          </motion.p>

          {/* Stats grid — 3 cols × 2 rows */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28 }}>
            {viralStats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} inView={inView} delay={0.4 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* RIGHT — phone mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="viral-phone">
          <PhoneMockup inView={inView} />
        </div>
      </div>
    </motion.div>
  )
}

const cases = [
  { num: '01', client: 'Koncept Homes', category: 'Residential & Commercial Interior Designer', title: 'Building a Premium Brand Presence Through Organic Social Media', tags: ['Social Media', 'Creative Content', 'Organic Growth'], result: 'Brand Presence Built', color: '#0C6867', glow: 'rgba(12,104,103,0.35)' },
  { num: '02', client: 'Nandi Realty', category: 'Real Estate', title: 'End-to-End Lead Generation Campaign That Filled the Sales Pipeline', tags: ['Performance Marketing', 'Lead Generation', 'Creative Direction'], result: 'Pipeline Activated', color: '#c9a96e', glow: 'rgba(201,169,110,0.35)' },
  { num: '03', client: 'Spaceware Dezigns', category: 'Channel Partner — Japanese Brand', title: 'Full-Funnel Campaign for a Premium Interiors Channel Partner', tags: ['Performance Campaigns', 'Brand Identity', 'Visual Content'], result: 'Identity Launched', color: '#5bb3e4', glow: 'rgba(91,179,228,0.35)' },
  { num: '04', client: 'Artefact Buildcon', category: 'Construction, Development & Interiors', title: 'Positioning a Construction Firm as the Premium Choice Through Content', tags: ['Social Media', 'Creative Content', 'Brand Strategy'], result: 'Market Positioned', color: '#a78bfa', glow: 'rgba(167,139,250,0.35)' },
  { num: '05', client: 'Breathing Bricks', category: 'Sustainable Architecture & Interiors', title: 'Organic Editorial Voice That Made Them the Category Authority', tags: ['Organic Content', 'Brand Storytelling', 'Social Media'], result: 'Category Authority', color: '#34d399', glow: 'rgba(52,211,153,0.35)' },
  { num: '06', client: 'Flipscape', category: 'Interior Design', title: 'Growing a Design Studio From Zero to a Recognisable Brand Online', tags: ['Social Media', 'Creative Content', 'Organic Growth'], result: 'Brand Built', color: '#f97316', glow: 'rgba(249,115,22,0.35)' },
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
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 14 }}
            >Selected Work</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
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
          <ViralMoment />
          {cases.map((item, i) => (
            <GlassCard key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cases-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .cases-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .viral-layout { flex-direction: column !important; } .viral-phone { display: none !important; } }
      `}</style>
    </section>
  )
}
