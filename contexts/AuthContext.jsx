"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      setError(null); // Clear any previous errors
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      // Handle specific error cases
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup - no need to show an error
        return null;
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Multiple popups were opened - no need to show an error
        return null;
      } else {
        console.error('Error signing in with Google:', error);
        setError('Unable to sign in. Please try again.');
      }
      return null;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Unable to sign out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);