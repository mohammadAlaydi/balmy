"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SideFilter from "@/components/offers/side-filter";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Dummy product data for demonstration
const dummyProducts = [
    {
        id: 1,
        name: "عطر ديور سوفاج",
        price: 450,
        discountPrice: 350,
        rating: 4.5,
        image: "/abood.jpg",
        brand: "dior",
        category: "men",
    },
    {
        id: 2,
        name: "عطر شانيل نمبر 5",
        price: 600,
        discountPrice: 480,
        rating: 5,
        image: "/abood.jpg",
        brand: "chanel",
        category: "women",
    },
    {
        id: 3,
        name: "عطر غوتشي غيلتي",
        price: 520,
        discountPrice: 420,
        rating: 4,
        image: "/abood.jpg",
        brand: "gucci",
        category: "women",
    },
    {
        id: 4,
        name: "عطر أرماني كود",
        price: 380,
        discountPrice: 290,
        rating: 4.5,
        image: "/abood.jpg",
        brand: "armani",
        category: "men",
    },
    {
        id: 5,
        name: "عطر يوسي إيلوشن",
        price: 550,
        discountPrice: 440,
        rating: 4.8,
        image: "/abood.jpg",
        brand: "ysl",
        category: "unisex",
    },
    {
        id: 6,
        name: "عطر برادا لونا روسا",
        price: 470,
        discountPrice: 380,
        rating: 4.3,
        image: "/abood.jpg",
        brand: "prada",
        category: "men",
    },
];

export default function OffersPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("suggestions");

    // Filter and sort products (dummy logic - replace with your actual logic)
    const filteredProducts = dummyProducts.filter((product) => {
        // Category filter
        if (
            selectedCategories.length > 0 &&
            !selectedCategories.includes(product.category)
        ) {
            return false;
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }

        // Rating filter
        if (selectedRatings.length > 0) {
            const matchesRating = selectedRatings.some(
                (rating) => Math.floor(product.rating) === rating
            );
            if (!matchesRating) return false;
        }

        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low-high":
                return (a.discountPrice || a.price) - (b.discountPrice || b.price);
            case "price-high-low":
                return (b.discountPrice || b.price) - (a.discountPrice || a.price);
            case "rating":
                return b.rating - a.rating;
            case "newest":
                return b.id - a.id;
            default:
                return 0;
        }
    });

    const breadcrumbItems = [
        { label: "الرئيسية", href: "/" },
        { label: "العروض", href: "/offers" },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <div className="container mx-auto px-4 py-40">
                {/* 2-Column Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Right Column - Sidebar (25%) */}
                    <aside className="lg:w-1/4 order-2 lg:order-1">
                        <SideFilter
                            breadcrumbItems={breadcrumbItems}
                            selectedCategories={selectedCategories}
                            selectedRatings={selectedRatings}
                            selectedPriceRanges={selectedPriceRanges}
                            selectedBrands={selectedBrands}
                            onCategoryChange={setSelectedCategories}
                            onRatingChange={setSelectedRatings}
                            onPriceChange={setSelectedPriceRanges}
                            onBrandChange={setSelectedBrands}
                        />
                    </aside>

                    {/* Left Column - Main Content (75%) */}
                    <main className="lg:w-3/4 order-1 lg:order-2">
                        {/* Top Bar */}
                        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            {/* Right (reserved) */}
                            <div className="order-1" />

                            {/* Left: Sort Select */}
                            <div className="order-2 flex items-center gap-3">
                                <span className="text-sm font-medium text-black">ترتيب:</span>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="اختر الترتيب" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="suggestions">الاقتراحات</SelectItem>
                                        <SelectItem value="price-low-high">
                                            السعر: من الأقل للأعلى
                                        </SelectItem>
                                        <SelectItem value="price-high-low">
                                            السعر: من الأعلى للأقل
                                        </SelectItem>
                                        <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                                        <SelectItem value="newest">الأحدث</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Products Count */}
                        <div className="mb-6">
                            <p className="text-sm text-medium-gray">
                                عرض {sortedProducts.length} من المنتجات
                            </p>
                        </div>

                        {/* Product Grid - 3 products per row on desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {sortedProducts.map((product) => {
                                const currentPrice = product.discountPrice ?? product.price;
                                const discountPercent = product.discountPrice
                                    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                                    : undefined;

                                return (
                                    <div key={product.id} className="w-full max-w-sm mx-auto">
                                        <ProductCard
                                            brandName={product.brand}
                                            productName={product.name}
                                            price={currentPrice}
                                            oldPrice={product.discountPrice ? product.price : undefined}
                                            discount={discountPercent}
                                            imageUrl={product.image}
                                            category={product.category}
                                            rating={product.rating}
                                            onAddToCart={() => console.log("Add to cart", product.id)}
                                            onToggleFavorite={() => console.log("Toggle favorite", product.id)}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Load More Button */}
                        {sortedProducts.length > 0 && (
                            <div className="flex justify-center mt-8">
                                <button
                                    className="bg-black text-white px-12 py-3 rounded-lg font-medium hover:bg-dark-gray-3 transition-colors duration-300"
                                    onClick={() => {
                                        // Add your load more logic here
                                        console.log("Load more products");
                                    }}
                                >
                                    تحميل المزيد
                                </button>
                            </div>
                        )}

                        {/* Empty State */}
                        {sortedProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-black mb-2">
                                    لا توجد نتائج
                                </h3>
                                <p className="text-medium-gray">
                                    حاول تغيير الفلاتر أو البحث عن منتجات أخرى
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
