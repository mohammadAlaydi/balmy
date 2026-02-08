"use client";

import React from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { RootState } from "@/store/store";

interface FilterCategoriesProps {
    activeCategoryId?: string | number;
}

export default function FilterCategories({
    activeCategoryId,
}: FilterCategoriesProps) {
    const pathname = usePathname();
    const locale = pathname?.split("/")[1] || "ar";

    // Get categories from the home data (already fetched by the header/homepage)
    const homeData = useSelector((state: RootState) => state.home.data);
    const homeLoading = useSelector((state: RootState) => state.home.loading);

    // Categories are stored in home data from the homepage API
    const categories: any[] = homeData?.categories || [];

    if (homeLoading && categories.length === 0) {
        return (
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-center text-black">فئات المنتجات</h3>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-black">فئات المنتجات</h3>
            <div className="flex justify-center">
                <div className="inline-flex flex-col space-y-2.5">
                    {categories
                        .filter((cat: any) => cat?.name !== "Root")
                        .map((category: any) => {
                            const isActive =
                                activeCategoryId?.toString() === category.id?.toString();
                            return (
                                <Link
                                    key={category.id}
                                    href={`/${locale}/category/${category.id}`}
                                    className="flex items-center gap-3 py-1 transition-colors duration-200 group"
                                >
                                    <span
                                        className={`inline-block w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors duration-200 ${isActive
                                            ? "border-black bg-black"
                                            : "border-gray-400 bg-white group-hover:border-gray-600"
                                            }`}
                                    />
                                    <span
                                        className={`text-base transition-colors duration-200 ${isActive
                                            ? "font-bold text-black"
                                            : "text-gray-600 group-hover:text-black"
                                            }`}
                                    >
                                        {category.name}
                                    </span>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
