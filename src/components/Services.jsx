import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const services = [
  { num: '01', title: 'Branding & Identity', desc: 'Logos, systems, and visual guidelines. The strategic foundation that makes your brand unmistakable in any room.', tag: 'Foundation', image: '/branding.png' },
  { num: '02', title: 'Social Media Marketing', desc: 'Reels, carousels, and community strategy — built to grow your audience and convert attention into revenue.', tag: 'Growth', image: '/social.png' },
  { num: '03', title: 'Performance Marketing', desc: 'Precision campaigns on Meta and Google, engineered for ROAS and optimised daily.', tag: 'Revenue', image: '/performance.png' },
  { num: '04', title: 'Content Creation', desc: 'Copy, scripts, and narratives that communicate with authority and make audiences act.', tag: 'Voice', image: '/content.png' },
  { num: '05', title: 'Photography & Videography', desc: 'Product shoots, brand films, and campaign assets that position you at a premium.', tag: 'Visual', image: '/photo.png' },
  { num: '06', title: 'Website Design', desc: 'Fast, conversion-focused sites designed to represent your brand at its highest level.', tag: 'Digital', image: '/website.png' },
]

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', borderRadius: 20,
        overflow: 'hidden', cursor: 'pointer',
        background: '#111', aspectRatio: '4/3',
        boxShadow: hovered
          ? '0 24px 48px rgba(0,0,0,0.18)'
          : '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Image */}
      <motion.img
        src={service.image}
        alt={service.title}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)',
        opacity: hovered ? 1 : 0.78,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, padding: '24px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            color: '#0C6867', background: 'rgba(12,104,103,0.18)',
            border: '1px solid rgba(12,104,103,0.3)',
            padding: '4px 10px', borderRadius: 999,
          }}>{service.num}</span>
          <span style={{
            fontSize: 10, fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
            padding: '4px 10px', borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.07)',
          }}>{service.tag}</span>
        </div>

        {/* Bottom */}
        <div>
          <h3 style={{
            fontSize: 'clamp(1.05rem, 1.7vw, 1.3rem)',
            fontWeight: 700, letterSpacing: '-0.02em',
            color: '#fff', marginBottom: 10, lineHeight: 1.2,
          }}>{service.title}</h3>

          <motion.p
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.3, ease }}
            style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.65)', marginBottom: 14 }}
          >{service.desc}</motion.p>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3, ease }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#0C6867' }}
          >
            Learn more
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" style={{
      position: 'relative',
      padding: '120px 0',
      borderTop: '1px solid rgba(0,0,0,0.07)',
      overflow: 'hidden',
    }}>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/services-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.55,
      }} />

      {/* White overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(255,255,255,0.6)',
      }} />

      {/* Content */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div ref={ref} style={{
          display: 'flex', flexWrap: 'wrap', gap: 24,
          justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 56,
        }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#0C6867', marginBottom: 14,
              }}
            >What We Do</motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 700, letterSpacing: '-0.03em',
                lineHeight: 1.05, color: '#1a1a1a',
              }}
            >Six disciplines.<br />One integrated approach.</motion.h2>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{
              fontSize: 13, fontWeight: 600, color: '#fff',
              background: '#0C6867', padding: '11px 24px',
              borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0f8584'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0C6867'; e.currentTarget.style.transform = 'none' }}
          >
            Start a Project
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>

        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }} className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
