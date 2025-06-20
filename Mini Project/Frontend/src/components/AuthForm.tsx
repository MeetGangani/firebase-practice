import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';

// Define form modes
type FormMode = 'login' | 'signup' | 'reset';

// Define props
interface AuthFormProps {
  mode: FormMode;
  onSuccess?: () => void;
}

// Define form schema types
type LoginFormValues = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ResetFormValues = {
  email: string;
};

// Form animations
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const { login, signup, resetPassword, loginWithGoogle, loading, error, success, checkPasswordStrength } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Define validation schemas based on form mode
  const loginSchema = z.object({
    email: z.string().email('Valid email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional()
  });

  const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Valid email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password')
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const resetSchema = z.object({
    email: z.string().email('Valid email is required')
  });

  // Login form handling
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  // Signup form handling
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  });

  // Reset form handling
  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema)
  });

  // Watch password for strength indicator
  const watchPassword = mode === 'signup' ? 
    signupForm.watch('password') as string : '';

  // Update password strength indicator
  useEffect(() => {
    if (mode === 'signup' && watchPassword) {
      const strength = checkPasswordStrength(watchPassword);
      setPasswordStrength(strength);
    }
  }, [mode, watchPassword, checkPasswordStrength]);

  // Form submission handler
  const handleSubmit = async (data: any) => {
    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(data.email, data.password, data.rememberMe || false);
      } else if (mode === 'signup') {
        success = await signup(data.email, data.password, data.name);
      } else {
        success = await resetPassword(data.email);
      }
      
      if (success && onSuccess) onSuccess();
    } catch (err) {
      console.error('Error in form submission:', err);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const success = await loginWithGoogle();
      if (success && onSuccess) onSuccess();
    } catch (err) {
      console.error('Error with Google sign in:', err);
    }
  };

  // Get the title based on mode
  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Log In';
      case 'signup': return 'Create Account';
      case 'reset': return 'Reset Password';
    }
  };

  // Render password strength indicator
  const renderPasswordStrength = () => {
    if (mode !== 'signup' || !watchPassword) return null;
    
    const getStrengthColor = () => {
      switch (passwordStrength) {
        case 'weak': return 'bg-red-500';
        case 'medium': return 'bg-yellow-500';
        case 'strong': return 'bg-green-500';
        case 'very-strong': return 'bg-green-700';
        default: return 'bg-gray-200';
      }
    };
    
    const getStrengthLabel = () => {
      return passwordStrength ? passwordStrength.replace('-', ' ') : '';
    };

    return (
      <motion.div 
        variants={itemVariants}
        className="mb-4"
      >
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${getStrengthColor()}`} 
            initial={{ width: '0%' }}
            animate={{ 
              width: passwordStrength === 'weak' ? '25%' :
                     passwordStrength === 'medium' ? '50%' :
                     passwordStrength === 'strong' ? '75%' :
                     passwordStrength === 'very-strong' ? '100%' : '0%'
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Password strength: <span className="font-medium">{getStrengthLabel()}</span>
        </p>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="auth-form p-6 bg-white rounded shadow-md max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={formVariants}
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-bold mb-6"
      >
        {getTitle()}
      </motion.h2>
      
      {/* Display error message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-4"
          >
            <p className="text-red-700">{error.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Display success message */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-4"
          >
            <p className="text-green-700">{success}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={
        mode === 'login' 
          ? loginForm.handleSubmit(handleSubmit) 
          : mode === 'signup' 
          ? signupForm.handleSubmit(handleSubmit) 
          : resetForm.handleSubmit(handleSubmit)
      }>
        {/* Name field - only for signup */}
        {mode === 'signup' && (
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              {...signupForm.register('name')}
              disabled={loading}
            />
            {signupForm.formState.errors.name && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {signupForm.formState.errors.name.message as string}
              </motion.p>
            )}
          </motion.div>
        )}
        
        {/* Email field - for all modes */}
        <motion.div variants={itemVariants} className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            disabled={loading}
            {...(mode === 'login' 
                ? loginForm.register('email') 
                : mode === 'signup' 
                ? signupForm.register('email') 
                : resetForm.register('email'))}
          />
          {mode === 'login' && loginForm.formState.errors.email && 
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {loginForm.formState.errors.email.message as string}
            </motion.p>
          }
          {mode === 'signup' && signupForm.formState.errors.email && 
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {signupForm.formState.errors.email.message as string}
            </motion.p>
          }
          {mode === 'reset' && resetForm.formState.errors.email && 
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {resetForm.formState.errors.email.message as string}
            </motion.p>
          }
        </motion.div>
        
        {/* Password field - for login and signup */}
        {(mode === 'login' || mode === 'signup') && (
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={mode === 'signup' ? "Create a password" : "Enter your password"}
                disabled={loading}
                {...(mode === 'login' 
                    ? loginForm.register('password') 
                    : mode === 'signup' 
                    ? signupForm.register('password') 
                    : loginForm.register('password'))}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {mode === 'login' && loginForm.formState.errors.password && 
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {loginForm.formState.errors.password.message as string}
              </motion.p>
            }
            {mode === 'signup' && signupForm.formState.errors.password && 
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {signupForm.formState.errors.password.message as string}
              </motion.p>
            }
            {mode === 'signup' && renderPasswordStrength()}
          </motion.div>
        )}
        
        {/* Remember me checkbox - only for login */}
        {mode === 'login' && (
          <motion.div variants={itemVariants} className="mb-4 flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              {...loginForm.register('rememberMe')}
              disabled={loading}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </motion.div>
        )}
        
        {/* Confirm Password field - only for signup */}
        {mode === 'signup' && (
          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              {...signupForm.register('confirmPassword')}
              disabled={loading}
            />
            {signupForm.formState.errors.confirmPassword && 
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {signupForm.formState.errors.confirmPassword.message as string}
              </motion.p>
            }
          </motion.div>
        )}
        
        {/* Submit button */}
        <motion.button 
          variants={itemVariants}
          type="submit" 
          disabled={loading}
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader size="small" color="white" />
              <span className="ml-2">Processing...</span>
            </span>
          ) : getTitle()}
        </motion.button>
      </form>
      
      {/* Google Sign In - only for login and signup */}
      {(mode === 'login' || mode === 'signup') && (
        <>
          <motion.div 
            variants={itemVariants}
            className="my-4 flex items-center"
          >
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </motion.div>
          
          <motion.button 
            variants={itemVariants}
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full border border-gray-300 p-2 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0S12.1 2.38 7.74 6.25l6.85 6.85C17.29 10.72 20.46 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span>{loading && mode === 'login' ? 'Signing in...' : 
                  loading && mode === 'signup' ? 'Signing up...' : 
                  mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
          </motion.button>
        </>
      )}
      
      {/* Navigation links */}
      <motion.div 
        variants={itemVariants}
        className="mt-4 text-center"
      >
        {mode === 'login' && (
          <>
            <Link to="/reset-password" className="text-blue-500 hover:underline mt-2 inline-block">Forgot password?</Link>
            <div className="mt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </div>
          </>
        )}
        
        {mode === 'signup' && (
          <div>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
          </div>
        )}
        
        {mode === 'reset' && (
          <div>
            Remember your password?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;
