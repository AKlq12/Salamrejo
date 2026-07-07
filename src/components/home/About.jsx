import { desaInfo } from '../../data/siteData';
import { useInView } from '../../hooks/useInView';

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 sm:py-28 bg-warm-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-leaf-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-leaf-50/50 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-14 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tentang Desa
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-leaf-900 mb-4">
            Profil Kalurahan Salamrejo
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-leaf-400 to-leaf-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Sejarah */}
          <div className={`${isInView ? 'animate-slide-in-left delay-200' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wood-50 to-wood-200 flex items-center justify-center">
                  <span className="text-lg">📜</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Sejarah Singkat</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {desaInfo.sejarah}
              </p>
            </div>
          </div>

          {/* Visi Misi */}
          <div className={`space-y-6 ${isInView ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
            {/* Visi */}
            <div className="bg-gradient-to-br from-leaf-600 to-leaf-800 rounded-2xl p-8 text-white shadow-lg shadow-leaf-600/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <h3 className="text-lg font-semibold">Visi</h3>
              </div>
              <p className="text-sm text-white/85 leading-relaxed italic">
                "{desaInfo.visi}"
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf-50 to-leaf-100 flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Misi</h3>
              </div>
              <ol className="space-y-3">
                {desaInfo.misi.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-500">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-leaf-100 text-leaf-700 flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Pemerintahan */}
        <div className={`mt-12 grid sm:grid-cols-2 gap-6 ${isInView ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-200 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-leaf-100 to-leaf-200 flex items-center justify-center shrink-0">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Lurah / Kepala Kalurahan</p>
              <p className="font-semibold text-gray-800">{desaInfo.pemerintahan.lurah}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-200 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-wood-50 to-wood-200 flex items-center justify-center shrink-0">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Carik / Sekretaris Kalurahan</p>
              <p className="font-semibold text-gray-800">{desaInfo.pemerintahan.carik}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
