import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Nav from '../components/Nav'
import Marquee from '../components/Marquee'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Work from '../sections/Work'
import Experience from '../sections/Experience'
import ContractWork from '../sections/ContractWork'
import ClientSites from '../sections/ClientSites'
import Contact from '../sections/Contact'

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>Hitanshu Gajjar — Senior React.js Developer</title>
        <meta name="description" content="Senior React.js &amp; React Native developer with 8+ years building high-performance web and mobile apps. Currently at Fulcrum Digital." />
        <link rel="canonical" href="https://gajjarhitanshu.netlify.app/" />
        <meta property="og:url" content="https://gajjarhitanshu.netlify.app/" />
        <meta property="og:title" content="Hitanshu Gajjar — Senior React.js Developer" />
        <meta property="og:description" content="Senior React.js &amp; React Native developer with 8+ years building high-performance web and mobile apps." />
        <meta name="twitter:title" content="Hitanshu Gajjar — Senior React.js Developer" />
        <meta name="twitter:description" content="Senior React.js &amp; React Native developer with 8+ years building high-performance web and mobile apps." />
      </Helmet>
    <div style={{ background: 'var(--ink)' }}>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <ClientSites />
      <Work />
      <Experience />
      <ContractWork />
      <Contact />
    </div>
    </>
  )
}
