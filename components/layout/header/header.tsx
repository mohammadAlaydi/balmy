"use client";

import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
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
import {
  CONTACT_INFO,
  LANGUAGES,
  NAV_LINKS,
  products,
} from "@/static-data/static-data";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import SearchComponent from "@/components/search-component";
import QuickCart from "@/components/quick-cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetcher } from "@/app/helpers/fetchers";
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

// Components
const TopBar = () => {
  const t = useTranslations("contact");

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
  const t = useTranslations("navigation");

  return (
    <>
      <div className="items-center gap-3 hidden lg:flex">
        <Dialog>
          <DialogTrigger>
            <IoSearch className="text-xl cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <SearchComponent maxHeight="max-h-[85vh]" />
          </DialogContent>
        </Dialog>
        <Link href="/user-profile" className="hidden lg:block">
          <FaRegUser className="text-xl cursor-pointer text-black" />
        </Link>
        <Link href="/favorites">
          <FaRegHeart className="text-xl cursor-pointer hidden lg:block" />
        </Link>
        <DrawerComponent
          trigger={
            <MdOutlineShoppingCart className="cursor-pointer hidden lg:block text-black text-xl" />
          }
        >
          <QuickCart />
        </DrawerComponent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MdLanguage className="text-2xl cursor-pointer text-black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white overflow-hidden  h-fit z-50 shadow-[0px_6px_20px_rgba(149,157,165,0.1)] rounded-lg">
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
      <Link href="/user-profile" className="block lg:hidden">
        <FaRegUser className="text-xl cursor-pointer text-black" />
      </Link>
    </>
  );
};

const NavigationLinks = ({ navbarCategories }: { navbarCategories: any }) => {
  const t = useTranslations("navigation");

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {navbarCategories && navbarCategories.length > 0 ? (
          navbarCategories.map((link: any) => {
            const hasChildren = link?.children && link?.children?.length > 0;
            return hasChildren ? (
              <NavigationMenuItem key={link?.name}>
                <NavigationMenuTrigger
                  className="cursor-pointer hover:bg-transparent hover:text-red-color"
                  chevronDownIcon={true}
                  className="relative"
                >
                  <Link href={`/category/${link?.slug}/${link?.id}`}>
                    {link?.name}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent navigationMenuContent={true}>
                  <ul className="grid gap-1 p-1">
                    {link?.children?.map((nested: any, index: number) => (
                      <li key={index}>
                        <NavigationMenuLink
                          asChild
                          className="cursor-pointer bg-transparent hover:bg-accent hover:text-accent-foreground"
                        >
                          <Link
                            href={`/category/${link?.slug}/${nested?.slug}`}
                            className="block rounded-md px-1.5 py-1 text-sm hover:bg-accent hover:text-accent-foreground text-end"
                          >
                            {nested.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <NavigationMenuIndicator />
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={link?.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`/category/${link?.slug}/${link?.id}`}
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
  <Link href="/home">
    <Image
      src="/assets/images/logo.svg"
      alt="logo"
      className="lg:w-[180px]"
      width={140}
      height={120}
    />
  </Link>
);

const MobileMenu = ({
  languageItems,
}: {
  languageItems: { title: string; onClick: () => void; className: string }[];
}) => {
  const t = useTranslations("navigation");

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
        {/* Mobile Navigation Links */}
        <Accordion
          defaultValue="item-0"
          className="w-full flex-1 overflow-y-auto"
        >
          {NAV_LINKS.map((link, index) => (
            <AccordionItem key={link.title} value={`item-${index}`}>
              {link.links ? (
                <AccordionTrigger className="text-left py-3 hover:bg-gray-50 rounded-md px-3">
                  {link.title}
                </AccordionTrigger>
              ) : (
                <Link
                  href={link.path!}
                  className="flex items-center py-3 px-3 hover:bg-gray-50 rounded-md text-left w-full"
                >
                  {link.title}
                </Link>
              )}
              {link.links && (
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    {link.links.map((nested) => (
                      <Link
                        key={nested.path}
                        href={nested.path}
                        className="block py-2 px-3 hover:bg-gray-50 rounded-md text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {nested.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>

        {/* Mobile Action Icons */}
        <div className="pt-6 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-center gap-6">
            <Link href="/search">
              <IoSearch className="text-xl cursor-pointer text-gray-600 hover:text-gray-900" />
            </Link>
            <Link href="/user-profile">
              <FaRegUser className="text-xl cursor-pointer text-gray-600 hover:text-gray-900" />
            </Link>
            <Link href="/favorites">
              <FaRegHeart className="text-xl cursor-pointer text-gray-600 hover:text-gray-900" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MdLanguage className="text-2xl cursor-pointer text-gray-600 hover:text-gray-900" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white overflow-hidden  h-fit z-50 shadow-[0px_6px_20px_rgba(149,157,165,0.1)] rounded-lg">
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
            <DrawerComponent
              trigger={
                <MdOutlineShoppingCart className="text-xl cursor-pointer text-gray-600 hover:text-gray-900" />
              }
            >
              <QuickCart />
            </DrawerComponent>
          </div>
        </div>
      </div>
    </DrawerComponent>
  );
};

export default function Header() {
  const API_KEY = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState<string | null>(null);

  // Get token from localStorage after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const { data: categoriesData, loading } = useFetcher(
    token ? `${API_KEY}/v1/categories` : null,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
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
    <div className="w-full">
      <TopBar />
      <div className="flex justify-between items-center gap-3 py-5 px-3 lg:px-5 shadow-[0px_6px_20px_rgba(149,157,165,0.1)] transition-shadow duration-200">
        <ActionIcons languageItems={languageItems} />
        <NavigationLinks
          navbarCategories={(categoriesData as any)?.categories || []}
        />
        <Logo />
        <MobileMenu languageItems={languageItems} />
      </div>
    </div>
  );
}
