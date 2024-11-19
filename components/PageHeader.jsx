"use client";

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PageHeader({ title, showBack = true }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-soft mb-8 rounded-xl">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {showBack && (
              <button
                onClick={() => navigate('/')}
                className="p-2 text-holiday-pine hover:text-holiday-green transition-colors duration-300 rounded-lg hover:bg-holiday-green/10"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-2xl font-semibold text-holiday-pine truncate">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-holiday-red animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-holiday-green animate-pulse [animation-delay:150ms]" />
            <div className="w-3 h-3 rounded-full bg-holiday-gold animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool
};