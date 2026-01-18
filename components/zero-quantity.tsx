"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FavouriteButton } from "./favourite-button";

export default function ZeroQuantity({
  product,
  wishlistProductId,
}: {
  product: any;
  wishlistProductId: any;
}) {
  const { locale } = useParams();

  return (
    <Link  prefetch={true}    href={`/product/${wishlistProductId || product?.product_id}`} className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg z-50">
      <FavouriteButton
        product={product}
        className="cursor-pointer absolute rtl:left-2 ltr:right-2 top-2"
        FaRegHeartColor="text-white hover:text-red-500"
      />
        <Image
          src={`${
            locale === "ar"
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
