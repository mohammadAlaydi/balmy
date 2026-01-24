"use client";

import { useEffect } from "react";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/layout/footer/footer-accordion";
import SocialMediaIcons from "@/components/social-media-icons";
import DrawerComponent from "@/components/layout/drawer/drawer-component";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import SearchComponent from "@/components/search-component";
import QuickCart from "@/components/quick-cart";
import UserMenu from "@/components/layout/header/user-menu";
import { useFavourites } from "@/hooks/use-favourites";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { getCartProducts } from "@/store/slices/cart-slice";
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";
import { getCategories } from "@/store/slices/categories-slice";
import { getHomeData } from "@/store/slices/home-slice";
import { LANGUAGES } from "@/static-data/static-data";
import TopBarBalmy from "./top-bar-balmy";

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

export type HeaderBalmyProps = {
    variant?: "hero" | "page";
    sticky?: boolean;
};

// Action Icons Component
const ActionIcons = ({
    languageItems,
    currentLocale,
}: {
    languageItems: { title: string; onClick: () => void; className: string }[];
    currentLocale: string;
}) => {
    const { getFavouritesCount, fetchFavourites } = useFavourites();
    const favouritesCount = getFavouritesCount();
    const t = useTranslations("navigation");
    const tSearch = useTranslations("search");
    const dispatch = useDispatch();

    const cartData = useSelector((state: RootState) => state.cart.data);
    const cartCount = cartData?.data?.items?.length || 0;
    const cartTotal = cartData?.data?.grand_total || 0;

    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated && user) {
            if (favouritesCount === 0) {
                fetchFavourites();
            }
            if (cartCount === 0) {
                dispatch(getCartProducts() as any);
            }
        }
    }, [
        fetchFavourites,
        favouritesCount,
        cartCount,
        isAuthenticated,
        user,
        dispatch,
    ]);

    return (
        <div className="flex items-center gap-3">
            {/* Search Icon */}
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                        aria-label="Search"
                    >
                        <Image
                            src="/assets/images/search.svg"
                            alt="search"
                            width={20}
                            height={20}
                        />
                    </button>
                </DialogTrigger>
                <DialogContent className="mt-5">
                    <DialogTitle className="sr-only">
                        {tSearch("search-products")}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {tSearch("search-description")}
                    </DialogDescription>
                    <SearchComponent maxHeight="max-h-[85vh]" />
                </DialogContent>
            </Dialog>

            {/* User Profile Icon */}
            <UserMenu />

            {/* Favourites */}
            <Link
                href={`/${currentLocale}/favourites`}
                className="relative hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                prefetch={true}
            >
                <Image
                    src="/assets/images/heart.svg"
                    alt="heart"
                    width={20}
                    height={20}
                />
                {favouritesCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-[var(--color-red)] text-white rounded-full">
                        {favouritesCount}
                    </Badge>
                )}
            </Link>

            {/* Cart Button with Balance and Badge */}
            <DrawerComponent
                trigger={
                    <button className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 transition-colors hover:bg-gray-50">
                        <span className="text-sm font-medium text-black">
                            SR {cartTotal.toFixed(2)}
                        </span>
                        <div className="relative">
                            <Image
                                src="/assets/images/cart.svg"
                                alt="cart"
                                width={20}
                                height={20}
                            />
                            {cartCount > 0 && (
                                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-red)] text-[10px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </button>
                }
            >
                <QuickCart />
            </DrawerComponent>

            {/* Language Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
                        <Image
                            src="/assets/images/language.svg"
                            alt="language"
                            width={20}
                            height={20}
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-white overflow-hidden h-fit z-[60] shadow-[0px_6px_20px_rgba(149,157,165,0.1)] rounded-lg">
                    <DropdownMenuLabel className="p-2">
                        {t("language")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="border border-gray-200" />
                    <DropdownMenuGroup>
                        {languageItems.map((item) => (
                            <DropdownMenuItem
                                key={item.title}
                                onClick={item.onClick}
                                className={`${item.className} p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground`}
                            >
                                {item.title}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

// Navigation Links Component
const NavigationLinks = ({
    navbarCategories,
    currentLocale,
    isHero = false,
}: {
    navbarCategories: any;
    currentLocale: string;
    isHero?: boolean;
}) => {
    const t = useTranslations("navigation");
    const textColorClass = isHero
        ? "text-white hover:text-white/80"
        : "text-black hover:text-gray-600";

    return (
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navbarCategories && navbarCategories.length > 0 ? (
                navbarCategories.slice(0, 9).map((link: any, linkIndex: number) => {
                    const hasChildren = link?.children && link?.children?.length > 0;
                    return hasChildren ? (
                        <NavigationMenu key={link?.id ?? link?.slug ?? `cat-${linkIndex}`} viewport={false}>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger
                                        className={`text-sm lg:text-base font-medium transition-colors whitespace-nowrap bg-transparent hover:bg-transparent ${textColorClass}`}
                                    >
                                        {link?.name}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="overflow-hidden min-w-[150px]">
                                        <ul className="grid gap-1 p-2">
                                            {link?.children?.map((nested: any, index: number) => (
                                                <li key={nested?.id ?? nested?.slug ?? `nested-${linkIndex}-${index}`}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={`/${currentLocale}/category/${nested?.slug || nested?.id}`}
                                                            prefetch={true}
                                                            className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                                                        >
                                                            {nested.name}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    ) : (
                        <Link
                            key={link?.id ?? link?.slug ?? `cat-${linkIndex}`}
                            href={`/${currentLocale}/category/${link?.id}`}
                            prefetch={true}
                            className={`text-sm lg:text-base font-medium transition-colors whitespace-nowrap ${textColorClass}`}
                        >
                            {link?.name}
                        </Link>
                    );
                })
            ) : (
                // Fallback static nav items
                navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`text-sm lg:text-base font-medium transition-colors whitespace-nowrap ${textColorClass}`}
                    >
                        {item.text}
                    </Link>
                ))
            )}
        </nav>
    );
};

// Logo Component
const Logo = ({ data, isHero = false }: { data: any; isHero?: boolean }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let logo = data?.seo_settings?.channel?.logo as string | undefined;

    if (logo && !logo.startsWith("http://") && !logo.startsWith("https://") && apiUrl) {
        try {
            logo = new URL(logo, apiUrl).toString();
        } catch {
            // keep original value if URL construction fails
        }
    }

    return (
        <Link href="/home" prefetch={true} className="block">
            {logo ? (
                <Image
                    src={logo}
                    alt="Balmy Logo"
                    width={64}
                    height={64}
                    className="h-12 lg:h-16 w-auto object-contain"
                    priority
                />
            ) : (
                <Image
                    src="/logo.png"
                    alt="Balmy Logo"
                    width={64}
                    height={64}
                    className="h-12 lg:h-16 w-auto object-contain"
                />
            )}
        </Link>
    );
};

// Mobile Menu Component
const MobileMenu = ({
    languageItems,
    navbarCategories,
    currentLocale,
}: {
    languageItems: { title: string; onClick: () => void; className: string }[];
    navbarCategories: any;
    currentLocale: string;
}) => {
    const t = useTranslations("navigation");
    const { getFavouritesCount } = useFavourites();
    const favouritesCount = getFavouritesCount();
    const cartData = useSelector((state: RootState) => state.cart.data);
    const cartCount = cartData?.data?.items?.length || 0;

    return (
        <DrawerComponent
            trigger={
                <div className="lg:hidden">
                    <Image
                        src="/assets/images/menu.svg"
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer text-black"
                    />
                </div>
            }
            containerClassName="lg:hidden"
        >
            <div className="flex flex-col h-full">
                <h2 className="text-sm font-semibold mb-6 text-center flex-shrink-0">
                    {t("menu")}
                </h2>

                {/* Mobile Navigation Links */}
                <Accordion className="w-full flex-1 overflow-y-auto">
                    {navbarCategories?.map((category: any, index: number) => (
                        <AccordionItem key={category.id} value={`item-${index}`}>
                            {category.children && category.children.length > 0 ? (
                                <>
                                    <AccordionTrigger className="text-left py-3 hover:bg-gray-50 rounded-md px-3 text-sm font-semibold">
                                        {category.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="grid gap-1 p-1">
                                            {category.children.map((nested: any) => (
                                                <li key={nested.id}>
                                                    <Link
                                                        prefetch={true}
                                                        href={`/${currentLocale}/category/${nested.id}`}
                                                        className="block rounded-md px-1.5 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                                                    >
                                                        {nested.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </>
                            ) : (
                                <Link
                                    prefetch={true}
                                    href={`/${currentLocale}/category/${category.id}`}
                                    className="flex items-center py-3 px-3 hover:bg-gray-50 rounded-md text-left w-full text-sm font-semibold"
                                >
                                    {category.name}
                                </Link>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Mobile Action Icons */}
                <div className="pt-6 border-t border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-center gap-6">
                        <Link href={`/${currentLocale}/search`} prefetch={true}>
                            <Image
                                src="/assets/images/search.svg"
                                alt="search"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
                        </Link>
                        <UserMenu isMobile={true} />
                        <Link
                            href={`/${currentLocale}/favourites`}
                            prefetch={true}
                            className="relative"
                        >
                            <Image
                                src="/assets/images/heart.svg"
                                alt="heart"
                                width={24}
                                height={24}
                            />
                            {favouritesCount > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-[var(--color-red)] text-white rounded-full">
                                    {favouritesCount}
                                </span>
                            )}
                        </Link>
                        <div className="relative">
                            <DrawerComponent
                                trigger={
                                    <Image
                                        src="/assets/images/cart.svg"
                                        alt="cart"
                                        width={24}
                                        height={24}
                                        className="cursor-pointer"
                                    />
                                }
                            >
                                <QuickCart />
                            </DrawerComponent>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-[#3866df] text-white rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DrawerComponent>
    );
};

// Main Header Component
export default function HeaderBalmy({ variant = "page", sticky = true }: HeaderBalmyProps) {
    const dispatch = useDispatch();
    const categories = useSelector((state: any) => state.categories);
    const loading = useSelector((state: any) => state.categories.loading);
    const { data, loading: homeLoading } = useSelector((state: any) => state.home);
    const pathname = usePathname();
    const currentLocale = pathname.split("/")[1];
    const router = useRouter();

    useEffect(() => {
        dispatch(getCategories(currentLocale) as any);
        dispatch(getHomeData(currentLocale || "ar") as any);
    }, [dispatch, currentLocale]);

    const languageItems = LANGUAGES.map(
        (lang: { code: string; title: string }) => {
            const segments = pathname.split("/");
            segments[1] = lang.code;
            const newPath = segments.join("/");

            return {
                title: lang.title,
                onClick: () => router.push(newPath),
                className:
                    lang.code === currentLocale ? "opacity-50 pointer-events-none" : "",
            };
        }
    );

    const isHero = variant === "hero";
    const isStickyPageHeader = !isHero && sticky;

    if (loading) {
        return <Loading fullScreen={true} variant="spinner" size="xl" />;
    }

    return (
        <>
            <TopBarBalmy position={isHero ? "fixed" : "static"} data={data} />
            <header
                dir="rtl"
                className={
                    isHero
                        ? "absolute top-[54px] left-0 right-0 z-50 w-full bg-transparent"
                        : isStickyPageHeader
                            ? "sticky top-0 z-50 w-full bg-white shadow-sm"
                            : "relative z-50 w-full bg-white"
                }
            >
                <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-16">
                    <div className={`flex items-center justify-between py-4 ${!isHero ? 'border-b border-black' : ''}`}>
                        {/* Right Section: Logo/Branding */}
                        <Logo data={data} isHero={isHero} />

                        {/* Center Section: Navigation Menu */}
                        <NavigationLinks
                            navbarCategories={(categories as any)?.categories?.categories || []}
                            currentLocale={currentLocale}
                            isHero={isHero}
                        />

                        {/* Left Section: User Actions */}
                        <ActionIcons
                            languageItems={languageItems}
                            currentLocale={currentLocale}
                        />

                        {/* Mobile Menu */}
                        <MobileMenu
                            navbarCategories={(categories as any)?.categories?.categories || []}
                            languageItems={languageItems}
                            currentLocale={currentLocale}
                        />
                    </div>
                </div>
            </header>
        </>
    );
}
