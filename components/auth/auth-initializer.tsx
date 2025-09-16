"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getCurrentUser, initializeFromStorage } from '@/store/slices/auth-slice';

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const initializeAuth = async () => {
      // Check for stored tokens on app initialization
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (accessToken && refreshToken) {
        // First initialize the store with stored tokens
        dispatch(initializeFromStorage());
        
        // Wait a bit for the store to be ready, then get user data
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Then get the current user data
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch (error) {
          console.warn('Failed to get user data on initialization:', error);
          // Don't clear tokens on initialization failure
          // User can still access protected routes with valid tokens
          // This is especially important since backend doesn't support refresh tokens
        }
      }
    };
    
    initializeAuth();
  }, [dispatch]);

  // This component doesn't render anything
  return null;
}