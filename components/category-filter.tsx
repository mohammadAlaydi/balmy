"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FaFilter, FaTimes } from "react-icons/fa";

interface FilterOptions {
  priceRange: [number, number];
  availability: string[];
  sortBy: string;
  inStock: boolean;
}

interface CategoryFilterProps {
  products: any[];
  onFilterChange: (filteredProducts: any[]) => void;
  className?: string;
}

export default function CategoryFilter({
  products,
  onFilterChange,
  className = "",
}: CategoryFilterProps) {
  const t = useTranslations("category");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const isRTL = currentLocale === "ar";

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    availability: [],
    sortBy: "name",
    inStock: false,
  });

  // Calculate price range from products
  const priceRange = products.reduce(
    (acc, product) => {
      const price = parseFloat(product.price) || 0;
      return [Math.min(acc[0], price), Math.max(acc[1], price)];
    },
    [0, 0]
  );

  // Initialize price range when products are loaded
  useEffect(() => {
    if (products.length > 0 && priceRange[1] > 0) {
      setFilters((prev) => ({
        ...prev,
        priceRange: priceRange as [number, number],
      }));
    }
  }, [products]);

  // Get unique availability options
  const availabilityOptions = Array.from(
    new Set(products.map((product) => product.availability || "available"))
  );

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price) || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter((product) =>
        filters.availability.includes(product.availability || "available")
      );
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.in_stock);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case "price-high":
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return (
            (b.reviews?.average_rating || 0) - (a.reviews?.average_rating || 0)
          );
        default:
          return 0;
      }
    });

    onFilterChange(filtered);
  }, [products, filters, onFilterChange]);

  const handlePriceRangeChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }));
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      availability: checked
        ? [...prev.availability, availability]
        : prev.availability.filter((a) => a !== availability),
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const handleStockChange = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, inStock: checked }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: priceRange as [number, number],
      availability: [],
      sortBy: "name",
      inStock: false,
    });
  };

  const hasActiveFilters =
    filters.availability.length > 0 ||
    filters.inStock ||
    filters.sortBy !== "name" ||
    (filters.priceRange[0] !== priceRange[0] && priceRange[0] !== 0) ||
    (filters.priceRange[1] !== priceRange[1] && priceRange[1] !== 0);

  return (
    <div className={`${className}`}>
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Drawer
          open={isOpen}
          onOpenChange={setIsOpen}
          direction={isRTL ? "right" : "left"}
          dismissible={false}
        >
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FaFilter className="text-blue-600" />
              <span className="font-medium text-gray-700">{t("filters")}</span>
              {hasActiveFilters && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-blue-100 text-blue-700 border-blue-200"
                >
                  {filters.availability.length +
                    (filters.inStock ? 1 : 0) +
                    (filters.sortBy !== "name" ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </DrawerTrigger>

          <DrawerContent className="w-full sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] max-h-[100vh] overflow-y-auto">
            <DrawerHeader className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaFilter className="text-blue-600" />
                  {t("filters")}
                </DrawerTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </DrawerHeader>

            <div className="space-y-6 sm:space-y-8 px-3 sm:px-6 py-3 sm:py-4">
              {/* Price Range */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3866df] rounded-full"></div>
                  {t("price-range")}
                </Label>
                <div className="px-2 sm:px-4 py-2 sm:py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={priceRange[1] || 1000}
                    min={priceRange[0] || 0}
                    step={10}
                    className="w-full my-4"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <span className="text-xs md:text-sm md:font-medium text-blue-700 text-nowrap">
                        {filters.priceRange[0]} <i className="icon-rial"></i>
                      </span>
                    </div>
                    <div className="w-8 h-px bg-gray-300"></div>
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                      <span className="text-xs md:text-sm md:font-medium text-green-700 text-nowrap">
                        {filters.priceRange[1]} <i className="icon-rial"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* Availability */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {t("availability")}
                </Label>
                <div className="grid grid-cols-1 gap-3">
                  {availabilityOptions.map((availability) => (
                    <div
                      key={availability}
                      className="flex items-center gap-2 space-x-3 p-2 sm:p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                    >
                      <input
                        type="checkbox"
                        id={availability}
                        checked={filters.availability.includes(availability)}
                        onChange={(e) =>
                          handleAvailabilityChange(
                            availability,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-green-600 bg-gray-100 border-green-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <Label
                        htmlFor={availability}
                        className="text-sm font-medium text-gray-700 capitalize cursor-pointer flex-1"
                      >
                        {t(availability as any) || availability}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* Stock Filter */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 space-x-3 p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                  <input
                    type="checkbox"
                    id="in-stock"
                    checked={filters.inStock}
                    onChange={(e) => handleStockChange(e.target.checked)}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-orange-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <Label
                    htmlFor="in-stock"
                    className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                  >
                    {t("in-stock-only")}
                  </Label>
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* Sort By */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  {t("sort-by")}
                </Label>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Select
                    value={filters.sortBy}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="border-0 focus:ring-2 focus:ring-purple-200 h-12">
                      <SelectValue placeholder={t("select-sort")} />
                    </SelectTrigger>
                    <SelectContent className="border-0 shadow-lg [&_[data-slot=select-item-indicator]]:hidden">
                      <SelectItem value="name" className="hover:bg-purple-50">
                        {t("name")}
                      </SelectItem>
                      <SelectItem
                        value="price-low"
                        className="hover:bg-purple-50"
                      >
                        {t("price-low-to-high")}
                      </SelectItem>
                      <SelectItem
                        value="price-high"
                        className="hover:bg-purple-50"
                      >
                        {t("price-high-to-low")}
                      </SelectItem>
                      <SelectItem value="rating" className="hover:bg-purple-50">
                        {t("rating")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Drawer Actions */}
              <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-200">
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <FaTimes className="text-sm mr-1" />
                    {t("clear-filters")}
                  </Button>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
