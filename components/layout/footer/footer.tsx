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
  defaultValue 
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

export default function Footer({ locale = 'ar' }: { locale?: string }) {
  return (
    <div className="bg-black">
      <div className="grid grid-cols-12 gap-8 p-8">
        {/* Contact Information */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="كيف تصل الينا" titleStyle="text-white/85" />
          <p className="text-sm text-white mb-2">
            طريق أنس ابن مالك، الصحافة، الرياض 13321
          </p>
          <Link href="tel:+966557665585" className="text-sm text-white block mb-2 hover:text-gray-300">
            +966-55-766-5585
          </Link>
          <Link href="mailto:info@farada.com" className="text-sm text-white block hover:text-gray-300">
            info@farada.com
          </Link>
        </div>

        {/* Working Hours */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="ساعات العمل" titleStyle="text-white/85" />
          <p className="text-sm text-white">طوال أيام الأسبوع</p>
          <p className="text-sm text-white">من 9 ص - إلي 6 م</p>
          <p className="text-sm text-white">الجمعة: مغلق</p>
          <p className="text-sm text-white">السبت: 10 ص - 4 م</p>
        </div>

        {/* Legal Pages */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="البنود القانونية" titleStyle="text-white/85" />
          <div className="space-y-2">
            <Link href={`/${locale}/legal/terms`} className="block text-sm text-white hover:text-gray-300">
              شروط وأحكام الموقع
            </Link>
            <Link href={`/${locale}/legal/sale-terms`} className="block text-sm text-white hover:text-gray-300">
              شروط وأحكام البيع
            </Link>
            <Link href={`/${locale}/legal/privacy`} className="block text-sm text-white hover:text-gray-300">
              سياسة الخصوصية
            </Link>
            <Link href={`/${locale}/legal/cookies`} className="block text-sm text-white hover:text-gray-300">
              سياسة ملفات الارتباط
            </Link>
          </div>
        </div>

        {/* About & Services */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="تعرف علينا أكثر" titleStyle="text-white/85" />
          <div className="space-y-2 mb-4">
            <Link href={`/${locale}/about/who-we-are`} className="block text-sm text-white hover:text-gray-300">
              من نحن
            </Link>
            <Link href={`/${locale}/about/careers`} className="block text-sm text-white hover:text-gray-300">
              وظائف فرادا
            </Link>
          </div>
          
          <SectionTitle title="بخدمتكم" titleStyle="text-white/85" />
          <div className="space-y-2">
            <Link href={`/${locale}/contact/contact-us`} className="block text-sm text-white hover:text-gray-300">
              تواصل معنا
            </Link>
            <Link href={`/${locale}/services/shipping-info`} className="block text-sm text-white hover:text-gray-300">
              معلومات الشحن
            </Link>
            <Link href={`/${locale}/services/return-policy`} className="block text-sm text-white hover:text-gray-300">
              الإستبدال والإسترجاع
            </Link>
            <Link href={`/${locale}/services/faq`} className="block text-sm text-white hover:text-gray-300">
              الأسئلة الأكثر شيوعاً
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Image */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <Image
            width={400}
            height={400}
            src="/assets/images/footer-image.webp"
            alt="footer-image"
            className="w-full"
          />
        </div>
      </div>

      <hr />
      <div className="flex justify-center items-center p-2">
        <Badge className="bg-transparent text-sm lg:text-base text-white">
          © 2025 جميع الحقوق محفوظة - مذاق القهوة
        </Badge>
      </div>
    </div>
  );
}
