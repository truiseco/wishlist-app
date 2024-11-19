"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistService } from '@/services/wishlistService';
import WishlistEditor from './WishlistEditor';
import { Link } from 'react-router-dom';
import WishlistDetails from '../WishlistDetails';

export default function WishlistApp() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define loadWishlist directly as a memoized callback
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
      <div className="text-center p-8">
        <h2 className="text-xl">Please sign in to view and edit wishlists</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="text-center space-y-4 p-8">
        <h2 className="text-2xl font-bold">Welcome to Secret Santa!</h2>
        <p className="text-gray-600">Looks like this is your first time here. Would you like to create your wishlist?</p>
        <button
          onClick={handleCreateWishlist}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Create My Wishlist
        </button>
        <Link to="/" className="block mt-4 text-blue-500 hover:underline">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WishlistDetails 
        wishlist={wishlist}
        onUpdate={handleUpdateDetails}
      />
      <WishlistEditor 
        wishlist={wishlist}
        onUpdate={handleUpdateWishlist}
      />
      <Link to="/" className="block mt-4 text-blue-500 hover:underline">
        Back to Menu
      </Link>
    </div>
  );
}