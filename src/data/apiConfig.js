// Konfigurasi API — langsung dari Google Sheets (tanpa SheetDB)
// Spreadsheet: Database Portal Desa Salamrejo
// URL: https://docs.google.com/spreadsheets/d/1CF_HyNEC6ZM01an6gjZ_tvsQHo5QswZRgqc3VRFT5wc

const SPREADSHEET_ID = "1CF_HyNEC6ZM01an6gjZ_tvsQHo5QswZRgqc3VRFT5wc";

// GID untuk setiap sheet/tab
const SHEET_GIDS = {
  Pedukuhan_Info: 0,
  Statistik: 1185663768,
  UMKM: 1312243680,
  Galeri: 1745815415,
};

/**
 * Parse CSV string menjadi array of objects (menggunakan header row pertama).
 * Mendukung field yang dibungkus tanda kutip (untuk URL yang mengandung koma).
 */
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  // Parse header
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  return data;
}

/**
 * Parse satu baris CSV, menangani field yang dibungkus tanda kutip.
 */
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        // Cek apakah ini escaped quote ("") atau akhir field
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        fields.push(current.trim());
        current = '';
      } else if (char !== '\r') {
        current += char;
      }
    }
  }
  fields.push(current.trim());

  return fields;
}

/**
 * Fetch data dari Google Sheets berdasarkan nama sheet.
 * Menggunakan endpoint CSV export (gratis, tanpa batas request).
 */
export const fetchSheetData = async (sheetName) => {
  const gid = SHEET_GIDS[sheetName];
  if (gid === undefined) {
    console.error(`Sheet "${sheetName}" tidak ditemukan di konfigurasi.`);
    return [];
  }

  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari tab ${sheetName} (HTTP ${response.status})`);
    }

    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
};
