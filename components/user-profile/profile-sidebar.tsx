"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
    Bell,
    Package,
    ShoppingCart,
    Heart,
    User,
    LogOut,
    ChevronLeft,
} from "lucide-react"; // Using lucide-react as Material Icons replacement for better integration

const sidebarItems = [
    {
        href: "/user-profile/notifications",
        icon: Bell,
        label: "notifications",
    },
    {
        href: "/cart",
        icon: Package,
        label: "my-orders",
    },
    {
        href: "/user-profile/pending-orders",
        icon: ShoppingCart,
        label: "pending-orders",
    },
    {
        href: "/favourites",
        icon: Heart,
        label: "wishlist",
    },
    {
        href: "/user-profile",
        icon: User,
        label: "my-account",
    },
];

export default function ProfileSidebar() {
    const pathname = usePathname();
    const t = useTranslations("user-profile"); // Assuming we'll add translations

    // Helper to check if active
    const isActive = (path: string) => pathname === path || pathname?.endsWith(path);

    return (
        <div className="w-full lg:w-1/4 flex-shrink-0">
            <div className="flex flex-col gap-4">
                {sidebarItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between p-4 border rounded-xl transition duration-200 group",
                                active
                                    ? "border-gray-800 dark:border-gray-100 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            )}
                        >
                            <span className="font-bold text-sm pr-2">
                                {item.label === "notifications" && "الإشعارات"}
                                {item.label === "my-orders" && "طلباتي"}
                                {item.label === "pending-orders" && "طلبات بانتظار الدفع"}
                                {item.label === "wishlist" && "امنياتي"}
                                {item.label === "my-account" && "حسابي"}
                            </span>
                            <div className="w-6 h-6 flex items-center justify-center">
                                <Icon
                                    className={cn(
                                        "w-5 h-5",
                                        active
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-white"
                                    )}
                                />
                            </div>
                        </Link>
                    );
                })}

                <button
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 transition duration-200 group w-full"
                >
                    <span className="font-bold text-sm pr-2">تسجيل الخروج</span>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <LogOut className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-red-600" />
                    </div>
                </button>
            </div>
        </div>
    );
}
