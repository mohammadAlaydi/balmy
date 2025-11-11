import LoginPageClient from "../../../../features/auth/login/login-page-client";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  
  const t = await getTranslations("auth");

  return {
    title: t("login") || "Login",
  };
}

export default function Page() {
  return <LoginPageClient />;
}
