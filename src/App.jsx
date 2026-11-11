import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useCallback, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Cursor from './components/Cursor'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const handleDone = useCallback(() => setLoaderDone(true), [])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Cursor />
        {!loaderDone && <Loader onDone={handleDone} />}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
