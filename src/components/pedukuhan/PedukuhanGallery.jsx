import { useState } from 'react';
import { useInView } from '../../hooks/useInView';

export default function PedukuhanGallery({ galeri = [] }) {
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <section id="pedukuhan-gallery" className="py-16 sm:py-20 bg-warm-50">
        <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-10 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-3">
              <span>📸</span> Dokumentasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-leaf-900">
              Galeri & Budaya
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Kegiatan, tradisi, dan keindahan pedukuhan
            </p>
          </div>

          {galeri.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galeri.map((item, index) => (
                <GalleryCard 
                  key={index} 
                  item={item} 
                  index={index} 
                  isInView={isInView} 
                  onClick={() => setSelectedImage(item)} 
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className={`text-center py-16 bg-white rounded-2xl border border-warm-200 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="text-5xl block mb-4 opacity-30">📸</span>
              <p className="text-gray-400 text-sm">Galeri & dokumentasi belum tersedia.</p>
              <p className="text-gray-300 text-xs mt-1">Segera diperbarui oleh tim KKN.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <LightboxModal 
          selectedImage={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  );
}

function GalleryCard({ item, index, isInView, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${
        isInView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-leaf-50 to-leaf-100 overflow-hidden">
        {item.foto && !imgError ? (
          <img
            src={item.foto}
            alt={item.judul}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl opacity-30 block mb-2">🖼️</span>
              <p className="text-xs text-leaf-600/40">{imgError ? 'Foto Tidak Dapat Diakses' : 'Foto Dokumentasi'}</p>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-leaf-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <div>
            <p className="text-white font-semibold text-sm">{item.judul}</p>
            <p className="text-white/70 text-xs mt-1">{item.deskripsi}</p>
          </div>
        </div>

        {/* Category badge */}
        {item.kategori && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
              {item.kategori}
            </span>
          </div>
        )}

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800">{item.judul}</h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.deskripsi}</p>
      </div>
    </div>
  );
}

function LightboxModal({ selectedImage, onClose }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 sm:h-96 bg-gradient-to-br from-leaf-50 to-leaf-100">
          {selectedImage.foto && !imgError ? (
            <img
              src={selectedImage.foto}
              alt={selectedImage.judul}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col">
              <span className="text-6xl opacity-20 block mb-4">🖼️</span>
              <p className="text-gray-400 text-sm">{imgError ? 'Foto Tidak Dapat Diakses (Cek Izin Akses Google Drive)' : ''}</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              {selectedImage.kategori && (
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold bg-leaf-100 text-leaf-700 mb-2">
                  {selectedImage.kategori}
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-800">{selectedImage.judul}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedImage.deskripsi}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
