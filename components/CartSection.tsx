"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import DeleteButton from "./DeleteButton";
import Rating from "./Rating";
import IncreaseButton from "./IncreaseButton";
import DecreaseButton from "./DecreaseButton";

type CartItem = {
  id: string;
  brandName: string;
  isVerified?: boolean;
  title: string;
  productTags?: string[];
  imageSrc: string;
  imageAlt: string;
  rating: {
    value: number; // 0..5
  };
  discountPercent: number;
  quantity: number;
  price: {
    current: number;
    old?: number;
    currency: string; // e.g. "﷼"
  };
};

export type CartSectionProps = {
  items?: CartItem[];
  breadcrumb?: React.ReactNode;
};

function CartItemCard({ item }: { item: CartItem }) {
  return (
    <div className="relative flex flex-col lg:flex-row bg-white border border-medium-gray rounded-[31px] lg:min-h-47.75 w-full p-4 lg:p-0" dir="rtl">
      <div className="flex flex-col md:flex-row w-full lg:items-center overflow-hidden">
        {/* Product Image - Far Right */}
        <div className="relative h-40 w-40 md:h-28 md:w-28 lg:h-28 lg:w-28 shrink-0 overflow-hidden rounded-lg border border-light-gray-2 bg-light-gray mx-auto lg:mr-6 lg:ml-5 mt-4 lg:mt-0">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        {/* Product Info - Flexible with controlled width */}
        <div className="flex-1 py-4 md:py-6 min-w-0 flex flex-col gap-2">
          {/* Top Row: Brand Name with Verified Badge */}
          <div className="flex items-center justify-center lg:justify-start gap-1">
            <h3 className="text-xl md:text-lg lg:text-lg font-bold text-black line-clamp-1">
              {item.brandName}
            </h3>
            {item.isVerified ? (
              <BadgeCheck
                className="h-5 w-5 fill-blue text-white shrink-0"
                aria-label="موثق"
              />
            ) : null}
          </div>

        <div className="flex flex-col lg:flex-row flex-1 gap-3 lg:gap-5 items-center lg:items-start">
          <div className="w-full lg:w-auto text-center lg:text-right">
                        {/* Product Tags - Right Side */}
            {item.productTags?.length ? (
              <div className="min-w-0 text-xs md:text-sm text-medium-gray line-clamp-2 max-w-full md:max-w-56">
                {item.productTags.map((tag, index) => (
                  <span key={index}>
                    <span className="hover:text-black transition-colors cursor-pointer">
                      {tag}
                    </span>
                    {index < item.productTags!.length - 1 ? (
                      <span className="mx-1">,</span>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : null}

                      {/* Bottom Row: Prices - Right Aligned */}
          <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 mt-1">
            {/* New Price (After Discount) */}
            <div className="flex items-center gap-1 md:gap-2">
              <span className="text-lg md:text-xl font-bold text-black">
                {item.price.current}
              </span>
              <Image
                src="/Saudi_Riyal_Symbol.svg.png"
                alt="ريال"
                width={14}
                height={14}
                className="shrink-0"
              />
            </div>

            {/* Old Price (Before Discount) */}
            {item.price.old ? (
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-xs md:text-sm text-medium-gray line-through">
                  {item.price.old}
                </span>
                <Image
                  src="/Saudi_Riyal_Symbol.svg.png"
                  alt="ریال"
                  width={12}
                  height={12}
                  className="shrink-0 opacity-60"
                />
              </div>
            ) : null}
          </div>
            

          </div>
          <div className="w-full lg:w-auto">
                                {/* Rating and Discount Badge - Left Side */}
            <div className="flex shrink-0 flex-col items-center lg:items-start gap-1">
              <Rating value={item.rating.value} />
              <span className="inline-flex w-fit items-center rounded-full bg-red px-2 py-1 text-xs font-semibold text-white">
                {item.discountPercent}%-
              </span>
            </div>
          </div>
        </div>





        </div>

        {/* Quantity Controls - Fixed Width */}
        <div className="flex md:min-w-[120px] md:w-36 w-full lg:w-36 shrink-0 items-center justify-center px-4 md:px-4 py-3 lg:py-0 border-t lg:border-t-0 border-medium-gray lg:border-none">
          <div className="inline-flex items-center gap-2">
            <IncreaseButton />
            <span className="min-w-8 md:min-w-10 text-center text-xl md:text-2xl font-semibold text-black">
              {item.quantity}
            </span>
            <DecreaseButton />
          </div>
        </div>

        {/* Price Section - Fixed Width */}
        <div className="flex md:min-w-[120px] md:w-36 w-full lg:w-36 shrink-0 items-center justify-center px-4 py-3 lg:py-0 border-t lg:border-t-0 border-medium-gray lg:border-none">
          <div className="flex items-center justify-center gap-1 md:gap-2">
            <span className="text-lg md:text-[22px] font-semibold leading-14 text-black-2">
              {item.price.current}
            </span>
            <Image
              src="/Saudi_Riyal_Symbol.svg.png"
              alt="ريال"
              width={15}
              height={15}
              className="shrink-0"
            />
          </div>
        </div>

        {/* Delete Icon - Fixed Width */}
        <div className="flex w-full lg:w-20 shrink-0 items-center justify-center border-t lg:border-t-0 lg:border-r-1 border-medium-gray py-4 lg:py-8">
          <DeleteButton />
        </div>
      </div>
    </div>
  );
}

export default function CartSection({ items, breadcrumb }: CartSectionProps) {
  const mockItems: CartItem[] = [
    {
      id: "1",
      brandName: "جورجيو أرماني",
      isVerified: true,
      title: "جورجيو أرماني إمبريو أرماني سترونجر ويذ يو إنتنسلي",
      productTags: [
        "جورجيو أرماني",
        "امبريو أرماني",
        "ستاونغر وود يو او تواليت",
      ],
      imageSrc: "/images/bg.jpg",
      imageAlt: "منتج",
      rating: { value: 5 },
      discountPercent: 20,
      quantity: 1,
      price: { current: 1950, old: 2400, currency: "﷼" },
    },
    {
      id: "2",
      brandName: "ديور",
      isVerified: true,
      title: "ديور سوفاج أو دو تواليت",
      productTags: ["ديور", "سوفاج", "أو دو تواليت"],
      imageSrc: "/images/bg.jpg",
      imageAlt: "منتج",
      rating: { value: 4 },
      discountPercent: 20,
      quantity: 2,
      price: { current: 520, old: 720, currency: "﷼" },
    },
  ];

  const cartItems = items?.length ? items : mockItems;

  return (
    <section dir="rtl" className="w-full py-8 md:py-12 lg:py-18">
      <div className="mx-auto w-full max-w-350 px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-10">
        {breadcrumb ? <div className="mb-6">{breadcrumb}</div> : null}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Cart Items (right - wide) */}
          <div className="lg:col-span-8">


            <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>







          {/* Order Summary (left - narrow) */}
          <aside className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-28 bg-white border border-medium-gray rounded-[32px] md:rounded-[48px] p-4 md:p-6 shadow-sm">
              {/* Free Shipping Header */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-black">
                  <Image
                    src="/truck-icon.png"
                    alt="شحن مجاني"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <p className="text-lg md:text-xl font-semibold text-black">
                  شحن مجاني
                  <br></br>
                  <span className="text-gray-400 text-[10px] md:text-xs">  الشحن مجاني علينا</span>
                </p>
              </div>

              <h3 className="mt-4 md:mt-6 text-right text-lg md:text-xl font-bold text-black">
                ملخص الطلب
              </h3>

              {/* Price Breakdown */}
              <div className="mt-3 md:mt-4 space-y-2 md:space-y-3 text-sm md:text-base">
                <div className="flex items-center justify-between">
                  <span className="text-medium-gray"> مجموع المنتجات بدون ضريبة</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-black">2990</span>
                    <Image
                      src="/Saudi_Riyal_Symbol.svg.png"
                      alt="ريال"
                      width={14}
                      height={14}
                      className="shrink-0"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-medium-gray">ضريبة القيمة المضافة</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-black">149</span>
                    <Image
                      src="/Saudi_Riyal_Symbol.svg.png"
                      alt="ريال"
                      width={14}
                      height={14}
                      className="shrink-0"
                    />
                  </div>
                </div>

                <div className="my-4 h-px w-full bg-light-gray-2" />

                <div className="flex items-center justify-between text-black">
                  <span className="text-medium-gray">الإجمالي</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">3139</span>
                    <Image
                      src="/Saudi_Riyal_Symbol.svg.png"
                      alt="ريال"
                      width={16}
                      height={16}
                      className="shrink-0"
                    />
                  </div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mt-4 md:mt-6">
                <p className="text-right text-sm md:text-base font-semibold text-black mb-2 md:mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
                  هل لديك كود خصم؟
                </p>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="text"
                    placeholder="أدخل الكود"
                    className="h-10 md:h-12 w-full rounded-3xl border border-light-gray-2 bg-white pl-16 md:pl-20 pr-3 md:pr-4 text-right text-sm md:text-base outline-none transition focus:ring-2 focus:ring-black/10"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  />
                  <button
                    type="button"
                    className="absolute left-1 top-1 h-8 md:h-10 rounded-3xl bg-black px-3 md:px-4 text-xs md:text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    إضافة
                  </button>
                </div>
              </div>

              {/* Complete Payment Button */}
              <button
                type="button"
                className="mt-4 md:mt-6 h-12 md:h-14 w-full rounded-xl bg-black text-white tion hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/30"
                style={{ font: 'normal normal normal 22px/40px Cairo' }}
              >
                اتمــــــام الدفــــــــع
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
