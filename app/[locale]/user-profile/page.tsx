import { ProtectedRoute } from "@/components/auth/protected-route";
import PersonalInfoForm from "@/features/user-profile/personal-info-form";
import UserAddressesForm from "@/features/user-profile/user-addresses-form";
import PageWrapper from "@/components/page-wrapper";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  
  const t = await getTranslations("breadcrumb");

  return {
    title: t("user-profile") || "user profile",
  };
}
export default function page() {

  return (
    <ProtectedRoute>
      <PageWrapper>
        <div className="grid grid-cols-12 gap-5">
          {/* 🧾 Personal Info */}
          <PersonalInfoForm />
          {/* 🏠 Addresses */}
          <UserAddressesForm />
        </div>
      </PageWrapper>
    </ProtectedRoute>
  );
}
