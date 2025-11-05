import { ProtectedRoute } from "@/components/auth/protected-route";
import PersonalInfoForm from "@/features/user-profile/personal-info-form";
import UserAddressesForm from "@/features/user-profile/user-addresses-form";
import PageWrapper from "@/components/page-wrapper";

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
