"use client";

import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("header");

  return <div className="h-[100vh]">{t("title")}</div>;
}
