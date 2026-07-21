import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-leaf-100/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-leaf-50/70 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="text-center max-w-md relative z-10 animate-fade-in-up">
        {/* Animated illustration container */}
        <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-leaf-100 to-leaf-200 rounded-full flex items-center justify-center shadow-inner relative">
          <span className="text-7xl animate-bounce">🧭</span>
          {/* Subtle ring around the emoji */}
          <div className="absolute inset-0 rounded-full border-2 border-leaf-300/30 scale-110 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
        </div>

        {/* Text */}
        <h1 className="text-7xl font-extrabold text-leaf-800 tracking-tight mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Maaf, halaman yang Anda cari tidak dapat kami temukan atau mungkin telah dipindahkan. Pastikan alamat URL yang dimasukkan sudah benar.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-leaf-600 text-white font-semibold shadow-lg shadow-leaf-600/20 hover:shadow-xl hover:shadow-leaf-600/30 hover:bg-leaf-700 transition-all duration-300 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
}
