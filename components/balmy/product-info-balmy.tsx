"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Heart, ShoppingCart, CheckCircle, Share2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import RatingBalmy from "@/components/balmy/rating-balmy";
import SizeSelectorBalmy from "@/components/balmy/size-selector-balmy";
import DeliveryInfoBalmy from "@/components/balmy/delivery-info-balmy";
import { FavouriteButton } from "@/components/favourite-button";
import AuthModal from "@/components/auth/auth-modal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { addToCart, setCartOpen } from "@/store/slices/cart-slice";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

interface ProductInfoBalmyProps {
    product: {
        id: number;
        product_id?: number;
        name: string;
        sku?: string;
        price?: string | number;
        special_price?: string | number | null;
        in_stock?: boolean;
        new?: boolean;
        featured?: boolean;
        description?: string | null;
        short_description?: string | null;
        reviews?: number | {
            total?: number;
            average_rating?: number | null;
        };
        brand?: string;
        variants?: any[];
    };
    className?: string;
}

// Mock sizes - can be derived from product variants
const DEFAULT_SIZES = [
    { value: "75ml", label: "75 ml", inStock: true },
    { value: "100ml", label: "100 ml", inStock: true },
    { value: "125ml", label: "125 ml", inStock: true },
    { value: "150ml", label: "150 ml", inStock: false },
];

export default function ProductInfoBalmy({
    product,
    className,
}: ProductInfoBalmyProps) {
    const t = useTranslations("product-details");
    const tProducts = useTranslations("products");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<string | null>("100ml");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<"add" | "buy" | null>(null);

    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const { data: cartData } = useSelector((state: any) => state.cart);

    // Calculate prices
    const price = typeof product.price === "string"
        ? parseFloat(product.price)
        : (product.price || 0);
    const specialPrice = product.special_price
        ? (typeof product.special_price === "string"
            ? parseFloat(product.special_price)
            : product.special_price)
        : null;

    const currentPrice = specialPrice || price;
    const originalPrice = specialPrice ? price : price * 1.3; // Mock original if no discount
    const hasDiscount = specialPrice !== null || true; // Always show discount for demo
    const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

    // Normalize reviews data - handle both number and object formats
    const normalizedReviews = typeof product.reviews === 'number'
        ? { total: product.reviews, average_rating: 4.0 }
        : product.reviews || { total: 225, average_rating: 3.7 };

    const isInStock = product.in_stock !== false;
    const productId = product.product_id || product.id;

    const handleAddToCart = async () => {
        if (!isInStock || isAddingToCart) return;

        if (!isAuthenticated) {
            setPendingAction("add");
            setShowAuthModal(true);
            return;
        }

        try {
            setIsAddingToCart(true);
            const promise = dispatch(addToCart({ productId, productQTY: 1 }));
            await (typeof promise.unwrap === "function" ? promise.unwrap() : promise);
            toast.success(tProducts("added-to-cart"));
            dispatch(setCartOpen(true));
        } catch (error: any) {
            toast.error(error?.message || tProducts("failed-to-add-to-cart"));
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!isInStock) return;

        if (!isAuthenticated) {
            setPendingAction("buy");
            setShowAuthModal(true);
            return;
        }

        // Add to cart then navigate to checkout
        try {
            setIsAddingToCart(true);
            const promise = dispatch(addToCart({ productId, productQTY: 1 }));
            await (typeof promise.unwrap === "function" ? promise.unwrap() : promise);
            // Navigate to checkout
            // Navigate to checkout
            router.push("/cart");
        } catch (error: any) {
            toast.error(error?.message || tProducts("failed-to-add-to-cart"));
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    url: window.location.href,
                });
            } catch {
                // User cancelled sharing
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success(t("link-copied") || "تم نسخ الرابط");
        }
    };

    return (
        <div className={cn("flex flex-col gap-5", className)} dir="rtl">
            {/* Header with Heart Icon and Brand */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1 flex-1">
                    {/* Brand Name with Verified Badge */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-[var(--color-black)] font-cairo">
                            {product.brand || "جورجيو أرماني"}
                        </span>
                        <CheckCircle className="w-4 h-4 text-[var(--color-blue-3)] fill-current" />
                    </div>

                    {/* Product Name */}
                    <h1 className="text-[24px] leading-[45px] text-[#AEAEAE] font-cairo text-right">
                        {product.name}
                    </h1>

                    {/* SKU */}
                    {product.sku && (
                        <span className="text-sm text-[var(--color-light-gray-5)] font-cairo text-right">
                            {product.sku}
                        </span>
                    )}
                </div>

                {/* Wishlist Heart Icon */}
                <FavouriteButton
                    product={product}
                    size="lg"
                    className="cursor-pointer"
                />
            </div>

            {/* Pricing Section */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Current Price */}
                <span className="text-2xl font-bold text-[var(--color-red-4)] font-cairo">
                    {currentPrice.toFixed(0)} ج.م
                </span>

                {/* Original Price */}
                {hasDiscount && originalPrice > currentPrice && (
                    <span className="text-lg text-[var(--color-light-gray-5)] line-through font-cairo">
                        {originalPrice.toFixed(0)} ج.م
                    </span>
                )}

                {/* Discount Badge */}
                {hasDiscount && discountPercent > 0 && (
                    <Badge className="bg-[var(--color-red-4)] text-white text-xs px-2 py-1 rounded">
                        -{discountPercent}%
                    </Badge>
                )}
            </div>

            {/* Tax Note */}
            <div className="text-[14px] leading-[26px] text-[#AEAEAE] font-cairo text-right mt-1">
                جميع أسعارنا تشمل الضريبة
            </div>

            {/* Rating & Free Shipping */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <RatingBalmy value={normalizedReviews.average_rating || 3.7} />
                    <span className="text-sm text-[var(--color-medium-gray)] font-cairo">
                        ({normalizedReviews.total || 225})
                    </span>
                </div>

                {/* Free Shipping & Original Product Section */}
                <div className="flex items-center justify-between w-full border-b border-[#F0F0F0] pb-4">
                    {/* Free Shipping Info (Right Side) */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <Truck className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-[14px] font-bold text-black font-cairo leading-none mb-1">
                                {t("free-shipping") || "شحن مجاني"}
                            </span>
                            <span className="text-[12px] text-[#AEAEAE] font-cairo leading-none">
                                مبروك شحنك علينا
                            </span>
                        </div>
                    </div>
                    {/* Original Product Badge (Left Side) */}
                    <div className="bg-black text-white text-[12px] px-3 py-1 rounded-[4px] font-cairo">
                        منتج اصلي
                    </div>


                </div>
            </div>

            {/* Size Selection */}
            <SizeSelectorBalmy
                sizes={DEFAULT_SIZES}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
            />

            {/* Action Buttons */}
            <div className="flex flex-row gap-3 w-full items-center">
                {/* Share Button */}
                <Button
                    onClick={handleShare}
                    className="w-auto px-4 h-[45px] bg-[#000000] text-[#FFFFFF] hover:bg-[#333333] font-cairo text-[24px] font-normal rounded-lg flex items-center justify-center transition-colors"
                >
                    <Share2 className="w-6 h-6" />
                </Button>
                {/* Add to Cart Button */}
                <Button
                    onClick={handleAddToCart}
                    disabled={!isInStock || isAddingToCart}
                    className="w-auto px-8 h-[45px] bg-[#000000] text-[#FFFFFF] hover:bg-[#333333] font-cairo text-[18px] lg:text-[24px] font-normal rounded-lg transition-colors"
                >
                    {isAddingToCart && pendingAction === "add" ? (
                        <BeatLoader color="#fff" size={8} />
                    ) : (
                        t("add-to-cart") || "أضف إلى السلة"
                    )}
                </Button>

                {/* Buy Now Button */}
                <Button
                    onClick={handleBuyNow}
                    disabled={!isInStock || isAddingToCart}
                    className="w-auto px-8 h-[45px] bg-[#000000] text-[#FFFFFF] hover:bg-[#333333] font-cairo text-[18px] lg:text-[24px] font-normal rounded-lg"
                >
                    {isAddingToCart && pendingAction === "buy" ? (
                        <BeatLoader color="#fff" size={8} />
                    ) : (
                        t("buy-now") || "اشترى الآن"
                    )}
                </Button>


            </div>

            {/* Delivery Info */}
            <DeliveryInfoBalmy
                estimatedDays="3-5"
                deliveryNotice={t("delivery-notice") || "توصيــل سريــــع في نجــــــران خــــلال 3 ساعـــــات"}
            />

            {/* Expandable Sections */}
            <Accordion type="multiple" className="w-full border-t border-[var(--color-light-gray-2)]">
                {/* Product Description */}
                <AccordionItem value="description" className="border-b border-[var(--color-light-gray-2)]">
                    <AccordionTrigger className="text-base font-semibold text-[var(--color-black)] font-cairo py-4 hover:no-underline">
                        {t("product-description") || "وصف المنتج"}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[var(--color-medium-gray)] font-cairo pb-4 leading-relaxed">
                        {product.description || product.short_description ||
                            "عطر فاخر من أرماني يجمع بين الأناقة والقوة. رائحة منعشة وجذابة تدوم طوال اليوم. مثالي للمناسبات الخاصة والاستخدام اليومي."}
                    </AccordionContent>
                </AccordionItem>

                {/* Contents */}
                <AccordionItem value="contents" className="border-b border-[var(--color-light-gray-2)]">
                    <AccordionTrigger className="text-base font-semibold text-[var(--color-black)] font-cairo py-4 hover:no-underline">
                        {t("contents") || "محتويات"}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[var(--color-medium-gray)] font-cairo pb-4">
                        <ul className="list-disc list-inside space-y-1">
                            <li>زجاجة عطر 100 مل</li>
                            <li>علبة فاخرة أصلية</li>
                            <li>كتيب المنتج</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Stock Status */}
            {!isInStock && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                    <span className="text-red-600 font-semibold font-cairo">
                        {t("out-of-stock") || "غير متوفر حالياً"}
                    </span>
                </div>
            )}

            {/* New/Featured Badges */}
            {(product.new || product.featured) && (
                <div className="flex gap-2">
                    {product.new && (
                        <Badge className="bg-[var(--color-green)] text-white text-xs">
                            {t("new") || "جديد"}
                        </Badge>
                    )}
                    {product.featured && (
                        <Badge className="bg-[var(--color-blue-3)] text-white text-xs">
                            {t("featured") || "مميز"}
                        </Badge>
                    )}
                </div>
            )}

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onOpenChange={(open) => {
                    setShowAuthModal(open);
                    if (!open) setPendingAction(null);
                }}
                onAuthenticated={async () => {
                    if (pendingAction === "add") {
                        await handleAddToCart();
                    } else if (pendingAction === "buy") {
                        await handleBuyNow();
                    }
                    setPendingAction(null);
                }}
            />
        </div>
    );
}
