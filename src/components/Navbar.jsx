import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useTransform, useSpring } from 'framer-motion'
import logo from '../assets/logo.png'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Why Us', href: '#why' },
  { label: 'Clients', href: '#clients' },
]

const ease = [0.22, 1, 0.36, 1]
const springConfig = { type: 'spring', stiffness: 400, damping: 30, mass: 0.6 }
const tiltSpring = { stiffness: 200, damping: 18 }

function NavLink({ label, href, delay }) {
  const [hovered, setHovered] = useState(false)
  const linkRef = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), tiltSpring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), tiltSpring)
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), tiltSpring)
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), tiltSpring)

  const onMove = (e) => {
    const r = linkRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onEnter = () => setHovered(true)
  const onLeave = () => { rawX.set(0); rawY.set(0); setHovered(false) }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.7, ease }}
      style={{ perspective: 600 }}
    >
      <motion.a
        ref={linkRef}
        href={href}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative', fontSize: 14, fontWeight: 500,
          color: '#1d1d1f', padding: '7px 15px', borderRadius: 10,
          letterSpacing: '-0.01em', cursor: 'pointer', textDecoration: 'none',
          display: 'block', overflow: 'hidden',
          background: hovered ? 'rgba(255,255,255,0.7)' : 'transparent',
          backdropFilter: hovered ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: hovered ? 'blur(12px)' : 'none',
          border: hovered ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)' : 'none',
          transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Shine line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
        }} />

        {/* Mouse-tracking glow */}
        <motion.div style={{
          position: 'absolute',
          width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(12,104,103,0.25) 0%, transparent 70%)',
          left: glowX, top: glowY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }} />

        {/* Bottom accent bar */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #0C6867, transparent)',
            transformOrigin: 'left', borderRadius: '0 0 10px 10px',
          }}
        />

        <motion.span
          animate={{ y: hovered ? -1 : 0 }}
          transition={springConfig}
          style={{ position: 'relative', zIndex: 1, display: 'block' }}
        >{label}</motion.span>
      </motion.a>
    </motion.div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  return (
    <motion.header
      initial={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.72)',
        backdropFilter: scrolled ? 'saturate(200%) blur(28px)' : 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: scrolled ? 'saturate(200%) blur(28px)' : 'saturate(180%) blur(16px)',
        borderBottom: scrolled ? '0.5px solid rgba(0,0,0,0.14)' : '0.5px solid rgba(0,0,0,0.08)',
        boxShadow: scrolled
          ? '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
          : '0 1px 0 rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)',
        transition: [
          'background 0.5s ease',
          'backdrop-filter 0.5s ease',
          '-webkit-backdrop-filter 0.5s ease',
          'border-color 0.5s ease',
          'box-shadow 0.5s ease',
        ].join(', '),
      }}
    >
      <motion.div
        animate={{ height: scrolled ? 54 : 64 }}
        transition={springConfig}
        style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 24px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          initial={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <motion.img
            src={logo}
            alt="Weinnovent"
            animate={{ height: scrolled ? 210 : 250 }}
            transition={springConfig}
            style={{ width: 'auto', objectFit: 'contain' }}
          />
        </motion.a>

        {/* Desktop nav */}
        <nav className="desktop-nav" aria-label="Main navigation" style={{ display: 'none', gap: 2 }}>
          {links.map(({ label, href }, i) => (
            <NavLink key={label} label={label} href={href} delay={0.1 + i * 0.07} />
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.a
            href="#contact"
            className="desktop-cta"
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.45, duration: 0.7, ease }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 28px rgba(12,104,103,0.5)' }}
            whileTap={{ scale: 0.94 }}
            style={{
              display: 'none',
              fontSize: 13, fontWeight: 600, color: '#fff',
              background: '#0C6867', padding: '9px 20px',
              borderRadius: 999, letterSpacing: '-0.01em',
              boxShadow: '0 2px 12px rgba(12,104,103,0.3)',
              cursor: 'pointer', textDecoration: 'none',
            }}
          >Start a Project</motion.a>

          {/* Hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-toggle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              padding: 8, background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5,
            }}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.35, ease }}
              style={{ display: 'block', width: 22, height: 1.5, background: '#1d1d1f', borderRadius: 2, transformOrigin: 'center' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 15, height: 1.5, background: '#1d1d1f', borderRadius: 2 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.35, ease }}
              style={{ display: 'block', width: 22, height: 1.5, background: '#1d1d1f', borderRadius: 2, transformOrigin: 'center' }}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, scale: 0.97, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'saturate(200%) blur(28px)',
              WebkitBackdropFilter: 'saturate(200%) blur(28px)',
              padding: '8px 24px 20px',
              display: 'flex', flexDirection: 'column', gap: 0,
              borderBottom: '0.5px solid rgba(0,0,0,0.1)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.1)',
            }}
          >
            {links.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontSize: 17, fontWeight: 500, color: '#1d1d1f',
                  padding: '14px 8px',
                  borderBottom: '0.5px solid rgba(0,0,0,0.06)',
                  transition: 'color 0.2s', cursor: 'pointer', textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0C6867'}
                onMouseLeave={e => e.currentTarget.style.color = '#1d1d1f'}
              >{label}</motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: links.length * 0.06, duration: 0.4, ease }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              style={{
                fontSize: 15, fontWeight: 600, color: '#fff',
                background: '#0C6867', padding: '15px',
                borderRadius: 14, textAlign: 'center', marginTop: 12,
                boxShadow: '0 4px 16px rgba(12,104,103,0.3)',
                cursor: 'pointer', textDecoration: 'none',
              }}
            >Start a Project</motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </motion.header>
  )
}
