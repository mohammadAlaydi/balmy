"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getCurrentUser } from "@/store/slices/auth-slice";
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
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/auth/protected-route";

// Form validation schema
const profileSchema = z.object({
  firstName: z.string().min(1, "validation.first-name-required"),
  lastName: z.string().min(1, "validation.last-name-required"),
  email: z.string().email("validation.invalid-email"),
  phone: z.string().min(1, "validation.phone-required"),
  country: z.string().min(1, "validation.country-required"),
  city: z.string().min(1, "validation.city-required"),
  address: z.string().min(1, "validation.address-required"),
  gender: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// City options for Saudi Arabia - will be populated with translations
const getCityOptions = (t: any) => [
  { label: t("cities.riyadh"), value: "riyadh" },
  { label: t("cities.jeddah"), value: "jeddah" },
  { label: t("cities.makkah"), value: "makkah" },
  { label: t("cities.madinah"), value: "madinah" },
  { label: t("cities.dammam"), value: "dammam" },
  { label: t("cities.khobar"), value: "khobar" },
  { label: t("cities.dhahran"), value: "dhahran" },
  { label: t("cities.tabuk"), value: "tabuk" },
  { label: t("cities.buraidah"), value: "buraidah" },
  { label: t("cities.khamis-mushait"), value: "khamis-mushait" },
  { label: t("cities.hail"), value: "hail" },
  { label: t("cities.abha"), value: "abha" },
  { label: t("cities.najran"), value: "najran" },
  { label: t("cities.jazan"), value: "jazan" },
  { label: t("cities.yanbu"), value: "yanbu" },
  { label: t("cities.taif"), value: "taif" },
  { label: t("cities.qatif"), value: "qatif" },
  { label: t("cities.hafar-al-batin"), value: "hafar-al-batin" },
  { label: t("cities.jubail"), value: "jubail" },
  { label: t("cities.al-kharj"), value: "al-kharj" },
];

// Gender options
const getGenderOptions = (t: any) => [
  { label: t("gender.male"), value: "male" },
  { label: t("gender.female"), value: "female" },
  { label: t("gender.other"), value: "other" },
];

export default function page() {
  const t = useTranslations("profile");
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const { user, isLoading, isAuthenticated, accessToken } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "Saudi Arabia",
      city: "",
      address: "",
      gender: "",
    },
  });

  // Load user data when component mounts
  React.useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, user]);

  // Update form values when user data changes
  React.useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      const formData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        country: "Saudi Arabia", // Default country
        city: "", // Not provided in API response
        address: "", // Not provided in API response
        gender: "", // Not provided in API response
      };
      form.reset(formData);
    }
  }, [user, form]);


  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would typically make an API call to update the user profile
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(t("changesSaved"));
    } catch (error) {
      toast.error(t("errorSaving"));
    }
  };


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
                      labelText={t("first-name")}
                      inputPlaceholder={t("first-name")}
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
                      labelText={t("last-name")}
                      inputPlaceholder={t("last-name")}
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
                      selectOptions={getCityOptions(t)}
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
                        ? t("saving")
                        : t("save-changes")}
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
