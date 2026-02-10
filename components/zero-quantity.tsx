"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ZeroQuantity({
  product,
}: {
  product: any;
}) {
  const params = useParams();
  const locale = params?.locale;

  return (
    <Link prefetch={true} href={`/product/${product?.product_id}`} className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg z-50">
      <Image
        src={`${locale === "ar"
          ? "/assets/images/ar-not-available.svg"
          : "/assets/images/en-not-available.svg"
          }`}
        alt="zero quantity"
        width={100}
        height={100}
      />
    </Link>
  );
}
