import { useParams, Link } from 'react-router-dom';
import { pedukuhanList } from '../data/siteData';
import { useSiteData } from '../context/SiteDataContext';
import PedukuhanHero from '../components/pedukuhan/PedukuhanHero';
import PedukuhanSejarah from '../components/pedukuhan/PedukuhanSejarah';
import PedukuhanStats from '../components/pedukuhan/PedukuhanStats';
import PedukuhanUMKM from '../components/pedukuhan/PedukuhanUMKM';
import PedukuhanGallery from '../components/pedukuhan/PedukuhanGallery';
import PedukuhanMapContact from '../components/pedukuhan/PedukuhanMapContact';

export default function PedukuhanDetail() {
  const { id } = useParams();
  const { loading, getPedukuhanData } = useSiteData();

  // Find pedukuhan info from the list
  const pedukuhan = pedukuhanList.find((p) => p.id === id);

  // 404 state
  if (!pedukuhan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50 px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-leaf-100 flex items-center justify-center">
            <span className="text-5xl">🏚️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pedukuhan Tidak Ditemukan
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
            Maaf, pedukuhan dengan ID <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-leaf-700">"{id}"</span> tidak ada di Desa Salamrejo.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-leaf-600 to-leaf-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-leaf-200 border-t-leaf-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500 font-medium animate-pulse">
            Mengambil data pedukuhan...
          </p>
        </div>
      </div>
    );
  }

  // Get pedukuhan data
  const data = getPedukuhanData(id);

  // Find navigation (prev/next)
  const currentIndex = pedukuhanList.findIndex((p) => p.id === id);
  const prevPedukuhan = currentIndex > 0 ? pedukuhanList[currentIndex - 1] : null;
  const nextPedukuhan = currentIndex < pedukuhanList.length - 1 ? pedukuhanList[currentIndex + 1] : null;

  return (
    <>
      <PedukuhanHero pedukuhan={pedukuhan} data={data} />
      <PedukuhanSejarah sejarah={data?.sejarah} pedukuhanNama={pedukuhan.nama} />
      <PedukuhanStats statistik={data?.statistik} />
      <PedukuhanUMKM umkm={data?.umkm} />
      <PedukuhanGallery galeri={data?.galeri} />
      <PedukuhanMapContact dukuh={data?.dukuh} pedukuhanNama={pedukuhan.nama} />

      {/* Navigation between pedukuhan */}
      <section className="py-12 bg-warm-50 border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {prevPedukuhan ? (
              <Link
                to={`/pedukuhan/${prevPedukuhan.id}`}
                className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-warm-200 hover:border-leaf-200 hover:shadow-md transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-leaf-600 group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400">Sebelumnya</p>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-leaf-700 transition-colors">{prevPedukuhan.nama}</p>
                </div>
              </Link>
            ) : <div />}

            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-leaf-700 hover:bg-leaf-50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Semua Pedukuhan
            </Link>

            {nextPedukuhan ? (
              <Link
                to={`/pedukuhan/${nextPedukuhan.id}`}
                className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-warm-200 hover:border-leaf-200 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <p className="text-[10px] text-gray-400">Selanjutnya</p>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-leaf-700 transition-colors">{nextPedukuhan.nama}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-leaf-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
}
