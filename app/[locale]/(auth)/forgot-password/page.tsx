import ForgotPasswordPageClient from "@/features/auth/forgot-password/forgot-password-page-client";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  
  const t = await getTranslations("auth");

  return {
    title: t("forgot-password") || "Forgot Password",
  };
}

export default function Page() {
  return <ForgotPasswordPageClient />;
}
