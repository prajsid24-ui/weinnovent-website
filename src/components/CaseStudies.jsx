import { motion } from 'framer-motion'

const works = [
  {
    index: '01',
    category: 'Fashion & Lifestyle',
    client: 'Bloom Skincare',
    title: 'From Launch to 80K Followers in 90 Days',
    services: 'Brand Identity · Social Strategy · Content',
    result: '+400%',
    resultLabel: 'Revenue Growth',
  },
  {
    index: '02',
    category: 'E-Commerce & Retail',
    client: 'UrbanDecor',
    title: '₹2.4 Cr in Sales from a Single Campaign',
    services: 'Performance Marketing · Creative Direction',
    result: '6.8×',
    resultLabel: 'ROAS',
  },
  {
    index: '03',
    category: 'SaaS & Technology',
    client: 'NestKraft',
    title: "Tripling a Brand's Organic Reach in 60 Days",
    services: 'Website Redesign · SEO Content · Branding',
    result: '3×',
    resultLabel: 'Organic Traffic',
  },
]

export default function CaseStudies() {
  return (
    <section
      id="work"
      className="py-28 md:py-36 px-6 md:px-10 lg:px-16 border-t border-[#e8e8e6] bg-[#f7f7f5]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20"
        >
          <div>
            <p
              className="text-[10.5px] tracking-[0.26em] text-[#8A8A8A] uppercase mb-5 font-medium"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Selected Work
            </p>
            <h2
              className="text-[2rem] md:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.028em] text-[#111111]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Results that speak
              <br />
              for themselves.
            </h2>
          </div>
          <a
            href="#contact"
            className="text-[13px] text-[#0C6867] hover:text-[#084F4E] border border-[#0C6867]/25 hover:border-[#0C6867]/50 px-5 py-2.5 rounded-full transition-all duration-250 self-start md:self-end whitespace-nowrap"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Work With Us →
          </a>
        </motion.div>

        {/* Work cards */}
        <div className="flex flex-col gap-3">
          {works.map((work, i) => (
            <motion.div
              key={work.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-[#e8e8e6] rounded-2xl px-8 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 hover:shadow-[0_4px_28px_rgba(12,104,103,0.08)] hover:border-[#0C6867]/20 transition-all duration-400"
            >
              {/* Index */}
              <span
                className="text-[11px] text-[#8A8A8A] tabular-nums shrink-0 self-start md:self-auto"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {work.index}
              </span>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[10.5px] tracking-[0.18em] text-[#8A8A8A] uppercase mb-3 font-medium"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {work.category}&nbsp;&nbsp;/&nbsp;&nbsp;{work.client}
                </p>
                <h3
                  className="text-[1.1rem] md:text-[1.35rem] font-semibold text-[#111111] leading-snug tracking-[-0.015em] mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {work.title}
                </h3>
                <p
                  className="text-[12px] text-[#8A8A8A] tracking-wide"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {work.services}
                </p>
              </div>

              {/* Result */}
              <div className="shrink-0 md:text-right">
                <p
                  className="text-[2rem] md:text-[2.5rem] font-bold text-[#0C6867] leading-none tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {work.result}
                </p>
                <p
                  className="text-[11.5px] text-[#8A8A8A] mt-1.5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {work.resultLabel}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex shrink-0 text-[#8A8A8A] group-hover:text-[#0C6867] transition-colors duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
