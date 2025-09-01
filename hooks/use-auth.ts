import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getCurrentUser, refreshToken } from '@/store/features/auth-slice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  // Note: getCurrentUser is now handled by AuthInitializer component
  // This useEffect was causing duplicate calls and conflicts
  // useEffect(() => {
  //   // Only run on client side
  //   if (typeof window === 'undefined') return;
  //   
  //   // Check if user is authenticated on mount
  //   if (auth.accessToken && !auth.user) {
  //     dispatch(getCurrentUser());
  //   }
  // }, [dispatch, auth.accessToken, auth.user]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Set up automatic token refresh
    if (auth.refreshToken) {
      const refreshInterval = setInterval(() => {
        dispatch(refreshToken());
      }, 14 * 60 * 1000); // Refresh every 14 minutes (tokens expire in 15 minutes)

      return () => clearInterval(refreshInterval);
    }
  }, [dispatch, auth.refreshToken]);

  return auth;
};
