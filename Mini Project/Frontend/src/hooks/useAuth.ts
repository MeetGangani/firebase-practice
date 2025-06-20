import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import type { FirebaseError } from 'firebase/app';

// Interface for error handling
interface AuthError {
  code: string;
  message: string;
}

// Password strength ratings
type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

// Custom hook for auth functionality
export const useAuth = () => {
  const auth = useAuthContext();
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Clear error and success messages when component unmounts or dependencies change
  useEffect(() => {
    return () => {
      setError(null);
      setSuccess(null);
    };
  }, []);

  // Register new user
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await auth.signup(email, password, name);
      setSuccess('Account created! Please verify your email address.');
      return true;
    } catch (error) {
      handleError(error as FirebaseError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Log in user
  const login = async (email: string, password: string, rememberMe = false) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await auth.login(email, password, rememberMe);
      setSuccess('Logged in successfully!');
      return true;
    } catch (error) {
      handleError(error as FirebaseError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await auth.loginWithGoogle();
      setSuccess('Logged in with Google successfully!');
      return true;
    } catch (error) {
      handleError(error as FirebaseError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Log out user
  const logout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await auth.logout();
      setSuccess('Logged out successfully!');
      return true;
    } catch (error) {
      handleError(error as FirebaseError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await auth.resetPassword(email);
      setSuccess('Password reset email sent!');
      return true;
    } catch (error) {
      handleError(error as FirebaseError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Send verification email
  const verifyEmail = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await auth.verifyEmail();
      setSuccess('Verification email sent!');
      return true;
    } catch (error) {
      handleError(error as FirebaseError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if email is verified
  const isEmailVerified = () => {
    return auth.currentUser?.emailVerified ?? false;
  };

  // Get current user
  const getCurrentUser = () => {
    return auth.currentUser;
  };

  // Check password strength
  const checkPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return 'weak';
    
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    
    const strength = 
      (password.length >= 8 ? 1 : 0) +
      (hasLowercase ? 1 : 0) +
      (hasUppercase ? 1 : 0) +
      (hasDigits ? 1 : 0) +
      (hasSpecialChars ? 1 : 0);
    
    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    if (strength === 4) return 'strong';
    return 'very-strong';
  };

  // Error handler function
  const handleError = (error: FirebaseError) => {
    console.error(error);
    const errorCode = error.code || 'unknown-error';
    let errorMessage = 'An unknown error occurred';
    
    // Map Firebase error codes to user-friendly messages
    switch (errorCode) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already in use by another account.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Sign-in popup was blocked. Please allow popups for this website.';
        break;
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign-in popup was closed before authentication was completed.';
        break;
      default:
        errorMessage = error.message || 'An unknown error occurred';
        break;
    }
    
    setError({ code: errorCode, message: errorMessage });
  };

  return {
    ...auth, // Pass through all values from AuthContext
    error,
    loading,
    success,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    verifyEmail,
    isEmailVerified,
    getCurrentUser,
    checkPasswordStrength
  };
};
