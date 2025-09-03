"use client";

import SectionTitle from "@/components/section-title";
import SocialMediaIcons from "@/components/social-media-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  KNOW_US_MORE,
  LEGAL_TERMS,
  SERVICES,
  WORK_HOURS,
  LOCATION_INFO,
} from "@/static-data/static-data";
import { useTranslations } from "next-intl";

// Components
const WorkHoursSection = () => {
  const t = useTranslations("footer");
  
  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col gap-2 ">
              <SectionTitle title={t("working-hours")} titleStyle="text-white/65" />
      {WORK_HOURS.schedule.map((time, index) => (
        <p key={index} className="text-sm text-white">
          {t(time)}
        </p>
      ))}
    </div>
  );
};

const LocationSection = () => {

  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  
  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
      <SectionTitle title={tFooter("how-to-reach-us")} titleStyle="text-white/65" />
      <p className="text-sm text-white">{t("address")}</p>
              <Link href={`tel:${t("phone-number")}`} className="text-sm text-white">
          {t("phone-number")}
      </Link>
    </div>
  );
};

const FooterImage = () => (
  <div className="col-span-12 lg:col-span-6">
    <Image
      width={400}
      height={400}
      src="/assets/images/footer-image.webp"
      alt="footer-image"
      className="w-full"
    />
  </div>
);

const SocialMediaSection = () => {

  const t = useTranslations("footer");
  
  return (
    <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 items-start">
      <SectionTitle
        title={t("follow-us")}
        titleStyle="text-white/65 text-end text-base ltr:text-start"
      />
      <SocialMediaIcons iconStyle="bg-white text-black p-1.5 text-[30px] rounded-full hover:bg-black hover:text-white transition-all duration-300" />
    </div>
  );
};

const FooterAccordion = ({
  title,
  items,
  defaultValue,
}: {
  title: string;
  items: typeof LEGAL_TERMS;
  defaultValue: string;
}) => {
  const t = useTranslations();
  
  return (
    <Accordion className="col-span-12 lg:col-span-3" defaultValue={defaultValue}>
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
            {items.map((item) => (
              <Link
                href={item.path}
                key={item.title}
                className="text-sm text-white text-end rtl:text-right ltr:text-left rtl:hover:mr-3 ltr:hover:ml-3 transition-all duration-300"
              >
                {t(item?.title)}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const CopyrightSection = () => {
  const t = useTranslations("footer");
  
  return (
    <div className="flex justify-center items-center p-2">
      <Badge className="bg-transparent text-sm lg:text-base text-white">
        {t("copyright")}
      </Badge>
    </div>
  );
};

export default function Footer({ locale = "ar" }: { locale?: string }) {

  const t = useTranslations("footer");
  
  return (
    <div className="bg-black">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6 grid grid-cols-12 justify-end p-5">
          <WorkHoursSection />
          <LocationSection />
        </div>
        <FooterImage />
      </div>
      <hr />
      <div className="grid grid-cols-12 items-start p-3 lg:p-5 gap-3">
        <SocialMediaSection />
        <FooterAccordion
          title={t("legal-terms")}
          items={LEGAL_TERMS}
          defaultValue="item-1"
        />
        <FooterAccordion
          title={t("know-us-more")}
          items={KNOW_US_MORE}
          defaultValue="item-2"
        />
        <FooterAccordion
          title={t("at-your-service")}
          items={SERVICES}
          defaultValue="item-3"
        />
      </div>
      <hr />
      <CopyrightSection />
    </div>
  );
}
