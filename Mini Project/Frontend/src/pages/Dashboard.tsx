import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Dashboard = () => {
  const { currentUser, logout, isEmailVerified } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Verify the user is logged in
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Verify email is verified
    if (!isEmailVerified()) {
      // Handle in ProtectedRoute component
    }
    
    setIsLoading(false);
  }, [currentUser, isEmailVerified, navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate('/login');
  };

  if (isLoading) {
    return <Loader fullScreen text="Loading your dashboard..." />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.h1 
                className="text-2xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                AuthFlow
              </motion.h1>
            </div>
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <span className="flex items-center">
                    <Loader size="small" color="white" />
                    <span className="ml-2">Logging out...</span>
                  </span>
                ) : "Logout"}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div 
            className="bg-white shadow overflow-hidden sm:rounded-lg"
            variants={cardVariants}
          >
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your personal account details.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <motion.div 
                  className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  variants={cardVariants}
                >
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentUser?.displayName || 'N/A'}
                  </dd>
                </motion.div>
                <motion.div 
                  className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  variants={cardVariants}
                >
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentUser?.email || 'N/A'}
                  </dd>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  variants={cardVariants}
                >
                  <dt className="text-sm font-medium text-gray-500">Email verified</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {isEmailVerified() ? (
                      <motion.span 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Verified
                      </motion.span>
                    ) : (
                      <motion.span 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Not verified
                      </motion.span>
                    )}
                  </dd>
                </motion.div>
                <motion.div 
                  className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  variants={cardVariants}
                >
                  <dt className="text-sm font-medium text-gray-500">Account created</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentUser?.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleString() : 'N/A'}
                  </dd>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  variants={cardVariants}
                >
                  <dt className="text-sm font-medium text-gray-500">Last sign in</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentUser?.metadata.lastSignInTime ? new Date(currentUser.metadata.lastSignInTime).toLocaleString() : 'N/A'}
                  </dd>
                </motion.div>
              </dl>
            </div>
          </motion.div>

          {/* Additional Content Cards */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Activity Card */}
            <motion.div
              className="bg-white overflow-hidden shadow rounded-lg"
              variants={cardVariants}
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Your account activity will be shown here.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Settings Card */}
            <motion.div
              className="bg-white overflow-hidden shadow rounded-lg"
              variants={cardVariants}
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Manage your account preferences and settings.
                  </p>
                  <button 
                    className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Settings
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Help & Support Card */}
            <motion.div
              className="bg-white overflow-hidden shadow rounded-lg"
              variants={cardVariants}
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Help & Support</h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Need help? Contact our support team.
                  </p>
                  <button 
                    className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Get Help
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
