import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Seo from './components/Seo'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const JoinPage = lazy(() => import('./pages/JoinPage'))
const MindsInActionPage = lazy(() => import('./pages/MindsInActionPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <Seo />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/minds-in-action" element={<MindsInActionPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
