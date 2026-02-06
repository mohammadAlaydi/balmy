import LoginPageBalmy from "@/components/balmy/login-page-balmy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {

  const t = await getTranslations("auth");

  return {
    title: t("login") || "Login",
  };
}

export default function Page() {
  return <LoginPageBalmy />;
}
