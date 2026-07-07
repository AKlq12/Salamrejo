import { useInView } from '../../hooks/useInView';

const statItems = [
  { key: 'jml_rt', label: 'Jumlah RT', icon: '🏠', color: 'from-leaf-500 to-leaf-700' },
  { key: 'jml_kk', label: 'Kepala Keluarga', icon: '👨‍👩‍👧‍👦', color: 'from-emerald-500 to-emerald-700' },
  { key: 'laki_laki', label: 'Laki-laki', icon: '👨', color: 'from-teal-500 to-teal-700' },
  { key: 'perempuan', label: 'Perempuan', icon: '👩', color: 'from-green-500 to-green-700' },
];

export default function PedukuhanStats({ statistik }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  if (!statistik) return null;

  const total = (statistik.laki_laki || 0) + (statistik.perempuan || 0);

  return (
    <section id="pedukuhan-stats" className="py-16 sm:py-20 bg-warm-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-10 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-3">
            <span>📊</span> Demografi
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-leaf-900">
            Data Kependudukan
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((item, index) => (
            <div
              key={item.key}
              className={`relative bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-warm-200 hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                isInView ? 'animate-count-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-leaf-800 mb-1">
                  {statistik[item.key]?.toLocaleString('id-ID') || '0'}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total bar */}
        <div className={`mt-6 bg-white rounded-2xl p-5 shadow-sm border border-warm-200 ${isInView ? 'animate-fade-in-up delay-700' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Total Penduduk</p>
            <p className="text-sm font-bold text-leaf-700">{total.toLocaleString('id-ID')} jiwa</p>
          </div>
          <div className="h-3 bg-warm-100 rounded-full overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-teal-400 to-teal-600 rounded-l-full transition-all duration-1000"
              style={{ width: total > 0 ? `${(statistik.laki_laki / total) * 100}%` : '50%' }}
            />
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 rounded-r-full transition-all duration-1000"
              style={{ width: total > 0 ? `${(statistik.perempuan / total) * 100}%` : '50%' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-500" /> Laki-laki ({total > 0 ? Math.round((statistik.laki_laki / total) * 100) : 50}%)
            </span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Perempuan ({total > 0 ? Math.round((statistik.perempuan / total) * 100) : 50}%)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
