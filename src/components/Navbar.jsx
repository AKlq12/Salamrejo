import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-leaf-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            id="navbar-logo"
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled || !isHome
                ? 'bg-gradient-to-br from-leaf-500 to-leaf-700 shadow-md'
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <span className="text-lg sm:text-xl">🏘️</span>
            </div>
            <div>
              <h1 className={`text-sm sm:text-base font-semibold leading-tight transition-colors duration-300 ${
                scrolled || !isHome ? 'text-leaf-900' : 'text-white'
              }`}>
                Desa Salamrejo
              </h1>
              <p className={`text-[10px] sm:text-xs transition-colors duration-300 ${
                scrolled || !isHome ? 'text-gray-500' : 'text-white/70'
              }`}>
                Sentolo, Kulon Progo
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              id="nav-home"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isHome
                  ? scrolled
                    ? 'text-leaf-700 bg-leaf-50'
                    : 'text-white bg-white/15'
                  : scrolled || !isHome
                    ? 'text-gray-600 hover:text-leaf-700 hover:bg-leaf-50'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              Beranda
            </Link>
            {!isHome && (
              <Link
                to="/"
                id="nav-back-home"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-leaf-700 hover:bg-leaf-50 transition-all duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            id="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome
                ? 'text-leaf-800 hover:bg-leaf-50'
                : 'text-white hover:bg-white/15'
            }`}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-60 border-t border-leaf-100' : 'max-h-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 space-y-1">
          <Link
            to="/"
            id="mobile-nav-home"
            className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-leaf-700 hover:bg-leaf-50 transition-all"
          >
            🏠 Beranda
          </Link>
          {!isHome && (
            <Link
              to="/"
              id="mobile-nav-back"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-leaf-700 hover:bg-leaf-50 transition-all"
            >
              ← Kembali ke Beranda
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
