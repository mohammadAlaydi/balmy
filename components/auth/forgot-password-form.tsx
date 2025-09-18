"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onEmailSent: (email: string) => void;
}

export default function ForgotPasswordForm({
  onBackToLogin,
  onEmailSent,
}: ForgotPasswordFormProps) {

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://envaglo-erp.envaglo.net';

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
      const response = await fetch(`${API_BASE_URL}/v1/customer/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to send reset code");
        return;
      }

      toast.success(result.message || "Reset code sent successfully");
      onEmailSent(result.email || data.email);
    } catch (error) {
      console.error(error); // good for debugging (silent in prod if needed)
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <p className="text-muted-foreground">
          Enter your email address and we&apos;ll send you a code to reset your
          password.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email address"
              className={errors.email ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Code"}
          </Button>

          {/* Back to Login Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="cursor-pointer text-primary hover:underline text-sm flex items-center justify-center gap-2 mx-auto"
              disabled={isLoading}
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
