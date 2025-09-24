"use client";

import { useEffect, useState } from "react";
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
} from "@/components/ui/accordion";
import { IoSearch } from "react-icons/io5";
import { FaBars, FaRegUser, FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Image from "next/image";
import SocialMediaIcons from "@/components/social-media-icons";
import DrawerComponent from "../drawer/drawer-component";
import { LANGUAGES } from "@/lib/constants";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SearchComponent from "@/components/search-component";
import QuickCart from "@/components/quick-cart";
import UserMenu from "./user-menu";
import { useFavourites } from "@/hooks/use-favourites";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { getCartProducts } from "@/store/slices/cart-slice";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@radix-ui/react-dropdown-menu";
import { MdLanguage } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";
import ClientOnly from "@/components/ui/client-only";
import { getCategories } from "@/store/slices/categories-slice";

// Components
const TopBar = () => {
  const t = useTranslations("contact");
  const tAccessibility = useTranslations("accessibility");
  const tSearch = useTranslations("search");

  return (
    <div className="flex justify-center md:justify-between xl:justify-around items-center gap-5 py-0.5 px-3 lg:px-5 bg-black w-full">
      <div className="flex items-center">
        <Badge className="bg-transparent text-sm lg:text-base hidden md:inline-block">
          {t("phone")}
        </Badge>
        <Badge className="bg-transparent text-sm lg:text-base hidden md:inline-block">
          {t("call-to-action")}
        </Badge>
      </div>
      <Badge className="bg-transparent text-sm lg:text-base">
        {t("discount")}
      </Badge>
      <SocialMediaIcons
        iconStyle="text-white"
        containerStyle="hidden md:flex"
      />
    </div>
  );
};

const ActionIcons = ({
  languageItems,
}: {
  languageItems: { title: string; onClick: () => void; className: string }[];
}) => {
  const { getFavouritesCount, fetchFavourites } = useFavourites();
  const favouritesCount = getFavouritesCount();
  const t = useTranslations("navigation");
  const tSearch = useTranslations("search");
  const dispatch = useDispatch();

  // Get cart count from Redux store
  const cartData = useSelector((state: RootState) => state.cart.data);
  const cartCount = cartData?.data?.items?.length || 0;

  // Get authentication state from Redux
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Auto-fetch favourites and cart when component mounts if user is authenticated
  useEffect(() => {
    // Check both Redux state and localStorage for authentication
    const hasValidToken =
      typeof window !== "undefined" && !!localStorage.getItem("accessToken");
    const isReduxAuthenticated = isAuthenticated && user;

    if (isReduxAuthenticated || hasValidToken) {
      // Fetch favourites if we have none loaded
      if (favouritesCount === 0) {
        fetchFavourites();
      }
      // Fetch cart data if we have none loaded
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
    <>
      <div className="items-center gap-3 hidden lg:flex">
        <Dialog>
          <DialogTrigger>
            <IoSearch className="text-xl cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">
              {tSearch("search-products")}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {tSearch("search-description")}
            </DialogDescription>
            <SearchComponent maxHeight="max-h-[85vh]" />
          </DialogContent>
        </Dialog>
        <UserMenu />
        <Link
          href="/favourite"
          className="relative hidden lg:block"
          prefetch={true}
        >
          <FaRegHeart className="text-xl cursor-pointer" />
          {favouritesCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-red-500 text-white">
              {favouritesCount}
            </Badge>
          )}
        </Link>
        <DrawerComponent
          trigger={
            <div className="relative hidden lg:block">
              <MdOutlineShoppingCart className="cursor-pointer text-black text-xl" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-blue-500 text-white">
                  {cartCount}
                </Badge>
              )}
            </div>
          }
        >
          <QuickCart />
        </DrawerComponent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MdLanguage className="text-2xl cursor-pointer text-black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white overflow-hidden  h-fit z-[60] shadow-[0px_6px_20px_rgba(149,157,165,0.1)] rounded-lg">
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
      <Link href="/user-profile" className="block lg:hidden" prefetch={true}>
        <FaRegUser className="text-xl cursor-pointer text-black" />
      </Link>
    </>
  );
};

const NavigationLinks = ({ navbarCategories }: { navbarCategories: any }) => {
  const t = useTranslations("navigation");
  // Limit to first 5 categories
  const limitedCategories = navbarCategories?.slice(0, 5) || [];

  return (
    <NavigationMenu viewport={false} className="hidden lg:block">
      <NavigationMenuList>
        {limitedCategories && limitedCategories.length > 0 ? (
          limitedCategories.map((link: any) => {
            const hasChildren = link?.children && link?.children?.length > 0;
            return hasChildren ? (
              <NavigationMenuItem key={link?.name}>
                <NavigationMenuTrigger className="cursor-pointer hover:bg-transparent hover:text-red-color">
                  <Link
                    href={`/category/${link?.slug}/${link?.id}`}
                    prefetch={true}
                  >
                    {link?.name}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="overflow-hidden min-w-[100px]">
                  <ul className="grid gap-1 p-1">
                    {link?.children?.map((nested: any, index: number) => (
                      <li key={index}>
                        <NavigationMenuLink
                          asChild
                          className="cursor-pointer bg-transparent hover:bg-accent hover:text-accent-foreground"
                        >
                  <Link
                    href={nested?.slug ? `/category/${link?.slug}/${nested?.slug}` : `/category/${link?.slug}/${nested?.id}`}
                            prefetch={true}
                            className="block rounded-md px-1.5 py-1 text-sm hover:bg-accent hover:text-accent-foreground text-end"
                          >
                            {nested.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={link?.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`/category/${link?.slug}/${link?.id}`}
                    prefetch={true}
                    className="cursor-pointer hover:bg-transparent hover:text-red-color px-4 py-2 text-sm font-medium"
                  >
                    {link?.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })
        ) : (
          <NavigationMenuItem>
            <div className="px-4 py-2 text-sm text-gray-500">
              {t("no-categories-found")}
            </div>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const Logo = () => (
  <ClientOnly>
    <Link href="/home" prefetch={true}>
      <Image
        src="/assets/images/logo.svg"
        alt="logo"
        className="lg:w-[180px]"
        width={140}
        height={120}
        priority
        suppressHydrationWarning
      />
    </Link>
  </ClientOnly>
);

const MobileMenu = ({
  languageItems,
  navbarCategories,
}: {
  languageItems: { title: string; onClick: () => void; className: string }[];
  navbarCategories: any;
}) => {
  const t = useTranslations("navigation");
  // Limit to first 5 categories
  const limitedCategories = navbarCategories?.slice(0, 5) || [];

  return (
    <DrawerComponent
      trigger={
        <div className="lg:hidden">
          <FaBars className="text-xl cursor-pointer text-black" />
        </div>
      }
      containerClassName="lg:hidden"
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-6 text-center flex-shrink-0">
          {t("menu")}
        </h2>

        {/* ✅ Mobile Navigation Links */}
        <Accordion className="w-full flex-1 overflow-y-auto">
          {limitedCategories?.map((category: any, index: number) => (
            <AccordionItem key={category.id} value={`item-${index}`}>
              {category.children && category.children.length > 0 ? (
                <>
                  <AccordionTrigger className="text-left py-3 hover:bg-gray-50 rounded-md px-3">
                    {category.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid gap-1 p-1">
                      {category.children.map((nested: any) => (
                        <li key={nested.id}>
                          <Link
                            prefetch={true}
                            href={`/category/${nested.slug}/${nested.id}`}
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
                  href={`/category/${category.slug}/${category.id}`}
                  className="flex items-center py-3 px-3 hover:bg-gray-50 rounded-md text-left w-full"
                >
                  {category.name}
                </Link>
              )}
            </AccordionItem>
          ))}
        </Accordion>

        {/* ✅ Mobile Action Icons */}
        <div className="pt-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-center gap-6">
            <Link href="/search" prefetch={true}>
              <IoSearch className="text-xl cursor-pointer text-gray-600 hover:text-gray-900" />
            </Link>
             <UserMenu isMobile={true} />
            <Link href="/favourite" prefetch={true} className="relative">
              <FaRegHeart className="text-xl cursor-pointer text-gray-600 hover:text-gray-900" />
              {(() => {
                const { getFavouritesCount } = useFavourites();
                const favouritesCount = getFavouritesCount();
                return favouritesCount > 0 ? (
                  <span className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                    {favouritesCount}
                  </span>
                ) : null;
              })()}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MdLanguage className="text-2xl cursor-pointer text-gray-600 hover:text-gray-900" />
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
            {(() => {
              const cartData = useSelector((state: RootState) => state.cart.data);
              const cartCount = cartData?.data?.items?.length || 0;
              return (
                <div className="relative">
                  <DrawerComponent
                    trigger={
                      <MdOutlineShoppingCart className="text-xl cursor-pointer text-gray-600 hover:text-gray-900" />
                    }
                  >
                    <QuickCart />
                  </DrawerComponent>
                  {cartCount > 0 ? (
                    <span className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-blue-500 text-white rounded-full">
                      {cartCount}
                    </span>
                  ) : null}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </DrawerComponent>
  );
};

export default function Header() {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);
  const loading = useSelector((state: any) => state.categories.loading);

  useEffect(() => {
    dispatch(getCategories() as any);
  }, [dispatch]);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
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

  if (loading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }
  return (
    <div className="w-full relative z-50">
      <TopBar />
      <div className="flex justify-between items-center gap-3 py-5 px-3 lg:px-5 shadow-[0px_6px_20px_rgba(149,157,165,0.1)] transition-shadow duration-200 bg-white relative z-50">
        <ActionIcons languageItems={languageItems} />
        <NavigationLinks
          navbarCategories={(categories as any)?.categories?.categories || []}
        />
        <Logo />
        <MobileMenu
          navbarCategories={(categories as any)?.categories?.categories || []}
          languageItems={languageItems}
        />
      </div>
    </div>
  );
}
