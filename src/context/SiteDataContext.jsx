import { createContext, useState, useEffect, useContext } from 'react';
import { fetchSheetData } from '../data/apiConfig';
import { pedukuhanData as fallbackData } from '../data/siteData';
import { getDirectImageUrl } from '../utils/imageUrl';

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
        // Fetch semua sheet secara paralel agar lebih cepat
        const [infoRes, statistikRes, umkmRes, galeriRes] = await Promise.all([
          fetchSheetData('Pedukuhan_Info'),
          fetchSheetData('Statistik'),
          fetchSheetData('UMKM'),
          fetchSheetData('Galeri')
        ]);

        // Cek apakah data berhasil diambil (minimal info harus ada)
        if (infoRes.length > 0) {
          setData({
            info: infoRes,
            statistik: statistikRes,
            umkm: umkmRes,
            galeri: galeriRes
          });
          setIsUsingFallback(false);
        } else {
          // Jika semua kosong, gunakan fallback
          console.warn("Data dari Google Sheets kosong, menggunakan data statis.");
          setIsUsingFallback(true);
        }
      } catch (err) {
        console.error("Gagal memuat data dari Google Sheets:", err);
        setError(err.message);
        setIsUsingFallback(true); // Gunakan data statis jika fetch gagal
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
    
    // Cari statistik (konversi string angka dari CSV menjadi Number)
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
      foto: getDirectImageUrl(item.Foto) || null,
      wa: item.WA,
      lokasi: item.Lokasi
    }));

    const galeri = data.galeri.filter(item => item.ID_Pedukuhan === id).map(item => ({
      judul: item.Judul,
      kategori: item.Kategori,
      foto: getDirectImageUrl(item.Foto_URL) || null,
      deskripsi: item.Deskripsi
    }));

    return {
      dukuh: {
        nama: infoDukuh.Nama_Dukuh,
        wa: infoDukuh.WA_Dukuh,
        peta_url: infoDukuh.Peta_URL
      },
      hero_foto: getDirectImageUrl(infoDukuh.Foto_Hero) || null,
      sejarah: infoDukuh.Sejarah || null,
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
