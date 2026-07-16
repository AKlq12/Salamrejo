import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PedukuhanDetail from './pages/PedukuhanDetail'

// Admin pages
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminPedukuhanEdit from './admin/AdminPedukuhanEdit'
import AdminRoute from './admin/AdminRoute'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<><Navbar /><main className="min-h-screen"><Home /></main><Footer /></>} />
        <Route path="/pedukuhan/:id" element={<><Navbar /><main className="min-h-screen"><PedukuhanDetail /></main><Footer /></>} />

        {/* ===== ADMIN ROUTES (hidden, no navbar/footer) ===== */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pedukuhan/:id" element={<AdminPedukuhanEdit />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
