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

const resetCodeSchema = z.object({
  code: z.string().min(6, 'Please enter the 6-digit code').max(6, 'Please enter the 6-digit code'),
});

type ResetCodeFormData = z.infer<typeof resetCodeSchema>;

interface ResetCodeFormProps {
  email: string;
  onBackToForgotPassword: () => void;
  onCodeVerified: (code: string) => void;
}

export default function ResetCodeForm({ email, onBackToForgotPassword, onCodeVerified }: ResetCodeFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetCodeFormData>({
    resolver: zodResolver(resetCodeSchema),
  });

  const onSubmit = async (data: ResetCodeFormData) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          code: data.code 
        }),
      });

      if (response.ok) {
        toast.success('Code verified successfully!');
        onCodeVerified(data.code);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Invalid code');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Enter Reset Code</CardTitle>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Check your email and enter the code below
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('code')}
              type="text"
              placeholder="Enter 6-digit code"
              className={errors.code ? 'border-red-500' : ''}
              maxLength={6}
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={onBackToForgotPassword}
              className="text-primary hover:underline text-sm flex items-center justify-center gap-2 mx-auto"
            >
              <IoArrowBack className="text-sm" />
              Back to Forgot Password
            </button>
            
            <div className="text-sm text-muted-foreground">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  // TODO: Implement resend functionality
                  toast.info('Resend functionality coming soon');
                }}
              >
                Resend
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
