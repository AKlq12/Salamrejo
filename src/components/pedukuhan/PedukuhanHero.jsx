import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PedukuhanHero({ pedukuhan, data }) {
  const heroFoto = data?.hero_foto;
  const [imgError, setImgError] = useState(false);

  return (
    <section id="pedukuhan-hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — image or gradient */}
      {heroFoto && !imgError ? (
        <>
          <img
            src={heroFoto}
            alt={`Pedukuhan ${pedukuhan.nama}`}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/70" />
        </>
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${pedukuhan.warna}`} />

          {/* Animated bg patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white blur-3xl animate-float" />
            <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-white blur-2xl animate-float delay-500" />
          </div>
          <div className="absolute inset-0 pattern-dots opacity-5" />

          {/* Overlay */}
          <div className="absolute inset-0 hero-overlay-pedukuhan" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        {/* Breadcrumb */}
        <nav className="animate-fade-in mb-6 flex items-center gap-2 text-sm text-white/60">
          <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white/90">{pedukuhan.nama}</span>
        </nav>

        {/* Icon */}
        <div className="animate-scale-in mb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
            <span className="text-3xl sm:text-4xl">{pedukuhan.icon}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
          Pedukuhan {pedukuhan.nama}
        </h1>

        <p className="animate-fade-in-up delay-200 text-base sm:text-lg text-white/70 max-w-xl mb-6">
          {pedukuhan.deskripsi}
        </p>

        {/* Quick info pills */}
        {data?.dukuh?.nama && (
          <div className="animate-fade-in-up delay-300 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs sm:text-sm">
              <span>👤</span> {data.dukuh.nama}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs sm:text-sm">
              <span>📍</span> Desa Salamrejo, Sentolo
            </span>
          </div>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
          <path
            d="M0 50 C360 100 720 0 1080 50 C1260 75 1360 60 1440 50 L1440 100 L0 100Z"
            fill="var(--color-warm-50)"
          />
        </svg>
      </div>
    </section>
  );
}
