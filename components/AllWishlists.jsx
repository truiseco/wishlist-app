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
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">All Wishlists</h2>
      {wishlists.length > 0 ? (
        wishlists.map((wishlist) => (
          <div key={wishlist.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4">
            <h3 className="text-lg font-bold">{wishlist.userName}</h3>
            <ul className="list-disc pl-6">
              {wishlist.items.map((item) => (
                <li key={item.id} className="group">
                  <div 
                    onClick={() => item.link && window.open(item.link, '_blank')}
                    className={`flex items-center py-1 ${
                      item.link 
                        ? 'cursor-pointer hover:bg-blue-50/[0.375] rounded transition-colors duration-300' 
                        : ''
                    }`}
                  >
                    <span>{item.name} {item.price && `(${item.price})`}</span>
                    {item.link && (
                      <ExternalLink 
                        size={14} 
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-blue-500"
                      />
                    )}
                  </div>
                </li>
              ))}
              {wishlist.deliveryAddress?.street && (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-700 mb-2">Delivery Information:</h4>
      <div className="text-sm text-gray-600">
        <p>{wishlist.deliveryAddress.street}</p>
        <p>{wishlist.deliveryAddress.city}, {wishlist.deliveryAddress.state} {wishlist.deliveryAddress.zipCode}</p>
        {wishlist.deliveryAddress.specialInstructions && (
          <div className="mt-2 p-2 bg-white rounded">
            <p className="font-medium text-gray-700">Special Instructions:</p>
            <p className="text-gray-600">{wishlist.deliveryAddress.specialInstructions}</p>
          </div>
        )}
      </div>
    </div>
  )}
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







