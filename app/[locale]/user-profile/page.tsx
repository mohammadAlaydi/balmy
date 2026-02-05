import { ProtectedRoute } from "@/components/auth/protected-route";
import ProfileInfoForm from "@/components/user-profile/profile-info-form";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("breadcrumb");

  return {
    title: t("user-profile") || "User Profile",
  };
}

export default function UserProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileInfoForm />
    </ProtectedRoute>
  );
}
