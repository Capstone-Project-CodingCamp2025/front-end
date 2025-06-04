// ProtectedRoute pelindung jika user mencoba mengakses user atau bookmark, 
//komponen ProtectedRoute akan memeriksa apakah pengguna telah terautentikasi (isAuthenticated). 
// Jika belum, pengguna akan diarahkan ke halaman login.

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import LoadingScreen from './LoadingScreen'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); 

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />; 
  }
  return children;
};

export default ProtectedRoute;