// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFekaEG4aTfOghmItx0f4ywNaryDZtGXs",
    authDomain: "mini-project-345dc.firebaseapp.com",
    projectId: "mini-project-345dc",
    storageBucket: "mini-project-345dc.firebasestorage.app",
    messagingSenderId: "6179895694",
    appId: "1:6179895694:web:9490df1d446dc2a02d8cdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export default app;
