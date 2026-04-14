const footerLinks = {
  Services: [
    'Branding & Identity',
    'Social Media Marketing',
    'Performance Marketing',
    'Content Creation',
    'Photography & Videography',
    'Website Design',
  ],
  Company: ['About Us', 'Case Studies', 'Testimonials', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e8e6] bg-[#f7f7f5] px-6 md:px-10 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div>
            <span
              className="text-[1.05rem] font-bold text-[#0C6867] block mb-3 tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Weinnovent Studios
            </span>
            <p
              className="text-[13px] text-[#8A8A8A] leading-relaxed max-w-xs"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              A digital marketing and creative agency helping brands grow with
              strategy, creativity, and performance.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-[10.5px] font-semibold tracking-[0.22em] text-[#8A8A8A] uppercase mb-5"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-[#6f7275] hover:text-[#0C6867] transition-colors duration-200"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#e8e8e6] flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[12px] text-[#8A8A8A]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            © {new Date().getFullYear()} Weinnovent Studios. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[12px] text-[#8A8A8A] hover:text-[#0C6867] transition-colors duration-200"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[12px] text-[#8A8A8A] hover:text-[#0C6867] transition-colors duration-200"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
