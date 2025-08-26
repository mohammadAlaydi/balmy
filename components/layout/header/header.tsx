import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Image from "next/image";
import { NavConfig } from "@/types/types";
import Link from "next/link";

export default function Header() {
  const navLinks: NavConfig = [
    { title: "Home", path: "/" },
    {
      title: "Docs",
      links: [
        { title: "Getting Started", path: "/docs/getting-started" },
        { title: "Routing", path: "/docs/routing" },
        { title: "API", path: "/docs/api" },
      ],
    },
    {
      title: "Guides",
      links: [
        { title: "Auth", path: "/guides/auth" },
        { title: "Styling", path: "/guides/styling" },
      ],
    },
    { title: "Changelog", path: "/changelog" },
  ];

  return (
    <div className="w-full">
      {/* offers and contact info section */}
      <div className="flex justify-between xl:justify-around items-center gap-5 py-0.5 px-3 lg:px-5 bg-black w-full">
        <div className="flex items-center">
          <Badge className="bg-transparent text-sm lg:text-base">
            01097352356
          </Badge>
          <Badge className="bg-transparent text-sm lg:text-base hidden md:inline-block">
            إتصل بنا اليوم
          </Badge>
        </div>
        <Badge className="bg-transparent text-sm lg:text-base">
          خصومات تصل إلى 50
        </Badge>
        <div className="flex items-center gap-3">
          <FaFacebookF className="text-xl cursor-pointer text-white" />
          <FaWhatsapp className="text-xl cursor-pointer text-white" />
          <FaXTwitter className="text-xl cursor-pointer text-white" />
          <FaInstagram className="text-xl cursor-pointer text-white" />
        </div>
      </div>
      {/* navbar section */}
      <div className="flex justify-between items-center gap-3 py-2 px-10 shadow-[0px_6px_20px_rgba(149,157,165,0.1)] transition-shadow duration-200">
        {/* icons section */}
        <div className="flex items-center gap-3">
          <IoSearch className="text-xl cursor-pointer" />
          <FaRegUser className="text-xl cursor-pointer" />
          <FaRegHeart className="text-xl cursor-pointer" />
          <MdOutlineShoppingCart className="text-xl cursor-pointer" />
        </div>
        {/* links section */}
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks?.map((link) => (
              <NavigationMenuItem key={link.title}>
                <NavigationMenuTrigger
                  className="cursor-pointer"
                  chevronDownIcon={link?.links}
                >
                  {link.title}
                </NavigationMenuTrigger>
                {link.links && (
                  <NavigationMenuContent navigationMenuContent={link.links}>
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
        {/* logo section */}
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={120}
          height={60}
        />
      </div>
    </div>
  );
}
