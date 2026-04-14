import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    title: 'Branding & Identity',
    description:
      'We craft visual identities that outlast trends — logos, brand systems, guidelines, and the strategic thinking that makes your brand unmistakable.',
  },
  {
    title: 'Social Media Marketing',
    description:
      'Content strategies, reels, carousels, and community management built to grow your following and turn passive scrollers into loyal buyers.',
  },
  {
    title: 'Performance Marketing',
    description:
      'Precision-targeted ad campaigns across Meta and Google — engineered for ROAS, built for scale, and optimised until the numbers move.',
  },
  {
    title: 'Content Creation',
    description:
      'Copy, scripts, blogs, and brand narratives that speak with authority. We find the words that make your audience stop, read, and act.',
  },
  {
    title: 'Photography & Videography',
    description:
      'High-end visual production — product shoots, brand films, reels, and campaign assets that elevate perception and command premium positioning.',
  },
  {
    title: 'Website Design',
    description:
      'Fast, beautiful, conversion-focused websites and landing pages that represent your brand at its best and turn visitors into clients.',
  },
]

export default function Services() {
  const [expanded, setExpanded] = useState(null)
  const toggle = (i) => setExpanded(expanded === i ? null : i)

  return (
    <section
      id="services"
      className="py-28 md:py-36 px-6 md:px-10 lg:px-16 border-t border-[#e8e8e6] bg-white"
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
              What We Do
            </p>
            <h2
              className="text-[2rem] md:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.028em] text-[#111111]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Six disciplines.
              <br />
              One integrated approach.
            </h2>
          </div>
          <p
            className="text-[13.5px] text-[#6f7275] max-w-[260px] leading-relaxed md:text-right"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            From first impression to final conversion — every touchpoint, handled.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="border-t border-[#e8e8e6]">
            {services.map((service, i) => {
              const isOpen = expanded === i
              return (
                <div key={service.title} className="border-b border-[#e8e8e6]">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between py-6 md:py-7 text-left group"
                  >
                    <div className="flex items-center gap-6 md:gap-10">
                      <span
                        className={`text-[11px] tabular-nums shrink-0 transition-colors duration-300 ${
                          isOpen ? 'text-[#0C6867]' : 'text-[#8A8A8A]'
                        }`}
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`text-[1.05rem] md:text-[1.25rem] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                          isOpen
                            ? 'text-[#0C6867]'
                            : 'text-[#111111] group-hover:text-[#0C6867]'
                        }`}
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {service.title}
                      </span>
                    </div>
                    <span
                      className={`transition-all duration-300 text-xl font-light ml-4 shrink-0 ${
                        isOpen ? 'text-[#0C6867]' : 'text-[#8A8A8A] group-hover:text-[#0C6867]'
                      }`}
                      aria-hidden
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-[14px] text-[#6f7275] leading-relaxed pb-7 pl-[calc(1.5rem+1.5rem)] md:pl-[calc(2.5rem+1.5rem)] max-w-xl"
                          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                        >
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
