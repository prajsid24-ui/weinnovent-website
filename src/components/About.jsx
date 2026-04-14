import { motion } from 'framer-motion'

const pillars = [
  {
    num: '01',
    title: 'Strategy First',
    body: 'Every engagement begins with research. We understand your market, your audience, and your competitors before a single creative decision is made.',
  },
  {
    num: '02',
    title: 'Creative Discipline',
    body: 'We obsess over quality. Every brand film, ad creative, and line of copy is crafted to capture attention and communicate something worth saying.',
  },
  {
    num: '03',
    title: 'Measurable Outcomes',
    body: "We track what moves your business — leads, revenue, ROAS, and retention. Vanity metrics don't pay salaries. Results do.",
  },
]

export default function About() {
  return (
    <section
      id="why"
      className="py-28 md:py-36 px-6 md:px-10 lg:px-16 border-t border-[#e8e8e6] bg-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10.5px] tracking-[0.26em] text-[#8A8A8A] uppercase mb-16 md:mb-20 font-medium"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Why Weinnovent Studios
        </motion.p>

        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-28 max-w-[860px]"
        >
          <h2
            className="text-[1.9rem] md:text-[2.8rem] lg:text-[3.4rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#111111]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            We don&apos;t deliver services.
            <br />
            <span className="text-[#0C6867]">We deliver outcomes.</span>
          </h2>
          <p
            className="text-[14.5px] text-[#6f7275] mt-8 max-w-lg leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Average agencies give you deliverables. We give you a creative partner
            embedded in your growth — one that measures its success by yours.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-[#e8e8e6]">
          {pillars.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`py-10 pr-8 ${
                i < pillars.length - 1
                  ? 'md:border-r border-[#e8e8e6] border-b md:border-b-0'
                  : ''
              } ${i > 0 ? 'md:pl-8' : ''}`}
            >
              <span
                className="text-[11px] text-[#0C6867] block mb-5 font-medium"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {v.num}
              </span>
              <h3
                className="text-[1.05rem] font-semibold text-[#111111] mb-3.5 tracking-[-0.01em]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {v.title}
              </h3>
              <p
                className="text-[13.5px] text-[#6f7275] leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
