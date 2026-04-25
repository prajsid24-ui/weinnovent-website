import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(0,0,0,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        transition: 'background 0.4s ease, border 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: 68,
      }}>

        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img
            src={logo}
            alt="Weinnovent Studios"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'none', gap: 4 }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontSize: 13, fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              padding: '7px 16px', borderRadius: 8,
              transition: 'color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent' }}
            >{label}</a>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="#contact" className="desktop-cta" style={{
            display: 'none', fontSize: 13, fontWeight: 600,
            color: '#fff', background: '#0C6867',
            padding: '9px 20px', borderRadius: 999,
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0f8584'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0C6867'; e.currentTarget.style.transform = 'scale(1)' }}
          >Start a Project</a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-toggle"
            style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              style={{ display: 'block', width: 22, height: 1.5, background: '#fff', borderRadius: 2, transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ display: 'block', width: 15, height: 1.5, background: '#fff', borderRadius: 2 }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              style={{ display: 'block', width: 22, height: 1.5, background: '#fff', borderRadius: 2, transformOrigin: 'center' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '12px 24px 20px',
              display: 'flex', flexDirection: 'column', gap: 2,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {links.map(({ label, href }, i) => (
              <motion.a key={label} href={href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, ease }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 16, fontWeight: 500,
                  color: 'rgba(255,255,255,0.65)',
                  padding: '12px 8px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
              >{label}</motion.a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{
              fontSize: 14, fontWeight: 600, color: '#fff',
              background: '#0C6867', padding: '13px 16px',
              borderRadius: 10, textAlign: 'center', marginTop: 8,
            }}>Start a Project</a>
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
