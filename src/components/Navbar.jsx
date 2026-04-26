import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import logo from '../assets/logo.png'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Why Us', href: '#why' },
  { label: 'Clients', href: '#clients' },
]

const ease = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(0,0,0,0.12)' : '0.5px solid transparent',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)' : 'none',
        transition: [
          'background 0.4s ease',
          'backdrop-filter 0.4s ease',
          '-webkit-backdrop-filter 0.4s ease',
          'border-color 0.4s ease',
          'box-shadow 0.4s ease',
        ].join(', '),
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>

        {/* Logo */}
        <motion.a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease }}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <img
            src={logo}
            alt="Weinnovent"
            style={{ height: 250, width: 'auto', objectFit: 'contain' }}
          />
        </motion.a>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'none', gap: 2 }}>
          {links.map(({ label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, ease }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: scrolled ? '#1d1d1f' : '#ffffff',
                padding: '7px 15px',
                borderRadius: 8,
                letterSpacing: '-0.01em',
                transition: 'color 0.35s ease, background 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = scrolled
                  ? 'rgba(0,0,0,0.06)'
                  : 'rgba(255,255,255,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
              }}
            >{label}</motion.a>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.a
            href="#contact"
            className="desktop-cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease }}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(12,104,103,0.45)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'none',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              background: '#0C6867',
              padding: '9px 20px',
              borderRadius: 999,
              letterSpacing: '-0.01em',
              boxShadow: '0 2px 12px rgba(12,104,103,0.3)',
              cursor: 'pointer',
            }}
          >Start a Project</motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-toggle"
            style={{
              padding: 8, background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5,
            }}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.3, ease }}
              style={{ display: 'block', width: 22, height: 1.5, background: scrolled ? '#1d1d1f' : '#ffffff', borderRadius: 2, transformOrigin: 'center' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 15, height: 1.5, background: scrolled ? '#1d1d1f' : '#ffffff', borderRadius: 2 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.3, ease }}
              style={{ display: 'block', width: 22, height: 1.5, background: scrolled ? '#1d1d1f' : '#ffffff', borderRadius: 2, transformOrigin: 'center' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.97, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'saturate(180%) blur(24px)',
              WebkitBackdropFilter: 'saturate(180%) blur(24px)',
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
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease }}
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontSize: 17, fontWeight: 500, color: '#1d1d1f',
                  padding: '14px 8px',
                  borderBottom: '0.5px solid rgba(0,0,0,0.06)',
                  transition: 'color 0.2s', cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0C6867'}
                onMouseLeave={e => e.currentTarget.style.color = '#1d1d1f'}
              >{label}</motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.06, ease }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontSize: 15, fontWeight: 600, color: '#fff',
                background: '#0C6867', padding: '15px',
                borderRadius: 14, textAlign: 'center', marginTop: 12,
                boxShadow: '0 4px 16px rgba(12,104,103,0.3)',
                cursor: 'pointer',
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
