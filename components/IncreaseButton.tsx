"use client";

import { Plus } from "lucide-react";

export type IncreaseButtonProps = {
  ariaLabel?: string;
  onClick?: () => void;
};

export default function IncreaseButton({ ariaLabel = "زيادة الكمية", onClick }: IncreaseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/30"
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}
