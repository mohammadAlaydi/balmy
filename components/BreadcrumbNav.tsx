"use client";

import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbNavProps = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const lastIndex = Math.max(0, items.length - 1);

  return (
    <nav aria-label="Breadcrumb" dir="rtl" className="w-full">
      <ol className="flex flex-wrap items-center justify-start gap-2 text-base">
        {items.map((item, index) => {
          const isLast = index === lastIndex;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-semibold text-black">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="rounded text-medium-gray transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-medium-gray">{item.label}</span>
              )}

              {!isLast ? (
                <span className="text-light-gray-6" aria-hidden>
                  / 
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
