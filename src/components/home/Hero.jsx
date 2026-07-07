import { desaInfo } from '../../data/siteData';

export default function Hero() {
  const scrollToPedukuhan = () => {
    document.getElementById('pedukuhan-hub')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-leaf-950 via-leaf-900 to-leaf-800" />

      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 rounded-full bg-leaf-400 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-64 lg:w-80 h-40 sm:h-64 lg:h-80 rounded-full bg-leaf-300 blur-3xl animate-float delay-700" />
        <div className="absolute top-1/2 left-1/2 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full bg-leaf-500 blur-3xl animate-float delay-300" />
      </div>

      {/* Decorative leaf patterns */}
      <div className="absolute inset-0 opacity-5 pattern-dots" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse" />
            Kapanewon Sentolo, Kulon Progo, DIY
          </span>
        </div>

        {/* Main Title */}
        <h1 className="animate-fade-in-up delay-100 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Selamat Datang di
          <span className="block bg-gradient-to-r from-leaf-300 via-leaf-400 to-emerald-300 bg-clip-text text-transparent mt-1 sm:mt-2">
            Desa Salamrejo
          </span>
        </h1>

        {/* Tagline */}
        <p className="animate-fade-in-up delay-200 text-sm sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed px-2">
          {desaInfo.tagline}
        </p>

        {/* Stats mini */}
        <div className="animate-fade-in-up delay-300 flex items-center justify-center gap-6 sm:gap-10 mb-10">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-leaf-300">8</p>
            <p className="text-xs sm:text-sm text-white/50">Pedukuhan</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-leaf-300">35+</p>
            <p className="text-xs sm:text-sm text-white/50">RT</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-leaf-300">1000+</p>
            <p className="text-xs sm:text-sm text-white/50">Keluarga</p>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToPedukuhan}
            id="cta-explore"
            className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-leaf-500 to-leaf-600 text-white font-semibold shadow-lg shadow-leaf-500/30 hover:shadow-xl hover:shadow-leaf-500/40 hover:from-leaf-400 hover:to-leaf-500 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            Jelajahi Pedukuhan
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={scrollToAbout}
            id="cta-about"
            className="px-8 py-3.5 rounded-xl border border-white/25 text-white font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            Tentang Desa
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
