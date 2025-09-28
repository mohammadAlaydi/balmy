'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/store/store';
import { register as registerAction, clearError } from '@/store/slices/auth-slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { error } = useSelector((state: RootState) => state.auth);

  const registerSchema = z
    .object({
      firstName: z.string().min(2, t("first-name-required")),
      lastName: z.string().min(2, t("last-name-required")),
      email: z.string().email(t("invalid-email")),
      password: z.string().min(8, t("password-min-length")),
      confirmPassword: z.string(),
      phone: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwords-dont-match"),
      path: ['confirmPassword'],
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    dispatch(clearError());

    try {
      // shape request for your API
      const apiData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone ?? undefined,
      };

      // if registerUser is a createAsyncThunk, unwrap to throw on error
      await dispatch(registerAction(apiData)).unwrap();

      toast.success(t("registration-successful"));
      router.push('/home');
    } catch (err: any) {
      const msg =
        typeof err === 'string'
          ? err
          : err?.message ?? t("registration-failed");
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{t("register")}</CardTitle>
        <p className="text-muted-foreground">
          {t("join-message")}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                {...register('firstName')}
                type="text"
                placeholder={t("first-name")}
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Input
                {...register('lastName')}
                type="text"
                placeholder={t("last-name")}
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder={t("email")}
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register('phone')}
              type="tel"
              placeholder={t("phone-optional")}
              autoComplete="tel"
            />
          </div>

          <div>
            <PasswordInput
              {...register('password')}
              placeholder={t("password")}
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <PasswordInput
              {...register('confirmPassword')}
              placeholder={t("confirm-password")}
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("creating-account") : t("create-account")}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:underline text-sm"
            >
              {t("already-have-account")}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
