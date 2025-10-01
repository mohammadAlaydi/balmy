"use client";

import { usePathname } from "next/navigation";
import { AutoBreadcrumb } from "@/components/ui/breadcrumb";

export default function BreadcrumbWrapper() {
  const pathname = usePathname();

  // Don't show breadcrumb on home page
  if (pathname.includes("home")) {
    return null;
  }

  return (
    <div className="px-3 sm:px-5 lg:px-[120px] xl:px-[150px] py-3 bg-gray-50 border border-b-solid border-b-gray-200">
      <AutoBreadcrumb className="text-sm" />
    </div>
  );
}
