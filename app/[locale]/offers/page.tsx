"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbBalmy } from "@/components/balmy";
import Loading from "@/components/loading";
import type { RootState, AppDispatch } from "@/store/store";
import { getHomeData } from "@/store/slices/home-slice";

export default function OffersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const locale = pathname?.split("/")[1] || "ar";

    const { data: homeData, loading } = useSelector(
        (state: RootState) => state.home
    );

    // Fetch home data if not loaded (categories come from homepage)
    useEffect(() => {
        if (!homeData || homeData.locale !== locale) {
            dispatch(getHomeData(locale));
        }
    }, [dispatch, locale]);

    // Categories from homepage data
    const categories: any[] = homeData?.categories || [];
    const filteredCategories = categories.filter((cat: any) => cat?.name !== "Root");

    if (loading && filteredCategories.length === 0) {
        return <Loading fullScreen variant="spinner" size="xl" />;
    }

    const breadcrumbItems = [
        { label: "الرئيسية", href: "/" },
        { label: "التصنيفات", href: "/offers" },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <div className="container mx-auto px-4 py-40">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <BreadcrumbBalmy items={breadcrumbItems} className="justify-start" />
                </div>

                {/* Page Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-10 text-right">
                    تسوق حسب الفئة
                </h1>

                {/* Categories Grid */}
                {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8">
                        {filteredCategories.map((category: any) => (
                            <Link
                                key={category.id}
                                href={`/${locale}/category/${category.id}`}
                                className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-105"
                            >
                                {/* Category Image Circle */}
                                <div
                                    className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
                                    style={{ backgroundColor: "#f5f5f5" }}
                                >
                                    {category.image || category.banner_url ? (
                                        <Image
                                            src={category.image || category.banner_url}
                                            alt={category.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                            <span className="text-2xl md:text-3xl font-bold text-gray-400">
                                                {category.name?.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                {/* Category Name */}
                                <p className="text-xs sm:text-sm md:text-base text-center text-gray-700 group-hover:text-black transition-colors duration-300 line-clamp-2 font-medium">
                                    {category.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-16 text-center min-h-[50vh]">
                        <div className="text-6xl mb-4">📂</div>
                        <h3 className="text-xl font-bold text-black mb-2">
                            لا توجد تصنيفات
                        </h3>
                        <p className="text-medium-gray">
                            لا توجد تصنيفات متاحة حالياً
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
