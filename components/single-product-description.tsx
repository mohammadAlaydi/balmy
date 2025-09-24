"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import ShadowLayer from "./shadow-layer";

interface SingleProductDescriptionProps {
  description: string;
  shortDescription: string;
  productName: string;
  className?: string;
}

export default function SingleProductDescription({
  description,
  shortDescription,
  productName,
  className,
}: SingleProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!description && !shortDescription) {
    return null;
  }

  return (
    <div className={cn("mb-12", className)}>
      <ShadowLayer>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-3 flex items-center justify-between w-full mb-6 p-0 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={isCollapsed ? "عرض وصف المنتج" : "إخفاء وصف المنتج"}
        >
          <h2 className="text-[20px] lg:text-[20px] md:text-[16px] font-[600] md:font-[400] text-black font-cairo">
            وصف المنتج
          </h2>
          <div className="text-[#D07A51] hover:text-[#b86a41] transition-colors">
            {isCollapsed ? (
              <MdExpandMore className="text-xl" />
            ) : (
              <MdExpandLess className="text-xl" />
            )}
          </div>
        </button>
      </ShadowLayer>
      <ShadowLayer>
        <div
          className={cn(
            "bg-white rounded-lg p-6  transition-all duration-300",
            isCollapsed && "hidden"
          )}
        >
          {/* Short Description */}
          {shortDescription && (
            <div className="mb-6">
              <h3 className="text-[18px] lg:text-[18px] md:text-[16px] font-[600] md:font-[400] text-black mb-3 font-cairo">
                ملخص المنتج
              </h3>
              <p className="text-[16px] lg:text-[16px] md:text-[14px] text-gray-700 leading-relaxed font-cairo">
                {shortDescription}
              </p>
            </div>
          )}

          {/* Full Description */}
          {description && (
            <div>
              <h3 className="text-[18px] lg:text-[18px] md:text-[16px] font-[600] md:font-[400] text-black mb-3 font-cairo">
                الوصف التفصيلي
              </h3>
              <div className="relative">
                <div
                  className={cn(
                    "text-[16px] lg:text-[16px] md:text-[14px] text-gray-700 leading-relaxed font-cairo",
                    !isExpanded && "line-clamp-4"
                  )}
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                {description.length > 200 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#D07A51] hover:text-[#b86a41] font-medium text-sm mt-2 transition-colors"
                  >
                    {isExpanded ? "عرض أقل" : "عرض المزيد"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Product Features */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-[18px] lg:text-[18px] md:text-[16px] font-[600] md:font-[400] text-black mb-3 font-cairo">
              مميزات المنتج
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[14px] lg:text-[14px] md:text-[13px] text-gray-700 font-cairo">
                <span className="text-[#D07A51] mt-1">•</span>
                <span>جودة عالية ومتانة</span>
              </li>
              <li className="flex items-start gap-2 text-[14px] lg:text-[14px] md:text-[13px] text-gray-700 font-cairo">
                <span className="text-[#D07A51] mt-1">•</span>
                <span>تصميم عصري وأنيق</span>
              </li>
              <li className="flex items-start gap-2 text-[14px] lg:text-[14px] md:text-[13px] text-gray-700 font-cairo">
                <span className="text-[#D07A51] mt-1">•</span>
                <span>سهولة الاستخدام والصيانة</span>
              </li>
            </ul>
          </div>
        </div>
      </ShadowLayer>
    </div>
  );
}
