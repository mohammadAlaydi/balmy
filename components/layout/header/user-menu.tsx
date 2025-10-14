"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/store/slices/auth-slice";
import { FaSignOutAlt, FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";

export default function UserMenu({ isMobile = false }: { isMobile?: boolean }) {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const params = useParams();
  const locale = (params?.locale as string) || "ar";
  const t = useTranslations("user-menu");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success(t("logged-out-successfully"));
    } catch (error) {
      toast.error(t("logout-failed"));
    }
  };

  // Don't render until mounted to avoid SSR issues
  if (!isMounted) {
    return (
      <Image
        src="/assets/images/user.svg"
        alt="user"
        width={24}
        height={24}
        className={`text-xl ${isMobile ? "lg:hidden" : "hidden lg:flex"}`}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src="/assets/images/user.svg"
            alt="user"
            width={24}
            height={24}
            className={`cursor-pointer text-black ${
              isMobile ? "lg:hidden" : "hidden lg:flex"
            }`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{t("guest-user")}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {t("sign-in-to-access")}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer flex gap-2 items-center" >
            <Link
              href={`/${locale}/auth/login`}
              className="flex items-center"
              prefetch={true}
            >
              <CiLogin className="mr-2 h-5 w-5" />
              <span>{t("sign-in")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer flex gap-2 items-center">
            <Link
              href={`/${locale}/user-profile`}
              className="flex items-center"
              prefetch={true}
            >
              <Image
                src="/assets/images/user.svg"
                alt="user"
                width={22}
                height={22}
              />
              <span>{t("profile")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
            <Image
              src="/assets/images/heart.svg"
              alt="heart"
              width={22}
              height={22}
            />
            <span>{t("wishlist")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
            <Image
              src="/assets/images/cart.svg"
              alt="cart"
              width={22}
              height={22}
            />
            <span>{t("orders")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer flex gap-2 items-center">
        <Image
          src="/assets/images/user.svg"
          alt="user"
          width={22}
          height={22}
          className={`${isMobile ? "lg:hidden" : "hidden lg:flex"}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer flex gap-2 items-center">
          <Link
            href={`/${locale}/user-profile`}
            className="flex items-center"
            prefetch={true}
          >
            <Image
              src="/assets/images/user.svg"
              alt="user"
              width={22}
              height={22}
            />
            <span>{t("profile")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
          <Image
            src="/assets/images/heart.svg"
            alt="heart"
            width={22}
            height={22}
          />
          <span>{t("wishlist")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
          <Image
            src="/assets/images/cart.svg"
            alt="cart"
            width={22}
            height={22}
          />
          <span>{t("orders")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex gap-2 items-center" >
          <CiLogout className="mr-2 h-5 w-5" />
          <span>{t("log-out")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
