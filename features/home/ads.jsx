import Image from "next/image";
import Link from "next/link";
import { isEnvagloCdnUrl, normalizeRemoteImageUrl } from "@/lib/utils";

export default function Ads({ ads }) {

  if (!ads || !Array.isArray(ads) || ads.length < 2) {
    return null;
  }

  const ad1Src =
    normalizeRemoteImageUrl(ads[0]?.img_path) || "/assets/images/no-image.webp";
  const ad2Src =
    normalizeRemoteImageUrl(ads[1]?.img_path) || "/assets/images/no-image.webp";

  return (
    <div className="cross-body grid grid-cols-12 m-auto gap-3 sm:gap-5 md:gap-8 lg:gap-10 px-3 md:px-0 w-full py-5">
      {/* Ad 1 */}
      <a
        href={`${ads[0]?.ads_path || "#"}`}
        className="relative col-span-12 md:col-span-6 lg:col-span-7 group"
      >
        <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[380px] lg:h-[450px] xl:h-[520px] rounded-lg overflow-hidden shadow-md">
          <Image
            src={ad1Src}
            alt="Advertisement 1"
            fill
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 58vw, 700px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            unoptimized={isEnvagloCdnUrl(ad1Src)}
          />
        </div>
      </a>

      {/* Ad 2 */}
      <a
        href={`${ads[1]?.ads_path || "#"}`}
        className="relative col-span-12 md:col-span-6 lg:col-span-5 group"
      >
        <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[380px] lg:h-[450px] xl:h-[520px] rounded-lg overflow-hidden shadow-md">
          <Image
            src={ad2Src}
            alt="Advertisement 2"
            fill
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 42vw, 500px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            unoptimized={isEnvagloCdnUrl(ad2Src)}
          />
        </div>
      </a>
    </div>

  );
}
