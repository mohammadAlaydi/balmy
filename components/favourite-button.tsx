"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavourites } from "@/hooks/use-favourites";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import AuthModal from "@/components/auth/auth-modal";
import { useTranslations } from "next-intl";

interface FavouriteButtonProps {
  product: any;
  size?: "sm" | "default" | "lg";
  className?: string;
  showText?: boolean;
  FaRegHeartColor?: string;
}

export function FavouriteButton({
  product,
  size = "default",
  className,
  showText = false,
  FaRegHeartColor,
}: FavouriteButtonProps) {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavourites();
  const targetId = (product?.id ?? product?.product_id) as number;
  const normalizedProduct = product?.id
    ? product
    : { ...product, id: targetId };
  const isFav = isFavourite(targetId);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tFav = useTranslations("favourites");
  const tPD = useTranslations("product-details");
  const tProducts = useTranslations("products");
  const tButtons = useTranslations("buttons");

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    try {
      setIsLoading(true);
      if (isFav) {
        await removeFromFavourites(targetId);
        toast.success(tFav("productRemoved"));
      } else {
        await addToFavourites(normalizedProduct as any);
        toast.success(tProducts("added-to-favorites"));
      }
    } catch {
      toast.error(tButtons("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const iconSizes = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <>
      <div
        onClick={handleToggle}
        className={cn(
          "transition-all duration-200 flex items-center justify-center cursor-pointer",
          className
        )}
      >
        {isLoading || isFav ? (
          <FaHeart
            className={cn(
              iconSizes[size],
              "text-red-500 transition-all duration-200",
              isLoading && "animate-pulse"
            )}
          />
        ) : (
          <FaRegHeart
            className={cn(
              iconSizes[size],
              FaRegHeartColor || "text-black",
              "hover:text-red-500 transition-all duration-200"
            )}
          />
        )}

        {showText && (
          <span className="ml-2">
            {isFav ? tPD("remove-from-favorites") : tPD("add-to-favorites")}
          </span>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onAuthenticated={async () => {
          try {
            setIsLoading(true);
            await addToFavourites(normalizedProduct as any);
            toast.success(tProducts("added-to-favorites"));
          } finally {
            setIsLoading(false);
          }
        }}
      />
    </>
  );
}
