import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader';
import PageTransition from './PageTransition';

interface ProtectedRouteProps {
  requireVerified?: boolean;
}

/**
 * Protected Route component that checks if user is authenticated
 * and optionally if their email is verified before allowing access
 */
const ProtectedRoute = ({ requireVerified = true }: ProtectedRouteProps) => {
  const { currentUser, loading, authStateLoading, isEmailVerified, verifyEmail, logout } = useAuth();
  
  // If auth is still being determined, show loader
  if (authStateLoading) {
    return <Loader fullScreen text="Authenticating..." />;
  }

  // If user is not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If we require verified email but user's email is not verified
  if (requireVerified && !isEmailVerified()) {
    return (
      <PageTransition>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Email Verification Required</h1>
          <p className="text-gray-600 mb-4 text-center">Please verify your email address before accessing this page.</p>
          <p className="text-gray-600 mb-6 text-center">If you haven't received a verification email, click the button below to send another one.</p>
          <button 
            onClick={() => verifyEmail()}
            disabled={loading}
            className="w-full mb-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader size="small" color="white" /> 
                <span className="ml-2">Sending...</span>
              </span>
            ) : 'Resend Verification Email'}
          </button>
          <button 
            onClick={() => logout()}
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </PageTransition>
    );
  }
  
  // If all conditions pass, render the child routes with page transition
  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  );
};

export default ProtectedRoute;
