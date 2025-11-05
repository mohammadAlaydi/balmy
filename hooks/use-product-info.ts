"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import toast from "react-hot-toast";

export default function UseProductInfo(
  currentVariant,
  product,
  hasVariants,
  colorVariants,
  availableSizesForSelectedColor,
  selectedVariants,
  handleColorChange,
  handleSizeChange
) {
  const t = useTranslations("product-details");
  const tProducts = useTranslations("products");
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAddProductId, setPendingAddProductId] = useState<number | null>(
    null
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const {
    data: cartData,
    increaseOrDecreaseResponse,
    increaseOrDecreaseLoading,
  } = useSelector((state: any) => state.cart);

  const handleUpdateQuantity = async (productId: number, qtyChange: number) => {
    try {
      setLoadingProductId(productId);
      await dispatch(
        addToCart({
          productId,
          productQTY: qtyChange,
        })
      );
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      const targetId = currentVariant?.product_id || product.product_id;
      if (targetId) setPendingAddProductId(Number(targetId));
      setShowAuthModal(true);
      return;
    }

    const productIdToAdd = currentVariant?.product_id || product.product_id;
    if (!productIdToAdd) return;

    try {
      setIsAddingToCart(true);
      const promise = dispatch(
        addToCart({ productId: productIdToAdd, productQTY: quantity })
      );

      if (typeof promise?.unwrap === "function") {
        await promise.unwrap();
      } else {
        await promise;
      }

      toast.success(tProducts("added-to-cart"));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage || tProducts("failed-to-add-to-cart"));
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description ?? undefined,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("link-copied"), { duration: 2000 });
    }
  };

  const normalizePrice = (
    value: string | number | null | undefined
  ): number | null => {
    if (value === null || value === undefined) return null;
    const n = typeof value === "number" ? value : parseFloat(value);
    return Number.isFinite(n) ? n : null;
  };

  // Use current variant price if available, otherwise use product price
  // Pricing logic: prefer selected variant, otherwise derive from variants
  const variantPrice = normalizePrice(currentVariant?.price ?? null);
  const variantSpecial = normalizePrice(currentVariant?.special_price ?? null);
  const productPrice = normalizePrice(product.price);
  const productSpecial = normalizePrice(product.special_price);

  // If configurable and product price is null, compute min price from variants
  const minVariantPrice = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return null;
    const prices = product.variants
      .map((v) => normalizePrice(v.special_price ?? v.price))
      .filter((n): n is number => n !== null);
    if (prices.length === 0) return null;
    return Math.min(...prices);
  }, [product.variants]);

  const effectivePrice = variantPrice ?? productPrice ?? minVariantPrice ?? 0;
  const effectiveSpecial = (() => {
    const sp = variantSpecial ?? productSpecial;
    return sp !== null && sp < effectivePrice ? sp : null;
  })();
  const hasDiscount = effectiveSpecial !== null;

  // Derive quantity already in cart for this product (if present)
  const targetProductId = useMemo(
    () => currentVariant?.product_id || product.product_id,
    [currentVariant?.product_id, product.product_id]
  );

  const cartQuantityForProduct = useMemo(() => {
    if (!targetProductId) return null;
    const fromStore = increaseOrDecreaseResponse?.data?.items?.find(
      (i: any) => i?.additional?.product_id === Number(targetProductId)
    )?.quantity;
    const fromCart = cartData?.data?.items?.find(
      (i: any) =>
        i?.additional?.product_id === Number(targetProductId) ||
        i?.product?.product_id === Number(targetProductId)
    )?.quantity;
    const candidate = fromStore ?? fromCart;
    if (candidate == null) return null;
    const n =
      typeof candidate === "string" ? parseInt(candidate, 10) : candidate;
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [cartData, increaseOrDecreaseResponse, targetProductId]);

  // Use cart quantity if product is already in cart, otherwise use local quantity
  const displayedQuantity = cartQuantityForProduct ?? quantity;

  return {
    hasDiscount,
    effectiveSpecial,
    effectivePrice,
    t,
    currentVariant,
    hasVariants,
    colorVariants,
    availableSizesForSelectedColor,
    selectedVariants,
    handleColorChange,
    handleSizeChange,
    loadingProductId,
    increaseOrDecreaseLoading,
    cartQuantityForProduct,
    setQuantity,
    handleUpdateQuantity,
    displayedQuantity,
    handleAddToCart,
    isAddingToCart,
    handleShare,
    showAuthModal,
    setShowAuthModal,
    setPendingAddProductId,
    pendingAddProductId,
    setIsAddingToCart,
    dispatch,
    quantity,
    tProducts,
  };
}
