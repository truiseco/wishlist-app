"use client";

import React, { useEffect, useState } from 'react';
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
      console.error('Error loading wishlists:', error);
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
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">All Wishlists</h2>
      {wishlists.length > 0 ? (
        wishlists.map((wishlist) => (
          <div key={wishlist.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold">{wishlist.userName}</h3>
            <ul className="list-disc pl-6">
              {wishlist.items.map((item) => (
                <li key={item.id}>
                  {item.name} {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">(Link)</a>}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div>No wishlists found.</div>
      )}
      <Link to="/" className="block mt-4 text-blue-500 hover:underline">
        Back to Menu
      </Link>
    </div>
  );
}
