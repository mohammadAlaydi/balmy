"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { RootState } from "@/store/store";
import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import Loading from "@/components/loading";

export default function LoginPage({ params }: { params: { locale: string } }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const t = useTranslations("auth");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  const handleSwitchToRegister = () => {
    router.push("/auth/register");
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  if (isLoading || isAuthenticated) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  return (
    <div className="min-h-[65vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("welcome-back")}
          </h1>
        </div>
        <LoginForm
          onSwitchToRegister={handleSwitchToRegister}
          onForgotPassword={handleForgotPassword}
        />
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-primary hover:underline text-sm flex items-center gap-2 mx-auto"
          >
            <IoArrowBack className="text-sm" />
            {t("back-to-home")}
          </Button>
        </div>
      </div>
    </div>
  );
}
