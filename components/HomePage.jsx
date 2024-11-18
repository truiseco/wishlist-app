"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Secret Santa Wishlists</h1>
          <button
            onClick={user ? logout : login}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors"
          >
            {user ? 'Sign Out' : 'Sign in with Google'}
          </button>
        </header>

        {user ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Welcome, {user.displayName}!</h2>
            <Link to="/wishlist" className="block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              View/Edit My Wishlist
            </Link>
            <Link to="/wishlists" className="block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              View All Wishlists
            </Link>
          </div>
        ) : (
          <h2 className="text-xl">Please sign in to view and edit wishlists</h2>
        )}
      </div>
    </div>
  );
}
