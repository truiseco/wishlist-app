"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user, login, logout } = useAuth();

  return (
    <div className="min-h-screen p-4">
  <div className="max-w-6xl mx-auto text-center space-y-8">
    <header className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft p-6">
      <h1 className="text-4xl font-semibold text-holiday-pine">
        Secret Santa 
        <span className="text-holiday-red">Wishlist</span>
      </h1>
      <button
        onClick={user ? logout : login}
        className="px-6 py-3 font-medium text-white bg-holiday-green rounded-lg hover:bg-holiday-pine transition-colors duration-300 shadow-sm"
      >
        {user ? 'Sign Out' : 'Sign in with Google'}
      </button>
    </header>

    {user ? (
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-holiday-pine">
          Welcome, {user.displayName}!
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link 
            to="/wishlist" 
            className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-card hover:shadow-lg transition-all duration-300 group"
          >
            <h3 className="text-xl font-medium text-holiday-pine mb-2">Your Wishlist</h3>
            <p className="text-gray-600 group-hover:text-holiday-green transition-colors duration-300">
              View and edit your gift wishlist
            </p>
          </Link>
          <Link 
            to="/wishlists" 
            className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-card hover:shadow-lg transition-all duration-300 group"
          >
            <h3 className="text-xl font-medium text-holiday-pine mb-2">All Wishlists</h3>
            <p className="text-gray-600 group-hover:text-holiday-green transition-colors duration-300">
              Browse everyone's wishlists
            </p>
          </Link>
        </div>
      </div>
    ) : (
      <div className="p-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
        <h2 className="text-2xl text-holiday-pine">Please sign in to view and edit wishlists</h2>
      </div>
    )}
  </div>
</div>
  );
}
