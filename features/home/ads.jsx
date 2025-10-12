import Image from "next/image";
import Link from "next/link";

export default function Ads({ ads }) {

  if (!ads || !Array.isArray(ads) || ads.length < 2) {
    return null;
  }

  return (
    <div className="cross-body flex flex-col md:flex-row justify-between m-auto gap-3 px-3 md:px-0  w-full  xl:max-w-[75%] py-[20px] md:py-[30px]">
      <Link href={`/${ads[0]?.ads_path}`} className="cursor-pointer w-full overflow-hidden">
        <Image
          width={400}
          height={400}
          className="w-full h-full transform transition-all duration-500 relative hover:scale-105"
          src={ads[0]?.img_path}
          alt="..."
          quality={100}
        />
      </Link>
      <Link className="cursor-pointer w-full overflow-hidden" href={`/${ads[1]?.ads_path}`}>
        <Image
          width={400}
          height={400}
          className="w-full h-full transform transition-all duration-500 cursor-pointer relative hover:scale-105"
          src={ads[1]?.img_path}
          alt="..."
          quality={100}
        />
      </Link>
    </div>
  );
}
