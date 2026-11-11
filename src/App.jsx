import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Home from './pages/Home'
import Projects from './pages/Projects'

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const handleDone = useCallback(() => setLoaderDone(true), [])

  return (
    <BrowserRouter>
      <Cursor />
      {!loaderDone && <Loader onDone={handleDone} />}
      {/* Content renders immediately at full opacity — loader sits on top.
          This lets Googlebot and LCP measurement see real content on first paint. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}
