"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import StarRating from "./react-stars";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import AddToCartBtn from "./AddToCartBtn";
import RiyalSymbol from "./RiyalSymbol";

interface ProductCardProps {
  product?: any;
  cardColSpan?: string;
  wishlistId?: string | number;
  wishlistProductId?: string | number;
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
  onToggleFavorite?: () => void;
}

export default function ProductCard({
  product,
  cardColSpan,
  wishlistId,
  wishlistProductId,
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
  onToggleFavorite,
}: ProductCardProps) {
  const [favorited, setFavorited] = useState(false);

  // Extract from product object if provided
  const brandName = initialBrandName ?? product?.brand?.name ?? product?.brand_name ?? "توم فورد";
  const productName = initialProductName ?? product?.name ?? product?.description ?? "أومبري ليذر أو دو برفيوم";
  const price = initialPrice ?? Number(product?.price) ?? 749;
  const oldPrice = initialOldPrice ?? (product?.original_price || product?.price_regular?.value) ?? (price > 0 ? price * 1.3 : 480);
  const discount = initialDiscount ?? product?.discount_percent ?? (oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);
  const imageUrl = initialImageUrl ?? (product?.images?.[0]?.url || product?.image || "/images/card-image.png");
  const category = initialCategory ?? (typeof product?.category === "string" ? product?.category : product?.category?.name) ?? "نسائي";
  const rating = initialRating ?? Number(product?.rating || product?.reviews?.average_rating || 5);
  const isVerified = initialIsVerified !== false && product?.is_verified !== false;

  const productId = product?.product_id || product?.id || "#";

  return (
    <div className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow font-[family-name:var(--font-cairo)]" dir="rtl">
      {/* Wishlist Icon - Top Left (Absolute) */}
      <div className="absolute top-3 left-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavorited((s) => !s);
            onToggleFavorite?.();
          }}
          aria-pressed={favorited}
          className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
          aria-label={favorited ? "Remove favorite" : "Add to favorites"}
        >
          {favorited ? (
            <FaHeart className="w-8 h-8 text-red" />
          ) : (
            <CiHeart className="w-8 h-8 text-gray-600" />
          )}
        </button>
      </div>

      {/* Product Image Link */}
      <Link href={`/product/${productId}`}>
        <div className="relative w-full aspect-square bg-gray-50 overflow-hidden cursor-pointer">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">صورة المنتج</span>
            </div>
          )}
        </div>
      </Link>

      {/* Card Content - Split Layout */}
      <div className="p-4">
        {/* Main Details Section - Linked */}
        <Link href={`/product/${productId}`}>
          <div className="flex items-start justify-between gap-3 mb-4 cursor-pointer">
            {/* Right Side - Primary Info */}
            <div className="flex-1 space-y-2">
              {/* Brand Name with Checkmark */}
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-gray-900">
                  {brandName}
                </h3>
                {isVerified && (
                  <Image src="/assets/verified-badge.svg" alt="verified" width={16} height={16} className="w-4 h-4" />
                )}
              </div>

              {/* Product Name */}
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 line-clamp-2 leading-snug">
                  {productName}
                </p>
              </div>

              {/* Price Section */}
              <div className="flex items-baseline gap-2 pt-1">
                {/* Current Price */}
                <span className="text-xl font-bold text-gray-900 flex items-center gap-1">
                  {price}
                  <RiyalSymbol className="w-3 h-3" />
                </span>

                {/* Old Price */}
                {oldPrice && (
                  <span className="text-sm text-gray-400 line-through flex items-center gap-1">
                    {oldPrice}
                    <RiyalSymbol className="w-2.5 h-2.5" />
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
                    {discount}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <AddToCartBtn onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onAddToCart?.();
        }} />
      </div>
    </div>
  );
}
