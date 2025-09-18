import { NavConfig, ToastOptions } from "@/types/types";
// Constants
export const NAV_LINKS: NavConfig = [
  { title: "navigation.home", path: "/" },
  {
    title: "navigation.docs",
    links: [
      { title: "navigation.getting-started", path: "/docs/getting-started" },
      { title: "navigation.routing", path: "/docs/routing" },
      { title: "navigation.api", path: "/docs/api" },
    ],
  },
  {
    title: "navigation.guides",
    links: [
      { title: "navigation.auth", path: "/guides/auth" },
      { title: "navigation.styling", path: "/guides/styling" },
    ],
  },
  { title: "navigation.changelog", path: "/changelog" },
];

export const CONTACT_INFO = {
  phone: "contact.phone",
  callToAction: "contact.call-to-action",
  discount: "contact.discount",
};

export const products = [
  {
    id: 1,
    name: "products.black-leather-slippers",
    nameEn: "Black Leather Slippers",
    price: 1000,
    priceEn: "1000 EGP",
    code: "A12",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "footwear",
    inStock: true,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "products.white-sports-shoes",
    nameEn: "White Sports Shoes",
    price: 2500,
    priceEn: "2500 EGP",
    code: "B34",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "footwear",
    inStock: true,
    rating: 4.8,
    reviews: 95,
  },
  {
    id: 3,
    name: "products.brown-leather-bag",
    nameEn: "Brown Leather Bag",
    price: 1800,
    priceEn: "1800 EGP",
    code: "C56",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "bags",
    inStock: true,
    rating: 4.6,
    reviews: 73,
  },
  {
    id: 4,
    name: "products.classic-wristwatch",
    nameEn: "Classic Wristwatch",
    price: 3200,
    priceEn: "3200 EGP",
    code: "D78",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "accessories",
    inStock: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 5,
    name: "products.blue-cotton-shirt",
    nameEn: "Blue Cotton Shirt",
    price: 800,
    priceEn: "800 EGP",
    code: "E90",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "clothing",
    inStock: true,
    rating: 4.4,
    reviews: 89,
  },
  {
    id: 6,
    name: "products.classic-denim-jeans",
    nameEn: "Classic Denim Jeans",
    price: 1200,
    priceEn: "1200 EGP",
    code: "F12",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "clothing",
    inStock: true,
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 7,
    name: "products.modern-sunglasses",
    nameEn: "Modern Sunglasses",
    price: 600,
    priceEn: "600 EGP",
    code: "G34",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "accessories",
    inStock: true,
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 8,
    name: "products.black-leather-wallet",
    nameEn: "Black Leather Wallet",
    price: 450,
    priceEn: "450 EGP",
    code: "H56",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "accessories",
    inStock: true,
    rating: 4.5,
    reviews: 134,
  },
  {
    id: 9,
    name: "products.natural-leather-jacket",
    nameEn: "Natural Leather Jacket",
    price: 4500,
    priceEn: "4500 EGP",
    code: "I78",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "clothing",
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 10,
    name: "products.black-formal-shoes",
    nameEn: "Black Formal Shoes",
    price: 2800,
    priceEn: "2800 EGP",
    code: "J90",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "footwear",
    inStock: true,
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 11,
    name: "products.modern-backpack",
    nameEn: "Modern Backpack",
    price: 950,
    priceEn: "950 EGP",
    code: "K12",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "bags",
    inStock: true,
    rating: 4.4,
    reviews: 78,
  },
  {
    id: 12,
    name: "products.classic-baseball-cap",
    nameEn: "Classic Baseball Cap",
    price: 350,
    priceEn: "350 EGP",
    code: "L34",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg",
    ],
    category: "accessories",
    inStock: true,
    rating: 4.2,
    reviews: 92,
  },
];

export const categories = [
  { id: "footwear", name: "categories.footwear", nameEn: "Footwear", count: 3 },
  { id: "clothing", name: "categories.clothing", nameEn: "Clothing", count: 3 },
  { id: "bags", name: "categories.bags", nameEn: "Bags", count: 2 },
  {
    id: "accessories",
    name: "categories.accessories",
    nameEn: "Accessories",
    count: 4,
  },
];

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

export const quickCartProducts = [
  {
    id: 1,
    category: "cart.category",
    name: "cart.product",
    image: "/assets/images/product-card.jpg",
    variant: {
      color: "Red",
      size: "M",
      thickness: "1mm",
    },
    price: 100,
    quantity: 1,
  },
  {
    id: 2,
    category: "cart.category",
    name: "cart.product",
    image: "/assets/images/product-card.jpg",
    variant: {
      color: "Red",
      size: "M",
      thickness: "1mm",
    },
    price: 100,
    quantity: 1,
  },
  {
    id: 3,
    category: "cart.category",
    name: "cart.product",
    image: "/assets/images/product-card.jpg",
    variant: {
      color: "Red",
      size: "M",
      thickness: "1mm",
    },
    price: 100,
    quantity: 1,
  },
];

export const LEGAL_TERMS = [
  { title: "legal.terms-and-conditions", path: "/terms-and-conditions" },
  { title: "legal.privacy-policy", path: "/privacy-policy" },
  { title: "legal.delivery-policy", path: "/delivery-policy" },
  { title: "legal.payment-policy", path: "/payment-policy" },
  { title: "legal.return-policy", path: "/services/return-policy" },
];

export const KNOW_US_MORE = [
  { title: "about.who-we-are", path: "/about-us" },
  { title: "about.our-services", path: "/services" },
];

export const SERVICES = [
  { title: "services.contact-us", path: "/contact-us" },
  { title: "services.shipping-info", path: "/services/shipping-info" },
  { title: "services.faq", path: "/services/faq" },
];

export const WORK_HOURS = {
  title: "working-hours",
  schedule: ["all-week", "from-9am-to-1130am", "from-330pm-to-1130pm"],
};

export const LOCATION_INFO = {
  title: "footer.how-to-reach-us",
  address: "contact.address",
  phone: "contact.phone-number",
};

export const LANGUAGES: { code: string; title: string }[] = [
  {
    code: "ar",
    title: "عربي",
  },
  {
    code: "en",
    title: "English",
  },
];

export const getCurrentMainImage = (
  product: any,
  selectedVariantIndex: number
): string => {
  if (product?.variants && product.variants.length > 0) {
    const variantIndex = selectedVariantIndex ?? 0;
    const variant = product.variants[variantIndex];
    return (
      variant?.base_image?.original_image_url || "/assets/images/no-image.webp"
    );
  }
  return (
    product?.base_image?.original_image_url || "/assets/images/no-image.webp"
  );
};

export const getHoverImage = (
  product: any,
  selectedVariantIndex: number
): string => {
  if (product?.variants && product.variants.length > 0) {
    const variantIndex = selectedVariantIndex ?? 0;
    const variant = product.variants[variantIndex];
    return (
      variant?.hovered_image?.original_image_url ||
      getCurrentMainImage(product, selectedVariantIndex)
    );
  }
  return (
    product?.hovered_image?.original_image_url ||
    getCurrentMainImage(product, selectedVariantIndex)
  );
};

export const SUCCESS_MESSAGES = {
  TITLE: "Shipping Successful",
  DESCRIPTION:
    "Your order has been successfully shipped! You will receive tracking information via email and can monitor your delivery status.",
  GO_HOME: "Go Home",
} as const;

export const ORDER_INFO_LABELS = {
  ORDER_NUMBER: "Order Number",
  ORDER_STATUS: "Order Status",
  SHIPPING_METHOD: "Shipping Method",
  SHIPPING_AMOUNT: "Shipping Amount",
  PAYMENT_TITLE: "Payment Title",
} as const;
