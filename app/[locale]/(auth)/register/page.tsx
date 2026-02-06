import RegisterPageBalmy from "@/components/balmy/register-page-balmy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {

  const t = await getTranslations("auth");

  return {
    title: t("register") || "Register",
  };
}

export default function Page() {
  return <RegisterPageBalmy />;
}
