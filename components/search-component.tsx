"use client";

import { Badge } from "./ui/badge";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import ProductCard from "./product-card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchProducts } from "@/store/slices/search-products-slice";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const SearchComponent = ({
  maxHeight,
}: {
  maxHeight?: string;
}) => {
  const t = useTranslations("search");
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);
  const { products, isLoading, error } = useSelector(
    (state: any) => state.searchProducts
  );
  const suggestions = ["نعال", "حذاء", "شماغ"]; // Using hardcoded suggestions for now
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(
    products?.data || []
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    setFilteredProducts(
      products?.data?.filter((product: any) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, categoryIndex]);

  useEffect(() => {
    dispatch(getSearchProducts() as any);
  }, [search, categoryIndex]);
  return (
    <div
      className={`w-full h-full flex flex-col gap-5 py-3 ${
        maxHeight || "h-full"
      }`}
    >
      <div className="w-full relative mt-4">
        <Input
          type="text"
          placeholder={t("search-placeholder")}
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="cursor-pointer absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2 text-sm" />
      </div>
              <p>{t("suggested-words")}</p>
      <div className="flex flex-wrap gap-2">
        {suggestions?.map((suggestion: string, index: number) => (
          <Badge
            key={index}
            className={`py-0.5 px-2 text-sm cursor-pointer bg-white border border-gray-200 rounded-md text-black py-1 px-3 ${
              index == categoryIndex ? "bg-black text-white" : ""
            }`}
            onClick={() => {
              setSearch(suggestion);
              setCategoryIndex(index);
            }}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
      <div className="w-full h-full grid grid-cols-12 gap-2 overflow-y-auto justify-center ">
        {filteredProducts?.map((product: any, index: number) => (
          <ProductCard
            key={index}
            product={product}
            cardColSpan="col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-3"
          />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
