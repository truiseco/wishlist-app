"use client";

import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { wishlistService } from '@/services/wishlistService';
import { Link } from 'react-router-dom';

export default function AllWishlists() {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllWishlists();
  }, []);

  const loadAllWishlists = async () => {
    try {
      const data = await wishlistService.getAllWishlists();
      setWishlists(data);
    } catch (error) {
      console.error("Error loading wishlists:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-holiday-pine text-center mb-8">
        Secret Santa Wishlists
      </h2>
      {wishlists.length > 0 ? (
        <div className="space-y-6">
          {wishlists.map((wishlist) => (
            <div key={wishlist.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium text-holiday-red mb-4">
                {`${wishlist.userName}'s Wishlist`}
              </h3>
              <ul className="space-y-3">
                {wishlist.items.map((item) => (
                  <li key={item.id} className="group">
                    <div 
                      onClick={() => item.link && window.open(item.link, "_blank")}
                      className={`flex items-center py-2 px-3 rounded-lg ${
                        item.link 
                          ? "cursor-pointer hover:bg-holiday-green/5 transition-colors duration-300" 
                          : ""
                      }`}
                    >
                      <span className="text-holiday-pine">{item.name} {item.price && `(${item.price})`}</span>
                      {item.link && (
                        <ExternalLink 
                          size={14} 
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-holiday-green"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
          <p className="text-gray-600">No wishlists found.</p>
        </div>
      )}
      <Link 
        to="/" 
        className="block w-full max-w-xs mx-auto mt-8 px-6 py-3 text-center bg-holiday-green text-white rounded-lg hover:bg-holiday-pine transition-colors duration-300"
      >
        Back to Menu
      </Link>
    </div>
  );
}