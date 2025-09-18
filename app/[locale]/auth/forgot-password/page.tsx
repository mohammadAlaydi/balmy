"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import ResetCodeForm from "@/components/auth/reset-code-form";
import NewPasswordForm from "@/components/auth/new-password-form";

type ForgotPasswordView = "forgot-password" | "reset-code" | "new-password";

export default function ForgotPasswordPage() {

  const [currentView, setCurrentView] =
    useState<ForgotPasswordView>("forgot-password");
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const router = useRouter();

  const handleEmailSent = (userEmail: string) => {
    setEmail(userEmail);
    setCurrentView("reset-code");
  };

  const handleCodeVerified = (code: string) => {
    setResetCode(code);
    setCurrentView("new-password");
  };

  const handlePasswordReset = () => {
    // Redirect to login page after successful password reset
    router.push("/en/auth/login");
  };

  const handleBackToLogin = () => {
    router.push("/en/auth/login");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onBackToLogin={handleBackToLogin}
            onEmailSent={handleEmailSent}
          />
        );
      case "reset-code":
        return (
          <ResetCodeForm
            email={email}
            onBackToForgotPassword={() => setCurrentView("forgot-password")}
            onCodeVerified={handleCodeVerified}
          />
        );
      case "new-password":
        return (
          <NewPasswordForm
            email={email}
            code={resetCode}
            onBackToCodeVerification={() => setCurrentView("reset-code")}
            onPasswordReset={handlePasswordReset}
          />
        );
      default:
        return (
          <ForgotPasswordForm
            onBackToLogin={handleBackToLogin}
            onEmailSent={handleEmailSent}
          />
        );
    }
  };

  return (
    <div className="min-h-[65vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Password Recovery
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Follow the steps to reset your password
          </p>
        </div>

        {renderCurrentView()}
      </div>
    </div>
  );
}
