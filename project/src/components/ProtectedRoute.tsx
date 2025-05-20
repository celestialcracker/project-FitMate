/**
 * ProtectedRoute Component
 * 
 * A route protection component that ensures only authenticated users can access
 * protected routes. Redirects unauthenticated users to the login page.
 * 
 * Features:
 * - Authentication check using current user state
 * - Automatic redirection to login for unauthenticated users
 * - Seamless integration with React Router
 */

import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/authUtils';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
