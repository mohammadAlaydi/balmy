"use client";

import { Search, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { text: "الماركــــــات", href: "/brands" },
  { text: "العــــــروض", href: "/offers" },
  { text: "الأكثــر مبيعـــاً", href: "/bestsellers" },
  { text: "رجـــالي", href: "/men" },
  { text: "نســائي", href: "/women" },
  { text: "للجنســين", href: "/unisex" },
  { text: "نيــــش", href: "/niche" },
  { text: "حصــــري", href: "/exclusive" },
  { text: "اطقم ومجموعات", href: "/sets" },
];

export type HeaderProps = {
  variant?: "hero" | "page";
  sticky?: boolean;
};

export default function Header({ variant = "hero", sticky = true }: HeaderProps) {
  const isHero = variant === "hero";
  const isStickyPageHeader = !isHero && sticky;

  return (
    <header
      dir="rtl"
      className={
        isHero
          ? "absolute top-0 left-0 right-0 z-50 w-full bg-transparent"
          : isStickyPageHeader
            ? "sticky top-13.5 z-55 w-full bg-white"
            : "relative z-55 w-full bg-white"
      }
    >
      <div className="mx-auto w-full max-w-480 px-16">
        <div className="flex items-center justify-between py-4 border-b border-black ">
          {/* Right Section: Logo/Branding */}
          <div className="flex items-center gap-3">
            <Link href="/" className="block">
              <Image 
                src="/logo.png" 
                alt="Balmy Logo" 
                width={64}
                height={64}
                className="h-16 w-auto object-contain"
              />
              
            </Link>
          </div>

          {/* Center Section: Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`text-base font-medium transition-colors whitespace-nowrap ${
                  isHero
                    ? 'text-white hover:text-white/80'
                    : 'text-black hover:text-gray-600'
                }`}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Left Section: User Actions */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-black" />
            </button>

            {/* User Profile Icon */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              aria-label="Profile"
            >
              <User className="h-5 w-5 text-black" />
            </button>

            {/* Cart Button with Balance and Badge */}
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1 transition-colors hover:bg-gray-50"
            >
              <span className="text-sm font-medium text-black">SR 0.00</span>
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-black" />
                {/* Notification Badge */}
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white">
                  3
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
