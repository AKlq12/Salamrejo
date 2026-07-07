// Konfigurasi URL API SheetDB
// Ganti SHEETDB_API_URL dengan URL API milikmu nanti
export const SHEETDB_API_URL = "ISI_DENGAN_URL_API_SHEETDB_KAMU_NANTI";

// Fungsi helper untuk memanggil API berdasarkan nama sheet/tab
export const fetchSheetData = async (sheetName) => {
  if (SHEETDB_API_URL === "ISI_DENGAN_URL_API_SHEETDB_KAMU_NANTI") {
    console.warn("API URL belum diatur. Menggunakan data statis sebagai fallback.");
    return null;
  }

  try {
    const response = await fetch(`${SHEETDB_API_URL}?sheet=${sheetName}`);
    if (!response.ok) throw new Error(`Gagal mengambil data dari tab ${sheetName}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
