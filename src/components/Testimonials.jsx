import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      "Weinnovent didn't just grow our numbers — they changed how we think about our brand. Three months in, our Instagram was converting to real revenue for the first time.",
    name: 'Priya Sharma',
    title: 'Founder, Bloom Skincare',
    initials: 'PS',
  },
  {
    quote:
      "The Meta campaigns they built were unlike anything we'd run before. Surgical targeting, premium creative, and a 6.8× ROAS in 90 days. The best investment we made all year.",
    name: 'Rahul Mehta',
    title: 'CEO, UrbanDecor',
    initials: 'RM',
  },
  {
    quote:
      "They rebuilt our entire digital presence — site, content, brand voice — and our organic traffic tripled. The team thinks like business partners, not vendors.",
    name: 'Ananya Verma',
    title: 'CMO, NestKraft',
    initials: 'AV',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 md:py-36 px-6 md:px-10 lg:px-16 border-t border-[#e8e8e6] bg-[#f7f7f5]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <p
            className="text-[10.5px] tracking-[0.26em] text-[#8A8A8A] uppercase mb-5 font-medium"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Testimonials
          </p>
          <h2
            className="text-[2rem] md:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.028em] text-[#111111]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Trusted by founders
            <br />
            who expect more.
          </h2>
        </motion.div>

        {/* Testimonial rows */}
        <div className="border-t border-[#e8e8e6]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-[#e8e8e6] py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-8 md:gap-16"
            >
              {/* Attribution */}
              <div className="shrink-0 md:w-52">
                <div
                  className="w-9 h-9 rounded-full bg-[#E6F3F2] border border-[#0C6867]/20 flex items-center justify-center text-[#0C6867] text-[11px] font-semibold mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t.initials}
                </div>
                <p
                  className="text-[13px] font-semibold text-[#111111]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[12px] text-[#8A8A8A] mt-1"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {t.title}
                </p>
              </div>

              {/* Quote */}
              <p
                className="text-[1rem] md:text-[1.1rem] text-[#6f7275] leading-[1.75] flex-1"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
