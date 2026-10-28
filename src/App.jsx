import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Mentor from './pages/Mentor'
import Mentors from './pages/Mentors'
import Meetings from './pages/Meetings'
import Translate from './pages/Translate'
import Learn from './pages/Learn'
import Fund from './pages/Fund'
import Roadmap from './pages/Roadmap'

// Hash routes so the app works from GitHub Pages without server rewrites.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mentor" element={<Mentor />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="translate" element={<Translate />} />
          <Route path="learn" element={<Learn />} />
          <Route path="fund" element={<Fund />} />
          <Route path="roadmap" element={<Roadmap />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
