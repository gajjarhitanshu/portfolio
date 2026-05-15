import { useEffect } from 'react'
import Nav from '../components/Nav'
import Marquee from '../components/Marquee'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Work from '../sections/Work'
import Experience from '../sections/Experience'
import ContractWork from '../sections/ContractWork'
import Contact from '../sections/Contact'

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: 'var(--ink)' }}>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Work />
      <Experience />
      <ContractWork />
      <Contact />
    </div>
  )
}
