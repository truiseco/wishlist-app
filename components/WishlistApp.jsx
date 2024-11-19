import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistService } from '@/services/wishlistService';
import WishlistEditor from './WishlistEditor';
import WishlistDetails from './WishlistDetails';
import PageHeader from './PageHeader';

export default function WishlistApp() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWishlist = useCallback(async () => {
    if (!user) return;
    try {
      const data = await wishlistService.getWishlist(user.uid);
      setWishlist(data);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleCreateWishlist = async () => {
    try {
      await wishlistService.createWishlist(user.uid, {
        email: user.email,
        displayName: user.displayName
      });
      await loadWishlist();
    } catch (error) {
      console.error("Error creating wishlist:", error);
    }
  };

  const handleUpdateWishlist = async (items) => {
    try {
      await wishlistService.updateWishlist(user.uid, {
        items,
        userEmail: user.email,
        userName: user.displayName
      });
      await loadWishlist();
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleUpdateDetails = async (details) => {
    try {
      await wishlistService.updateWishlistDetails(user.uid, details);
      await loadWishlist();
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  if (!user) {
    return (
      <div className="min-h-screen">
        <PageHeader title="My Wishlist" />
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
            <h2 className="text-xl text-holiday-pine">Please sign in to view and edit your wishlist</h2>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHeader title="My Wishlist" />
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex justify-center items-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-holiday-red animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-holiday-green animate-bounce [animation-delay:150ms]" />
              <div className="w-2 h-2 rounded-full bg-holiday-gold animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="min-h-screen">
        <PageHeader title="My Wishlist" />
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center space-y-4 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
            <h2 className="text-2xl font-bold text-holiday-pine">Welcome to Secret Santa!</h2>
            <p className="text-gray-600">Looks like this is your first time here. Would you like to create your wishlist?</p>
            <button
              onClick={handleCreateWishlist}
              className="px-6 py-3 bg-holiday-green text-white rounded-lg hover:bg-holiday-pine transition-colors"
            >
              Create My Wishlist
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="My Wishlist" />
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-8">
          <WishlistDetails 
            wishlist={wishlist}
            onUpdate={handleUpdateDetails}
          />
          <WishlistEditor 
            wishlist={wishlist}
            onUpdate={handleUpdateWishlist}
          />
        </div>
      </div>
    </div>
  );
}