import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requireAdmin }) {
  const { user, loading } = useAuth();
  const isAdmin = localStorage.getItem('adminRole');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" />;
  }

  if (!user && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;