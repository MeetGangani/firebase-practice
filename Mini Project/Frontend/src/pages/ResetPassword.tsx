import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const ResetPassword = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  // Handle successful password reset request
  const handleResetSuccess = () => {
    // Redirect to login page after password reset email is sent
    setTimeout(() => {
      navigate('/login');
    }, 3000); // Give the user time to read the success message
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          AuthFlow
        </h1>
        <h2 className="mt-2 text-center text-xl text-gray-600">
          Reset your password
        </h2>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm mode="reset" onSuccess={handleResetSuccess} />
        
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-md font-medium text-gray-800">Instructions:</h3>
          <p className="text-sm text-gray-600 mt-2">
            Enter the email address associated with your account, and we'll send you a link to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
