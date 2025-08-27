import { NavConfig } from "@/types/types";

// Constants
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
  
 export const CONTACT_INFO = {
    phone: "01097352356",
    callToAction: "إتصل بنا اليوم",
    discount: "خصومات تصل إلى 50",
  };

export const products = [
  {
    id: 1,
    name: "نعال جلدي أسود",
    nameEn: "Black Leather Slippers",
    price: 1000,
    priceEn: "1000 EGP",
    code: "A12",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "footwear",
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "حذاء رياضي أبيض",
    nameEn: "White Sports Shoes",
    price: 2500,
    priceEn: "2500 EGP",
    code: "B34",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "footwear",
    inStock: true,
    rating: 4.8,
    reviews: 95
  },
  {
    id: 3,
    name: "حقيبة جلدية بنية",
    nameEn: "Brown Leather Bag",
    price: 1800,
    priceEn: "1800 EGP",
    code: "C56",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "bags",
    inStock: true,
    rating: 4.6,
    reviews: 73
  },
  {
    id: 4,
    name: "ساعة يد كلاسيكية",
    nameEn: "Classic Wristwatch",
    price: 3200,
    priceEn: "3200 EGP",
    code: "D78",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "accessories",
    inStock: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 5,
    name: "قميص قطني أزرق",
    nameEn: "Blue Cotton Shirt",
    price: 800,
    priceEn: "800 EGP",
    code: "E90",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "clothing",
    inStock: true,
    rating: 4.4,
    reviews: 89
  },
  {
    id: 6,
    name: "بنطلون جينز كلاسيك",
    nameEn: "Classic Denim Jeans",
    price: 1200,
    priceEn: "1200 EGP",
    code: "F12",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "clothing",
    inStock: true,
    rating: 4.7,
    reviews: 112
  },
  {
    id: 7,
    name: "نظارة شمسية عصرية",
    nameEn: "Modern Sunglasses",
    price: 600,
    priceEn: "600 EGP",
    code: "G34",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "accessories",
    inStock: true,
    rating: 4.3,
    reviews: 67
  },
  {
    id: 8,
    name: "محفظة جلدية سوداء",
    nameEn: "Black Leather Wallet",
    price: 450,
    priceEn: "450 EGP",
    code: "H56",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "accessories",
    inStock: true,
    rating: 4.5,
    reviews: 134
  },
  {
    id: 9,
    name: "جاكيت جلد طبيعي",
    nameEn: "Natural Leather Jacket",
    price: 4500,
    priceEn: "4500 EGP",
    code: "I78",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "clothing",
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 10,
    name: "حذاء رسمي أسود",
    nameEn: "Black Formal Shoes",
    price: 2800,
    priceEn: "2800 EGP",
    code: "J90",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "footwear",
    inStock: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 11,
    name: "شنطة ظهر عصرية",
    nameEn: "Modern Backpack",
    price: 950,
    priceEn: "950 EGP",
    code: "K12",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "bags",
    inStock: true,
    rating: 4.4,
    reviews: 78
  },
  {
    id: 12,
    name: "قبعة بيسبول كلاسيكية",
    nameEn: "Classic Baseball Cap",
    price: 350,
    priceEn: "350 EGP",
    code: "L34",
    images: [
      "/assets/images/product-card.jpg",
      "/assets/images/hover-product-card.jpg",
      "/assets/images/product-card.jpg"
    ],
    category: "accessories",
    inStock: true,
    rating: 4.2,
    reviews: 92
  }
];

export const categories = [
  { id: "footwear", name: "أحذية", nameEn: "Footwear", count: 3 },
  { id: "clothing", name: "ملابس", nameEn: "Clothing", count: 3 },
  { id: "bags", name: "حقائب", nameEn: "Bags", count: 2 },
  { id: "accessories", name: "إكسسوارات", nameEn: "Accessories", count: 4 }
];
  