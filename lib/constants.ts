import { NavConfig, ToastOptions } from "@/types/types";

// Navigation configuration
export const NAV_LINKS: NavConfig = [
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

// Contact information
export const CONTACT_INFO = {
  phone: "01097352356",
  callToAction: "إتصل بنا اليوم",
  discount: "خصومات تصل إلى 50",
};

// Language options
export const LANGUAGES: { code: string; title: string; }[] = [
  {
    code: 'ar',
    title: 'عربي',
  },
  {
    code: 'en',
    title: 'English',
  },
];

// Legal terms
export const LEGAL_TERMS = [
  { title: "الشروط والأحكام", path: "/terms-and-conditions" },
  { title: "سياسة الخصوصية", path: "/privacy-policy" },
  { title: "سياسة التوصيل", path: "/delivery-policy" },
  { title: "سياسة الدفع", path: "/payment-policy" },
  { title: "سياسة الإسترجاع", path: "/refund-policy" },
];

// Know us more links
export const KNOW_US_MORE = [
  { title: "من نحن", path: "/about-us" },
  { title: "خدماتنا", path: "/services" },
];

// Services links
export const SERVICES = [
  { title: "تواصل معنا", path: "/contact-us" },
  { title: "معلومات الشحن", path: "/shipping-information" },
  { title: "FAQ", path: "/faq" },
];

// Work hours
export const WORK_HOURS = {
  title: "ساعات العمل",
  schedule: [
    "طوال أيام الأسبوع",
    "من 9 ص - إلي 11:30 ص",
    "من 3:30 م - إلي 11:30 م",
  ],
};

// Location information
export const LOCATION_INFO = {
  title: "كيف تصل الينا",
  address: "طريق أنس ابن مالك، الصحافة، الرياض 13321",
  phone: "+966-55-766-5585",
};

// Toast styles
export const toastStyles: ToastOptions = {
  success: {
    duration: 3000,
    position: "top-right",
    style: {
      background: "linear-gradient(135deg, #000, #000)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontFamily: "var(--font-cairo), sans-serif",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
      position: "relative",
      overflow: "hidden",
    },
    className: "toast-with-contained-close",
  },
};
