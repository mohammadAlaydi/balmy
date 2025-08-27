import { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن - فرادا",
  description: "تعرف على شركة فرادا وتاريخنا ورؤيتنا",
};

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
