import { Badge } from "./ui/badge";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import ProductCard from "./product-card";

const SearchComponent = ({ products }: { products: any[] }) => {
  return (
    <div className="w-full h-full flex flex-col gap-5 py-3 max-h-[85vh]">
      <div className="w-full relative">
        <Input type="text" placeholder="ابحث عن منتج" className="w-full" />
        <Search className="cursor-pointer absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2 text-sm" />
      </div>
      <p>كلمات مقترحة</p>
      <div className="flex flex-wrap gap-2">
        <Badge className="py-0.5 px-2 lg:text-base cursor-pointer">نعال</Badge>
        <Badge className="py-0.5 px-2 lg:text-base cursor-pointer">حذاء</Badge>
        <Badge className="py-0.5 px-2 lg:text-base cursor-pointer">شماغ</Badge>
      </div>
      <div className="w-full h-full flex flex-wrap gap-2 overflow-y-auto justify-center p-3">
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
