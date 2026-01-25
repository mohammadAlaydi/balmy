"use client";

import Image from "next/image";
import BreadcrumbBalmy from "./balmy/breadcrumb-balmy";

export default function ThankYou() {
  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: "شكراً لك" },
  ];

  return (
    <main
      className="min-h-screen relative flex flex-col items-center justify-center bg-white p-6 md:p-12 font-[family-name:var(--font-cairo)]"
      dir="rtl"
    >
      {/* Breadcrumb */}
      <div className="absolute top-10 right-10 md:top-16 md:right-20">
        <BreadcrumbBalmy items={breadcrumbItems} />
      </div>

      <div className="w-full max-w-5xl">
        <section className="w-full bg-white rounded-lg p-6 md:p-10 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch gap-8 md:min-h-[16rem]">
            {/* Branding Column */}
            <div className="order-2 md:order-1 flex-1 flex flex-col items-center justify-between text-center">
              <div className="w-48 h-48 md:w-56 md:h-56 relative mb-4">
                <Image
                  src="/images/balmy-logo.png"
                  alt="Balmy Perfumes Companies"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed max-w-xs">
                وجهتك الأولى للعطور العالمية الأصلية
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:flex items-center justify-center order-2">
              <div className="w-px bg-black h-full min-h-[14rem]" />
            </div>

            {/* Content Column */}
            <div className="order-1 md:order-3 flex-[1.5] flex flex-col justify-between text-right">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                  شكـــــراً لك!
                </h1>

              </div>
                <div>
                <h2 className="text-lg md:text-xl text-gray-700 font-semibold mt-3">
                  نقدر وقتك واهتمامك
                </h2>
                <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                  .تم استلام طلبك بنجاح، وسيقوم فريقنا بمراجعته والتواصل معك في أقرب وقت ممكن
                </p>
                <p className="text-base md:text-lg text-gray-700 font-medium mt-6 md:mt-14">
                    إذا كان لديك أي استفسار إضافي، لا تتردد في التواصل معنا
                </p>
                </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
