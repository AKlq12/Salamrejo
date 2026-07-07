import { useInView } from '../../hooks/useInView';

export default function DesaMap() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="desa-map" className="py-16 sm:py-24 bg-warm-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-leaf-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-leaf-50/50 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-10 sm:mb-14 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Lokasi Desa
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-leaf-900 mb-3">
            Peta Desa Salamrejo
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Kalurahan Salamrejo terletak di Kapanewon Sentolo, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-leaf-400 to-leaf-600 mx-auto rounded-full mt-5" />
        </div>

        {/* Map Container */}
        <div className={`${isInView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-warm-200 hover:shadow-xl transition-shadow duration-500">
            {/* Map Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-warm-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-700 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800">Kalurahan Salamrejo</h3>
                  <p className="text-[10px] sm:text-xs text-gray-400">Sentolo, Kulon Progo, DIY</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/Salamrejo+Sentolo+Kulon+Progo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-leaf-50 text-leaf-700 text-xs sm:text-sm font-medium hover:bg-leaf-100 transition-colors duration-200 w-fit"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Buka di Google Maps
              </a>
            </div>

            {/* Google Maps Embed */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31592.83!2d110.2632!3d-7.8274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af9d8cfe2b4c3%3A0x4027a76e352fa30!2sSalamrejo%2C%20Sentolo%2C%20Kulon%20Progo%20Regency%2C%20Special%20Region%20of%20Yogyakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Salamrejo, Sentolo, Kulon Progo"
              />
            </div>
          </div>
        </div>

        {/* Info Cards Below Map */}
        <div className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 ${isInView ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-warm-200 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-leaf-100 to-leaf-200 flex items-center justify-center shrink-0">
              <span className="text-lg sm:text-xl">📍</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-400">Kecamatan</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">Kapanewon Sentolo</p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-warm-200 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-leaf-100 to-leaf-200 flex items-center justify-center shrink-0">
              <span className="text-lg sm:text-xl">🏛️</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-400">Kabupaten</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">Kulon Progo</p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-warm-200 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-leaf-100 to-leaf-200 flex items-center justify-center shrink-0">
              <span className="text-lg sm:text-xl">🌏</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-400">Provinsi</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">DI Yogyakarta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
