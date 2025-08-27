import { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط وأحكام الموقع - فرادا",
  description: "شروط وأحكام استخدام موقع فرادا",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
