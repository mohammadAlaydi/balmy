"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getCurrentUser, refreshToken } from '@/store/slices/auth-slice';

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Hydrate user from httpOnly cookie on app start
    dispatch(getCurrentUser());

    // Silent refresh every ~14 minutes
    const intervalId = setInterval(() => {
      dispatch(refreshToken());
    }, 14 * 60 * 1000);

    // Also attempt refresh when tab becomes visible again
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        dispatch(refreshToken());
        dispatch(getCurrentUser());
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [dispatch]);

  return null;
}