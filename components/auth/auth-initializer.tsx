"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getCurrentUser, initializeFromStorage } from '@/store/features/auth-slice';

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Add a small delay to ensure Redux store is ready
    const timer = setTimeout(() => {
      // Check for stored tokens on app initialization
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (accessToken && refreshToken) {
        console.log('AuthInitializer: Found stored tokens, initializing...');
        // First initialize the store with stored tokens
        dispatch(initializeFromStorage());
        // Then get the current user data
        dispatch(getCurrentUser());
      } else {
        console.log('AuthInitializer: No stored tokens found');
      }
    }, 100); // Small delay to ensure store is ready
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  // This component doesn't render anything
  return null;
}
