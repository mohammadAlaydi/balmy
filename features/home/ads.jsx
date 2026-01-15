import Image from "next/image";
import Link from "next/link";

export default function Ads({ ads }) {

  if (!ads || !Array.isArray(ads) || ads.length < 2) {
    return null;
  }

  return (
    <div className="cross-body flex flex-col md:flex-row justify-between m-auto gap-3 px-3 md:px-0 w-full xl:max-w-[75%] py-5">
      {/* Ad 1 */}
      <a
        href={`${ads[0]?.ads_path || "#"}`}
        className="relative w-full md:w-1/2 overflow-hidden rounded-lg group"
      >
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={ads[0]?.img_path || "/assets/images/no-image.webp"}
            alt="Advertisement 1"
            fill
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            
          />
        </div>
      </a>

      {/* Ad 2 */}
      <a
        href={`${ads[1]?.ads_path || "#"}`}
        className="relative w-full md:w-1/2 overflow-hidden rounded-lg group"
      >
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={ads[1]?.img_path || "/assets/images/no-image.webp"}
            alt="Advertisement 2"
            fill
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
      </a>
    </div>

  );
}
