import React, { useEffect, useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistService } from '@/services/wishlistService';
import PageHeader from './PageHeader';
import CollapsibleWishlistCard from './CollapsibleWishlistCard';

export default function AllWishlists() {
  const { user } = useAuth();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllWishlists();
  }, []);

  const loadAllWishlists = async () => {
    try {
      setError(null);
      const data = await wishlistService.getAllWishlists();
      setWishlists(data);
    } catch (error) {
      console.error("Error loading wishlists:", error);
      setError("Unable to load wishlists. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHeader 
          title="Secret Santa Wishlists" 
          showTagline={true}
        />
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

  if (error) {
    return (
      <div className="min-h-screen">
        <PageHeader 
          title="Secret Santa Wishlists" 
          showTagline={true}
        />
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-holiday-cream flex items-center justify-center">
                <Gift className="w-6 h-6 text-holiday-red" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-holiday-pine mb-2">Oops!</h2>
                <p className="text-gray-600">{error}</p>
              </div>
              <button
                onClick={loadAllWishlists}
                className="mt-4 px-6 py-2 bg-holiday-green text-white rounded-lg hover:bg-holiday-pine transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Secret Santa Wishlists" 
        showTagline={true}
      />
      <div className="max-w-4xl mx-auto p-8">
        {wishlists.length > 0 ? (
          <div className="space-y-8">
            {wishlists.map((wishlist, index) => (
              <div 
                key={wishlist.id}
                style={{
                  animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <CollapsibleWishlistCard 
                  wishlist={wishlist}
                  isOwnWishlist={user?.uid === wishlist.userId}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-holiday-cream flex items-center justify-center">
                  <Gift className="w-6 h-6 text-holiday-green" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-holiday-gold" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-holiday-pine mb-2">No Wishlists Yet</h2>
                <p className="text-gray-600">Be the first to create a wishlist!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}