"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ZeroQuantity() {
  const {locale} = useParams();   
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-50">
      <Image
        src={`${locale === "ar" ? "/assets/images/ar-not-available.svg" : "/assets/images/en-not-available.svg"}`}
        alt="zero quantity"
        width={100}
        height={100}
      />
    </div>
  );
}
