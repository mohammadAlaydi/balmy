"use client";

import React from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import useFavourites, {
    type FavouriteProduct,
} from "@/hooks/use-favourites";

interface FavouriteButtonProps {
    product: FavouriteProduct;
    /** Icon size in px (default 20) */
    size?: number;
    /** Extra classes applied to the wrapper button */
    className?: string;
}

export default function FavouriteButton({
    product,
    size = 20,
    className = "",
}: FavouriteButtonProps) {
    const { isFavourite, toggleFavourite } = useFavourites();
    const t = useTranslations("favourites");

    const active = isFavourite(product.id);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const nowFav = toggleFavourite(product);

        if (nowFav) {
            toast.success(t("addedToFavourites") || "تمت الإضافة إلى المفضلة");
        } else {
            toast(t("removedFromFavourites") || "تمت الإزالة من المفضلة", {
                icon: "💔",
            });
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={
                active
                    ? t("removeFromFavourites") || "إزالة من المفضلة"
                    : t("addToFavourites") || "أضف إلى المفضلة"
            }
            className={`
        group relative flex items-center justify-center
        w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm
        shadow-sm border border-gray-100
        transition-all duration-200 ease-out
        hover:scale-110 hover:shadow-md
        active:scale-95
        ${className}
      `}
        >
            <Heart
                size={size}
                data-favourite-active={active ? "true" : undefined}
                className="transition-all duration-300 ease-out"
                style={{
                    transform: active ? "scale(1.1)" : "scale(1)",
                }}
                strokeWidth={active ? 1.5 : 2}
            />

            {/* Pulse animation on toggle */}
            {active && (
                <span className="absolute inset-0 rounded-full animate-ping bg-red-400/20 pointer-events-none" />
            )}
        </button>
    );
}
