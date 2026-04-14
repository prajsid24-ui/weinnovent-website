import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f7f7f5] pt-28 pb-24 px-6 md:px-10">

      {/* Subtle ambient radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 36%, rgba(12,104,103,0.045) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">

        {/* Eyebrow — gold separators as the one gold micro-accent */}
        <motion.p
          {...fadeUp(0.2, 12)}
          className="text-[10.5px] tracking-[0.28em] text-[#8A8A8A] uppercase mb-9 font-medium"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Digital{' '}
          <span style={{ color: '#E6C85C' }}>·</span>
          {' '}Visual{' '}
          <span style={{ color: '#E6C85C' }}>·</span>
          {' '}Impact
        </motion.p>

        {/* Headline */}
        <h1 className="mb-8 w-full">
          <div className="overflow-hidden">
            <motion.span
              className="block text-[clamp(2.6rem,5.5vw,5.6rem)] font-bold tracking-[-0.03em] text-[#111111] leading-[1.05]"
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.35, ease }}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We build brands
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block text-[clamp(2.6rem,5.5vw,5.6rem)] font-bold tracking-[-0.03em] text-[#8A8A8A] leading-[1.05]"
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease }}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              that earn attention.
            </motion.span>
          </div>
        </h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.75)}
          className="max-w-[440px] text-[15px] text-[#6f7275] leading-[1.8] mb-12"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          A digital and creative studio crafting identities, campaigns, and experiences
          for brands ready to lead their category.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.9)}
          className="flex flex-col sm:flex-row items-center gap-3.5"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 bg-[#0C6867] text-white text-[13.5px] font-medium px-7 py-3.5 rounded-full hover:bg-[#084F4E] transition-colors duration-250"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Start a Project
            <svg className="w-3.5 h-3.5 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#6f7275] hover:text-[#0C6867] border border-[#e8e8e6] hover:border-[#0C6867]/30 px-7 py-3.5 rounded-full transition-all duration-250"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            View Our Work
          </a>
        </motion.div>

      </div>

      {/* Stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease }}
        className="relative z-10 mt-20 md:mt-24 flex items-center gap-10 md:gap-16 border-t border-[#e8e8e6] pt-10"
      >
        {[
          { value: '80+', label: 'Brands Grown' },
          { value: '6.8×', label: 'Avg. ROAS' },
          { value: '3×', label: 'Organic Lift' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p
              className="text-[1.9rem] md:text-[2.2rem] font-bold text-[#0C6867] tracking-[-0.025em] leading-none mb-1.5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {value}
            </p>
            <p
              className="text-[11px] text-[#8A8A8A] tracking-[0.12em] uppercase"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {label}
            </p>
          </div>
        ))}
      </motion.div>

    </section>
  )
}
