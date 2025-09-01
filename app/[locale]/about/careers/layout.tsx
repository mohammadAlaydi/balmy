import { Metadata } from "next";

export const metadata: Metadata = {
  title: "وظائف فرادا - فرادا",
  description: "انضم إلى فريق فرادا واكتشف الفرص الوظيفية المتاحة",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
