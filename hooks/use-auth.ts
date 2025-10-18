import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getCurrentUser, refreshToken } from '@/store/slices/auth-slice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  // Note: Authentication initialization and token refresh are now handled by AuthInitializer component
  // This hook is kept for backward compatibility and to provide auth state to components

  return auth;
};