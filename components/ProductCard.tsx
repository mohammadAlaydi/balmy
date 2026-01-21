"use client";

import { ShoppingCart, Heart, Star, BadgeCheck } from "lucide-react";

interface ProductCardProps {
  brandName?: string;
  productName?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  imageUrl?: string;
  category?: string;
  rating?: number;
  isVerified?: boolean;
}

export default function ProductCard({
  brandName = "جورجيو أرماني",
  productName = "جورجيو أرماني إمبريو أرماني سترونجر ويذ يو إنتنسلي",
  price = 480,
  oldPrice = 780,
  discount = 20,
  imageUrl = "/images/card-image.png",
  category = "رجـــالي",
  rating = 5,
  isVerified = true,
}: ProductCardProps) {
  return (
    <div className="relative w-full max-w-sm bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow" dir="rtl">
      {/* Card Header - Heart and Category Badge */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
        {/* Heart Icon - Top Left */}
        <button
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>

        {/* Category Badge - Top Right */}
        {category && (
          <div className="px-3 py-1 bg-gray-100 rounded-md">
            <span className="text-xs font-medium text-gray-700">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-lg">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={productName} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">صورة المنتج</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Brand Name with Checkmark */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {brandName}
          </h3>
          {isVerified && (
            <BadgeCheck className="w-5 h-5 fill-blue-500 text-white flex-shrink-0" />
          )}
        </div>

        {/* Product Description */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {productName}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Current Price */}
            <span className="text-xl font-bold text-gray-900">
              {price} ريال
            </span>

            {/* Old Price */}
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {oldPrice}
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discount && (
            <div className="px-2.5 py-1 bg-red-500 rounded-full">
              <span className="text-xs font-bold text-white">
                {discount}%-
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full h-12 border-2 border-gray-800 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 hover:text-white transition-colors group"
        >
          <ShoppingCart className="w-5 h-5 text-gray-800 group-hover:text-white transition-colors" />
          <span className="text-sm font-medium text-gray-800 group-hover:text-white transition-colors">
            أضف للسلة
          </span>
        </button>
      </div>
    </div>
  );
}
