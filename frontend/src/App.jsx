import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Newsletter from './pages/Newsletter'
import Reservations from './pages/Reservations'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Layout>
  )
}
