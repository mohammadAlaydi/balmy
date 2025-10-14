"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
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
  variant?: "default" | "outline" | "ghost";
  className?: string;
  showText?: boolean;
}

export function FavouriteButton({
  product,
  size = "default",
  variant = "ghost",
  className,
  showText = false,
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
      if (isFav) {
        await removeFromFavourites(targetId);
        toast.success(tFav("productRemoved"));
      } else {
        await addToFavourites(normalizedProduct as any);
        toast.success(tProducts("added-to-favorites"));
      }
    } catch (error) {
      // Handle authentication errors gracefully
      if (error && typeof error === "string" && error.includes("login")) {
        setAuthModalOpen(true);
        // Don't redirect automatically, let user decide
      } else {
        toast.error(tButtons("error"));
      }
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleToggle}
        className={cn(
          "transition-all duration-200",
          isFav && "text-red-500 hover:text-red-600",
          !isFav && "text-gray-400 hover:text-red-500",
          size === "sm" && "p-1",
          !isAuthenticated && "opacity-80 hover:opacity-100",
          className
        )}
        aria-label={isFav ? tPD("remove-from-favorites") : tPD("add-to-favorites")}
        title={
          !isAuthenticated
            ? tFav("login-to-manage-favourites")
            : isFav
            ? tPD("remove-from-favorites")
            : tPD("add-to-favorites")
        }
      >
        {isFav ? (
          <FaHeart
            className={cn(
              iconSizes[size],
              "transition-all duration-200 text-red-500"
            )}
          />
        ) : (
          <FaRegHeart
            className={cn(
              iconSizes[size],
              "transition-all duration-200 text-gray-500 group-hover:text-red-500"
            )}
          />
        )}
        {showText && (
          <span className="ml-2">{isFav ? tPD("remove-from-favorites") : tPD("add-to-favorites")}</span>
        )}
      </Button>

      <AuthModal
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onAuthenticated={async () => {
          try {
            await addToFavourites(normalizedProduct as any);
            toast.success(tProducts("added-to-favorites"));
          } catch {
            // no-op, errors are already handled with toasts above
          }
        }}
      />
    </>
  );
}
