"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getCurrentUser, refreshToken } from '@/store/slices/auth-slice';

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let refreshIntervalId: NodeJS.Timeout;

    const initializeAuth = async () => {
      // First, try to get current user to check if we're authenticated
      const result = await dispatch(getCurrentUser());
      
      // If getCurrentUser failed, try to refresh token
      if (getCurrentUser.rejected.match(result)) {
        console.log('getCurrentUser failed, attempting token refresh...');
        await dispatch(refreshToken());
        
        // After refresh, try to get user again
        await dispatch(getCurrentUser());
      }

      // Set up automatic token refresh every 14 minutes
      refreshIntervalId = setInterval(async () => {
        console.log('Performing scheduled token refresh...');
        const refreshResult = await dispatch(refreshToken());
        
        // If refresh fails, try to get current user to see if we're still authenticated
        if (refreshToken.rejected.match(refreshResult)) {
          console.log('Scheduled refresh failed, checking authentication status...');
          await dispatch(getCurrentUser());
        }
      }, 14 * 60 * 1000); // Refresh every 14 minutes
    };

    // Also attempt refresh when tab becomes visible again
    const onVisibility = async () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab became visible, checking authentication...');
        await dispatch(refreshToken());
        await dispatch(getCurrentUser());
      }
    };

    // Initialize auth
    initializeAuth();
    
    // Add visibility change listener
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
      }
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [dispatch]);

  return null;
}