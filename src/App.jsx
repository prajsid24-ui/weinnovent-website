import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import CaseStudies from './components/CaseStudies'
import About from './components/About'
import Testimonials from './components/Testimonials'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#FAFAF9] text-[#111111] min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <About />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  )
}
