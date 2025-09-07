"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LabelAndInput from "@/components/label-and-input";
import LabelAndSelect from "@/components/label-and-select";
import { toast } from "sonner";
import ProtectedRoute from "@/components/auth/protected-route";

// Form validation schema
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// City options for Saudi Arabia
const cityOptions = [
  { label: "الرياض", value: "الرياض" },
  { label: "جدة", value: "جدة" },
  { label: "مكة المكرمة", value: "مكة المكرمة" },
  { label: "المدينة المنورة", value: "المدينة المنورة" },
  { label: "الدمام", value: "الدمام" },
  { label: "الخبر", value: "الخبر" },
  { label: "الظهران", value: "الظهران" },
  { label: "تبوك", value: "تبوك" },
  { label: "بريدة", value: "بريدة" },
  { label: "خميس مشيط", value: "خميس مشيط" },
  { label: "حائل", value: "حائل" },
  { label: "أبها", value: "أبها" },
  { label: "نجران", value: "نجران" },
  { label: "الجوف", value: "الجوف" },
  { label: "جازان", value: "جازان" },
  { label: "الباحة", value: "الباحة" },
  { label: "الحدود الشمالية", value: "الحدود الشمالية" },
];

export default function ProfilePage() {
  const t = useTranslations("profile");
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const { user, isLoading, isAuthenticated, accessToken } = useAuth();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "المملكة العربية السعودية",
      city: "",
      address: "",
    },
  });

  // Update form values when user data changes
  React.useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      console.log("Setting form values with user data:", user);
      const formData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        country: user.country || "المملكة العربية السعودية",
        city: user.city || "",
        address: user.address || "",
      };
      console.log("Form data to set:", formData);
      form.reset(formData);
    }
  }, [user, form]);

  // Debug: Log form values when they change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Debug: Log current form values
  console.log("Profile page - Current form values:", form.getValues());
  console.log("Profile page - Form errors:", form.formState.errors);
  console.log("Profile page - Current locale:", locale);
  console.log("Profile page - Is RTL:", isRTL);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would typically make an API call to update the user profile
      console.log("Profile data to update:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(t("changesSaved"));
    } catch (error) {
      toast.error(t("errorSaving"));
    }
  };

  // Debug: Log current user state
  console.log("Profile page - Current user:", user);
  console.log("Profile page - Is loading:", isLoading);
  console.log("Profile page - Is authenticated:", isAuthenticated);
  console.log("Profile page - Access token:", accessToken);
  console.log(
    "Profile page - User keys:",
    user ? Object.keys(user) : "No user"
  );

  // Log the actual user object structure
  if (user) {
    console.log(
      "Profile page - Full user object:",
      JSON.stringify(user, null, 2)
    );
    console.log("Profile page - User firstName:", user.firstName);
    console.log("Profile page - User lastName:", user.lastName);
    console.log("Profile page - User email:", user.email);
    console.log("Profile page - User phone:", user.phone);
    console.log("Profile page - User country:", user.country);
    console.log("Profile page - User city:", user.city);
    console.log("Profile page - User address:", user.address);
  }

  // Debug: Check localStorage
  if (typeof window !== "undefined") {
    console.log(
      "Profile page - localStorage accessToken:",
      !!localStorage.getItem("accessToken")
    );
    console.log(
      "Profile page - localStorage refreshToken:",
      !!localStorage.getItem("refreshToken")
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold  mb-2">
              {t("title")}
            </h1>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="">
                {t("title")}
              </CardTitle>
              <CardDescription>{t("subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <LabelAndInput
                      control={form.control}
                      fieldName="firstName"
                      labelText={t("firstName")}
                      inputPlaceholder={t("firstName")}
                      inputId="firstName"
                      containerStyle=""
                      containerColSpan=""
                      labelColSpan=""
                      inputColSpan=""
                      inputStyle="w-full"
                    />

                    {/* Last Name */}
                    <LabelAndInput
                      control={form.control}
                      fieldName="lastName"
                      labelText={t("lastName")}
                      inputPlaceholder={t("lastName")}
                      inputId="lastName"
                      containerStyle=""
                      containerColSpan=""
                      labelColSpan=""
                      inputColSpan=""
                      inputStyle="w-full"
                    />

                    {/* Email */}
                    <LabelAndInput
                      control={form.control}
                      fieldName="email"
                      labelText={t("email")}
                      inputPlaceholder={t("email")}
                      inputType="email"
                      inputId="email"
                      containerStyle=""
                      containerColSpan=""
                      labelColSpan=""
                      inputStyle="w-full"
                    />

                    {/* Phone */}
                    <LabelAndInput
                      control={form.control}
                      fieldName="phone"
                      labelText={t("phone")}
                      inputPlaceholder={t("phone")}
                      inputType="tel"
                      inputId="phone"
                      containerStyle=""
                      containerColSpan=""
                      labelColSpan=""
                      inputColSpan=""
                      inputStyle={`w-full ${isRTL ? "text-right rtl" : "text-left ltr"
                        }`}
                    />

                    {/* Country */}
                    <LabelAndInput
                      control={form.control}
                      fieldName="country"
                      labelText={t("country")}
                      inputPlaceholder={t("country")}
                      inputId="country"
                      containerStyle=""
                      containerColSpan=""
                      labelColSpan=""
                      inputColSpan=""
                      inputStyle="w-full"
                    />

                    {/* City - Select */}
                    <LabelAndSelect
                      control={form.control}
                      fieldName="city"
                      labelText={t("city")}
                      selectOptions={cityOptions}
                      containerStyle=""
                      containerColSpan=""
                      labelColSpan=""
                      selectColSpan=""
                      selectStyle={`${isRTL ? "text-right rtl" : "text-left ltr"
                        }`}
                    />
                  </div>

                  {/* Address - Full Width */}
                  <div className="col-span-full">
                    <LabelAndInput
                      control={form.control}
                      fieldName="address"
                      labelText={t("address")}
                      inputPlaceholder={t("address")}
                      inputId="address"
                      containerStyle=""
                      containerColSpan=""
                      labelColSpan=""
                      inputColSpan=""
                      inputStyle="w-full"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      className="px-8 py-3"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "جاري الحفظ..."
                        : t("saveChanges")}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
