"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import useFavourites from "@/hooks/use-favourites";
import { useAppDispatch } from "@/store/hooks";
import { useSelector } from "react-redux";
import { addToCart, setCartOpen } from "@/store/slices/cart-slice";
import AuthModal from "@/components/auth/auth-modal";
import RiyalSymbol from "@/components/RiyalSymbol";

export default function FavouritesPage() {
    const t = useTranslations("favourites");
    const tProducts = useTranslations("products");
    const { favourites, count, removeFavourite, clearAll } = useFavourites();
    const dispatch = useAppDispatch();

    const pathname = usePathname();
    const locale = pathname?.split("/")[1] || "ar";

    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [addingId, setAddingId] = useState<number | null>(null);

    /* ---- Add to Cart ---- */
    const handleAddToCart = async (productId: number) => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }

        try {
            setAddingId(productId);
            const promise = dispatch(addToCart({ productId, productQTY: 1 }));
            await (typeof promise.unwrap === "function"
                ? promise.unwrap()
                : promise);
            toast.success(t("addedToCart") || "تم إضافة المنتج إلى السلة");
            dispatch(setCartOpen(true));
        } catch (error: any) {
            toast.error(error?.message || tProducts("failed-to-add-to-cart"));
        } finally {
            setAddingId(null);
        }
    };

    /* ---- Remove single ---- */
    const handleRemove = (id: number) => {
        removeFavourite(id);
        toast(t("productRemoved") || "تم إزالة المنتج من المفضلة", {
            icon: "💔",
        });
    };

    /* ---- Clear all with confirmation ---- */
    const handleClearAll = () => {
        if (window.confirm(t("confirmClearAll") || "هل أنت متأكد من مسح جميع المفضلات؟")) {
            clearAll();
            toast.success(t("allCleared") || "تم مسح جميع المفضلات");
        }
    };

    /* ---- Empty State ---- */
    if (count === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4" dir="rtl">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-gray-300" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 font-cairo">
                        {t("emptyTitle") || "لا توجد مفضلات بعد"}
                    </h1>
                    <p className="text-gray-500 font-cairo max-w-md">
                        {t("emptySubtitle") || "ابدأ بإضافة المنتجات إلى مفضلاتك لرؤيتها هنا"}
                    </p>
                </div>
                <Link
                    href={`/${locale}/home`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-cairo font-medium hover:bg-gray-800 transition-colors"
                >
                    {t("startShopping") || "ابدأ التسوق"}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1920px] mx-auto px-4 lg:px-16 py-8" dir="rtl">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-cairo">
                        {t("title") || "المفضلة"}
                    </h1>
                    <p className="text-gray-500 font-cairo mt-1">
                        {count} {count === 1 ? "منتج" : "منتجات"}
                    </p>
                </div>
                <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-cairo text-sm"
                >
                    <Trash2 className="w-4 h-4" />
                    {t("clearAll") || "مسح الكل"}
                </button>
            </div>

            {/* Favourites Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {favourites.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group font-cairo"
                    >
                        {/* Remove button */}
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                            aria-label={t("removeFromFavourites") || "إزالة من المفضلة"}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Product Image */}
                        <Link href={`/${locale}/product/${item.id}`}>
                            <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Heart className="w-10 h-10 text-gray-200" />
                                    </div>
                                )}
                            </div>
                        </Link>

                        {/* Product Info */}
                        <div className="p-3 space-y-2">
                            <Link href={`/${locale}/product/${item.id}`}>
                                {/* Brand */}
                                <p className="text-sm font-bold text-gray-900 truncate">
                                    {item.brand}
                                </p>
                                {/* Name */}
                                <p className="text-xs text-gray-500 line-clamp-2 leading-snug">
                                    {item.name}
                                </p>
                            </Link>

                            {/* Price */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                                    {item.price}
                                    <RiyalSymbol className="w-3 h-3" />
                                </span>
                                {item.oldPrice && item.oldPrice > item.price && (
                                    <span className="text-xs text-gray-400 line-through flex items-center gap-0.5">
                                        {item.oldPrice}
                                        <RiyalSymbol className="w-2.5 h-2.5" />
                                    </span>
                                )}
                            </div>

                            {/* Stock Status */}
                            {item.inStock === false && (
                                <span className="text-xs text-red-500 font-medium">
                                    {t("outOfStock") || "غير متوفر"}
                                </span>
                            )}

                            {/* Add to Cart Button */}
                            <button
                                onClick={() => handleAddToCart(item.id)}
                                disabled={addingId === item.id || item.inStock === false}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {addingId === item.id
                                    ? "..."
                                    : t("addToCart") || "أضف إلى السلة"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onOpenChange={setShowAuthModal}
                onAuthenticated={() => setShowAuthModal(false)}
            />
        </div>
    );
}
