import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Home from './pages/Home'
import Projects from './pages/Projects'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <BrowserRouter>
      <Cursor />
      {!loaded && <Loader onDone={handleDone} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
