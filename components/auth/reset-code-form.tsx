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
  code: z.string().min(1, 'Please enter the reset code'),
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
      // Since your external API doesn't have a separate verify endpoint,
      // we'll just validate the code format and proceed to the next step
      if (data.code.trim().length > 0) {
        toast.success('Code accepted! Please set your new password.');
        onCodeVerified(data.code);
      } else {
        toast.error('Please enter a valid reset code');
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
          We've sent a reset code to <span className="font-medium">{email}</span>
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
              placeholder="Enter reset code"
              className={errors.code ? 'border-red-500' : ''}
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
            {isLoading ? 'Verifying...' : 'Continue'}
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
                  // TODO: Implement resend functionality using forgotPassword action
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
