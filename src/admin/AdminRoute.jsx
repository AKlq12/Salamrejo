import { Navigate } from 'react-router-dom';
import { getSession } from './adminAuth';

/**
 * Protected route — redirect ke /admin jika belum login
 */
export default function AdminRoute({ children }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
