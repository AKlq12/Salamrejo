import { useInView } from '../../hooks/useInView';

/**
 * Konversi URL Google Maps biasa menjadi URL embed.
 * Mendukung format:
 * - https://www.google.com/maps/place/... → embed/v1/place
 * - https://maps.google.com/... → embed/v1/place
 * - https://www.google.com/maps/embed?... → langsung dipakai
 * - https://www.google.com/maps/@lat,lng,zoom → embed/v1/view
 */
function getEmbedUrl(url) {
  if (!url) return null;

  // Jika sudah berformat embed, langsung pakai
  if (url.includes('/maps/embed')) return url;

  // Jika format /maps/place/NamaLokasi/...
  const placeMatch = url.match(/\/maps\/place\/([^/@]+)/);
  if (placeMatch) {
    const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(placeName)}`;
  }

  // Jika format /maps/@lat,lng,zoom
  const coordMatch = url.match(/\/@(-?\d+\.?\d*),(-?\d+\.?\d*),(\d+\.?\d*)/);
  if (coordMatch) {
    return `https://www.google.com/maps/embed/v1/view?key=&center=${coordMatch[1]},${coordMatch[2]}&zoom=${parseInt(coordMatch[3])}`;
  }

  return null;
}

/**
 * Konversi URL Google Maps ke embed URL.
 * Mendukung:
 * - URL embed langsung (maps/embed)
 * - URL place lengkap (/maps/place/NamaLokasi/@lat,lng,zoom)
 * - URL koordinat (/@lat,lng,zoom)
 * - URL dengan data parameter (!3d...!4d...)
 * - Short links (maps.app.goo.gl) → fallback ke nama pedukuhan
 */
function getSimpleEmbedUrl(url, fallbackName) {
  if (!url) return null;

  // Jika sudah berformat embed, langsung pakai
  if (url.includes('/maps/embed')) return url;

  // Coba extract place name + koordinat dari URL lengkap
  // Contoh: /maps/place/Dhisil,+Salamrejo,.../@-7.857,110.231,16z/...
  const placeWithCoordMatch = url.match(/\/maps\/place\/([^/@]+)\/@(-?\d+\.?\d*),(-?\d+\.?\d*),?(\d+\.?\d*)?/);
  if (placeWithCoordMatch) {
    const lat = placeWithCoordMatch[2];
    const lng = placeWithCoordMatch[3];
    const zoom = placeWithCoordMatch[4] ? Math.round(parseFloat(placeWithCoordMatch[4])) : 16;
    const placeName = decodeURIComponent(placeWithCoordMatch[1].replace(/\+/g, ' '));
    return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&ll=${lat},${lng}&z=${zoom}&output=embed`;
  }

  // Coba extract place name saja (tanpa koordinat)
  const placeMatch = url.match(/\/maps\/place\/([^/@]+)/);
  if (placeMatch) {
    const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&z=16&output=embed`;
  }

  // Coba extract koordinat dari /@lat,lng,zoom
  const coordMatch = url.match(/\/@(-?\d+\.?\d*),(-?\d+\.?\d*),?(\d+\.?\d*)?/);
  if (coordMatch) {
    const zoom = coordMatch[3] ? Math.round(parseFloat(coordMatch[3])) : 16;
    return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&z=${zoom}&output=embed`;
  }

  // Fallback: coba extract dari data=!...!3d...!4d...
  const dataMatch = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
  if (dataMatch) {
    return `https://maps.google.com/maps?q=${dataMatch[1]},${dataMatch[2]}&z=16&output=embed`;
  }

  // Fallback untuk short links (maps.app.goo.gl) dan format lain yang tidak dikenali:
  // Gunakan nama pedukuhan sebagai query pencarian di embed
  if (fallbackName) {
    const searchQuery = `${fallbackName}, Salamrejo, Sentolo`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&z=15&output=embed`;
  }

  return null;
}

export default function PedukuhanMapContact({ dukuh, pedukuhanNama }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  // Konversi peta_url ke embed URL (fallback ke nama pedukuhan jika URL tidak bisa diparsing)
  const embedUrl = dukuh?.peta_url ? getSimpleEmbedUrl(dukuh.peta_url, pedukuhanNama) : null;

  return (
    <section id="pedukuhan-map-contact" className="py-16 sm:py-20 bg-warm-100">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-10 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-100 text-leaf-700 text-xs font-medium mb-3">
            <span>📍</span> Lokasi & Kontak
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-leaf-900">
            Peta & Kontak Pedukuhan
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map */}
          <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-200 ${isInView ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="p-4 border-b border-warm-100">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Lokasi Pedukuhan {pedukuhanNama}
              </h3>
            </div>
            <div className="h-72 sm:h-80 bg-gradient-to-br from-leaf-50 to-leaf-100 relative">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Peta Pedukuhan ${pedukuhanNama}`}
                />
              ) : dukuh?.peta_url ? (
                /* URL tersedia tapi tidak bisa di-embed — tampilkan tombol link */
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-leaf-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Peta tersedia di Google Maps</p>
                    <a
                      href={dukuh.peta_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-leaf-600 text-white text-sm font-medium hover:bg-leaf-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-leaf-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-leaf-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">Peta belum tersedia</p>
                    <p className="text-xs text-gray-300 mt-1">Embed Google Maps URL akan ditambahkan</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Card */}
          <div className={`${isInView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            <div className="bg-leaf-50 rounded-2xl p-5 sm:p-8 border border-leaf-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-leaf-500 to-leaf-700 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-leaf-900">Kepala Pedukuhan</h3>
                  <p className="text-xs text-leaf-600">Pedukuhan {pedukuhanNama}</p>
                </div>
              </div>

              <div className="space-y-5 flex-1">
                {/* Name */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Nama</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {dukuh?.nama || 'Belum diisi'}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Alamat</p>
                    <p className="text-sm font-semibold text-gray-800">
                      Pedukuhan {pedukuhanNama}, Salamrejo, Sentolo
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">WhatsApp</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {dukuh?.wa || 'Belum tersedia'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-leaf-200">
                {dukuh?.wa ? (
                  <a
                    href={`https://wa.me/${dukuh.wa.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-whatsapp"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-leaf-600 to-leaf-700 text-white font-semibold shadow-lg shadow-leaf-600/20 hover:shadow-xl hover:from-leaf-500 hover:to-leaf-600 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Hubungi via WhatsApp
                  </a>
                ) : (
                  <div className="flex items-center justify-center w-full py-3 rounded-xl bg-gray-100 text-gray-400 text-sm">
                    Kontak WhatsApp belum tersedia
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
