import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PedukuhanDetail from './pages/PedukuhanDetail'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedukuhan/:id" element={<PedukuhanDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
