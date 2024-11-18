"use client";

import React, { useState } from 'react';

export default function WishlistDetails({ wishlist, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    deliveryAddress: wishlist.deliveryAddress || {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      specialInstructions: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(details);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">Delivery Details</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        {wishlist.deliveryAddress?.street ? (
          <div className="space-y-2">
            <p>{wishlist.deliveryAddress.street}</p>
            <p>
              {wishlist.deliveryAddress.city}, {wishlist.deliveryAddress.state} {wishlist.deliveryAddress.zipCode}
            </p>
            {wishlist.deliveryAddress.specialInstructions && (
              <div className="mt-4">
                <p className="font-medium">Special Instructions:</p>
                <p className="text-gray-600">{wishlist.deliveryAddress.specialInstructions}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic">No delivery address provided</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Edit Delivery Details</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            value={details.deliveryAddress.street}
            onChange={(e) => setDetails({
              ...details,
              deliveryAddress: {
                ...details.deliveryAddress,
                street: e.target.value
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={details.deliveryAddress.city}
              onChange={(e) => setDetails({
                ...details,
                deliveryAddress: {
                  ...details.deliveryAddress,
                  city: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              value={details.deliveryAddress.state}
              onChange={(e) => setDetails({
                ...details,
                deliveryAddress: {
                  ...details.deliveryAddress,
                  state: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              value={details.deliveryAddress.zipCode}
              onChange={(e) => setDetails({
                ...details,
                deliveryAddress: {
                  ...details.deliveryAddress,
                  zipCode: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
          <textarea
            value={details.deliveryAddress.specialInstructions}
            onChange={(e) => setDetails({
              ...details,
              deliveryAddress: {
                ...details.deliveryAddress,
                specialInstructions: e.target.value
              }
            })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            placeholder="Any special delivery instructions..."
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}