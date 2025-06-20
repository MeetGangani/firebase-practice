import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

// Define interface for auth context value
interface AuthContextValue {
  currentUser: User | null;
  loading: boolean;
  authStateLoading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authStateLoading, setAuthStateLoading] = useState(true);

  // Register a new user
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      await updateProfile(userCredential.user, { displayName: name });
      // Send email verification
      await sendEmailVerification(userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login existing user
  const login = async (email: string, password: string, rememberMe: boolean) => {
    setLoading(true);
    try {
      if (rememberMe) {
        // Persist auth state
        await setPersistence(auth, browserLocalPersistence);
      } else {
        // Clear when browser closes
        await setPersistence(auth, browserSessionPersistence);
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Send email verification
  const verifyEmail = async () => {
    setLoading(true);
    try {
      if (currentUser) {
        await sendEmailVerification(currentUser);
      } else {
        throw new Error('No user is logged in');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    setAuthStateLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthStateLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    authStateLoading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!authStateLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
