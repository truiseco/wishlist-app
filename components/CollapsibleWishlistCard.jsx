import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ExternalLink, Gift, Sparkles } from 'lucide-react';

export default function CollapsibleWishlistCard({ wishlist }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('115px');
  
  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setContentHeight(isExpanded ? `${scrollHeight}px` : '115px');
    }
  }, [isExpanded, wishlist.items]);

  

  // Format the display name to show only first name and capitalize first letter
  const formatDisplayName = (userName) => {
    if (!userName) return '';
    // Get the first name by splitting on space and taking first part
    const firstName = userName.split(' ')[0];
    // Capitalize first letter and ensure rest is lowercase
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 z-10">
        <div className="absolute inset-0 bg-holiday-red/5 rotate-12"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 transform -translate-x-16 translate-y-16 z-10">
        <div className="absolute inset-0 bg-holiday-green/5 -rotate-12"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 p-6 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-holiday-cream flex items-center justify-center overflow-hidden">
                <Gift className="w-6 h-6 text-holiday-green" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-holiday-gold" />
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-holiday-pine group-hover:text-holiday-green transition-colors duration-300">
                {formatDisplayName(wishlist.userName)}
              </h3>
              <p className="text-sm text-gray-600">
                {wishlist.items.length} items
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20">
        {/* Main Content with smooth height transition */}
        <div 
          ref={contentRef}
          className="px-6 space-y-2 transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
          style={{ 
            height: contentHeight,
            overflow: 'hidden'
          }}
        >
          {wishlist.items.map((item) => (
            <div
              key={item.id}
              className="group/item hover:bg-holiday-green/5 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center justify-between py-2 px-3">
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="font-medium text-holiday-pine truncate">
                    {item.name}
                  </span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 text-holiday-green" />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {item.notes && (
                    <span className="text-sm text-gray-500 italic">
                      ({item.notes})
                    </span>
                  )}
                  {item.price && (
                    <span className="text-sm text-holiday-green font-medium">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse Controls */}
        <div className={`relative ${isExpanded ? 'pt-2 pb-1' : 'pt-0'}`}>
          {isExpanded ? (
            // Collapse button for expanded state
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full h-8 group/collapse"
              aria-label="Show less"
            >
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-holiday-green/20 via-holiday-green/5 to-transparent opacity-25 transition-opacity duration-1000 group-hover/collapse:opacity-100 rounded-b-xl" />
              <ChevronDown 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-holiday-pine transform transition-transform duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] rotate-180`}
              />
            </button>
          ) : (
            // Expand button for collapsed state
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute bottom-0 inset-x-0 h-12 group/expand"
              aria-label="Show more"
            >
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent rounded-b-xl" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-holiday-green/20 via-holiday-green/5 to-transparent opacity-25 transition-opacity duration-1000 group-hover/expand:opacity-100 rounded-b-xl" />
              <ChevronDown 
                className={`absolute left-1/2 bottom-2 -translate-x-1/2 w-5 h-5 text-holiday-pine transform transition-transform duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}