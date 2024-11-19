"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import HomePage from '@/components/HomePage';
import WishlistApp from '@/components/WishlistApp';
import AllWishlists from '@/components/AllWishlists';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistApp />} />
          <Route path="/wishlists" element={<AllWishlists />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
