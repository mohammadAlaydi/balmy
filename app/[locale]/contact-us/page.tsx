import { getTranslations } from "next-intl/server";
import ContactUsClient from "../../../features/contact-us/contact-us-client";

export async function generateMetadata() {
  const t = await getTranslations("contact-us");
  return {
    title: t("title"),
  };
}

export default function Page() {
  return <ContactUsClient />;
}
