import { Routes, Route, useLocation, type Location } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Landing from './pages/Landing'
import Work from './pages/Work'
import ProjectCase from './pages/ProjectCase'
import ProjectModal from './pages/ProjectModal'
import './App.css'

function App() {
  const location = useLocation()
  const state = location.state as { background?: Location } | null
  const background = state?.background

  return (
    <>
      <ScrollToTop />
      <Nav />
      <main className="relative">
        <Routes location={background ?? location}>
          <Route path="/" element={<Landing />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectCase />} />
        </Routes>
      </main>
      <Footer hidden={Boolean(background)} />

      {background && (
        <Routes>
          <Route path="/work/:slug" element={<ProjectModal />} />
        </Routes>
      )}

      <div className="grain" aria-hidden />
    </>
  )
}

export default App
