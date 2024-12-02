"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Gift, List, Sparkles, LogIn, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const { user, login, error } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await login();
      if (!result) {
        // User cancelled or login failed silently - do nothing
        return;
      }
    } catch (error) {
      // Any uncaught errors will be handled by AuthContext
      console.log('Login attempted');
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Top Secret Santa" 
        showBack={false}
        showTagline={true}
      />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-8">
          {error && (
            <div className="bg-holiday-red/10 text-holiday-red rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {user ? (
            <>
              <div className="text-center space-y-3 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card">
                <h2 className="text-2xl font-medium text-holiday-pine">
                  Welcome, {user.displayName}! 
                  <span className="inline-block ml-2 animate-bounce">🎄</span>
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Link 
                  to="/wishlist" 
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                    <div className="absolute inset-0 bg-holiday-red/10 rotate-12 transform group-hover:rotate-45 transition-transform duration-300"></div>
                  </div>
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-3">
                      <Gift className="w-6 h-6 text-holiday-red" />
                      <h3 className="text-xl font-medium text-holiday-pine">Your Wishlist</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-holiday-green transition-colors duration-300">
                      Create and manage your gift wishlist
                    </p>
                  </div>
                </Link>

                <Link 
                  to="/wishlists" 
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                    <div className="absolute inset-0 bg-holiday-green/10 rotate-12 transform group-hover:rotate-45 transition-transform duration-300"></div>
                  </div>
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-3">
                      <List className="w-6 h-6 text-holiday-green" />
                      <h3 className="text-xl font-medium text-holiday-pine">All Wishlists</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-holiday-green transition-colors duration-300">
                      Browse everyone&apos;s wishlists
                    </p>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-card overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                  <div className="absolute inset-0 bg-holiday-red/10 rotate-12"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 transform -translate-x-16 translate-y-16">
                  <div className="absolute inset-0 bg-holiday-green/10 -rotate-12"></div>
                </div>

                <div className="relative text-center space-y-6">
                  <div className="flex justify-center">
                    <Sparkles className="w-12 h-12 text-holiday-gold animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-semibold text-holiday-pine">
                    Welcome to Secret Santa!
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Browse everyone&apos;s wishlists below, or sign in to create your own!
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <button
                  onClick={handleLogin}
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                    <div className="absolute inset-0 bg-holiday-red/10 rotate-12 transform group-hover:rotate-45 transition-transform duration-300"></div>
                  </div>
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-3">
                      <LogIn className="w-6 h-6 text-holiday-red" />
                      <h3 className="text-xl font-medium text-holiday-pine">Create a Wishlist</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-holiday-green transition-colors duration-300">
                      Sign in to create your own wishlist
                    </p>
                  </div>
                </button>

                <Link 
                  to="/wishlists" 
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                    <div className="absolute inset-0 bg-holiday-green/10 rotate-12 transform group-hover:rotate-45 transition-transform duration-300"></div>
                  </div>
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-3">
                      <List className="w-6 h-6 text-holiday-green" />
                      <h3 className="text-xl font-medium text-holiday-pine">Browse Wishlists</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-holiday-green transition-colors duration-300">
                      See what everyone wants
                    </p>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}