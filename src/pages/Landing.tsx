import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import SelectedWork from '../components/SelectedWork'

export default function Landing() {
  const location = useLocation()
  const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo

  useEffect(() => {
    if (!scrollTo) return
    const raf = requestAnimationFrame(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(raf)
  }, [scrollTo])

  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <Experience />
      <Skills />
    </>
  )
}
