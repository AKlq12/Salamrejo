// Kredensial login admin — hardcoded
// Role: 'superadmin' = akses semua dusun, 'dusun' = akses dusun tertentu saja

export const ADMIN_CREDENTIALS = [
  { username: 'adminsalamrejo', password: 'salamrejo123', role: 'superadmin', dusunId: null, displayName: 'Admin Salamrejo' },
  { username: 'dusunklebakan', password: 'klebakan123', role: 'dusun', dusunId: 'klebakan', displayName: 'Admin Klebakan' },
  { username: 'dusunmentobayan', password: 'mentobayan123', role: 'dusun', dusunId: 'mentobayankidul', displayName: 'Admin Mentobayan' },
  { username: 'dusungiyoso', password: 'giyoso123', role: 'dusun', dusunId: 'giyoso', displayName: 'Admin Giyoso' },
  { username: 'dusunkarangwetan', password: 'karangwetan123', role: 'dusun', dusunId: 'karangwetan', displayName: 'Admin Karang Wetan' },
  { username: 'dusunkidulan', password: 'kidulan123', role: 'dusun', dusunId: 'kidulan', displayName: 'Admin Kidulan' },
  { username: 'dusundhisil', password: 'dhisil123', role: 'dusun', dusunId: 'dhisil', displayName: 'Admin Dhisil' },
  { username: 'dusunsalam', password: 'salam123', role: 'dusun', dusunId: 'salam', displayName: 'Admin Salam' },
  { username: 'dusunngrandu', password: 'ngrandu123', role: 'dusun', dusunId: 'ngandu', displayName: 'Admin Ngrandu' },
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
