"use client";

import { useState, useMemo, useCallback } from 'react';
import { ProductDetailsApiResponse, ProductVariant, VariantSelection, ColorVariant, SizeVariant } from '@/types/types';

interface UseProductVariantsProps {
  product: ProductDetailsApiResponse['data'];
}

export function useProductVariants({ product }: UseProductVariantsProps) {
  const [selectedVariants, setSelectedVariants] = useState<VariantSelection>({
    color: product.color || null,
    size: product.size || null,
    variantId: null,
  });

  // Check if product has variants
  const hasVariants = useMemo(() => {
    return product.type === 'configurable' && product.variants && product.variants.length > 0;
  }, [product.type, product.variants]);

  // Group variants by color using concrete variants and ensure we include
  // all colors from attributes, even if none exist for this product
  const colorVariants = useMemo((): ColorVariant[] => {
    if (product.type !== 'configurable') return [];

    const colorsFromAttributes: string[] = (product.variants_labels?.attributes?.color || []).filter((c): c is string => typeof c === 'string');

    // Group concrete variants by color code
    const byColorCode = new Map<number, ProductVariant[]>();
    (product.variants || []).forEach(variant => {
      if (typeof variant.color !== 'number') return;
      if (!byColorCode.has(variant.color)) byColorCode.set(variant.color, []);
      byColorCode.get(variant.color)!.push(variant);
    });

    // Helper to find variants by color label
    const findVariantsByColorLabel = (label: string): ProductVariant[] => {
      return (product.variants || []).filter(v => (v.color_label || '').toLowerCase() === String(label || '').toLowerCase());
    };

    // Start with concrete colors
    const concreteColors: ColorVariant[] = Array.from(byColorCode.entries()).map(([color, variants]) => ({
      color,
      color_label: variants[0].color_label || String(color),
      variants,
      base_image: variants[0].base_image || product.base_image,
      in_stock: variants.some(v => v.in_stock),
    }));

    // Ensure every attribute color exists; add disabled placeholders when missing
    const result: ColorVariant[] = [...concreteColors];
    colorsFromAttributes.forEach((label, index) => {
      const exists = result.some(cv => (cv.color_label || '').toLowerCase() === String(label || '').toLowerCase());
      if (!exists) {
        const variantsByLabel = findVariantsByColorLabel(String(label ?? ''));
        const representative = variantsByLabel[0];
        result.push({
          color: representative?.color ?? -(index + 1), // synthetic id
          color_label: String(label ?? ''),
          variants: variantsByLabel,
          base_image: representative?.base_image || product.base_image,
          in_stock: variantsByLabel.some(v => v.in_stock) && variantsByLabel.length > 0,
        });
      }
    });

    return result;
  }, [product.type, product.variants, product.variants_labels, product.base_image]);

  // Get available sizes for the currently selected color
  const availableSizesForSelectedColor = useMemo((): SizeVariant[] => {
    if (product.type !== 'configurable') return [];

    const sizesFromAttributes: string[] = (product.variants_labels?.attributes?.size || []).filter((s): s is string => typeof s === 'string');

    // Helper to find variants that match constraints
    const findVariantsFor = (sizeLabel: string) => {
      return (product.variants || []).filter(v => {
        const sizeMatches = (v.size_label || '').toLowerCase() === String(sizeLabel || '').toLowerCase();
        const colorMatches = selectedVariants.color === null ? true : v.color === selectedVariants.color;
        return sizeMatches && colorMatches;
      });
    };

    // If there are concrete variants but no attributes, derive unique sizes from them
    if (sizesFromAttributes.length === 0 && product.variants && product.variants.length > 0) {
      const sizeMap = new Map<number, ProductVariant[]>();
      (selectedVariants.color === null ? product.variants : product.variants.filter(v => v.color === selectedVariants.color)).forEach(v => {
        if (typeof v.size !== 'number') return;
        if (!sizeMap.has(v.size)) sizeMap.set(v.size, []);
        sizeMap.get(v.size)!.push(v);
      });
      return Array.from(sizeMap.entries()).map(([size, variants]) => ({
        size,
        size_label: variants[0].size_label || String(size),
        variants,
        in_stock: variants.some(v => v.in_stock),
      }));
    }

    // Build sizes from attributes, marking availability
    return sizesFromAttributes.map((label, index) => {
      const matchedVariants = findVariantsFor(String(label ?? ''));
      const representative = matchedVariants[0];
      return {
        size: representative?.size ?? -(index + 1), // synthetic id if none exists
        size_label: String(label ?? ''),
        variants: matchedVariants,
        in_stock: matchedVariants.some(v => v.in_stock) && matchedVariants.length > 0,
      } as SizeVariant;
    });
  }, [product.type, product.variants_labels, product.variants, selectedVariants.color]);

  // Get current variant based on selection
  const currentVariant = useMemo((): ProductVariant | null => {
    if (!hasVariants || !product.variants) return null;

    // Prefer exact match
    const exact = product.variants.find(
      (v) => v.color === selectedVariants.color && v.size === selectedVariants.size
    );
    if (exact) return exact;

    // If only color selected, pick first available of that color
    if (selectedVariants.color !== null) {
      const byColor = product.variants.find((v) => v.color === selectedVariants.color && v.in_stock);
      if (byColor) return byColor;
    }

    // If only size selected, pick first available of that size
    if (selectedVariants.size !== null) {
      const bySize = product.variants.find((v) => v.size === selectedVariants.size && v.in_stock);
      if (bySize) return bySize;
    }

    return null;
  }, [hasVariants, product.variants, selectedVariants]);

  // Handle color change
  const handleColorChange = useCallback((color: number) => {
    if (!hasVariants || !product.variants) return;

    // Try to keep current size if it exists for the new color
    const withCurrentSize = product.variants.find(
      (v) => v.color === color && (selectedVariants.size === null || v.size === selectedVariants.size)
    );
    if (withCurrentSize) {
      setSelectedVariants({
        color,
        size: (withCurrentSize.size ?? null) as number | null,
        variantId: withCurrentSize.id ?? null,
      });
      return;
    }

    // Otherwise pick the first available for this color
    const firstForColor = product.variants.find((v) => v.color === color);
    setSelectedVariants({
      color,
      size: (firstForColor?.size ?? null) as number | null,
      variantId: firstForColor?.id ?? null,
    });
  }, [hasVariants, product.variants, selectedVariants.size]);

  // Handle size change
  const handleSizeChange = useCallback((size: number) => {
    if (!hasVariants || !product.variants) return;

    if (selectedVariants.color !== null) {
      const availableVariant = product.variants.find(
        (v) => v.color === selectedVariants.color && v.size === size
      );
      if (availableVariant) {
        setSelectedVariants({ color: selectedVariants.color, size, variantId: availableVariant.id });
      } else {
        setSelectedVariants({ color: selectedVariants.color, size, variantId: null });
      }
      return;
    }

    // No color selected yet: pick the first color that supports this size
    const firstWithSize = product.variants.find((v) => v.size === size);
    setSelectedVariants({
      color: (firstWithSize?.color ?? null) as number | null,
      size,
      variantId: firstWithSize?.id ?? null,
    });
  }, [hasVariants, product.variants, selectedVariants.color]);

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
      .filter(variant => variant.color === color && variant.in_stock && typeof variant.size === 'number')
      .map(variant => variant.size as number);
  }, [hasVariants, product.variants]);

  // Get available colors for a size
  const getAvailableColorsForSize = useCallback((size: number): number[] => {
    if (!hasVariants || !product.variants) return [];
    
    return product.variants
      .filter(variant => variant.size === size && variant.in_stock && typeof variant.color === 'number')
      .map(variant => variant.color as number);
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
