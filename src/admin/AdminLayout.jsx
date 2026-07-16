import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getSession, logout, hasAccessToDusun } from './adminAuth';
import { pedukuhanList } from '../data/siteData';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  if (!session) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  // Filter pedukuhan berdasarkan akses
  const accessiblePedukuhan = pedukuhanList.filter((p) =>
    hasAccessToDusun(session, p.id)
  );

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-leaf-950 transform transition-transform duration-300 lg:translate-x-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center shadow-lg">
              <span className="text-xl">🏘️</span>
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">Admin Panel</h2>
              <p className="text-leaf-400 text-xs">Desa Salamrejo</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {/* Dashboard */}
          <Link
            to="/admin/dashboard"
            id="sidebar-dashboard"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/admin/dashboard')
                ? 'bg-leaf-600 text-white shadow-lg shadow-leaf-600/30'
                : 'text-leaf-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>

          {/* Pedukuhan Section */}
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-leaf-500 uppercase tracking-wider">
              Kelola Pedukuhan
            </p>
          </div>

          {accessiblePedukuhan.map((p) => {
            const basePath = `/admin/pedukuhan/${p.id}`;
            const isCurrentPedukuhan = location.pathname.includes(`/${p.id}`);
            return (
              <div key={p.id}>
                <Link
                  to={basePath}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isCurrentPedukuhan
                      ? 'bg-leaf-700/50 text-white'
                      : 'text-leaf-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-base">{p.icon}</span>
                  {p.nama}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center text-white font-bold text-sm">
              {session.displayName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{session.displayName}</p>
              <p className="text-leaf-400 text-xs capitalize">
                {session.role === 'superadmin' ? '👑 Super Admin' : '🏡 Admin Dusun'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {location.pathname === '/admin/dashboard' && 'Dashboard'}
                {location.pathname.includes('/pedukuhan/') && 'Kelola Pedukuhan'}
              </h2>
              <p className="text-xs text-gray-400">
                {time.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-leaf-700 bg-leaf-50 hover:bg-leaf-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Lihat Website
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
