"use client";

import { ShoppingCart } from "lucide-react";

interface AddToCartBtnProps {
  onClick?: (e: React.MouseEvent) => void;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function AddToCartBtn({
  onClick,
  label = "أضف للسلة",
  icon,
  disabled = false,
  className = "",
}: AddToCartBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-11 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={label}
    >
      <span className="text-sm font-medium text-gray-800">
        {label}
      </span>
      {icon || <ShoppingCart className="w-5 h-5 text-gray-700" />}

    </button>
  );
}
