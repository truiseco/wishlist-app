import React, { useEffect, useState } from 'react';
import { ExternalLink, Gift, Sparkles } from 'lucide-react';
import { wishlistService } from '@/services/wishlistService';
import PageHeader from './PageHeader';

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
      <div className="min-h-screen">
        <PageHeader 
          title="Wishlists" 
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

  return (
    <div className="min-h-screen">
      <PageHeader 
          title="Wishlists" 
          showTagline={true}
        />
      <div className="max-w-4xl mx-auto p-8">
        {wishlists.length > 0 ? (
          <div className="space-y-6">
            {wishlists.map((wishlist, index) => (
              <div 
                key={wishlist.id} 
                className="relative group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300"
                style={{
                  animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 transition-transform duration-300 group-hover:rotate-12">
                  <Sparkles className="w-5 h-5 text-holiday-gold" />
                </div>
                <div className="absolute -bottom-2 -left-2 transition-transform duration-300 group-hover:-rotate-12">
                  <Gift className="w-5 h-5 text-holiday-red" />
                </div>

                <h3 className="text-xl font-medium text-holiday-red mb-4 group-hover:text-holiday-pine transition-colors duration-300">
                  {`${wishlist.userName}'s Wishlist`}
                </h3>
                
                <ul className="space-y-3">
                  {wishlist.items.map((item) => (
                    <li key={item.id} className="group/item">
                      <div 
                        onClick={() => item.link && window.open(item.link, "_blank")}
                        className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                          item.link 
                            ? "cursor-pointer hover:bg-holiday-green/5 transition-all duration-300" 
                            : ""
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-holiday-pine font-medium">
                            {item.name}
                          </span>
                          {item.price && (
                            <p className="text-sm text-gray-600">
                              {item.price}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-sm text-gray-500 italic">
                              {item.notes}
                            </p>
                          )}
                        </div>
                        {item.link && (
                          <ExternalLink 
                            size={14} 
                            className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 text-holiday-green"
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
            <p className="text-gray-600">No wishlists found yet! Be the first to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}