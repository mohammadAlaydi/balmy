import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا - فرادا",
  description: "تواصل مع فريق فرادا للحصول على المساعدة والدعم",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
