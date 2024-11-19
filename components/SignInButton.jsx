"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignInButton() {
  const { user, login, logout } = useAuth();

  return (
    <button
      onClick={user ? logout : login}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors"
    >
      {user ? 'Sign Out' : 'Sign in with Google'}
    </button>
  );
}