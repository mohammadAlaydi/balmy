import Image from "next/image";

export default function CrossBody() {
  
  return (
    <div className="cross-body flex flex-col md:flex-row justify-between m-auto gap-3 px-3 md:px-0  w-full  xl:max-w-[75%] py-[20px] md:py-[30px]">
      <div className="left-section flex-1  relative h-full overflow-hidden cursor-pointer">
        <Image
          width={400}
          height={400}
          className="w-full h-full transform transition-all duration-500 relative"
          src="/assets/images/cross-body-01.jpg"
          alt="..."
          quality={100}
        />
        <div className="absolute h-full w-full  flex flex-col gap-3 justify-center items-center top-0 left-0">
          <h2 className="text-white text-base sm:text-xl md:text-2xl xl:text-3xl hover:text-white/70 transition-all duration-500 cursor-pointer px-3 text-center">
            كن أنت الرمز , دع أناقتك تتحدث عنك
          </h2>
        </div>
      </div>
      <div className="right-section overflow-hidden flex-1 flex flex-col gap-5 h-full">
        <Image
          width={400}
          height={400}
          className="w-full h-full transform transition-all duration-500 cursor-pointer relative"
          src="/assets/images/cross-body-02.jpg"
          alt="..."
          quality={100}
        />
        <div className="flex flex-col gap-3 justify-center items-center">
          <h2 className="text-base sm:text-xl md:text-2xl xl:text-3xl text-center">تميز بأسلوبك ... تألق بفخامتك</h2>
          <p className="text-center">خطواتك مع فرادا...راحة وأناقة
          </p>
        </div>
      </div>
    </div>
  );
}
