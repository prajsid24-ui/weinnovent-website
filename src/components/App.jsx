import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CaseStudies from './components/CaseStudies'
import About from './components/About'
import Testimonials from './components/Testimonials'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div style={{ fontFamily: "var(--font)" }}>
      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <About />
      <Testimonials />
      <ContactCTA />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
