"use client";

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';  // Add this import
import { Save, Check } from 'lucide-react';

export default function WishlistEditor({ wishlist, onUpdate }) {
  // Convert items object to array if needed
  const convertItemsToArray = (items) => {
    if (!items) return [];
    if (Array.isArray(items)) return items;
    // If items is an object with numeric keys, convert to array
    if (typeof items === 'object') {
      return Object.keys(items)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(key => items[key]);
    }
    return [];
  };

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', link: '', price: '', notes: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize items from wishlist
  useEffect(() => {
    if (wishlist?.items) {
      const initialItems = convertItemsToArray(wishlist.items);
      setItems(initialItems);
    }
  }, [wishlist]);

  const debouncedSave = useCallback((newItems) => {
    const saveItems = async () => {
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
          setTimeout(() => setIsVisible(false), 750);
        }, 1500);
      } catch (err) {
        setError('Failed to save changes. Please try again.');
        console.error('Save error:', err);
        setIsVisible(false);
      }
    };
    const timeoutId = setTimeout(saveItems, 1000);
    return () => clearTimeout(timeoutId);
  }, [onUpdate]);

  useEffect(() => {
    if (hasChanges) {
      debouncedSave(items);
    }
  }, [items, debouncedSave, hasChanges]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    
    const newItemWithId = {
      ...newItem,
      id: Date.now().toString(),
    };
    
    setItems(current => [...current, newItemWithId]);
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
    setItems(current => current.filter(item => item.id !== itemId));
    setHasChanges(true);
  };

  // Rest of your component remains the same...
  return (
    <div className="space-y-6">
      {isVisible && (
        <div 
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-750
                      ${(saving || showSuccess) ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
            {saving ? (
              <>
                <span className="text-gray-600">Saving changes...</span>
                <Save size={14} className="animate-spin text-holiday-green" />
              </>
            ) : (
              <>
                <span className="text-gray-600">Changes saved...</span>
                <Check size={14} className="text-holiday-green" />
              </>
            )}
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg">
            <h3 className="text-2xl font-semibold text-holiday-pine mb-6">Edit Item</h3>
            <form onSubmit={handleUpdateItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-holiday-pine mb-1">Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-holiday-pine mb-1">Link (optional)</label>
                <input
                  type="text"
                  value={editingItem.link || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-holiday-pine mb-1">Price (optional)</label>
                <input
                  type="text"
                  value={editingItem.price || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-holiday-pine mb-1">Notes (optional)</label>
                <textarea
                  value={editingItem.notes || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-holiday-green text-white rounded-lg hover:bg-holiday-pine transition-colors duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <form onSubmit={handleAddItem} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Link (optional)"
            value={newItem.link}
            onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Price (optional)"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={newItem.notes}
            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
            className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-holiday-green/20 focus:border-holiday-green outline-none transition-all duration-300"
          />
        </div>
        <button 
          type="submit"
          className="w-full p-3 text-white bg-holiday-green rounded-lg hover:bg-holiday-pine transition-colors duration-300 font-medium"
        >
          Add Item
        </button>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-card hover:shadow-lg transition-all duration-300">
            <div>
              <h3 className="font-medium text-holiday-pine">{item.name}</h3>
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-holiday-green hover:text-holiday-pine transition-colors duration-300"
                >
                  View Item
                </a>
              )}
              {item.price && <p className="text-gray-600 mt-1">Price: {item.price}</p>}
              {item.notes && <p className="text-gray-500 mt-1">{item.notes}</p>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEditItem(item)}
                className="p-2 text-holiday-green hover:text-holiday-pine transition-colors duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-2 text-holiday-red hover:text-red-700 transition-colors duration-300"
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

WishlistEditor.propTypes = {
  wishlist: PropTypes.shape({
    items: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ])
  }),
  onUpdate: PropTypes.func.isRequired
};

WishlistEditor.defaultProps = {
  wishlist: {
    items: []
  }
};