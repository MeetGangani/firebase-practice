import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const Register = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  // Handle successful registration
  const handleRegisterSuccess = () => {
    // Redirect to login page after successful registration
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          AuthFlow
        </h1>
        <h2 className="mt-2 text-center text-xl text-gray-600">
          Create your account
        </h2>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm mode="signup" onSuccess={handleRegisterSuccess} />
      </div>
    </div>
  );
};

export default Register;
