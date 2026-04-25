import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const clients = [
  { name: 'Koncept Homes', industry: 'Residential Real Estate', color: '#0C6867' },
  { name: 'Nandi Realty', industry: 'Real Estate', color: '#c9a96e' },
  { name: 'Spaceware Dezigns', industry: 'Interior Design', color: '#5bb3e4' },
  { name: 'Artefact Buildcon', industry: 'Construction & Development', color: '#a78bfa' },
  { name: 'Breathing Bricks', industry: 'Sustainable Architecture', color: '#34d399' },
  { name: 'Flipscape', industry: 'Property Services', color: '#f97316' },
]

const testimonials = [
  { quote: 'Weinnovent didn\'t just build our brand — they built the foundation our business stands on. Every piece of content they create feels like it was made by someone who actually cares about our growth.', author: 'Founder', company: 'Spaceware Dezigns', color: '#5bb3e4', glow: 'rgba(91,179,228,0.2)' },
  { quote: 'The performance campaigns they ran brought in more qualified leads in 60 days than we\'d seen in the previous year. They understand both creativity and conversion — a rare combination.', author: 'Director', company: 'Nandi Realty', color: '#c9a96e', glow: 'rgba(201,169,110,0.2)' },
]

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '0,0,0'
}

function GlassTestimonial({ item, index }) {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), spring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), spring)

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { rawX.set(0); rawY.set(0); setHovered(false) }}
        style={{
          rotateX, rotateY, transformStyle: 'preserve-3d',
          position: 'relative', borderRadius: 28, padding: '40px 36px',
          background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: hovered ? '1px solid rgba(255,255,255,0.45)' : '1px solid rgba(255,255,255,0.18)',
          boxShadow: hovered ? `0 40px 80px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)` : `0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.25)`,
          transition: 'all 0.4s ease', overflow: 'hidden', cursor: 'default',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }} />
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 56, lineHeight: 1, color: item.color, opacity: 0.3, marginBottom: 16, fontFamily: 'Georgia, serif' }}>"</div>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.65)', fontStyle: 'italic', marginBottom: 28 }}>"{item.quote}"</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${hexToRgb(item.color)},0.12)`, border: `1px solid rgba(${hexToRgb(item.color)},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: item.color }}>✦</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{item.author}</p>
              <p style={{ fontSize: 11, color: item.color, fontWeight: 500, letterSpacing: '0.04em' }}>{item.company}</p>
            </div>
          </div>
        </div>

        <motion.div animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, transformOrigin: 'left', borderRadius: '0 0 28px 28px' }} />
      </motion.div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="clients" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, #fffbf0 0%, #f0f9ff 50%, #fdf4ff 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '15%', right: '5%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,179,228,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div ref={ref} style={{ marginBottom: 64 }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 16 }}>Trusted By</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a1a1a' }}>
            Builders and makers<br />who take brand seriously.
          </motion.h2>
        </div>

        {/* Client glass pills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 72 }}>
          {clients.map((c, i) => (
            <motion.div key={c.name}
              initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
              whileHover={{ scale: 1.04, y: -2 }}
              style={{
                padding: '10px 20px', borderRadius: 999,
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
                cursor: 'default',
              }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 1 }}>{c.name}</p>
              <p style={{ fontSize: 10, color: c.color, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{c.industry}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="testimonials-grid">
          {testimonials.map((t, i) => <GlassTestimonial key={i} item={t} index={i} />)}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .testimonials-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
