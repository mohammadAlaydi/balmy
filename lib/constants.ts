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
  phone: "contact.phone",
  callToAction: "contact.call-to-action",
  discount: "contact.discount",
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
  { title: "legal.terms-and-conditions", path: "/legal/terms" },
  { title: "legal.privacy-policy", path: "/legal/privacy" },
  { title: "legal.delivery-policy", path: "/services/shipping-info" },
  { title: "legal.payment-policy", path: "/legal/sale-terms" },
  { title: "legal.return-policy", path: "/services/return-policy" },
];

// Know us more links
export const KNOW_US_MORE = [
  { title: "about.who-we-are", path: "/about/who-we-are" },
  { title: "about.our-services", path: "/services/faq" },
];

// Services links
export const SERVICES = [
  { title: "services.contact-us", path: "/contact/contact-us" },
  { title: "services.shipping-info", path: "/services/shipping-info" },
  { title: "services.faq", path: "/services/faq" },
];

// Work hours
export const WORK_HOURS = {
  title: "footer.working-hours",
  schedule: [
    "footer.all-week",
    "footer.from-9am-to-1130am",
    "footer.from-330pm-to-1130pm",
  ],
};

// Location information
export const LOCATION_INFO = {
  title: "footer.how-to-reach-us",
  address: "contact.address",
  phone: "contact.phone-number",
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
