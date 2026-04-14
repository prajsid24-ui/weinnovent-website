import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Why Us', href: '#why' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`mx-auto max-w-7xl px-6 md:px-10 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`flex items-center justify-between h-[56px] px-5 md:px-7 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'bg-white/92 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.07)] border border-[#e8e8e6]'
              : 'bg-white/72 backdrop-blur-md border border-[#e8e8e6]/60'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="shrink-0 select-none"
          >
            <img
              src={logo}
              alt="Weinnovent Studios"
              className="h-70 md:h-74 w-auto object-contain"
            />
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[13.5px] font-medium text-[#6f7275] hover:text-[#0C6867] tracking-wide transition-colors duration-200"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#0C6867] text-white text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-[#084F4E] transition-colors duration-250"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Start a Project
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          >
            <span
              className={`block h-px bg-[#111111] transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[7px] w-6' : 'w-6'
              }`}
            />
            <span
              className={`block h-px bg-[#111111] transition-all duration-300 ${
                menuOpen ? 'opacity-0 w-4' : 'w-4'
              }`}
            />
            <span
              className={`block h-px bg-[#111111] transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[7px] w-6' : 'w-5'
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 bg-white/97 backdrop-blur-xl rounded-2xl border border-[#e8e8e6] shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-6 py-6 flex flex-col gap-5"
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] text-[#6f7275] hover:text-[#0C6867] transition-colors"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex justify-center bg-[#0C6867] text-white text-[13px] font-medium px-5 py-3.5 rounded-full hover:bg-[#084F4E] transition-colors duration-250"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Start a Project
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
