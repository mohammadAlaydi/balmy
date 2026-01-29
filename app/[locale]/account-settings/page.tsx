import AccountSettings from "@/components/AccountSettings";
import PageWrapper from "@/components/page-wrapper";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("breadcrumb");

  return {
    title: t("account-settings") || "Account Settings",
  };
}

export default function AccountSettingsPage() {
  return (
    <PageWrapper>
      <AccountSettings />
    </PageWrapper>
  );
}
