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

/**
 * Props for the ProtectedRoute component
 * @property {React.ReactNode} children - Child components to render when authenticated
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * Wraps protected routes to ensure they are only accessible to authenticated users.
 * If no user is authenticated, redirects to the login page.
 * 
 * @param {ProtectedRouteProps} props - Component props
 * @returns {JSX.Element} Either the protected content or a redirect to login
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is authenticated
  const currentUser = getCurrentUser();
  
  // Redirect to login if no authenticated user
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Render protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
