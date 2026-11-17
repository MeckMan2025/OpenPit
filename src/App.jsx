import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Mentor from './pages/Mentor'
import Mentors from './pages/Mentors'
import Translate from './pages/Translate'
import Learn from './pages/Learn'
import Fund from './pages/Fund'
import Roadmap from './pages/Roadmap'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

// Hash routes so the app works from GitHub Pages without server rewrites.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mentor" element={<Mentor />} />
          <Route path="mentors" element={<Mentors />} />
          {/* The monthly review request became the Find a Mentor form. */}
          <Route path="meetings" element={<Navigate to="/mentors" replace />} />
          <Route path="translate" element={<Translate />} />
          <Route path="learn" element={<Learn />} />
          <Route path="fund" element={<Fund />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
