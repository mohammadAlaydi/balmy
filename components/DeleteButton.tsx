"use client";

import { Trash2 } from "lucide-react";

export type DeleteButtonProps = {
  ariaLabel?: string;
  onClick?: () => void;
};

export default function DeleteButton({ ariaLabel = "حذف المنتج", onClick }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex h-10 w-10 items-center justify-center bg-white text-black transition hover:bg-light-gray "
    >
      <Trash2 className="h-8 w-8" style={{ color: '#000000' }} />
    </button>
  );
}
