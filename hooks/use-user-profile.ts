"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "./use-auth";
import { AppDispatch } from "@/store/store";
import { getCurrentUser } from "@/store/slices/auth-slice";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import z from "zod";

import {
  personalInfoSchema,
  addressesSchema,
} from "@/features/user-profile/schema";
// import { apiService } from "@/lib/api-service";
import { DISABLE_BACKEND_FETCH, mockDelay } from "@/lib/dev-config";

// 🧾 Types
type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
type AddressesFormData = z.infer<typeof addressesSchema>;

/**
 * Custom hook to manage user profile data and forms.
 */
export function useUserProfile() {
  const t = useTranslations("profile");
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, accessToken } = useAuth();

  // =============================
  // 🔄 Fetch current user
  // =============================
  React.useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, user]);

  // =============================
  // 🧾 Personal Info Form
  // =============================
  const personalForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  });

  // =============================
  // 🏠 Address Form
  // =============================
  const addressForm = useForm<AddressesFormData>({
    resolver: zodResolver(addressesSchema),
    defaultValues: {
      addresses: [{ address_id: null, address1: "", city: "", country: "" }],
    },
  });

  const { control } = addressForm;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const [savingAddressIndex, setSavingAddressIndex] = React.useState<number | null>(null);
  const [deletingAddressIndex, setDeletingAddressIndex] = React.useState<number | null>(null);

  // =============================
  // 🧠 Populate Forms When User Data Loads
  // =============================
  React.useEffect(() => {
    if (!user || Object.keys(user).length === 0) return;

    personalForm.reset({
      first_name: user.firstName || "",
      last_name: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
    });

    addressForm.reset({
      addresses:
        // @ts-ignore - addresses might not be on User type depending on definition, but API returns it
        user.addresses?.map((a: any) => ({
          address_id: a.id,
          address1: a.address1 || "",
          city: a.city || "",
          country: a.country || "",
        })) || [],
    });
  }, [user, personalForm, addressForm]);

  // =============================
  // ✉️ Handle Personal Info Submit
  // =============================
  const handlePersonalSubmit = async (data: PersonalInfoFormData) => {
    try {
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Profile update bypassed");
        toast.success(t("changes-saved"));
        return;
      }

      const { addresses, ...payload } = data as any;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (accessToken && accessToken !== "stored-in-cookie") {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch("/api/customer/profile", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        toast.success(t("changes-saved"));
        dispatch(getCurrentUser());
      } else {
        toast.error(resData.message || t("error-saving"));
      }
    } catch (err: any) {
      toast.error(err.message || t("error-saving"));
    }
  };

  // =============================
  // ➕ Add Address
  // =============================
  const handleAddAddress = () => {
    append({ address_id: null, address1: "", city: "", country: "" });
  };

  // =============================
  // ✏️ Edit or Add Address
  // =============================
  const handleEditAddress = async (index: number) => {
    const address = addressForm.getValues(`addresses.${index}`);
    setSavingAddressIndex(index);

    try {
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Address edit bypassed");
        toast.success(address.address_id ? t("addressUpdated") : t("addressAdded"));
        setSavingAddressIndex(null);
        return;
      }

      const method = address.address_id ? "PUT" : "POST";
      const endpoint = address.address_id
        ? `/api/customer/addresses/${address.address_id}`
        : `/api/customer/addresses`;

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...address, state: "default" }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(address.address_id ? t("addressUpdated") : t("addressAdded"));
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

  // =============================
  // 🗑️ Delete Address
  // =============================
  const handleDeleteAddress = async (index: number, addressId?: number | null) => {
    if (!addressId) {
      remove(index);
      return;
    }

    setDeletingAddressIndex(index);

    try {
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Address delete bypassed - address ${addressId}`);
        toast.success(t("addressDeleted"));
        remove(index);
        setDeletingAddressIndex(null);
        return;
      }

      const res = await fetch(`/api/customer/addresses/${addressId}`, { method: "DELETE" });
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

  // =============================
  // 🧭 Return Hook Values
  // =============================
  return {
    user,
    t,
    personalForm,
    handlePersonalSubmit,
    addressForm,
    fields,
    savingAddressIndex,
    deletingAddressIndex,
    handleAddAddress,
    handleEditAddress,
    handleDeleteAddress,
  };
}
