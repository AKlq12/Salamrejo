import { Link } from 'react-router-dom';
import { pedukuhanList } from '../../data/siteData';
import { useSiteData } from '../../context/SiteDataContext';
import { useInView } from '../../hooks/useInView';

export default function PedukuhanHub() {
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const { getPedukuhanData } = useSiteData();

  return (
    <section id="pedukuhan-hub" className="py-20 sm:py-28 bg-warm-100 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-14 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-4">
            <span className="text-sm">🏘️</span>
            8 Pedukuhan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-leaf-900 mb-4">
            Jelajahi Pedukuhan
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Klik salah satu pedukuhan untuk mengetahui lebih dalam tentang demografi, UMKM, budaya, dan potensi unik setiap wilayah.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-leaf-400 to-leaf-600 mx-auto rounded-full mt-5" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pedukuhanList.map((pedukuhan, index) => {
            const pedData = getPedukuhanData(pedukuhan.id);
            const heroFoto = pedData?.hero_foto;

            return (
              <Link
                key={pedukuhan.id}
                to={`/pedukuhan/${pedukuhan.id}`}
                id={`card-${pedukuhan.id}`}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-200 hover:shadow-xl hover:border-leaf-200 transition-all duration-500 transform hover:-translate-y-1 ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Card Image Area */}
                <div className={`relative h-44 overflow-hidden ${!heroFoto ? `bg-gradient-to-br ${pedukuhan.warna}` : ''}`}>
                  {heroFoto ? (
                    <>
                      <img
                        src={heroFoto}
                        alt={`Pedukuhan ${pedukuhan.nama}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      {/* Small icon badge */}
                      <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                        <span className="text-lg">{pedukuhan.icon}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-10 pattern-dots" />

                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-30 group-hover:scale-125 group-hover:opacity-40 transition-all duration-500">
                          {pedukuhan.icon}
                        </span>
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </>
                  )}

                  {/* Number badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-leaf-700 transition-colors duration-300">
                    {pedukuhan.nama}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {pedukuhan.deskripsi}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-2 text-leaf-600 text-xs font-medium">
                    <span>Lihat Detail</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Hover gradient accent at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-leaf-400 to-leaf-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
