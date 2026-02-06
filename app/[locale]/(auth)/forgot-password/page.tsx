import ForgotPasswordPageBalmy from "@/components/balmy/forgot-password-page-balmy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {

  const t = await getTranslations("auth");

  return {
    title: t("forgot-password") || "Forgot Password",
  };
}

export default function Page() {
  return <ForgotPasswordPageBalmy />;
}
