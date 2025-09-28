import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة ملفات تعريف الارتباط - فرادا",
  description: "سياسة ملفات تعريف الارتباط (Cookies) لموقع فرادا",
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

