import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product-card";

export default function CarouselComponent({ products }: { products: any[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem className="basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
