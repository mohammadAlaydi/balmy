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
import { useUserProfile } from "@/hooks/use-user-profile";
import React from "react";
import { FormProvider } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

export default function PersonalInfoForm() {

  const { personalForm, handlePersonalSubmit, t } = useUserProfile();

  return (
    <Card className="relative col-span-12 md:col-span-10 xl:col-span-8 h-fit md:col-start-2 xl:col-start-3">
      <CardHeader>
        <CardTitle className="text-lg">{t("personal-info")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...personalForm}>
          <form onSubmit={personalForm.handleSubmit(handlePersonalSubmit)}>
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

            <div className="flex justify-end pt-6 sm:absolute ltr:right-6 rtl:left-6 top-0">
              <Button
                type="submit"
                variant="success"
                disabled={personalForm.formState.isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                {personalForm.formState.isSubmitting ? (
                  <BeatLoader color="#fff" size={3} />
                ) : (
                  <FaRegSave className="w-4 h-4" />
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
