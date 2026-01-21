"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function RegisterPageClient() {
  const t = useTranslations("auth");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const locale =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1] || "en"
      : "en";

  const handleSwitchToLogin = () => {
    router.push(`/login`);
  };

  return (
    <div className="min-h-[65vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="absolute top-4 left-4"
          >
            <FaArrowLeft className="mr-2" />
            {t("back")}
          </Button>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t("create-your-account")}
          </h2>
        </div>
        <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
      </div>
    </div>
  );
}
