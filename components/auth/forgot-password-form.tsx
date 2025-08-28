"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { IoArrowBack } from 'react-icons/io5';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onEmailSent: (email: string) => void;
}

export default function ForgotPasswordForm({ onBackToLogin, onEmailSent }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        toast.success('Password reset email sent! Check your inbox.');
        onEmailSent(data.email);
      } else {
        const errorData = await response.json();
        if (response.status === 404) {
          toast.error('No account found with this email address. Please check your email or create a new account.');
        } else {
          toast.error(errorData.message || 'Failed to send reset email');
        }
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      // Check if it's a network error (API endpoint doesn't exist)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('Service temporarily unavailable. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a code to reset your password.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email address"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-primary hover:underline text-sm flex items-center justify-center gap-2 mx-auto"
            >
              <IoArrowBack className="text-sm" />
              Back to Login
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
