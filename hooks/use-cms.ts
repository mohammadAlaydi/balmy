import { getHomeData } from "@/store/slices/home-slice";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UseCMS() {

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const { data, loading } = useSelector((state: any) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeData(currentLocale || "ar") as any);
  }, [dispatch, currentLocale]);
  const t = useTranslations("cms");

  return {
    t,
    loading,
    data,
  };
}
