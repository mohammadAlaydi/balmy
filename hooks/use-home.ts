"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { TfiBackLeft } from "react-icons/tfi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { PiSealCheck } from "react-icons/pi";

import { getHomeData } from "@/store/slices/home-slice";
import { AppDispatch, RootState } from "@/store/store";
import type { IconType } from "react-icons";

export type BenefitItem = {
  icon: IconType;
  title: string;
  description: string;
};

export default function useHome() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.home);
  const pathname = usePathname();
  const t = useTranslations("home");

  // ✅ Extract locale once from pathname
  const currentLocale = useMemo(() => {
    const locale = pathname?.split("/")?.[1];
    return locale || "ar";
  }, [pathname]);

  // ✅ Fetch home data only if not already fetched for this locale
  useEffect(() => {
    if (!data || data.locale !== currentLocale) {
      dispatch(getHomeData(currentLocale));
    }
  }, [currentLocale]); // dispatch intentionally omitted

  // ✅ Static benefits — no dependency on `t`
  const benefits: BenefitItem[] = [
    {
      icon: TfiBackLeft,
      title: t("return-and-exchange"),
      description: t("return-and-exchange-desc"),
    },
    {
      icon: MdOutlineLocalShipping,
      title: t("free-shipping"),
      description: t("free-shipping-desc"),
    },
    {
      icon: BiSupport,
      title: t("always-with-you"),
      description: t("always-with-you-desc"),
    },
    {
      icon: PiSealCheck,
      title: t("gold-membership"),
      description: t("gold-membership-desc"),
    },
  ];

  return { t, loading, data, benefits };
}
