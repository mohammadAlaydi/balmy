"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoginForm from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/en/home');
    }
  }, [isAuthenticated, router]);

  const handleSwitchToRegister = () => {
    router.push('/en/auth/register');
  };

  const handleForgotPassword = () => {
    router.push('/en/auth/forgot-password');
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <LoginForm 
          onSwitchToRegister={handleSwitchToRegister}
          onForgotPassword={handleForgotPassword}
        />
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/en')}
            className="text-primary hover:underline text-sm flex items-center gap-2 mx-auto"
          >
            <IoArrowBack className="text-sm" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
