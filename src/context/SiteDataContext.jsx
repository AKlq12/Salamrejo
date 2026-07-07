import { createContext, useState, useEffect, useContext } from 'react';
import { fetchSheetData } from '../data/apiConfig';
import { pedukuhanData as fallbackData } from '../data/siteData';

const SiteDataContext = createContext();

export function SiteDataProvider({ children }) {
  const [data, setData] = useState({
    info: [],
    statistik: [],
    umkm: [],
    galeri: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        // Cek apakah API URL masih dummy
        const { SHEETDB_API_URL } = await import('../data/apiConfig');
        if (SHEETDB_API_URL === "ISI_DENGAN_URL_API_SHEETDB_KAMU_NANTI") {
          setIsUsingFallback(true);
          setLoading(false);
          return;
        }

        // Fetch semua sheet secara paralel agar lebih cepat
        const [infoRes, statistikRes, umkmRes, galeriRes] = await Promise.all([
          fetchSheetData('Pedukuhan_Info'),
          fetchSheetData('Statistik'),
          fetchSheetData('UMKM'),
          fetchSheetData('Galeri')
        ]);

        setData({
          info: infoRes || [],
          statistik: statistikRes || [],
          umkm: umkmRes || [],
          galeri: galeriRes || []
        });
        setIsUsingFallback(false);
      } catch (err) {
        console.error("Gagal memuat data dari API:", err);
        setError(err.message);
        setIsUsingFallback(true); // Gunakan data statis jika API gagal (misal kuota habis)
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Helper untuk mengambil data spesifik 1 pedukuhan
  const getPedukuhanData = (id) => {
    if (isUsingFallback) {
      return fallbackData[id];
    }

    // Cari info dukuh
    const infoDukuh = data.info.find(item => item.ID_Pedukuhan === id) || {};
    
    // Cari statistik (konversi string angka dari GSheets menjadi Number)
    const rawStat = data.statistik.find(item => item.ID_Pedukuhan === id) || {};
    const statistik = {
      jml_rt: Number(rawStat.Jml_RT) || 0,
      jml_kk: Number(rawStat.Jml_KK) || 0,
      laki_laki: Number(rawStat.Laki_Laki) || 0,
      perempuan: Number(rawStat.Perempuan) || 0
    };

    // Filter UMKM dan Galeri yang hanya milik pedukuhan ini
    const umkm = data.umkm.filter(item => item.ID_Pedukuhan === id).map(item => ({
      nama: item.Nama_Usaha,
      kategori: item.Kategori,
      deskripsi: item.Deskripsi,
      foto: item.Foto,
      wa: item.WA
    }));

    const galeri = data.galeri.filter(item => item.ID_Pedukuhan === id).map(item => ({
      judul: item.Judul,
      kategori: item.Kategori,
      foto: item.Foto_URL,
      deskripsi: item.Deskripsi
    }));

    return {
      dukuh: {
        nama: infoDukuh.Nama_Dukuh,
        wa: infoDukuh.WA_Dukuh,
        peta_url: infoDukuh.Peta_URL
      },
      hero_foto: infoDukuh.Foto_Hero,
      statistik,
      umkm,
      galeri
    };
  };

  return (
    <SiteDataContext.Provider value={{ data, loading, error, isUsingFallback, getPedukuhanData }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
