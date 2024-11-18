"use client";

import React, { useState, useEffect } from 'react';
import { wishlistService } from '@/services/wishlistService';
import { Save, Check, AlertCircle } from 'lucide-react';

export default function WishlistEditor({ wishlist, onUpdate }) {
  const [items, setItems] = useState(wishlist?.items || []);
  const [newItem, setNewItem] = useState({ name: '', link: '', price: '', notes: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedSave = React.useCallback(
    debounce(async (newItems) => {
      try {
        setSaving(true);
        setIsVisible(true);
        setError(null);
        await onUpdate(newItems);
        setHasChanges(false);
        setSaving(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setTimeout(() => setIsVisible(false), 750); // Wait for fade out to complete
        }, 1500);
      } catch (err) {
        setError('Failed to save changes. Please try again.');
        console.error('Save error:', err);
        setIsVisible(false);
      }
    }, 1000),
    [onUpdate]
  );
  
  useEffect(() => {
    if (items !== wishlist?.items && hasChanges) {
      debouncedSave(items);
    }
  }, [items, wishlist?.items, debouncedSave, hasChanges]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
  
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ name: '', link: '', price: '', notes: '' });
    setHasChanges(true);
  };

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const updatedItems = items.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    setItems(updatedItems);
    setEditingItem(null);
    setHasChanges(true);
  };

  const handleRemoveItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
    setHasChanges(true);
  };

  if (editingItem) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-bold mb-4">Edit Item</h3>
          <form onSubmit={handleUpdateItem} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Link (optional)</label>
              <input
                type="text"
                value={editingItem.link || ''}
                onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (optional)</label>
              <input
                type="text"
                value={editingItem.price || ''}
                onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
              <textarea
                value={editingItem.notes || ''}
                onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
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
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isVisible && (
        <div 
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-750
                      ${(saving || showSuccess) ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
            {saving ? (
              <>
                <span className="text-gray-600">Saving changes...</span>
                <Save size={14} className="animate-spin text-blue-500" />
              </>
            ) : (
              <>
                <span className="text-gray-600">Changes saved...</span>
                <Check size={14} className="text-green-500" />
              </>
            )}
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-lg shadow-lg px-4 py-2 text-red-600 flex items-center gap-2">
            <AlertCircle size={14} />
            {error}
          </div>
        </div>
      )}
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
            <div className="flex gap-2">
              <button
                onClick={() => handleEditItem(item)}
                className="p-2 text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}