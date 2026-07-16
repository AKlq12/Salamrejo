import { Link } from 'react-router-dom';
import { getSession, hasAccessToDusun } from './adminAuth';
import { pedukuhanList, pedukuhanData } from '../data/siteData';

export default function AdminDashboard() {
  const session = getSession();

  // Filter pedukuhan yang bisa diakses
  const accessiblePedukuhan = pedukuhanList.filter((p) =>
    hasAccessToDusun(session, p.id)
  );

  // Hitung statistik total
  const totalStats = accessiblePedukuhan.reduce(
    (acc, p) => {
      const d = pedukuhanData[p.id];
      if (d) {
        acc.kk += d.statistik.jml_kk;
        acc.penduduk += d.statistik.laki_laki + d.statistik.perempuan;
        acc.umkm += d.umkm.length;
        acc.galeri += d.galeri.length;
      }
      return acc;
    },
    { kk: 0, penduduk: 0, umkm: 0, galeri: 0 }
  );

  const statCards = [
    {
      label: 'Total KK',
      value: totalStats.kk.toLocaleString('id-ID'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Total Penduduk',
      value: totalStats.penduduk.toLocaleString('id-ID'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Total UMKM',
      value: totalStats.umkm.toLocaleString('id-ID'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Total Galeri',
      value: totalStats.galeri.toLocaleString('id-ID'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-leaf-600 to-leaf-700 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-20 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative">
          <h1 className="text-2xl font-bold mb-1">
            Selamat datang, {session?.displayName}! 👋
          </h1>
          <p className="text-leaf-100 text-sm">
            {session?.role === 'superadmin'
              ? 'Anda memiliki akses penuh ke seluruh data 8 pedukuhan.'
              : `Anda mengelola data Pedukuhan ${accessiblePedukuhan[0]?.nama || ''}.`}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`w-10 h-10 rounded-xl ${card.bgLight} ${card.textColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Pedukuhan Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Pedukuhan yang Dikelola
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {accessiblePedukuhan.map((p) => {
            const d = pedukuhanData[p.id];
            return (
              <Link
                key={p.id}
                to={`/admin/pedukuhan/${p.id}`}
                className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-leaf-200 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-leaf-100 to-leaf-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-leaf-700 transition-colors text-sm">
                      {p.nama}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {d?.statistik?.jml_kk || 0} KK
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-sm font-bold text-gray-800">{d?.statistik?.jml_rt || 0}</p>
                    <p className="text-[10px] text-gray-400">RT</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-sm font-bold text-gray-800">{d?.umkm?.length || 0}</p>
                    <p className="text-[10px] text-gray-400">UMKM</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-sm font-bold text-gray-800">{d?.galeri?.length || 0}</p>
                    <p className="text-[10px] text-gray-400">Galeri</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end text-xs font-medium text-leaf-600 group-hover:text-leaf-700 transition-colors">
                  Kelola
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-leaf-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Panduan Cepat
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-leaf-500 mt-0.5">•</span>
            Klik nama pedukuhan di sidebar atau kartu di atas untuk mengelola data.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-leaf-500 mt-0.5">•</span>
            Anda bisa mengedit info pedukuhan, statistik, UMKM, dan galeri.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-leaf-500 mt-0.5">•</span>
            Perubahan tersimpan di browser ini saja (localStorage). Untuk data permanen, gunakan Google Sheets.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-leaf-500 mt-0.5">•</span>
            Klik "Lihat Website" di pojok kanan atas untuk melihat tampilan publik.
          </li>
        </ul>
      </div>
    </div>
  );
}
