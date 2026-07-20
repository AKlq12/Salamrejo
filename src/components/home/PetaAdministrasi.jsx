import { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';

export default function PetaAdministrasi() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <>
      <section id="peta-administrasi" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

        <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-10 sm:mb-14 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-4">
              <span className="text-sm">🗺️</span>
              Wilayah Administrasi
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-leaf-900 mb-3">
              Peta Administrasi Desa
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              Pembagian wilayah 8 pedukuhan di Kalurahan Salamrejo, Kapanewon Sentolo, Kulon Progo.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-leaf-400 to-leaf-600 mx-auto rounded-full mt-5" />
          </div>

          {/* Map Container — narrower max-width for tall image */}
          <div className={`max-w-3xl mx-auto ${isInView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            <div className="bg-warm-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-warm-200 hover:shadow-xl transition-shadow duration-500">
              {/* Map Header */}
              <div className="px-5 sm:px-6 py-4 border-b border-warm-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-700 flex items-center justify-center shadow-md">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">Peta Administrasi</h3>
                    <p className="text-[10px] sm:text-xs text-gray-400">Kalurahan Salamrejo — 8 Pedukuhan</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-leaf-50 text-leaf-700 text-xs sm:text-sm font-medium hover:bg-leaf-100 transition-colors duration-200"
                  title="Lihat Fullscreen"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>

              {/* Map Image — NO height restriction, shows full image */}
              <div
                className="relative bg-white p-3 sm:p-4 cursor-pointer group"
                onClick={() => setIsFullscreen(true)}
              >
                <img
                  src="/peta-administrasi-salamrejo.jpg"
                  alt="Peta Administrasi Desa Salamrejo - Pembagian 8 Pedukuhan"
                  className="w-full h-auto rounded-lg group-hover:shadow-md transition-all duration-300"
                />
                {/* Hover overlay hint */}
                <div className="absolute inset-3 sm:inset-4 rounded-lg bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition-all duration-300 pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">Klik untuk memperbesar</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="px-5 sm:px-6 py-4 border-t border-warm-100">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">Legenda Pedukuhan</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { nama: 'Klebakan', warna: 'bg-red-400' },
                    { nama: 'Mentobayan', warna: 'bg-orange-400' },
                    { nama: 'Giyoso', warna: 'bg-yellow-300' },
                    { nama: 'Karangwetan', warna: 'bg-cyan-300' },
                    { nama: 'Kidulan', warna: 'bg-green-400' },
                    { nama: 'Salam', warna: 'bg-teal-400' },
                    { nama: 'Dhisil', warna: 'bg-pink-300' },
                    { nama: 'Ngrandu', warna: 'bg-blue-500' },
                  ].map((item) => (
                    <div key={item.nama} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-sm ${item.warna} shadow-sm`} />
                      <span className="text-[10px] sm:text-xs text-gray-600 font-medium">{item.nama}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsFullscreen(false)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {/* Close button — fixed position */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable image — no max-height, just padding */}
          <div className="min-h-full flex items-start justify-center py-8 px-4">
            <div
              className="max-w-4xl w-full rounded-xl overflow-hidden bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/peta-administrasi-salamrejo.jpg"
                alt="Peta Administrasi Desa Salamrejo"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
