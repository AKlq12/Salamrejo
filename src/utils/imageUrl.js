/**
 * Konversi URL gambar dari berbagai sumber menjadi direct image URL.
 * 
 * Mendukung:
 * - Google Drive share links → direct view URL
 * - Google Photos links → direct image URL  
 * - URL biasa (imgur, dsb) → langsung pakai
 * 
 * @param {string} url - URL gambar dari spreadsheet
 * @returns {string|null} - Direct image URL atau null jika invalid
 */
export function getDirectImageUrl(url) {
  if (!url || typeof url !== 'string') return null;
  
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Google Drive: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // Google Drive: https://drive.google.com/open?id=FILE_ID
  // Google Drive: https://drive.google.com/uc?id=FILE_ID
  const driveFileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }

  const driveOpenMatch = trimmed.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
  }

  const driveUcMatch = trimmed.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (driveUcMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveUcMatch[1]}`;
  }

  // Google Photos: lh3.googleusercontent.com links — langsung pakai
  if (trimmed.includes('lh3.googleusercontent.com')) {
    return trimmed;
  }

  // URL biasa (imgur, cloudinary, dsb) — langsung pakai
  return trimmed;
}
