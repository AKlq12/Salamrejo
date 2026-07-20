import { useInView } from '../../hooks/useInView';

export default function PedukuhanSejarah({ sejarah, pedukuhanNama }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  if (!sejarah) return null;

  return (
    <section id="pedukuhan-sejarah" className="py-16 sm:py-20 bg-warm-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-leaf-500 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-leaf-400 blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-10 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-3">
            <span>📜</span> Sejarah
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-leaf-900">
            Sejarah Pedukuhan {pedukuhanNama}
          </h2>
        </div>

        {/* Content Card */}
        <div className={`max-w-4xl mx-auto ${isInView ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <div className="relative bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden">
            {/* Decorative top accent */}
            <div className="h-1.5 bg-gradient-to-r from-leaf-400 via-leaf-600 to-leaf-400" />

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Quote-style opening */}
              <div className="flex gap-4 sm:gap-5">
                <div className="shrink-0 hidden sm:block">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-leaf-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed sm:leading-loose whitespace-pre-line">
                    {sejarah}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom decorative accent */}
            <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
              <div className="flex items-center gap-3 pt-5 border-t border-warm-100">
                <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center">
                  <span className="text-sm">🏘️</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-leaf-700">Pedukuhan {pedukuhanNama}</p>
                  <p className="text-[10px] text-gray-400">Desa Salamrejo, Sentolo, Kulon Progo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
