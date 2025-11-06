"use client";

import SectionTitle from "@/components/section-title";
import SocialMediaIcons from "@/components/social-media-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/layout/footer/footer-accordion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { getHomeData } from "@/store/slices/home-slice";
import { useEffect } from "react";
import Loading from "@/components/loading";
import { usePathname } from "next/navigation";

// Components
const WorkHoursSection = ({ data }: { data: any }) => {
  const t = useTranslations("footer");

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col gap-2 ">
      <SectionTitle title={t("working-hours")} titleStyle="text-white/65" />
      <p className="text-sm text-white">{data?.work_hours?.days}</p>
      {data?.work_hours?.hours?.map((item: any, index: number) => (
        <p key={index} className="text-sm text-white">
          from {item.from?.hour} {item.from?.pm_or_am} to {item.to?.hour}{" "}
          {item.to?.pm_or_am}
        </p>
      ))}
    </div>
  );
};

const LocationSection = ({ data }: { data: any }) => {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
      <SectionTitle
        title={tFooter("how-to-reach-us")}
        titleStyle="text-white/65"
      />
      <p className="text-sm text-white">{`${data?.inventory_source_data?.country} - ${data?.inventory_source_data?.city} - ${data?.inventory_source_data?.state} - ${data?.inventory_source_data?.street}`}</p>
      <Link
        href={`tel:${data?.inventory_source_data?.contact_number}`}
        prefetch={true}
        className="text-sm text-white"
      >
        {data?.inventory_source_data?.contact_number}
      </Link>
    </div>
  );
};

const FooterImage = ({ data }: { data: any }) => {
  const t = useTranslations("footer");
  // Check if ads array exists and has at least 3 elements
  if (!data?.ads || !Array.isArray(data.ads) || data.ads.length < 3) {
    return null;
  }

  return (
    <div className="col-span-12 lg:col-span-6">
      <Image
        width={400}
        height={400}
        src={data.ads[2]?.img_path}
        alt={t("image-alt")}
        className="w-full max-h-[400px] object-cover"
        quality={95}
      />
    </div>
  );
};

const SocialMediaSection = ({ data }: { data: any }) => {
  const t = useTranslations("footer");

  return (
    <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 items-start">
      <SectionTitle
        title={t("follow-us")}
        titleStyle="text-white/65 text-end text-base ltr:text-start"
      />
      <SocialMediaIcons
        data={data}
        iconStyle="bg-white text-black p-1.5 text-[30px] rounded-full hover:bg-black hover:text-white transition-all duration-300 text-2xl"
      />
    </div>
  );
};

const FooterAccordion = ({
  title,
  items,
  defaultValue,
}: {
  title: string;
  items: any;
  defaultValue: string;
}) => {
  return (
    <Accordion
      className="col-span-12 lg:col-span-3"
      defaultValue={defaultValue}
    >
      <AccordionItem
        value={defaultValue}
        className="col-span-12 lg:col-span-3 flex flex-col gap-2"
      >
        <AccordionTrigger className="flex items-center p-0">
          <SectionTitle
            title={title}
            titleStyle="text-white/65 text-base text-end ltr:text-start"
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {items?.map((item: any) => (
              <Link
                href={`/${typeof window !== "undefined"
                    ? window.location.pathname.split("/")[1]
                    : "ar"
                  }/cms/${item?.url_key}`}
                key={item?.url_key || item?.page_title}
                prefetch={true}
                className="text-sm text-white text-end rtl:text-right ltr:text-left rtl:hover:mr-3 ltr:hover:ml-3 transition-all duration-300"
              >
                {item?.page_title ?? item?.title ?? ""}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const CopyrightSection = ({ data }: { data: any }) => {
  const t = useTranslations("footer");

  return (
    <div className="flex justify-center items-center p-2">
      <Badge className="bg-transparent text-sm lg:text-base text-white">
        {data?.copyright}
      </Badge>
    </div>
  );
};

export default function Footer() {
  const { data, loading } = useSelector((state: any) => state.home);
  const dispatch = useDispatch();
  const locale = useLocale()
  useEffect(() => {
    dispatch(getHomeData(locale || "ar") as any);
  }, [dispatch, locale]);
  const t = useTranslations("footer");
  if (loading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }
  const legalTerms = data?.cms_pages?.filter(
    (page: any) => page.position === 1
  );
  const knowUsMore = data?.cms_pages?.filter(
    (page: any) => page.position === 2
  );
  const services = data?.cms_pages?.filter((page: any) => page.position === 3);
  return (
    <div className="bg-black">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6 grid grid-cols-12 justify-end p-5">
          <WorkHoursSection data={data} />
          <LocationSection data={data} />
        </div>
        <FooterImage data={data} />
      </div>
      <hr />
      <div className="grid grid-cols-12 items-start p-3 lg:p-5 gap-3">
        <SocialMediaSection data={data} />
        <FooterAccordion
          title={t("legal-terms")}
          items={legalTerms}
          defaultValue="item-1"
        />
        <FooterAccordion
          title={t("know-us-more")}
          items={knowUsMore}
          defaultValue="item-2"
        />
        <FooterAccordion
          title={t("at-your-service")}
          items={services}
          defaultValue="item-3"
        />
      </div>
      <hr />
      <CopyrightSection data={data} />
    </div>
  );
}
