"use client";

import LabelAndInput from "@/components/form-components/label-and-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import React from "react";
import { useUserProfile } from "@/hooks/use-user-profile";

export default function UserAddressesForm() {
  const {
    t,
    addressForm,
    fields,
    savingAddressIndex,
    deletingAddressIndex,
    handleAddAddress,
    handleEditAddress,
    handleDeleteAddress,
  } = useUserProfile();
  return (
    <Card className="col-span-12 md:col-span-10 xl:col-span-8 h-fit md:col-start-2 xl:col-start-3">
      <CardHeader>
        <CardTitle className="text-lg">{t("addresses")}</CardTitle>
        <CardDescription>{t("address-subtitle")}</CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...addressForm}>
          <form>
            <Button type="button" variant="outline" onClick={handleAddAddress}>
              <Plus className="w-4 h-4 mr-2" /> {t("add-address")}
            </Button>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-lg space-y-4 mt-5"
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
                        <BeatLoader color="#fff" size={3} />
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
                        fields.length === 1 || deletingAddressIndex === index
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
  );
}
