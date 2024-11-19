"use client";

import React from 'react';
import PropTypes from 'prop-types';  // Add this import
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

Providers.propTypes = {
  children: PropTypes.node.isRequired
};