// Kredensial login admin — hardcoded
// Role: 'superadmin' = akses semua dusun, 'dusun' = akses dusun tertentu saja

export const ADMIN_CREDENTIALS = [
  { username: 'adminsalamrejo', password: 'salamrejo123', role: 'superadmin', dusunId: null, displayName: 'Admin Salamrejo' },
];

const SESSION_KEY = 'salamrejo_admin_session';

/**
 * Validasi login, simpan session, return user object atau null
 */
export function login(username, password) {
  const user = ADMIN_CREDENTIALS.find(
    (cred) => cred.username === username && cred.password === password
  );
  if (user) {
    const session = {
      username: user.username,
      role: user.role,
      dusunId: user.dusunId,
      displayName: user.displayName,
      loginAt: new Date().toISOString(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }
  return null;
}

/**
 * Ambil session yang sedang aktif
 */
export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Logout — hapus session
 */
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Cek apakah user punya akses ke dusun tertentu
 */
export function hasAccessToDusun(session, dusunId) {
  if (!session) return false;
  if (session.role === 'superadmin') return true;
  return session.dusunId === dusunId;
}
