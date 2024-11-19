"use client";

import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Gift, List, Sparkles } from 'lucide-react';

const TAGLINES = [
  "Because spreadsheets are so yesterday",
  "No permission requests needed",
  "Easier than a Google Sheet™",
  "For when DMs and spreadsheets just won't cut it",
  "Get giftin', girlypop",
  "For the useless men who 'don't want anything'",
  "Because some of us need more than K-pop merch",
  "No scavenger hunts required",
  "Spreadsheet-free zone",
  "Sorry Nat, spreadsheets can't do this",
  "The upgraded spreadsheet experience",
  "Where editing doesn't require permission",
];

export default function HomePage() {
  const { user, login, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Santa's Helper" 
        showBack={false}
        showTagline={true} // Only show tagline on home page
      />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-8">
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

              <div className="flex justify-center">
                <button
                  onClick={logout}
                  className="px-6 py-3 text-holiday-pine hover:text-holiday-red transition-colors duration-300 flex items-center gap-2"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-card overflow-hidden">
              {/* Decorative elements */}
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
                  Create your wishlist and spread holiday cheer with friends and family.
                </p>
                <button
                  onClick={login}
                  className="px-8 py-4 bg-holiday-green text-white rounded-lg hover:bg-holiday-pine transition-colors duration-300 flex items-center gap-2 mx-auto"
                >
                  <Gift className="w-5 h-5" />
                  Sign in with Google
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}