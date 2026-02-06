"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Category = {
    id: number;
    name: string;
    hasChildren?: boolean;
    thumbnail?: string;
    thumbnailDominantColor?: string;
    banner?: string;
    bannerDominantColor?: string;
};

export type CategoriesGridProps = {
    categories: Category[];
    title?: string;
    showAll?: boolean;
    maxCategories?: number;
};

export default function CategoriesGrid({
    categories,
    title = "تسوق حسب الفئة",
    showAll = true,
    maxCategories = 28
}: CategoriesGridProps) {
    const pathname = usePathname();
    const locale = pathname?.split("/")[1] || "ar";

    const displayCategories = showAll ? categories : categories.slice(0, maxCategories);

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <section className="w-full" dir="rtl">
            {/* Section Title */}
            <h2 className="text-[var(--color-black-2)] text-2xl md:text-3xl lg:text-[40px] lg:leading-[75px] font-medium mb-8 text-right">
                {title}
            </h2>

            {/* Categories Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3 md:gap-4">
                {displayCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/${locale}/category/${category.id}`}
                        className="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-105"
                    >
                        {/* Category Image Circle */}
                        <div
                            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
                            style={{ backgroundColor: category.thumbnailDominantColor || "#f5f5f5" }}
                        >
                            {category.thumbnail ? (
                                <Image
                                    src={category.thumbnail}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
                                    <span className="text-2xl font-bold text-rose-400">
                                        {category.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>

                        {/* Category Name */}
                        <p className="text-xs sm:text-sm md:text-base text-center text-gray-700 group-hover:text-rose-600 transition-colors duration-300 line-clamp-2 font-medium">
                            {category.name}
                        </p>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            {!showAll && categories.length > maxCategories && (
                <div className="mt-6 text-center">
                    <Link
                        href={`/${locale}/categories`}
                        className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-colors"
                    >
                        عرض جميع الفئات
                        <span className="text-lg">←</span>
                    </Link>
                </div>
            )}
        </section>
    );
}
