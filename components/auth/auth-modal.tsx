"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaRegUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ForgotPasswordForm from "./forgot-password-form";
import ResetCodeForm from "./reset-code-form";
import NewPasswordForm from "./new-password-form";

type AuthView =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-code"
  | "new-password";

interface AuthModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAuthenticated?: () => void; // called after successful login
}

export default function AuthModal({
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  onAuthenticated,
}: AuthModalProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnOpenChange || setInternalIsOpen;

  const handleSwitchToRegister = () => {
    setCurrentView("register");
  };

  const handleSwitchToLogin = () => {
    setCurrentView("login");
  };

  const handleSwitchToForgotPassword = () => {
    setCurrentView("forgot-password");
  };

  const handleEmailSent = (userEmail: string) => {
    setEmail(userEmail);
    setCurrentView("reset-code");
  };

  const handleCodeVerified = (code: string) => {
    setResetCode(code);
    setCurrentView("new-password");
  };

  const handlePasswordReset = () => {
    setCurrentView("login");
    setEmail("");
    setResetCode("");
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset to login form when closing
    setCurrentView("login");
    setEmail("");
    setResetCode("");
  };

  const getModalTitle = () => {
    switch (currentView) {
      case "login":
        return "Sign In";
      case "register":
        return "Create Account";
      case "forgot-password":
        return "Forgot Password";
      case "reset-code":
        return "Enter Reset Code";
      case "new-password":
        return "Set New Password";
      default:
        return "Authentication";
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onForgotPassword={handleSwitchToForgotPassword}
            onLoginSuccess={() => {
              // close and reset modal, then notify parent
              setIsOpen(false);
              setCurrentView("login");
              setEmail("");
              setResetCode("");
              onAuthenticated && onAuthenticated();
            }}
          />
        );
      case "register":
        return <RegisterForm onSwitchToLogin={handleSwitchToLogin} />;
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onBackToLogin={handleSwitchToLogin}
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
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onForgotPassword={handleSwitchToForgotPassword}
          />
        );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-transparent  overflow-hidden border-none shadow-none h-fit"
      >
        <DialogTitle className="sr-only">{getModalTitle()}</DialogTitle>
        <motion.div
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.2,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
