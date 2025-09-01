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

// Constants
const LEGAL_TERMS = [
  { title: "الشروط والأحكام", path: "/terms-and-conditions" },
  { title: "سياسة الخصوصية", path: "/privacy-policy" },
  { title: "سياسة التوصيل", path: "/delivery-policy" },
  { title: "سياسة الدفع", path: "/payment-policy" },
  { title: "سياسة الإسترجاع", path: "/refund-policy" },
];

const KNOW_US_MORE = [
  { title: "من نحن", path: "/about-us" },
  { title: "خدماتنا", path: "/services" },
];

const SERVICES = [
  { title: "تواصل معنا", path: "/contact-us" },
  { title: "معلومات الشحن", path: "/shipping-information" },
  { title: "FAQ", path: "/faq" },
];

const WORK_HOURS = {
  title: "ساعات العمل",
  schedule: [
    "طوال أيام الأسبوع",
    "من 9 ص - إلي 11:30 ص",
    "من 3:30 م - إلي 11:30 م",
  ],
};

const LOCATION_INFO = {
  title: "كيف تصل الينا",
  address: "طريق أنس ابن مالك، الصحافة، الرياض 13321",
  phone: "+966-55-766-5585",
};

// Components
const WorkHoursSection = () => (
  <div className="col-span-12 lg:col-span-6 flex flex-col gap-2 items-end">
    <SectionTitle title={WORK_HOURS.title} titleStyle="text-white/65" />
    {WORK_HOURS.schedule.map((time, index) => (
      <p key={index} className="text-sm text-white">
        {time}
      </p>
    ))}
  </div>
);

const LocationSection = () => (
  <div className="col-span-12 lg:col-span-6 flex flex-col gap-2 items-end">
    <SectionTitle title={LOCATION_INFO.title} titleStyle="text-white/65" />
    <p className="text-sm text-white">{LOCATION_INFO.address}</p>
    <Link href="#" className="text-sm text-white">
      {LOCATION_INFO.phone}
    </Link>
  </div>
);

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

const SocialMediaSection = () => (
  <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
    <SectionTitle
      title="تابعنا"
      titleStyle="text-white/65 text-end text-base"
    />
    <SocialMediaIcons iconStyle="bg-white text-black p-1.5 text-[30px] rounded-full" />
  </div>
);

const FooterAccordion = ({
  title,
  items,
  defaultValue,
}: {
  title: string;
  items: typeof LEGAL_TERMS;
  defaultValue: string;
}) => (
  <Accordion
    type="single"
    collapsible
    className="col-span-12 lg:col-span-3"
    defaultValue={defaultValue}
  >
    <AccordionItem
      value={defaultValue}
      className="col-span-12 lg:col-span-3 flex flex-col gap-2"
    >
      <AccordionTrigger className="flex justify-end items-center p-0">
        <SectionTitle
          title={title}
          titleStyle="text-white/65 text-end text-base"
        />
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              href={item.path}
              key={item.title}
              className="text-sm text-white text-end"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

const CopyrightSection = () => (
  <div className="flex justify-center items-center p-2">
    <Badge className="bg-transparent text-sm lg:text-base text-white">
      © 2025 جميع الحقوق محفوظة - مذاق القهوة
    </Badge>
  </div>
);

export default function Footer() {
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
          title="البنود القانونية"
          items={LEGAL_TERMS}
          defaultValue="item-1"
        />
        <FooterAccordion
          title="تعرف علينا أكثر"
          items={KNOW_US_MORE}
          defaultValue="item-2"
        />
        <FooterAccordion
          title="بخدمتكم"
          items={SERVICES}
          defaultValue="item-3"
        />
      </div>

      <hr />

      <CopyrightSection />
    </div>
  );
}
