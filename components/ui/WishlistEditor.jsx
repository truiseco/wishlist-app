"use client";

import React, { useState } from 'react';
import { wishlistService } from '@/services/wishlistService';

export default function WishlistEditor({ wishlist, onUpdate }) {
  const [items, setItems] = useState(wishlist?.items || []);
  const [newItem, setNewItem] = useState({ name: '', link: '', price: '', notes: '' });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;

    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ name: '', link: '', price: '', notes: '' });
  };

  const handleRemoveItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSave = async () => {
    await onUpdate(items);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddItem} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Link (optional)"
            value={newItem.link}
            onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Price (optional)"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={newItem.notes}
            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button 
          type="submit"
          className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Add Item
        </button>
      </form>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded shadow">
            <div>
              <h3 className="font-bold">{item.name}</h3>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Item
                </a>
              )}
              {item.price && <p className="text-gray-600">Price: {item.price}</p>}
              {item.notes && <p className="text-gray-500">{item.notes}</p>}
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button
          onClick={handleSave}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Save Wishlist
        </button>
      )}
    </div>
  );
}