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
import { CONTACT_INFO, NAV_LINKS, products } from "@/static-data/static-data";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import SearchComponent from "@/components/search-component";
import QuickCart from "@/components/quick-cart";
import Link from "next/link";

// Components
const TopBar = () => (
  <div className="flex justify-center md:justify-between xl:justify-around items-center gap-5 py-0.5 px-3 lg:px-5 bg-black w-full">
    <div className="flex items-center">
      <Badge className="bg-transparent text-sm lg:text-base hidden md:inline-block">
        {CONTACT_INFO.phone}
      </Badge>
      <Badge className="bg-transparent text-sm lg:text-base hidden md:inline-block">
        {CONTACT_INFO.callToAction}
      </Badge>
    </div>
    <Badge className="bg-transparent text-sm lg:text-base">
      {CONTACT_INFO.discount}
    </Badge>
    <SocialMediaIcons iconStyle="text-white" containerStyle="hidden md:flex" />
  </div>
);

const ActionIcons = () => (
  <>
    <div className="items-center gap-3 hidden lg:flex">
      <Dialog>
        <DialogTrigger>
          <IoSearch className="text-xl cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <SearchComponent products={products} />
        </DialogContent>
      </Dialog>
      <FaRegUser className="text-xl cursor-pointer hidden lg:block" />
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
    </div>
    <Link href="/user-profile" className="block lg:hidden">
      <FaRegUser className="text-xl cursor-pointer text-black" />
    </Link>
  </>
);

const NavigationLinks = () => (
  <NavigationMenu className="hidden lg:block">
    <NavigationMenuList>
      {NAV_LINKS.map((link) => (
        <NavigationMenuItem key={link.title}>
          <NavigationMenuTrigger
            className="cursor-pointer"
            chevronDownIcon={!!link.links}
          >
            {link.title}
          </NavigationMenuTrigger>
          {link.links && (
            <NavigationMenuContent navigationMenuContent={true}>
              <ul className="grid gap-1 p-2 min-w-[200px]">
                {link.links.map((nested) => (
                  <li key={nested.path}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={nested.path}
                        className="block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        {nested.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
              <NavigationMenuIndicator />
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

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

const MobileMenu = () => (
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
        Menu
      </h2>
      {/* Mobile Navigation Links */}
      <Accordion
        type="single"
        collapsible
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



export default function Header() {
  return (
    <div className="w-full">
      <TopBar />
      <div className="flex justify-between items-center gap-3 py-5 px-3 lg:px-5 shadow-[0px_6px_20px_rgba(149,157,165,0.1)] transition-shadow duration-200">
        <ActionIcons />
        <NavigationLinks />
        <Logo />
        <MobileMenu />
      </div>
    </div>
  );
}
