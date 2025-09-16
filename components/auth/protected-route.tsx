'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;

    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        router.push('/auth/login');
        return;
      }

      // Basic token validation (check if it's not too short)
      if (accessToken.length < 10) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/auth/login');
        return;
      }

      // If we have a valid token, allow access
      // Don't wait for Redux state to be fully loaded
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check both localStorage and Redux state
  const hasValidToken = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');
  const isReduxAuthenticated = isAuthenticated && user;

  // If we have a valid token but Redux isn't ready yet, still allow access
  if (hasValidToken && !isReduxAuthenticated && !isLoading) {
    // User has valid token but Redux state isn't loaded yet
    // This can happen during page refresh
    return <>{children}</>;
  }

  // If not authenticated in either place, redirect to login
  if (!hasValidToken && !isReduxAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
