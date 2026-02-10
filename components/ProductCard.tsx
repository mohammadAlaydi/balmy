"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import StarRating from "./react-stars";
import AddToCartBtn from "./AddToCartBtn";
import RiyalSymbol from "./RiyalSymbol";

import AuthModal from "./auth/auth-modal";
import { useAppDispatch } from "@/store/hooks";
import { addToCart, setCartOpen } from "@/store/slices/cart-slice";
import FavouriteButton from "./favourite-button";

interface ProductCardProps {
  product?: any;
  cardColSpan?: string;
  brandName?: string;
  productName?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  imageUrl?: string;
  category?: string;
  rating?: number;
  isVerified?: boolean;
  onAddToCart?: () => void;

}

/* Helper Functions */
const resolveProductId = (
  product: any,
  chosenVariantId: number | string | null
): number | undefined => {
  if (product?.variants?.length) {
    return chosenVariantId
      ? Number(chosenVariantId)
      : product.variants[0]?.product_id;
  }
  // Check entityId first (raw Markatty API format), then transformed formats
  return product?.entityId || product?.product_id || product?.id;
};

export default function ProductCard({
  product,
  cardColSpan,
  brandName: initialBrandName,
  productName: initialProductName,
  price: initialPrice,
  oldPrice: initialOldPrice,
  discount: initialDiscount,
  imageUrl: initialImageUrl,
  category: initialCategory,
  rating: initialRating,
  isVerified: initialIsVerified = true,
  onAddToCart,

}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAddProductId, setPendingAddProductId] = useState<number | null>(null);
  const [chosenVariantId, setChosenVariantId] = useState<number | string | null>(null);

  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "ar";

  const dispatch = useAppDispatch();
  const t = useTranslations("products");

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  // Extract from product object if provided
  const brandName = initialBrandName ?? product?.brand?.name ?? product?.brand_name ?? "";
  const productName = initialProductName ?? product?.name ?? product?.description ?? "";
  const specialPrice = product?.special_price ? Number(product.special_price) : null;
  const rawPrice = initialPrice ?? Number(product?.price) ?? 0;
  const price = specialPrice && specialPrice > 0 ? specialPrice : rawPrice;
  const oldPrice = initialOldPrice ?? (product?.original_price ? Number(product.original_price) : (specialPrice && specialPrice > 0 ? rawPrice : (product?.price_regular?.value ? Number(product.price_regular.value) : null)));
  const discount = initialDiscount ?? product?.discount_percent ?? (oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);

  // Use backend-formatted price strings when available
  const formattedPrice = product?.formatted_price || `${price}`;
  const formattedOldPrice = product?.formatted_original_price || (oldPrice ? `${oldPrice}` : null);
  const imageUrl = initialImageUrl ?? (product?.thumbNail || product?.images?.[0]?.url || product?.image || product?.base_image?.url || "/images/card-image.png");
  const category = initialCategory ?? (typeof product?.category === "string" ? product?.category : product?.category?.name) ?? "نسائي";
  const rating = initialRating ?? (product?.rating !== undefined ? Number(product.rating) : (product?.reviews?.average_rating ?? 0));
  const isVerified = initialIsVerified !== false && product?.is_verified !== false;

  const productId = resolveProductId(product, chosenVariantId);
  const isInStock = product?.in_stock ?? product?.inStock ?? true;

  /* Add to Cart Handler */
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isInStock || isAdding) return;

    const targetId = resolveProductId(product, chosenVariantId);
    if (!targetId) {
      toast.error("معرف المنتج غير صالح");
      return;
    }

    // Check authentication
    if (!isAuthenticated) {
      setPendingAddProductId(targetId);
      setShowAuthModal(true);
      return;
    }

    try {
      setIsAdding(true);
      const promise = dispatch(
        addToCart({ productId: targetId, productQTY: 1 })
      );
      await (typeof promise.unwrap === "function" ? promise.unwrap() : promise);

      toast.success(t("added-to-cart") || "تمت الإضافة إلى السلة");
      dispatch(setCartOpen(true));

      // Call the optional callback
      onAddToCart?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={`relative w-full ${cardColSpan?.includes('search') ? 'max-w-none' : 'max-w-sm'} bg-white rounded-2xl overflow-visible hover:shadow-lg transition-shadow font-[family-name:var(--font-cairo)]`} dir="rtl">

      {/* Product Image Link */}
      <Link href={`/${locale}/product/${productId}`}>
        <div className="relative w-full aspect-square bg-gray-50 overflow-hidden cursor-pointer">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">صورة المنتج</span>
            </div>
          )}
        </div>
      </Link>

      {/* Favourite Heart Button — top-right corner */}
      <div className="absolute top-2 right-2 z-10">
        <FavouriteButton
          product={{
            id: productId || 0,
            name: productName,
            imageUrl: imageUrl,
            price: price,
            brand: brandName,
            oldPrice: oldPrice ?? undefined,
            discount: discount,
            rating: rating,
            inStock: isInStock,
          }}
          size={18}
        />
      </div>

      {/* Card Content - Split Layout */}
      <div className="p-4">
        {/* Main Details Section - Linked */}
        <Link href={`/${locale}/product/${productId}`}>
          <div className="flex items-start justify-between gap-3 mb-4 cursor-pointer">
            {/* Right Side - Primary Info */}
            <div className="flex-1 space-y-2">
              {/* Brand Name with Checkmark (only show if brand exists) */}
              {brandName && (
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-gray-900">
                    {brandName}
                  </h3>
                  {isVerified && (
                    <Image src="/assets/verified-badge.svg" alt="verified" width={16} height={16} className="w-4 h-4" />
                  )}
                </div>
              )}

              {/* Product Name - Show prominently if no brand, otherwise as subtitle */}
              <div className="flex items-center gap-2">
                <p className={`${brandName ? 'text-sm text-gray-500' : 'text-base font-bold text-gray-900'} line-clamp-2 leading-snug`}>
                  {productName}
                </p>
                {!brandName && isVerified && (
                  <Image src="/assets/verified-badge.svg" alt="verified" width={16} height={16} className="w-4 h-4" />
                )}
              </div>

              {/* Price Section */}
              <div className="flex items-baseline gap-2 pt-1">
                {/* Current Price */}
                <span className="text-xl font-bold text-gray-900">
                  {formattedPrice}
                </span>

                {/* Old Price */}
                {formattedOldPrice && oldPrice && oldPrice > price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formattedOldPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Left Side - Badges & Rating */}
            <div className="flex flex-col items-end gap-2">
              {/* Category Badge */}
              {category && (
                <div className="px-2.5 py-1 flex rounded-[7px]" style={{ background: "#B5B5B5 0% 0% no-repeat padding-box" }}>
                  <span className="text-xs font-medium text-white">
                    {category}
                  </span>
                </div>
              )}

              {/* Rating Stars */}
              <div className="flex items-center gap-1">
                <StarRating rating={rating} inline className="inline-flex" />
              </div>

              {/* Discount Badge - Under Rating */}
              {discount && (

                <div className="px-2.5 py-0.5 flex items-center bg-red rounded-full">
                  <span className="text-xs font-bold text-white">
                    {discount}%-fsddfsfds
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <AddToCartBtn
          onClick={handleAddToCart}
          disabled={isAdding || !isInStock}
          label={isAdding ? "جاري الإضافة..." : "أضف للسلة"}
        />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={(open) => {
          setShowAuthModal(open);
          if (!open) setPendingAddProductId(null);
        }}
        onAuthenticated={async () => {
          const targetId = pendingAddProductId ?? resolveProductId(product, chosenVariantId);
          if (!targetId) return;
          try {
            setIsAdding(true);
            const promise = dispatch(
              addToCart({ productId: targetId, productQTY: 1 })
            );
            await (typeof promise.unwrap === "function" ? promise.unwrap() : promise);
            toast.success(t("added-to-cart") || "تمت الإضافة إلى السلة");
            dispatch(setCartOpen(true));
            onAddToCart?.();
          } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error));
          } finally {
            setIsAdding(false);
            setPendingAddProductId(null);
          }
        }}
      />
    </div>
  );
}
