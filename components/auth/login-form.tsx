"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login, clearError } from "@/store/slices/auth-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Loader } from "react-icons/fa";
import { Badge } from "../ui/badge";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({
  onSwitchToRegister,
  onForgotPassword,
}: LoginFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  const loginSchema = z.object({
    email: z.string().email(t("invalid-email")),
    password: z.string().min(1, t("password-required")),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    dispatch(clearError());

    try {
      const result = await dispatch(login(data));
      if (login.fulfilled.match(result)) {
        toast.success(t("login-successful"));
        // Redirect to locale home; router base path includes locale from segment config
        router.push("/home");
      } else {
        toast.error((result.payload as string) || t("login-failed"));
      }
    } catch (error) {
      toast.error(t("unexpected-error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{t("login")}</CardTitle>
        <p className="text-muted-foreground">{t("welcome-back")}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder={t("email-placeholder")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <PasswordInput
              {...register("password")}
              placeholder={t("password-placeholder")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <p className="flex items-center gap-2">
                <Badge className="text-base bg-transparent text-white">
                  {t("sign-in")}
                </Badge>{" "}
                <Loader />
              </p>
            ) : (
              t("sign-in")
            )}
          </Button>

          <div className="text-center space-y-2">
            <div>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-primary hover:underline text-sm"
              >
                {t("dont-have-account")}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="text-primary hover:underline text-sm"
                onClick={onForgotPassword}
              >
                {t("forgot-password")}
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
