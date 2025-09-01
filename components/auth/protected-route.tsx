"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, accessToken } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'ar';
  
  // Debug logging
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - isLoading:', isLoading);
  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - accessToken:', !!accessToken);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login or show fallback
      if (fallback) {
        return;
      }
      // You can redirect to login page here if you have one
      // router.push('/login');
    }
  }, [isAuthenticated, isLoading, router, fallback]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <FaLock className="h-6 w-6" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <p className="text-muted-foreground">
              You need to be logged in to access this page.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Link href={`/${locale}/auth/login`}>
              <Button className="w-full bg-navy-blue-color hover:bg-navy-blue-color/90 text-white px-8 py-3">
                Log In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
