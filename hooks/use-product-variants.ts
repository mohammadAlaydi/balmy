"use client";

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ProductDetailsApiResponse, ProductVariant, VariantSelection, ColorVariant, SizeVariant } from '@/types/types';

interface UseProductVariantsProps {
  product: ProductDetailsApiResponse['data'];
}

export function useProductVariants({ product }: UseProductVariantsProps) {
  const router = useRouter();
  const [selectedVariants, setSelectedVariants] = useState<VariantSelection>({
    color: product.color || null,
    size: product.size || null,
    variantId: product.id,
  });

  // Check if product has variants
  const hasVariants = useMemo(() => {
    return product.type === 'configurable' && product.variants && product.variants.length > 0;
  }, [product.type, product.variants]);

  // Group variants by color
  const colorVariants = useMemo((): ColorVariant[] => {
    if (!hasVariants || !product.variants) return [];

    const colorMap = new Map<number, ProductVariant[]>();
    
    product.variants.forEach(variant => {
      if (!colorMap.has(variant.color)) {
        colorMap.set(variant.color, []);
      }
      colorMap.get(variant.color)!.push(variant);
    });

    return Array.from(colorMap.entries()).map(([color, variants]) => ({
      color,
      color_label: variants[0].color_label,
      variants,
      base_image: variants[0].base_image,
      in_stock: variants.some(v => v.in_stock),
    }));
  }, [hasVariants, product.variants]);

  // Get available sizes for the currently selected color
  const availableSizesForSelectedColor = useMemo((): SizeVariant[] => {
    if (!hasVariants || !product.variants || selectedVariants.color === null) return [];

    const colorVariants = product.variants.filter(variant => variant.color === selectedVariants.color);
    
    const sizeMap = new Map<number, ProductVariant[]>();
    
    colorVariants.forEach(variant => {
      if (!sizeMap.has(variant.size)) {
        sizeMap.set(variant.size, []);
      }
      sizeMap.get(variant.size)!.push(variant);
    });

    return Array.from(sizeMap.entries()).map(([size, variants]) => ({
      size,
      size_label: variants[0].size_label,
      variants,
      in_stock: variants.some(v => v.in_stock),
    }));
  }, [hasVariants, product.variants, selectedVariants.color]);

  // Get current variant based on selection
  const currentVariant = useMemo((): ProductVariant | null => {
    if (!hasVariants || !product.variants) return null;

    return product.variants.find(variant => 
      variant.color === selectedVariants.color && 
      variant.size === selectedVariants.size
    ) || null;
  }, [hasVariants, product.variants, selectedVariants]);

  // Handle color change
  const handleColorChange = useCallback((color: number) => {
    if (!hasVariants || !product.variants) return;

    // Find the first available variant for this color
    const availableVariant = product.variants.find(variant => 
      variant.color === color && variant.in_stock
    ) || product.variants.find(variant => variant.color === color);

    if (availableVariant) {
      const newSelection: VariantSelection = {
        color,
        size: availableVariant.size,
        variantId: availableVariant.id,
      };
      
      setSelectedVariants(newSelection);
      
      // Navigate to the variant URL
      router.push(`/product/${availableVariant.id}`);
    }
  }, [hasVariants, product.variants, router]);

  // Handle size change
  const handleSizeChange = useCallback((size: number) => {
    if (!hasVariants || !product.variants || selectedVariants.color === null) return;

    // Find a variant with current color and this size
    const availableVariant = product.variants.find(variant => 
      variant.color === selectedVariants.color && 
      variant.size === size
    );

    if (availableVariant) {
      const newSelection: VariantSelection = {
        color: selectedVariants.color,
        size,
        variantId: availableVariant.id,
      };
      
      setSelectedVariants(newSelection);
      
      // Navigate to the variant URL
      router.push(`/product/${availableVariant.id}`);
    }
  }, [hasVariants, product.variants, selectedVariants.color, router]);

  // Check if a variant is available
  const isVariantAvailable = useCallback((color: number, size: number): boolean => {
    if (!hasVariants || !product.variants) return false;
    
    return product.variants.some(variant => 
      variant.color === color && 
      variant.size === size && 
      variant.in_stock
    );
  }, [hasVariants, product.variants]);

  // Get available sizes for a color
  const getAvailableSizesForColor = useCallback((color: number): number[] => {
    if (!hasVariants || !product.variants) return [];
    
    return product.variants
      .filter(variant => variant.color === color && variant.in_stock)
      .map(variant => variant.size);
  }, [hasVariants, product.variants]);

  // Get available colors for a size
  const getAvailableColorsForSize = useCallback((size: number): number[] => {
    if (!hasVariants || !product.variants) return [];
    
    return product.variants
      .filter(variant => variant.size === size && variant.in_stock)
      .map(variant => variant.color);
  }, [hasVariants, product.variants]);

  return {
    hasVariants,
    colorVariants,
    availableSizesForSelectedColor,
    currentVariant,
    selectedVariants,
    handleColorChange,
    handleSizeChange,
    isVariantAvailable,
    getAvailableSizesForColor,
    getAvailableColorsForSize,
  };
}
