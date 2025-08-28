import Link from "next/link";
import React from "react";
import CarouselComponent from "./carousel-component";
import { products } from "@/static-data/static-data";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { Badge } from "./ui/badge";

export default function QuickProductDetails({ product }: { product: any }) {
  return (
    <div className="flex flex-col gap-4 h-full items-center">
      {" "}
      <CarouselComponent
        slidesPerView={1}
        spaceBetween={10}
        containerClassName="w-full"
        navigation={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </CarouselComponent>
      <div className="flex flex-col gap-4 h-full w-full">
        <h2 className="text-2xl font-[650]">{product.name}</h2>
        <p className="text-lg text-gray-color">{product.code}</p>
        <p className="text-lg text-gray-color">{product.price} ج.م</p>
        <div className="variant flex flex-col gap-5">
          <div className="colors flex flex-col gap-3 flex-wrap">
            <h2 className="text-lg font-[650]">اختر لون المنتج</h2>
            <div className="flex gap-2">
              <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                احمر
              </Badge>
              <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                احمر
              </Badge>
              <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                احمر
              </Badge>
            </div>
          </div>
          <div className="size flex flex-col gap-3 flex-wrap">
            <h2 className="text-lg font-[650]">اختر مقاس المنتج</h2>
            <div className="flex gap-2">
              <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                md
              </Badge>
              <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                sm
              </Badge>
              <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                lg
              </Badge>
            </div>
          </div>
          <div className="thickness flex flex-col gap-3 flex-wrap">
            <h2 className="text-lg font-[650]">اختر سمك المنتج</h2>
            <div className="flex gap-2">
              <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                1
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-color">متوفر في المخزن</p>
      </div>
      <div className="flex gap-2">
        <Link
          href="/cart"
          className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          اضف للسلة
        </Link>
        <Link
          href="/favourits"
          className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          الذهاب للمفضلة
        </Link>
      </div>
      <Link
        href="/favourits"
        className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300 text-center w-full"
      >
        عربة التسوق
      </Link>
    </div>
  );
}
