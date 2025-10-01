"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CrossBody({ ads }) {

  const t = useTranslations("home.cross-body");

  if (!ads || !Array.isArray(ads) || ads.length < 2) {
    return null;
  }

  return (
    <div className="cross-body flex flex-col md:flex-row justify-between m-auto gap-3 px-3 md:px-0  w-full  xl:max-w-[75%] py-[20px] md:py-[30px]">
      <Link href={`/${ads[0]?.ads_path}`} className="left-section flex-1  relative h-full overflow-hidden cursor-pointer">
        <Image
          width={400}
          height={400}
          className="w-full h-full transform transition-all duration-500 relative"
          src={ads[0]?.img_path}
          alt="..."
          quality={100}
        />
        <div className="absolute h-full w-full  flex flex-col gap-3 justify-center items-center top-0 left-0">
          <h2 className="text-white text-base sm:text-xl md:text-2xl xl:text-3xl hover:text-white/70 transition-all duration-500 cursor-pointer px-3 text-center">
            {ads[0]?.description}
          </h2>
        </div>
      </Link>
      <Link className="right-section overflow-hidden flex-1 flex flex-col gap-5 h-full" href={`/${ads[1]?.ads_path}`}>
        <Image
          width={400}
          height={400}
          className="w-full h-full transform transition-all duration-500 cursor-pointer relative"
          src={ads[1]?.img_path}
          alt="..."
          quality={100}
        />
        <div className="flex flex-col gap-3 justify-center items-center">
          <h2 className="text-base sm:text-xl md:text-2xl xl:text-3xl text-center">{ads[1]?.description}</h2>
        </div>
      </Link>
    </div>
  );
}
