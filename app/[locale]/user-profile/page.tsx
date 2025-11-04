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
// // import LabelAndInput from "@/components/form-components/label-and-input";
// // import toast from "react-hot-toast";
// // import { ProtectedRoute } from "@/components/auth/protected-route";
// // import { Plus } from "lucide-react";
// // import { MdDeleteSweep } from "react-icons/md";
// // import { FaRegSave } from "react-icons/fa";
// // import { apiService } from "@/lib/api-service";

// // // ✅ Validation Schemas
// // const personalInfoSchema = z.object({
// //   first_name: z.string().min(1, "validation.first-name-required"),
// //   last_name: z.string().min(1, "validation.last-name-required"),
// //   email: z.string().email("validation.invalid-email"),
// //   phone: z.string().min(1, "validation.phone-required"),
// // });

// // const addressSchema = z.object({
// //   address_id: z.number().nullable().optional(),
// //   address1: z.string().min(1, "validation.address-required"),
// //   city: z.string().min(1, "validation.city-required"),
// //   country: z.string().min(1, "validation.country-required"),
// // });

// // const addressesSchema = z.object({
// //   addresses: z.array(addressSchema).min(1, "validation.at-least-one-address"),
// // });

// // type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
// // type AddressesFormData = z.infer<typeof addressesSchema>;

// // export default function ProfilePage() {
// //   const t = useTranslations("profile");
// //   const params = useParams();
// //   const locale = params.locale as string;
// //   const isRTL = locale === "ar";
// //   const { user, isAuthenticated } = useAuth();
// //   const dispatch = useDispatch<AppDispatch>();

// //   // 🧾 Personal Info Form
// //   const personalForm = useForm<PersonalInfoFormData>({
// //     resolver: zodResolver(personalInfoSchema),
// //     defaultValues: {
// //       first_name: "",
// //       last_name: "",
// //       email: "",
// //       phone: "",
// //     },
// //   });

// //   // 🏠 Addresses Form
// //   const addressForm = useForm<AddressesFormData>({
// //     resolver: zodResolver(addressesSchema),
// //     defaultValues: {
// //       address1: "",
// //       city: "",
// //       country: "",
// //     },
// //   });

// //   const { control, handleSubmit: handleAddressesSubmit } = addressForm;
// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "addresses",
// //   });

// //   // 🔄 Fetch user
// //   React.useEffect(() => {
// //     if (isAuthenticated && !user) {
// //       dispatch(getCurrentUser());
// //     }
// //   }, [dispatch, isAuthenticated, user]);

// //   // ✅ Populate forms when user data loads
// //   React.useEffect(() => {
// //     if (user && Object.keys(user).length > 0) {
// //       personalForm.reset({
// //         first_name: user.first_name || "",
// //         last_name: user.last_name || "",
// //         email: user.email || "",
// //         phone: user.phone || "",
// //       });

// //       addressForm.reset({
// //         addresses: user.addresses?.map((a: any) => ({
// //           address_id: a.id,
// //           address1: a.address1 || "",
// //           city: a.city || "",
// //           country: a.country || "Egypt",
// //         })) || [{ address1: "", city: "", country: "Egypt" }],
// //       });
// //     }
// //   }, [user, personalForm, addressForm]);

// //   // ✅ Handle Personal Info Submit
// //   const handlePersonalSubmit = async (data: PersonalInfoFormData) => {
// //     try {
// //       const response = await apiService.updateCustomerProfile(data);
// //       if (response.success) {
// //         toast.success(t("changesSaved"));
// //         dispatch(getCurrentUser());
// //       } else {
// //         toast.error(response.message || t("errorSaving"));
// //       }
// //     } catch (err: any) {
// //       toast.error(err.message || t("errorSaving"));
// //     }
// //   };

// //   // ✅ Add new address (local only)
// //   const handleAddAddress = () => {
// //     append({
// //       address_id: null,
// //       address1: "",
// //       city: "",
// //       country: "Egypt",
// //     });
// //   };

// //   // ✅ Save single address (PUT or POST)
// //   const handleEditAddress = async (index: number) => {
// //     const address = addressForm.getValues(`addresses.${index}`);

// //     try {
// //       const method = address.address_id ? "PUT" : "POST";
// //       const url = address.address_id
// //         ? `/api/customer/addresses/${address.address_id}`
// //         : `/api/customer/addresses`;

// //       const res = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(address),
// //       });

// //       const data = await res.json();

// //       if (data.success) {
// //         toast.success(
// //           address.address_id ? t("addressUpdated") : t("addressAdded")
// //         );
// //         dispatch(getCurrentUser());
// //       } else {
// //         toast.error(data.message || t("updateFailed"));
// //       }
// //     } catch (err: any) {
// //       toast.error(err.message || t("errorUpdating"));
// //     }
// //   };

// //   // ✅ Delete address
// //   const handleDeleteAddress = async (
// //     index: number,
// //     addressId: number | null | undefined
// //   ) => {
// //     if (!addressId) {
// //       remove(index);
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`/api/customer/addresses/${addressId}`, {
// //         method: "DELETE",
// //       });

// //       const data = await res.json();
// //       if (data.success) {
// //         toast.success(t("addressDeleted"));
// //         remove(index);
// //         dispatch(getCurrentUser());
// //       } else {
// //         toast.error(data.message || t("deleteFailed"));
// //       }
// //     } catch (err: any) {
// //       toast.error(err.message || t("errorDeleting"));
// //     }
// //   };

// //   // ✅ Handle all addresses submit
// //   const handleAddressesSubmitAction = async (data: AddressesFormData) => {
// //     try {
// //       for (const addr of data.addresses) {
// //         const method = addr.address_id ? "PUT" : "POST";
// //         const url = addr.address_id
// //           ? `/api/customer/addresses/${addr.address_id}`
// //           : `/api/customer/addresses`;

// //         await fetch(url, {
// //           method,
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(addr),
// //         });
// //       }
// //       toast.success(t("changesSaved"));
// //       dispatch(getCurrentUser());
// //     } catch (err: any) {
// //       toast.error(err.message || t("errorSaving"));
// //     }
// //   };

// //   return (
// //     <ProtectedRoute>
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-4xl mx-auto space-y-10">
// //           {/* 🧾 Personal Info */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>{t("personal-info")}</CardTitle>
// //               <CardDescription>{t("subtitle")}</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <FormProvider {...personalForm}>
// //                 <form
// //                   onSubmit={personalForm.handleSubmit(handlePersonalSubmit)}
// //                   className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
// //                 >
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <LabelAndInput
// //                       control={personalForm.control}
// //                       fieldName="first_name"
// //                       labelText={t("first-name")}
// //                       inputPlaceholder={t("first-name")}
// //                     />
// //                     <LabelAndInput
// //                       control={personalForm.control}
// //                       fieldName="last_name"
// //                       labelText={t("last-name")}
// //                       inputPlaceholder={t("last-name")}
// //                     />
// //                     <LabelAndInput
// //                       control={personalForm.control}
// //                       fieldName="email"
// //                       labelText={t("email")}
// //                       inputType="email"
// //                       inputPlaceholder={t("email")}
// //                     />
// //                     <LabelAndInput
// //                       control={personalForm.control}
// //                       fieldName="phone"
// //                       labelText={t("phone")}
// //                       inputType="tel"
// //                       inputPlaceholder={t("phone")}
// //                       inputStyle={isRTL ? "text-right" : "text-left"}
// //                     />
// //                   </div>

// //                   <div className="flex justify-end pt-6">
// //                     <Button
// //                       type="submit"
// //                       disabled={personalForm.formState.isSubmitting}
// //                       className="px-8 py-3"
// //                     >
// //                       {personalForm.formState.isSubmitting
// //                         ? t("saving")
// //                         : t("save-changes")}
// //                     </Button>
// //                   </div>
// //                 </form>
// //               </FormProvider>
// //             </CardContent>
// //           </Card>

// //           {/* 🏠 Addresses */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>{t("addresses")}</CardTitle>
// //               <CardDescription>{t("address-subtitle")}</CardDescription>
// //             </CardHeader>

// //             <CardContent>
// //               <FormProvider {...addressForm}>
// //                 <form
// //                   onSubmit={handleAddressesSubmit(handleAddressesSubmitAction)}
// //                   className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
// //                 >
// //                   <div className="flex items-center justify-between">
// //                     <h3 className="text-lg font-semibold">{t("addresses")}</h3>
// //                     <Button
// //                       type="button"
// //                       variant="outline"
// //                       onClick={handleAddAddress}
// //                     >
// //                       <Plus className="w-4 h-4 mr-2" />
// //                       {t("add-address")}
// //                     </Button>
// //                   </div>

// //                   {fields.map((field, index) => (
// //                     <div
// //                       key={field.id}
// //                       className="border p-4 rounded-lg space-y-4"
// //                     >
// //                       <div className="flex items-center justify-between">
// //                         <h4 className="font-medium">
// //                           {t("address")} #{index + 1}
// //                         </h4>
// //                         <div className="flex gap-2">
// //                           {/* ✅ Green Save Button */}
// //                           <Button
// //                             type="button"
// //                             size="sm"
// //                             className="bg-green-600 hover:bg-green-700 text-white"
// //                             onClick={() => handleEditAddress(index)}
// //                           >
// //                             <FaRegSave className="w-4 h-4" />
// //                           </Button>

// //                           {/* 🗑️ Delete */}
// //                           <Button
// //                             type="button"
// //                             variant="destructive"
// //                             size="sm"
// //                             disabled={fields.length === 1}
// //                             onClick={() =>
// //                               handleDeleteAddress(index, field.address_id)
// //                             }
// //                           >
// //                             <MdDeleteSweep className="w-4 h-4" />
// //                           </Button>
// //                         </div>
// //                       </div>

// //                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                         <LabelAndInput
// //                           control={addressForm.control}
// //                           fieldName={`addresses.${index}.address1`}
// //                           labelText={t("address")}
// //                           inputPlaceholder={t("address")}
// //                         />
// //                         <LabelAndInput
// //                           control={addressForm.control}
// //                           fieldName={`addresses.${index}.city`}
// //                           labelText={t("city")}
// //                           inputPlaceholder={t("city")}
// //                         />
// //                         <LabelAndInput
// //                           control={addressForm.control}
// //                           fieldName={`addresses.${index}.country`}
// //                           labelText={t("country")}
// //                           inputPlaceholder={t("country")}
// //                         />
// //                       </div>
// //                     </div>
// //                   ))}
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
// import LabelAndInput from "@/components/form-components/label-and-input";
// import toast from "react-hot-toast";
// import { ProtectedRoute } from "@/components/auth/protected-route";
// import { Plus } from "lucide-react";
// import { MdDeleteSweep } from "react-icons/md";
// import { FaRegSave } from "react-icons/fa";
// import { apiService } from "@/lib/api-service";

// // ✅ Validation Schemas
// const personalInfoSchema = z.object({
//   first_name: z.string().min(1, "validation.first-name-required"),
//   last_name: z.string().min(1, "validation.last-name-required"),
//   email: z.string().email("validation.invalid-email"),
//   phone: z.string().min(1, "validation.phone-required"),
// });

// const addressSchema = z.object({
//   address_id: z.number().nullable().optional(),
//   address1: z.string().min(1, "validation.address-required"),
//   city: z.string().min(1, "validation.city-required"),
//   country: z.string().min(1, "validation.country-required"),
// });

// const addressesSchema = z.object({
//   addresses: z.array(addressSchema).min(1, "validation.at-least-one-address"),
// });

// type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
// type AddressesFormData = z.infer<typeof addressesSchema>;

// export default function ProfilePage() {
//   const t = useTranslations("profile");
//   const params = useParams();
//   const locale = params.locale as string;
//   const isRTL = locale === "ar";
//   const { user, isAuthenticated } = useAuth();
//   const dispatch = useDispatch<AppDispatch>();

//   // 🧾 Personal Info Form
//   const personalForm = useForm<PersonalInfoFormData>({
//     resolver: zodResolver(personalInfoSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone: "",
//     },
//   });

//   // 🏠 Addresses Form — FIXED default values
//   const addressForm = useForm<AddressesFormData>({
//     resolver: zodResolver(addressesSchema),
//     defaultValues: {
//       addresses: [
//         {
//           address_id: null,
//           address1: "",
//           city: "",
//           country: "",
//         },
//       ],
//     },
//   });

//   const { control, handleSubmit: handleAddressesSubmit } = addressForm;
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "addresses",
//   });

//   // 🔄 Fetch user
//   React.useEffect(() => {
//     if (isAuthenticated && !user) {
//       dispatch(getCurrentUser());
//     }
//   }, [dispatch, isAuthenticated, user]);

//   // ✅ Populate forms when user data loads
//   React.useEffect(() => {
//     if (user && Object.keys(user).length > 0) {
//       personalForm.reset({
//         first_name: user.first_name || "",
//         last_name: user.last_name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       });
//       addressForm.reset({
//         addresses: user.addresses?.map((a: any) => ({
//           address_id: a.id,
//           address1: a.address1 || "",
//           city: a.city || "",
//           country: a.country || "Egypt",
//         })) || [{ address_id: null, address1: "", city: "", country: "Egypt" }],
//       });
//     }
//   }, [user, personalForm, addressForm]);

//   // ✅ Handle Personal Info Submit
//   const handlePersonalSubmit = async (data: PersonalInfoFormData) => {
//     try {
//       // even if addresses accidentally appear, remove them safely
//       const { addresses, ...rest } = data as any;

//       const response = await apiService.updateCustomerProfile(rest);

//       if (response.success) {
//         toast.success(t("changesSaved"));
//         dispatch(getCurrentUser());
//       } else {
//         toast.error(response.message || t("errorSaving"));
//       }
//     } catch (err: any) {
//       toast.error(err.message || t("errorSaving"));
//     }
//   };

//   // ✅ Add new address dynamically
//   const handleAddAddress = () => {
//     append({
//       address1: "",
//       city: "",
//       country: "",
//     });
//   };

//   // ✅ Save single address (PUT or POST)
//   const handleEditAddress = async (index: number) => {
//     const address = addressForm.getValues(`addresses.${index}`);

//     try {
//       const method = address.address_id ? "PUT" : "POST";
//       const url = address.address_id
//         ? `/api/customer/addresses/${address.address_id}`
//         : `/api/customer/addresses`;

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...address, state: "default" }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success(
//           address.address_id ? t("addressUpdated") : t("addressAdded")
//         );
//         dispatch(getCurrentUser());
//       } else {
//         toast.error(data.message || t("updateFailed"));
//       }
//     } catch (err: any) {
//       toast.error(err.message || t("errorUpdating"));
//     }
//   };

//   // ✅ Delete address
//   const handleDeleteAddress = async (
//     index: number,
//     addressId: number | null | undefined
//   ) => {
//     if (!addressId) {
//       remove(index);
//       return;
//     }

//     try {
//       const res = await fetch(`/api/customer/addresses/${addressId}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success(t("addressDeleted"));
//         remove(index);
//         dispatch(getCurrentUser());
//       } else {
//         toast.error(data.message || t("deleteFailed"));
//       }
//     } catch (err: any) {
//       toast.error(err.message || t("errorDeleting"));
//     }
//   };

//   // ✅ Handle all addresses submit
//   const handleAddressesSubmitAction = async (data: AddressesFormData) => {
//     try {
//       for (const addr of data.addresses) {
//         const method = addr.address_id ? "PUT" : "POST";
//         const url =
//           addr.address_id != null
//             ? `/api/customer/addresses/${addr.address_id}`
//             : `/api/customer/add-address`;

//         await fetch(url, {
//           method,
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(addr),
//         });
//       }
//       toast.success(t("changesSaved"));
//       dispatch(getCurrentUser());
//     } catch (err: any) {
//       toast.error(err.message || t("errorSaving"));
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-10">
//           {/* 🧾 Personal Info */}
//           <Card>
//             <CardHeader>
//               <CardTitle>{t("personal-info")}</CardTitle>
//               <CardDescription>{t("subtitle")}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <FormProvider {...personalForm}>
//                 <form
//                   onSubmit={personalForm.handleSubmit(handlePersonalSubmit)}
//                   className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <LabelAndInput
//                       control={personalForm.control}
//                       fieldName="first_name"
//                       labelText={t("first-name")}
//                       inputPlaceholder={t("first-name")}
//                     />
//                     <LabelAndInput
//                       control={personalForm.control}
//                       fieldName="last_name"
//                       labelText={t("last-name")}
//                       inputPlaceholder={t("last-name")}
//                     />
//                     <LabelAndInput
//                       control={personalForm.control}
//                       fieldName="email"
//                       labelText={t("email")}
//                       inputType="email"
//                       inputPlaceholder={t("email")}
//                     />
//                     <LabelAndInput
//                       control={personalForm.control}
//                       fieldName="phone"
//                       labelText={t("phone")}
//                       inputType="tel"
//                       inputPlaceholder={t("phone")}
//                       inputStyle={isRTL ? "text-right" : "text-left"}
//                     />
//                   </div>

//                   <div className="flex justify-end pt-6">
//                     <Button
//                       type="submit"
//                       disabled={personalForm.formState.isSubmitting}
//                       className="px-8 py-3"
//                     >
//                       {personalForm.formState.isSubmitting
//                         ? t("saving")
//                         : t("save-changes")}
//                     </Button>
//                   </div>
//                 </form>
//               </FormProvider>
//             </CardContent>
//           </Card>

//           {/* 🏠 Addresses */}
//           <Card>
//             <CardHeader>
//               <CardTitle>{t("addresses")}</CardTitle>
//               <CardDescription>{t("address-subtitle")}</CardDescription>
//             </CardHeader>

//             <CardContent>
//               <FormProvider {...addressForm}>
//                 <form
//                   onSubmit={handleAddressesSubmit(handleAddressesSubmitAction)}
//                   className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold">{t("addresses")}</h3>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={handleAddAddress}
//                     >
//                       <Plus className="w-4 h-4 mr-2" />
//                       {t("add-address")}
//                     </Button>
//                   </div>

//                   {fields.map((field, index) => (
//                     <div
//                       key={field.id}
//                       className="border p-4 rounded-lg space-y-4"
//                     >
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium">
//                           {t("address")} #{index + 1}
//                         </h4>
//                         <div className="flex gap-2">
//                           {/* ✅ Green Save Button */}
//                           <Button
//                             type="button"
//                             size="sm"
//                             className="bg-green-600 hover:bg-green-700 text-white"
//                             onClick={() => handleEditAddress(index)}
//                           >
//                             <FaRegSave className="w-4 h-4" />
//                           </Button>

//                           {/* 🗑️ Delete */}
//                           <Button
//                             type="button"
//                             variant="destructive"
//                             size="sm"
//                             disabled={fields.length === 1}
//                             onClick={() =>
//                               handleDeleteAddress(index, field.address_id)
//                             }
//                           >
//                             <MdDeleteSweep className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <LabelAndInput
//                           control={addressForm.control}
//                           fieldName={`addresses.${index}.address1`}
//                           labelText={t("address")}
//                           inputPlaceholder={t("address")}
//                         />
//                         <LabelAndInput
//                           control={addressForm.control}
//                           fieldName={`addresses.${index}.city`}
//                           labelText={t("city")}
//                           inputPlaceholder={t("city")}
//                         />
//                         <LabelAndInput
//                           control={addressForm.control}
//                           fieldName={`addresses.${index}.country`}
//                           labelText={t("country")}
//                           inputPlaceholder={t("country")}
//                         />
//                       </div>
//                     </div>
//                   ))}
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
import LabelAndInput from "@/components/form-components/label-and-input";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Plus } from "lucide-react";
import { MdDeleteSweep } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { apiService } from "@/lib/api-service";

// ✅ Validation Schemas
const personalInfoSchema = z.object({
  first_name: z.string().min(1, "validation.first-name-required"),
  last_name: z.string().min(1, "validation.last-name-required"),
  email: z.string().email("validation.invalid-email"),
  phone: z.string().min(1, "validation.phone-required"),
});

const addressSchema = z.object({
  address_id: z.number().nullable().optional(),
  address1: z.string().min(1, "validation.address-required"),
  city: z.string().min(1, "validation.city-required"),
  country: z.string().min(1, "validation.country-required"),
});

const addressesSchema = z.object({
  addresses: z.array(addressSchema).min(1, "validation.at-least-one-address"),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
type AddressesFormData = z.infer<typeof addressesSchema>;

export default function ProfilePage() {
  const t = useTranslations("profile");
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const [savingAddressIndex, setSavingAddressIndex] = React.useState<
    number | null
  >(null);
  const [deletingAddressIndex, setDeletingAddressIndex] = React.useState<
    number | null
  >(null);

  // 🧾 Personal Info Form
  const personalForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  });

  // 🏠 Addresses Form
  const addressForm = useForm<AddressesFormData>({
    resolver: zodResolver(addressesSchema),
    defaultValues: {
      addresses: [
        { address_id: null, address1: "", city: "", country: "Egypt" },
      ],
    },
  });

  const { control, handleSubmit: handleAddressesSubmit } = addressForm;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  // 🔄 Fetch user
  React.useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, user]);

  // ✅ Populate forms when user data loads
  React.useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      personalForm.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      addressForm.reset({
        addresses: user.addresses?.map((a: any) => ({
          address_id: a.id,
          address1: a.address1 || "",
          city: a.city || "",
          country: a.country || "Egypt",
        })) || [{ address_id: null, address1: "", city: "", country: "Egypt" }],
      });
    }
  }, [user]);

  // ✅ Handle Personal Info Submit
  const handlePersonalSubmit = async (data: PersonalInfoFormData) => {
    try {
      const { addresses, ...rest } = data as any;
      const response = await apiService.updateCustomerProfile(rest);
      if (response.success) {
        toast.success(t("changesSaved"));
        dispatch(getCurrentUser());
      } else {
        toast.error(response.message || t("errorSaving"));
      }
    } catch (err: any) {
      toast.error(err.message || t("errorSaving"));
    }
  };

  // ✅ Add new address
  const handleAddAddress = () => {
    append({ address_id: null, address1: "", city: "", country: "Egypt" });
  };

  // ✅ Save (add or edit) single address
  const handleEditAddress = async (index: number) => {
    const address = addressForm.getValues(`addresses.${index}`);
    setSavingAddressIndex(index);

    try {
      const method = address.address_id ? "PUT" : "POST";
      const url = address.address_id
        ? `/api/customer/addresses/${address.address_id}`
        : `/api/customer/addresses`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...address, state: "default" }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          address.address_id ? t("addressUpdated") : t("addressAdded")
        );
        dispatch(getCurrentUser());
      } else {
        toast.error(data.message || t("updateFailed"));
      }
    } catch (err: any) {
      toast.error(err.message || t("errorUpdating"));
    } finally {
      setSavingAddressIndex(null);
    }
  };

  // ✅ Delete address
  const handleDeleteAddress = async (
    index: number,
    addressId: number | null | undefined
  ) => {
    if (!addressId) {
      remove(index);
      return;
    }

    setDeletingAddressIndex(index);
    try {
      const res = await fetch(`/api/customer/addresses/${addressId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success(t("addressDeleted"));
        remove(index);
        dispatch(getCurrentUser());
      } else {
        toast.error(data.message || t("deleteFailed"));
      }
    } catch (err: any) {
      toast.error(err.message || t("errorDeleting"));
    } finally {
      setDeletingAddressIndex(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* 🧾 Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t("personal-info")}</CardTitle>
              <CardDescription>{t("subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...personalForm}>
                <form
                  onSubmit={personalForm.handleSubmit(handlePersonalSubmit)}
                  className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LabelAndInput
                      control={personalForm.control}
                      fieldName="first_name"
                      labelText={t("first-name")}
                    />
                    <LabelAndInput
                      control={personalForm.control}
                      fieldName="last_name"
                      labelText={t("last-name")}
                    />
                    <LabelAndInput
                      control={personalForm.control}
                      fieldName="email"
                      labelText={t("email")}
                      inputType="email"
                    />
                    <LabelAndInput
                      control={personalForm.control}
                      fieldName="phone"
                      labelText={t("phone")}
                      inputType="tel"
                    />
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      disabled={personalForm.formState.isSubmitting}
                      className="px-8 py-3"
                    >
                      {personalForm.formState.isSubmitting ? (
                        <BeatLoader color="#fff" size={6} />
                      ) : (
                        t("save-changes")
                      )}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>

          {/* 🏠 Addresses */}
          <Card>
            <CardHeader>
              <CardTitle>{t("addresses")}</CardTitle>
              <CardDescription>{t("address-subtitle")}</CardDescription>
            </CardHeader>

            <CardContent>
              <FormProvider {...addressForm}>
                <form className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{t("addresses")}</h3>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddAddress}
                    >
                      <Plus className="w-4 h-4 mr-2" /> {t("add-address")}
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
                        <div className="flex gap-2">
                          {/* ✅ Green Save Button with Loader */}
                          <Button
                            type="button"
                            size="sm"
                            disabled={savingAddressIndex === index}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleEditAddress(index)}
                          >
                            {savingAddressIndex === index ? (
                              <BeatLoader color="#fff" size={6} />
                            ) : (
                              <FaRegSave className="w-4 h-4" />
                            )}
                          </Button>

                          {/* 🗑️ Delete with Loader */}
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={
                              fields.length === 1 ||
                              deletingAddressIndex === index
                            }
                            onClick={() =>
                              handleDeleteAddress(index, field.address_id)
                            }
                          >
                            {deletingAddressIndex === index ? (
                              <BeatLoader color="#fff" size={3} />
                            ) : (
                              <MdDeleteSweep className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <LabelAndInput
                          control={addressForm.control}
                          fieldName={`addresses.${index}.address1`}
                          labelText={t("address")}
                        />
                        <LabelAndInput
                          control={addressForm.control}
                          fieldName={`addresses.${index}.city`}
                          labelText={t("city")}
                        />
                        <LabelAndInput
                          control={addressForm.control}
                          fieldName={`addresses.${index}.country`}
                          labelText={t("country")}
                        />
                      </div>
                    </div>
                  ))}
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
