"use client";

import { useEffect } from "react";
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
import Image from "next/image";
import SocialMediaIcons from "@/components/social-media-icons";
import DrawerComponent from "../drawer/drawer-component";
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
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";
import { getCategories } from "@/store/slices/categories-slice";
import { getHomeData } from "@/store/slices/home-slice";
import { LANGUAGES } from "@/static-data/static-data";

// Components
const TopBar = ({ data }: { data: any }) => {
  const t = useTranslations("contact");

  return (
    <div className="flex justify-center md:justify-between xl:justify-around items-center gap-5 py-0.5 px-3 lg:px-10 bg-black w-full">
      <div className="flex items-center flex-1">
        <Badge className="bg-transparent text-sm lg:text-base hidden md:inline-block">
          {data?.inventory_source_data?.contact_number}
        </Badge>
        <Badge className="bg-transparent text-sm lg:text-base hidden md:inline-block">
          {t("call-to-action")}
        </Badge>
      </div>
      <Badge className="bg-transparent text-sm lg:text-base flex-1">
        {data?.seo_settings?.offer_banner_text}
      </Badge>
      <SocialMediaIcons
        iconStyle="text-white text-lg"
        containerStyle="hidden md:flex flex-1"
        data={data}
      />
    </div>
  );
};

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

  // Get cart count from Redux store
  const cartData = useSelector((state: RootState) => state.cart.data);
  const cartCount = cartData?.data?.items?.length || 0;

  // Get authentication state from Redux
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Auto-fetch favourites and cart when authenticated (Redux-driven only)
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
    <>
      <div className="items-center gap-3 hidden lg:flex">
        <Dialog>
          <DialogTrigger>
            <Image
              src="/assets/images/search.svg"
              alt="search"
              width={24}
              height={24}
              className="cursor-pointer text-black"
            />
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
        <UserMenu />
        <Link
          href={`/${currentLocale}/favourite`}
          className="relative hidden lg:block"
          prefetch={true}
        >
          <Image
            src="/assets/images/heart.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer text-black"
          />
          {favouritesCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-red-500 text-white">
              {favouritesCount}
            </Badge>
          )}
        </Link>
        <DrawerComponent
          trigger={
            <div className="relative hidden lg:block">
              <Image
                src="/assets/images/cart.svg"
                alt="shopping-cart"
                width={24}
                height={24}
                className="cursor-pointer text-black"
              />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-[#3866df] text-white">
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
            <Image
              src="/assets/images/language.svg"
              alt="language"
              width={24}
              height={24}
              className="cursor-pointer text-black"
            />
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
      <Link
        href={`/${currentLocale}/user-profile`}
        className="block lg:hidden"
        prefetch={true}
      >
        <Image
          src="/assets/images/user.svg"
          alt="user"
          width={24}
          height={24}
          className="text-xl cursor-pointer text-black"
        />
      </Link>
    </>
  );
};

const NavigationLinks = ({
  navbarCategories,
  currentLocale,
}: {
  navbarCategories: any;
  currentLocale: string;
}) => {
  const t = useTranslations("navigation");
  // Limit to first 5 categories
  const limitedCategories = navbarCategories?.slice(0, 5) || [];

  return (
    <NavigationMenu viewport={false} className="hidden lg:block">
      <NavigationMenuList>
        {limitedCategories && limitedCategories.length > 0 ? (
          limitedCategories.map((link: any, linkIndex: number) => {
            const hasChildren = link?.children && link?.children?.length > 0;
            return hasChildren ? (
              <NavigationMenuItem
                key={link?.id ?? link?.slug ?? `cat-${linkIndex}`}
              >
                <NavigationMenuTrigger className="cursor-pointer hover:bg-transparent hover:text-red-color">
                  {link?.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="overflow-hidden min-w-[100px]">
                  <ul className="grid gap-1 p-1">
                    {link?.children?.map((nested: any, index: number) => (
                      <li
                        key={
                          nested?.id ??
                          nested?.slug ??
                          `nested-${link?.id ?? linkIndex}-${index}`
                        }
                      >
                        <NavigationMenuLink
                          asChild
                          className="cursor-pointer bg-transparent hover:bg-accent hover:text-accent-foreground"
                        >
                          <Link
                            href={
                              nested?.slug
                                ? `/${currentLocale}/category/${link?.slug}/${nested?.slug}`
                                : `/${currentLocale}/category/${link?.slug}/${nested?.id}`
                            }
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
              <NavigationMenuItem
                key={link?.id ?? link?.slug ?? `cat-${linkIndex}`}
              >
                <NavigationMenuLink asChild>
                  <Link
                    href={`/${currentLocale}/category/${link?.slug}/${link?.id}`}
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

const Logo = ({ data }: { data: any }) => {
  const logo = data?.seo_settings?.channel?.logo;
  if (!logo) return null; // Nothing to render if logo is missing

  return (
    <Link href="/home" prefetch={true}>
      <Image
        src={logo}
        alt="logo"
        className="lg:w-[180px]"
        width={140}
        height={50}
        priority
      />
    </Link>
  );
};
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
        <h2 className="text-xl font-semibold mb-6 text-center flex-shrink-0">
          {t("menu")}
        </h2>

        {/* ✅ Mobile Navigation Links */}
        <Accordion className="w-full flex-1 overflow-y-auto">
          {navbarCategories?.map((category: any, index: number) => (
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
                            href={`/${currentLocale}/category/${category.slug}/${nested.slug}/${nested.id}`}
                            className="block rounded-md px-1.5 py-1 text-lg font-[550] hover:bg-accent hover:text-accent-foreground"
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
                  href={`/${currentLocale}/category/${category.slug}/${category.id}`}
                  className="flex items-center py-3 px-3 hover:bg-gray-50 rounded-md text-left w-full text-lg font-[550]"
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
            <Link href={`/${currentLocale}/search`} prefetch={true}>
              <Image
                src="/assets/images/search.svg"
                alt="search"
                width={24}
                height={24}
                className="cursor-pointer text-gray-600 hover:text-gray-900"
              />
            </Link>
            <UserMenu isMobile={true} />
            <Link
              href={`/${currentLocale}/favourite`}
              prefetch={true}
              className="relative"
            >
              <Image
                src="/assets/images/heart.svg"
                alt="heart"
                width={24}
                height={24}
                className="cursor-pointer text-gray-600 hover:text-gray-900"
              />
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
                <Image
                  src="/assets/images/language.svg"
                  alt="language"
                  width={24}
                  height={24}
                  className="cursor-pointer text-gray-600 hover:text-gray-900"
                />
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
              const cartData = useSelector(
                (state: RootState) => state.cart.data
              );
              const cartCount = cartData?.data?.items?.length || 0;
              return (
                <div className="relative">
                  <DrawerComponent
                    trigger={
                      <Image
                        src="/assets/images/cart.svg"
                        alt="shopping-cart"
                        width={24}
                        height={24}
                        className="cursor-pointer text-gray-600 hover:text-gray-900"
                      />
                    }
                  >
                    <QuickCart />
                  </DrawerComponent>
                  {cartCount > 0 ? (
                    <span className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center bg-[#3866df] text-white rounded-full">
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
  const { data, loading: homeLoading } = useSelector(
    (state: any) => state.home
  );
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  useEffect(() => {
    dispatch(getCategories(currentLocale) as any);
    dispatch(getHomeData(currentLocale || "ar") as any);
  }, [dispatch, currentLocale]);
  const router = useRouter();
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
      <TopBar data={data} />
      <div className="sticky top-0 z-50 bg-white shadow-sm transition-shadow duration-200">
        <div className="flex justify-between items-center gap-3 py-5 px-3 lg:px-5 scroll-shadow:shadow-[0px_6px_20px_rgba(149,157,165,0.1)] transition-shadow duration-200 bg-white relative">
          <ActionIcons
            languageItems={languageItems}
            currentLocale={currentLocale}
          />
          <NavigationLinks
            navbarCategories={(categories as any)?.categories?.categories || []}
            currentLocale={currentLocale}
          />
          <Logo data={data} />
          <MobileMenu
            navbarCategories={(categories as any)?.categories?.categories || []}
            languageItems={languageItems}
            currentLocale={currentLocale}
          />
        </div>
      </div>
    </div>
  );
}
