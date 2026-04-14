import { motion } from 'framer-motion'

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="py-28 md:py-36 px-6 md:px-10 lg:px-16 border-t border-[#e8e8e6] bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0C6867] rounded-3xl px-10 py-20 md:px-20 md:py-24 text-center overflow-hidden relative"
        >
          {/* Subtle tonal depth — darker teal gradient at bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Gold micro-accent — single thin rule above the eyebrow */}
          <div className="relative z-10 flex justify-center mb-7">
            <div className="w-8 h-px bg-[#E6C85C] opacity-70" />
          </div>

          <p
            className="relative z-10 text-[10.5px] tracking-[0.28em] text-white/50 uppercase mb-7 font-medium"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Get In Touch
          </p>

          <h2
            className="relative z-10 text-[2.2rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-white leading-[1.08] tracking-[-0.03em] mb-7 max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to grow
            <br />
            <span className="text-white/50">your brand?</span>
          </h2>

          <p
            className="relative z-10 text-[14.5px] text-white/55 max-w-md mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Book a free strategy call. No fluff, no pressure — just a clear plan
            for what your brand can become.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="mailto:hello@weinnovent.com"
              className="bg-white text-[#0C6867] font-semibold px-8 py-4 rounded-full text-[13.5px] hover:bg-[#E6F3F2] transition-colors duration-250"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Book a Free Strategy Call
            </a>
            <a
              href="mailto:hello@weinnovent.com"
              className="text-white/50 hover:text-white text-[13.5px] font-medium transition-colors duration-250"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              hello@weinnovent.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
