import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Init from './pages/Init'
import Case1 from './pages/case1'
import Settings from './pages/Settings'
import About from './pages/About'
import Case2 from './pages/Case2'
import Case3 from './pages/Case3'

function AnimatedRoutes() {
  const location = useLocation()
  const isCase3 = location.pathname.startsWith('/case3')

  if (isCase3) {
    return (
      <Routes location={location}>
        <Route path="/case3" element={<Navigate to="/case3/dashboard" replace />} />
        <Route path="/case3/dashboard" element={<Case3 />} />
        <Route path="/case3/management" element={<Case3 />} />
        <Route path="/case3/chat" element={<Case3 />} />
        <Route path="/case3/markdown" element={<Case3 />} />
        <Route path="/case3/mindmap" element={<Case3 />} />
        <Route path="/case3/video" element={<Case3 />} />
        <Route path="/case3/social" element={<Navigate to="/case3/social/main" replace />} />
        <Route path="/case3/social/main" element={<Case3 />} />
        <Route path="/case3/social/profile" element={<Case3 />} />
        <Route path="/case3/social/settings" element={<Case3 />} />
        <Route path="/case3/forum" element={<Case3 />} />
        <Route path="/case3/music" element={<Case3 />} />
        <Route path="/case3/prts" element={<Case3 />} />
        <Route path="/case3/macos" element={<Case3 />} />
        <Route path="/case3/lucide" element={<Case3 />} />
        <Route path="/case3/confetti" element={<Case3 />} />
        <Route path="/case3/badge" element={<Case3 />} />
      </Routes>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Init />} />
          <Route path="/init" element={<Init />} />
          <Route path="/case1" element={<Case1 />} />
          <Route path="/dashboard" element={<Navigate to="/case1" replace />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/case2" element={<Case2 />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedRoutes