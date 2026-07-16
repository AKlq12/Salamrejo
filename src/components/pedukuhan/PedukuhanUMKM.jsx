import { useState } from 'react';
import { useInView } from '../../hooks/useInView';

const kategoriColors = {
  Makanan: 'bg-orange-100 text-orange-700 border-orange-200',
  Kerajinan: 'bg-purple-100 text-purple-700 border-purple-200',
  Jasa: 'bg-blue-100 text-blue-700 border-blue-200',
  Pertanian: 'bg-green-100 text-green-700 border-green-200',
};

const kategoriIcons = {
  Makanan: '🍽️',
  Kerajinan: '🎨',
  Jasa: '🛠️',
  Pertanian: '🌾',
};

export default function PedukuhanUMKM({ umkm = [] }) {
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const [selectedUMKM, setSelectedUMKM] = useState(null);

  return (
    <>
      <section id="pedukuhan-umkm" className="py-16 sm:py-20 bg-warm-100">
        <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-10 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wood-50 text-wood-600 text-xs font-medium mb-3 border border-wood-200">
              <span>🏪</span> Ekonomi Lokal
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-leaf-900">
              UMKM & Potensi
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Produk unggulan dan potensi ekonomi pedukuhan
            </p>
          </div>

          {umkm.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {umkm.map((item, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-200 hover:shadow-lg transition-all duration-300 ${
                    isInView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  {/* Image area */}
                  <div className="relative h-48 bg-gradient-to-br from-leaf-100 to-leaf-200 overflow-hidden">
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl opacity-40 block mb-2">
                            {kategoriIcons[item.kategori] || '📦'}
                          </span>
                          <p className="text-xs text-leaf-600/50">Foto Produk</p>
                        </div>
                      </div>
                    )}

                    {/* Kategori badge */}
                    {item.kategori && (
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          kategoriColors[item.kategori] || 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {item.kategori}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-leaf-700 transition-colors">
                      {item.nama}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">
                      {item.deskripsi}
                    </p>

                    {/* Lihat Detail button */}
                    <button
                      onClick={() => setSelectedUMKM(item)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-leaf-600 to-leaf-700 text-white text-sm font-medium hover:from-leaf-500 hover:to-leaf-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className={`text-center py-16 bg-white rounded-2xl border border-warm-200 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="text-5xl block mb-4 opacity-30">🏪</span>
              <p className="text-gray-400 text-sm">Data UMKM belum tersedia untuk pedukuhan ini.</p>
              <p className="text-gray-300 text-xs mt-1">Segera diperbarui oleh tim KKN.</p>
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedUMKM && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedUMKM(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedUMKM(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="relative h-56 sm:h-64 bg-gradient-to-br from-leaf-100 to-leaf-200 overflow-hidden">
              {selectedUMKM.foto ? (
                <img
                  src={selectedUMKM.foto}
                  alt={selectedUMKM.nama}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-30 block mb-2">
                      {kategoriIcons[selectedUMKM.kategori] || '📦'}
                    </span>
                    <p className="text-sm text-leaf-600/40">Foto belum tersedia</p>
                  </div>
                </div>
              )}

              {/* Kategori badge overlay */}
              {selectedUMKM.kategori && (
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                    kategoriColors[selectedUMKM.kategori] || 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}>
                    {kategoriIcons[selectedUMKM.kategori] || '📦'} {selectedUMKM.kategori}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {selectedUMKM.nama}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {selectedUMKM.deskripsi || 'Deskripsi belum tersedia.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Location Button */}
                {selectedUMKM.lokasi ? (
                  <a
                    href={selectedUMKM.lokasi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Lihat Lokasi
                  </a>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 text-gray-400 text-sm border border-gray-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Lokasi belum tersedia
                  </div>
                )}

                {/* WhatsApp Button */}
                {selectedUMKM.wa ? (
                  <a
                    href={`https://wa.me/${selectedUMKM.wa.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Hubungi WhatsApp
                  </a>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 text-gray-400 text-sm border border-gray-200">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WA belum tersedia
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
