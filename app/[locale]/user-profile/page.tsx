// // "use client";

// // import React from "react";
// // import { useTranslations } from "next-intl";
// // import { useParams } from "next/navigation";
// // import { useForm, FormProvider, useFieldArray } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import * as z from "zod";
// // import { useAuth } from "@/hooks/use-auth";
// // import { useDispatch } from "react-redux";
// // import { AppDispatch } from "@/store/store";
// // import { getCurrentUser } from "@/store/slices/auth-slice";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import LabelAndInput from "@/components/label-and-input";
// // import toast from "react-hot-toast";
// // import { ProtectedRoute } from "@/components/auth/protected-route";
// // import { Plus } from "lucide-react";
// // import { MdDeleteSweep } from "react-icons/md";
// // import { apiService } from "@/lib/api-service";

// // // ✅ Updated validation schema
// // const profileSchema = z.object({
// //   first_name: z.string().min(1, "validation.first-name-required"),
// //   last_name: z.string().min(1, "validation.last-name-required"),
// //   email: z.string().email("validation.invalid-email"),
// //   phone: z.string().min(1, "validation.phone-required"),
// //   addresses: z
// //     .array(
// //       z.object({
// //         address1: z.string().min(1, "validation.address-required"),
// //         city: z.string().min(1, "validation.city-required"),
// //         country: z.string().min(1, "validation.country-required"),
// //       })
// //     )
// //     .min(1, "validation.at-least-one-address"),
// // });

// // type ProfileFormData = z.infer<typeof profileSchema>;

// // export default function Page() {

// //   const t = useTranslations("profile");
// //   const t2 = useTranslations("buttons")
// //   const params = useParams();
// //   const locale = params.locale as string;
// //   const isRTL = locale === "ar";
// //   const { user, isAuthenticated } = useAuth();
// //   const dispatch = useDispatch<AppDispatch>();

// //   const form = useForm<ProfileFormData>({
// //     resolver: zodResolver(profileSchema),
// //     defaultValues: {
// //       first_name: "",
// //       last_name: "",
// //       email: "",
// //       phone: "",
// //       addresses: [{ address1: "", city: "", country: "" }],
// //     },
// //   });

// //   const { control, reset } = form;
// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "addresses",
// //   });

// //   React.useEffect(() => {
// //     if (isAuthenticated && !user) {
// //       dispatch(getCurrentUser());
// //     }
// //   }, [dispatch, isAuthenticated, user]);

// //   React.useEffect(() => {
// //     if (user && Object.keys(user).length > 0) {
// //       // Map API addresses to form addresses
// //       const mappedAddresses =
// //         user.addresses && user.addresses.length > 0
// //           ? user.addresses.map((addr) => ({
// //               id: addr.id,
// //               address: addr.address1 || "",
// //               city: addr.city || "",
// //               country: addr.country || "Saudi Arabia",
// //               is_default: addr.is_default || false,
// //             }))
// //           : [
// //               {
// //                 address1: "",
// //                 city: "",
// //                 country: "",
// //               },
// //             ];

// //       const formData = {
// //         first_name: user.first_name || "",
// //         last_name: user.last_name || "",
// //         email: user.email || "",
// //         phone: user.phone || "",
// //         addresses: mappedAddresses,
// //       };

// //       console.log("Setting form data:", formData);
// //       reset(formData);
// //     }
// //   }, [user, reset]);

// //   const onSubmit = async (data: ProfileFormData) => {
// //     try {
// //       console.log("Submitting form data:", data);

// //       const submitData = {
// //         first_name: data.first_name,
// //         last_name: data.last_name,
// //         email: data.email,
// //         phone: data.phone,
// //         addresses: data.addresses.map((addr) => ({
// //           address1: addr.address,
// //           city: addr.city,
// //           country: addr.country,
// //         })),
// //       };
// //       await apiService.updateCustomerProfile(submitData);
// //       toast.success(t("changesSaved"));
// //       dispatch(getCurrentUser());
// //     } catch (error) {
// //       toast.error(t("errorSaving"));
// //     }
// //   };

// //   return (
// //     <ProtectedRoute>
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-4xl mx-auto">
// //           <div className="mb-8 text-center">
// //             <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
// //             <p className="text-gray-600">{t("subtitle")}</p>
// //           </div>
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>{t("title")}</CardTitle>
// //               <CardDescription>{t("subtitle")}</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <FormProvider {...form}>
// //                 <form
// //                   onSubmit={form.handleSubmit(onSubmit)}
// //                   className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
// //                 >
// //                   {/* Personal Information */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <LabelAndInput
// //                       control={form.control}
// //                       fieldName="first_name"
// //                       labelText={t("first-name")}
// //                       inputPlaceholder={t("first-name")}
// //                       inputId="first_name"
// //                       inputStyle="w-full"
// //                     />
// //                     <LabelAndInput
// //                       control={form.control}
// //                       fieldName="last_name"
// //                       labelText={t("last-name")}
// //                       inputPlaceholder={t("last-name")}
// //                       inputId="last_name"
// //                       inputStyle="w-full"
// //                     />
// //                     <LabelAndInput
// //                       control={form.control}
// //                       fieldName="email"
// //                       labelText={t("email")}
// //                       inputPlaceholder={t("email")}
// //                       inputType="email"
// //                       inputId="email"
// //                       inputStyle="w-full"
// //                     />
// //                     <LabelAndInput
// //                       control={form.control}
// //                       fieldName="phone"
// //                       labelText={t("phone")}
// //                       inputPlaceholder={t("phone")}
// //                       inputType="tel"
// //                       inputId="phone"
// //                       inputStyle={`w-full ${
// //                         isRTL ? "text-right" : "text-left"
// //                       }`}
// //                     />
// //                   </div>

// //                   <hr />

// //                   {/* ✅ Address Field Array */}
// //                   <div className="space-y-4">
// //                     <div className="flex items-center justify-between">
// //                       <h3 className="text-lg font-semibold">
// //                         {t("addresses")}
// //                       </h3>
// //                       <Button
// //                         type="button"
// //                         variant="outline"
// //                         onClick={() =>
// //                           append({
// //                             address1: "",
// //                             city: "",
// //                             country: "",
// //                           })
// //                         }
// //                       >
// //                         <Plus className="w-4 h-4 mr-2" />
// //                         {t("add-address")}
// //                       </Button>
// //                     </div>

// //                     {fields.map((field, index) => (
// //                       <div
// //                         key={field.id}
// //                         className="border p-4 rounded-lg space-y-4"
// //                       >
// //                         <div className="flex items-center justify-between">
// //                           <div className="flex items-center gap-2">
// //                             {/* Set as default button */}
// //                             <Button
// //                               type="button"
// //                               variant="destructive"
// //                               size="sm"
// //                               onClick={() => remove(index)}
// //                               disabled={fields.length === 1}
// //                             >
// //                               <MdDeleteSweep className="w-4 h-4" />
// //                             </Button>
// //                           </div>
// //                         </div>

// //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                           <LabelAndInput
// //                             control={form.control}
// //                             fieldName={`addresses.${index}.address1`}
// //                             labelText={t("address")}
// //                             inputPlaceholder={t("address")}
// //                             inputId={`address-${index}`}
// //                             inputStyle="w-full"
// //                           />
// //                           <LabelAndInput
// //                             control={form.control}
// //                             fieldName={`addresses.${index}.city`}
// //                             labelText={t("city")}
// //                             inputStyle={`${isRTL ? "text-right" : "text-left"}`}
// //                           />
// //                           <LabelAndInput
// //                             control={form.control}
// //                             fieldName={`addresses.${index}.country`}
// //                             labelText={t("country")}
// //                             inputPlaceholder={t("country")}
// //                             inputId={`country-${index}`}
// //                             inputStyle="w-full"
// //                             readOnly
// //                           />
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   {/* Submit Button */}
// //                   <div className="flex justify-center pt-6">
// //                     <Button
// //                       type="submit"
// //                       className="px-8 py-3"
// //                       disabled={form.formState.isSubmitting}
// //                     >
// //                       {form.formState.isSubmitting
// //                         ? t("saving")
// //                         : t("save-changes")}
// //                     </Button>
// //                   </div>
// //                 </form>
// //               </FormProvider>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </ProtectedRoute>
// //   );
// // }
// "use client";

// import React from "react";
// import { useTranslations } from "next-intl";
// import { useParams } from "next/navigation";
// import { useForm, FormProvider, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useAuth } from "@/hooks/use-auth";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/store/store";
// import { getCurrentUser } from "@/store/slices/auth-slice";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import LabelAndInput from "@/components/label-and-input";
// import toast from "react-hot-toast";
// import { ProtectedRoute } from "@/components/auth/protected-route";
// import { Plus } from "lucide-react";
// import { MdDeleteSweep } from "react-icons/md";
// import { apiService } from "@/lib/api-service";

// // validation schema expects address1 (matches backend)
// const profileSchema = z.object({
//   first_name: z.string().min(1, "validation.first-name-required"),
//   last_name: z.string().min(1, "validation.last-name-required"),
//   email: z.string().email("validation.invalid-email"),
//   phone: z.string().min(1, "validation.phone-required"),
//   addresses: z
//     .array(
//       z.object({
//         address1: z.string().min(1, "validation.address-required"),
//         city: z.string().min(1, "validation.city-required"),
//         country: z.string().min(1, "validation.country-required"),
//       })
//     )
//     .min(1, "validation.at-least-one-address"),
// });

// type ProfileFormData = z.infer<typeof profileSchema>;

// export default function Page() {
//   const t = useTranslations("profile");
//   const params = useParams();
//   const locale = params.locale as string;
//   const isRTL = locale === "ar";
//   const { user, isAuthenticated } = useAuth();
//   const dispatch = useDispatch<AppDispatch>();

//   const form = useForm<ProfileFormData>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone: "",
//       addresses: [{ address1: "", city: "", country: "" }],
//     },
//   });

//   const { control, reset } = form;
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "addresses",
//   });

//   React.useEffect(() => {
//     if (isAuthenticated && !user) {
//       dispatch(getCurrentUser());
//     }
//   }, [dispatch, isAuthenticated, user]);

//   React.useEffect(() => {
//     if (user && Object.keys(user).length > 0) {
//       // Map API addresses to form addresses
//       const mappedAddresses =
//         user.addresses && user.addresses.length > 0
//           ? user.addresses.map((addr: any) => ({
//               id: addr.id,
//               address1: addr.address1 || "",
//               city: addr.city || "",
//               country: addr.country || "Saudi Arabia",
//             }))
//           : [
//               {
//                 address1: "",
//                 city: "",
//                 country: "",
//               },
//             ];

//       const formData = {
//         first_name: user.first_name || "",
//         last_name: user.last_name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         addresses: mappedAddresses,
//       };

//       console.log("Setting form data:", formData);
//       reset(formData);
//     }
//   }, [user, reset]);

//   console.log(user , "❤️❤️")
//   const onSubmit = async (data: ProfileFormData) => {
//     try {
//       console.log("Submitting form data:", data);

//       const submitData = {
//         first_name: data.first_name,
//         last_name: data.last_name,
//         email: data.email,
//         phone: data.phone,
//         gender: "Male",
//         addresses: data.addresses.map((addr) => ({
//           address1: addr.address1,
//           city: addr.city,
//           country: addr.country,
//         })),
//       };

//       await apiService.updateCustomerProfile(submitData);
//       toast.success(t("changesSaved"));
//       // refresh user from store
//       dispatch(getCurrentUser());
//     } catch (error: any) {
//       // show backend message if available
//       toast.error(error);
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
//             <p className="text-gray-600">{t("subtitle")}</p>
//           </div>
//           <Card>
//             <CardHeader>
//               <CardTitle>{t("title")}</CardTitle>
//               <CardDescription>{t("subtitle")}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <FormProvider {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
//                 >
//                   {/* Personal Information */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <LabelAndInput
//                       control={form.control}
//                       fieldName="first_name"
//                       labelText={t("first-name")}
//                       inputPlaceholder={t("first-name")}
//                       inputId="first_name"
//                       inputStyle="w-full"
//                     />
//                     <LabelAndInput
//                       control={form.control}
//                       fieldName="last_name"
//                       labelText={t("last-name")}
//                       inputPlaceholder={t("last-name")}
//                       inputId="last_name"
//                       inputStyle="w-full"
//                     />
//                     <LabelAndInput
//                       control={form.control}
//                       fieldName="email"
//                       labelText={t("email")}
//                       inputPlaceholder={t("email")}
//                       inputType="email"
//                       inputId="email"
//                       inputStyle="w-full"
//                     />
//                     <LabelAndInput
//                       control={form.control}
//                       fieldName="phone"
//                       labelText={t("phone")}
//                       inputPlaceholder={t("phone")}
//                       inputType="tel"
//                       inputId="phone"
//                       inputStyle={`w-full ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                     />
//                   </div>

//                   <hr />

//                   {/* Address Field Array */}
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-semibold">{t("addresses")}</h3>
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() =>
//                           append({
//                             address1: "",
//                             city: "",
//                             country: "",
//                           })
//                         }
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         {t("add-address")}
//                       </Button>
//                     </div>

//                     {fields.map((field, index) => (
//                       <div
//                         key={field.id}
//                         className="border p-4 rounded-lg space-y-4"
//                       >
//                         <div className="flex items-center justify-between">
//                           <h4 className="font-medium">
//                             {t("address")} {t("number")} {index + 1}
//                             {/* is_default label */}
//                             {/* @ts-ignore */}
//                             {field.is_default && (
//                               <span className="ml-2 text-sm text-green-600">
//                                 ({t("default")})
//                               </span>
//                             )}
//                           </h4>
//                           <div className="flex items-center gap-2">
//                             <Button
//                               type="button"
//                               variant="destructive"
//                               size="sm"
//                               onClick={() => remove(index)}
//                               disabled={fields.length === 1}
//                             >
//                               <MdDeleteSweep className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <LabelAndInput
//                             control={form.control}
//                             fieldName={`addresses.${index}.address1`}
//                             labelText={t("address")}
//                             inputPlaceholder={t("address")}
//                             inputId={`address-${index}`}
//                             inputStyle="w-full"
//                           />
//                           <LabelAndInput
//                             control={form.control}
//                             fieldName={`addresses.${index}.city`}
//                             labelText={t("city")}
//                             inputStyle={`${isRTL ? "text-right" : "text-left"}`}
//                           />
//                           <LabelAndInput
//                             control={form.control}
//                             fieldName={`addresses.${index}.country`}
//                             labelText={t("country")}
//                             inputPlaceholder={t("country")}
//                             inputId={`country-${index}`}
//                             inputStyle="w-full"
//                             readOnly
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="flex justify-center pt-6">
//                     <Button
//                       type="submit"
//                       className="px-8 py-3"
//                       disabled={form.formState.isSubmitting}
//                     >
//                       {form.formState.isSubmitting ? t("saving") : t("save-changes")}
//                     </Button>
//                   </div>
//                 </form>
//               </FormProvider>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
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
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Plus } from "lucide-react";
import { MdDeleteSweep } from "react-icons/md";
import { apiService } from "@/lib/api-service";

// ✅ Validation schema that matches backend
const profileSchema = z.object({
  first_name: z.string().min(1, "validation.first-name-required"),
  last_name: z.string().min(1, "validation.last-name-required"),
  email: z.string().email("validation.invalid-email"),
  phone: z.string().min(1, "validation.phone-required"),
  addresses: z
    .array(
      z.object({
        address1: z.string().min(1, "validation.address-required"),
        city: z.string().min(1, "validation.city-required"),
        country: z.string().min(1, "validation.country-required"),
      })
    )
    .min(1, "validation.at-least-one-address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Page() {
  const t = useTranslations("profile");
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      addresses: [{ address1: "", city: "", country: "Egypt" }],
    },
  });

  const { control, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  // 🔄 Load user data into form
  React.useEffect(() => {
    if (isAuthenticated && !user) dispatch(getCurrentUser());
  }, [dispatch, isAuthenticated, user]);

  React.useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      const mappedAddresses = user.addresses?.map((addr: any) => ({
        address1: addr.address1 || "",
        city: addr.city || "",
        country: addr.country || "",
      })) || [{ address1: "", city: "", country: "" }];

      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        addresses: mappedAddresses,
      });
    }
  }, [user, reset]);
  console.log(user);

  // ✅ Submit handler
  const onSubmit = async (data: ProfileFormData) => {
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        gender: "Male",
        addresses: data.addresses.map((a) => ({
          address1: a.address1,
          city: a.city,
          country: a.country,
        })),
      };

      console.log("🚀 Payload sent to backend:", payload);

      const response = await apiService.updateCustomerProfile(payload);
      console.log("✅ Server response:", response);

      toast.success(t("changesSaved"));
      dispatch(getCurrentUser());
    } catch (error: any) {
      console.error("❌ Profile update failed:", error);
      toast.error(error.message || t("errorSaving"));
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("title")}</CardTitle>
              <CardDescription>{t("subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
                >
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabelAndInput
                      control={form.control}
                      fieldName="first_name"
                      labelText={t("first-name")}
                      inputPlaceholder={t("first-name")}
                      inputId="first_name"
                      inputStyle="w-full"
                    />
                    <LabelAndInput
                      control={form.control}
                      fieldName="last_name"
                      labelText={t("last-name")}
                      inputPlaceholder={t("last-name")}
                      inputId="last_name"
                      inputStyle="w-full"
                    />
                    <LabelAndInput
                      control={form.control}
                      fieldName="email"
                      labelText={t("email")}
                      inputPlaceholder={t("email")}
                      inputType="email"
                      inputId="email"
                      inputStyle="w-full"
                    />
                    <LabelAndInput
                      control={form.control}
                      fieldName="phone"
                      labelText={t("phone")}
                      inputPlaceholder={t("phone")}
                      inputType="tel"
                      inputId="phone"
                      inputStyle={`w-full ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    />
                  </div>

                  <hr />

                  {/* Addresses */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {t("addresses")}
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          append({ address1: "", city: "", country: "Egypt" })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {t("add-address")}
                      </Button>
                    </div>

                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border p-4 rounded-lg space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            {t("address")} #{index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <MdDeleteSweep className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <LabelAndInput
                            control={form.control}
                            fieldName={`addresses.${index}.address1`}
                            labelText={t("address")}
                            inputPlaceholder={t("address")}
                          />
                          <LabelAndInput
                            control={form.control}
                            fieldName={`addresses.${index}.city`}
                            labelText={t("city")}
                          />
                          <LabelAndInput
                            control={form.control}
                            fieldName={`addresses.${index}.country`}
                            labelText={t("country")}
                            readOnly
                          />
                        </div>
                      </div>
                    ))}
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
