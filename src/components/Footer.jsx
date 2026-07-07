import { Link } from 'react-router-dom';
import { pedukuhanList } from '../data/siteData';

export default function Footer() {
  return (
    <footer id="footer" className="bg-leaf-950 text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-leaf-400 via-leaf-500 to-leaf-600" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center shadow-lg">
                <span className="text-xl">🏘️</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Desa Salamrejo</h3>
                <p className="text-xs text-leaf-300">Sentolo, Kulon Progo</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Portal profil digital Kalurahan Salamrejo yang menampilkan potensi dan keindahan 8 pedukuhan.
            </p>
          </div>

          {/* Pedukuhan Links */}
          <div>
            <h4 className="font-semibold text-leaf-300 mb-4 text-sm tracking-wider uppercase">
              Pedukuhan
            </h4>
            <ul className="space-y-2">
              {pedukuhanList.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/pedukuhan/${p.id}`}
                    className="text-sm text-gray-400 hover:text-leaf-300 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-xs">{p.icon}</span>
                    {p.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-leaf-300 mb-4 text-sm tracking-wider uppercase">
              &nbsp;
            </h4>
            <ul className="space-y-2">
              {pedukuhanList.slice(4).map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/pedukuhan/${p.id}`}
                    className="text-sm text-gray-400 hover:text-leaf-300 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-xs">{p.icon}</span>
                    {p.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-leaf-300 mb-4 text-sm tracking-wider uppercase">
              Informasi
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-gray-400 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-leaf-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Kapanewon Sentolo, Kab. Kulon Progo, DIY
              </li>
              <li className="text-sm text-gray-400 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-leaf-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Kantor Kalurahan Salamrejo
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Kalurahan Salamrejo. Dibuat dengan ❤️ oleh Tim KKN.
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-leaf-500 animate-pulse" />
              Portal Desa Digital
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-leaf-900/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-leaf-800/20 blur-2xl pointer-events-none" />
    </footer>
  );
}
