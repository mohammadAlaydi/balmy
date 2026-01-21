/**
 * Development Configuration
 * 
 * This file contains configuration flags for development purposes.
 * When you're done with development and want to restore backend fetches,
 * simply set DISABLE_BACKEND_FETCH to false.
 * 
 * @example
 * // To disable backend fetches (use mock data):
 * export const DISABLE_BACKEND_FETCH = true;
 * 
 * // To enable backend fetches (production mode):
 * export const DISABLE_BACKEND_FETCH = false;
 */

// ============================================================================
// 🔧 TOGGLE THIS FLAG TO ENABLE/DISABLE BACKEND FETCHES
// ============================================================================
export const DISABLE_BACKEND_FETCH = true;

// ============================================================================
// 📦 MOCK DATA FOR DEVELOPMENT
// ============================================================================

// Placeholder image URLs - using local image
const PLACEHOLDER_BANNER = "/abood.jpg";
const PLACEHOLDER_CATEGORY = "/abood.jpg";
const PLACEHOLDER_PRODUCT = "/abood.jpg";
const PLACEHOLDER_AD = "/abood.jpg";

export const MOCK_USER = {
  id: 1,
  first_name: "محمد",
  last_name: "أحمد",
  email: "test@example.com",
  phone: "+966501234567",
  addresses: [
    {
      id: 1,
      address1: "شارع الملك فهد",
      city: "الرياض",
      country: "المملكة العربية السعودية",
    },
  ],
};

export const MOCK_PRODUCTS = {
  data: [
    {
      id: 1,
      product_id: 1,
      name: "عطر فاخر للرجال",
      price: 350,
      formatted_price: "350.00 ر.س",
      sku: "PERF-001",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [1],
      reviews: { total: 25, average_rating: 4.8 },
      short_description: "عطر فاخر برائحة مميزة تدوم طويلاً",
      description: "عطر رجالي فاخر مصنوع من أجود أنواع العود والمسك. رائحة عصرية وكلاسيكية تدوم طوال اليوم.",
      variants: [],
    },
    {
      id: 2,
      product_id: 2,
      name: "بخور عربي أصيل",
      price: 180,
      formatted_price: "180.00 ر.س",
      sku: "BAKH-002",
      in_stock: true,
      inStock: true,
      new: false,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [1, 2],
      reviews: { total: 42, average_rating: 4.5 },
      short_description: "بخور عربي تقليدي بجودة عالية",
      description: "بخور عربي أصيل محضر من أجود أنواع العود. مثالي للمناسبات والاستخدام اليومي.",
      variants: [],
    },
    {
      id: 3,
      product_id: 3,
      name: "مجموعة زيوت عطرية",
      price: 220,
      formatted_price: "220.00 ر.س",
      sku: "OIL-003",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [2],
      reviews: { total: 18, average_rating: 4.7 },
      short_description: "مجموعة متنوعة من الزيوت العطرية الطبيعية",
      description: "مجموعة فاخرة من الزيوت العطرية الطبيعية 100%. تحتوي على زيت الورد والعنبر والعود.",
      variants: [],
    },
    {
      id: 4,
      product_id: 4,
      name: "عطر نسائي فرنسي",
      price: 450,
      formatted_price: "450.00 ر.س",
      sku: "PERF-004",
      in_stock: true,
      inStock: true,
      new: false,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [1, 3],
      reviews: { total: 56, average_rating: 4.9 },
      short_description: "عطر فرنسي راقي للسيدات",
      description: "عطر نسائي فاخر من أشهر دور العطور الفرنسية. رائحة زهرية ساحرة.",
      variants: [],
    },
    {
      id: 5,
      product_id: 5,
      name: "دهن عود كمبودي",
      price: 890,
      formatted_price: "890.00 ر.س",
      sku: "OUD-005",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [2],
      reviews: { total: 12, average_rating: 5.0 },
      short_description: "دهن عود كمبودي نادر وفاخر",
      description: "دهن عود كمبودي نادر مستخرج من أشجار العود المعمرة. رائحة قوية وثابتة.",
      variants: [],
    },
    {
      id: 6,
      product_id: 6,
      name: "مبخرة كهربائية",
      price: 299,
      formatted_price: "299.00 ر.س",
      sku: "MBKH-006",
      in_stock: false,
      inStock: false,
      new: false,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [3],
      reviews: { total: 88, average_rating: 4.3 },
      short_description: "مبخرة كهربائية أنيقة",
      description: "مبخرة كهربائية عصرية بتصميم أنيق. سهلة الاستخدام وآمنة.",
      variants: [],
    },
    {
      id: 7,
      product_id: 7,
      name: "عطر عود ملكي",
      price: 520,
      formatted_price: "520.00 ر.س",
      sku: "PERF-007",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [1, 2],
      reviews: { total: 34, average_rating: 4.6 },
      short_description: "مزيج فريد من العود والمسك",
      description: "عطر ملكي فاخر يجمع بين أرقى أنواع العود الهندي والمسك الأبيض.",
      variants: [],
    },
    {
      id: 8,
      product_id: 8,
      name: "مجموعة هدايا فاخرة",
      price: 750,
      formatted_price: "750.00 ر.س",
      sku: "GIFT-008",
      in_stock: true,
      inStock: true,
      new: false,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [
        { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }
      ],
      category_id: [3],
      reviews: { total: 67, average_rating: 4.8 },
      short_description: "صندوق هدايا يحتوي على أفخر المنتجات",
      description: "مجموعة هدايا فاخرة تحتوي على عطر وبخور ودهن عود. الهدية المثالية للمناسبات الخاصة.",
      variants: [],
    },
  ],
};

export const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "العطور",
    slug: "perfumes",
    meta_title: "أفخر أنواع العطور",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 2,
    name: "البخور والعود",
    slug: "oud-incense",
    meta_title: "بخور وعود أصيل",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 3,
    name: "الإكسسوارات",
    slug: "accessories",
    meta_title: "إكسسوارات عطرية",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 4,
    name: "الهدايا",
    slug: "gifts",
    meta_title: "مجموعات الهدايا",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 5,
    name: "العناية بالجسم",
    slug: "body-care",
    meta_title: "منتجات العناية بالجسم",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 6,
    name: "العروض",
    slug: "offers",
    meta_title: "عروض حصرية",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
];

export const MOCK_HOME_DATA = {
  sliders: [
    {
      id: 1,
      title: "تخفيضات نهاية الموسم",
      image_url: PLACEHOLDER_BANNER,
      link: "/category/offers",
    },
    {
      id: 2,
      title: "مجموعة العود الملكي الجديدة",
      image_url: PLACEHOLDER_BANNER,
      link: "/category/oud-incense",
    },
    {
      id: 3,
      title: "عطور فرنسية أصلية",
      image_url: PLACEHOLDER_BANNER,
      link: "/category/perfumes",
    },
  ],
  featured_categories: MOCK_CATEGORIES,
  featured_products: MOCK_PRODUCTS.data.slice(0, 8),
  new_products: MOCK_PRODUCTS.data.filter(p => p.new),
  ads: [
    {
      id: 1,
      title: "خصم 30% على جميع العطور",
      image_url: PLACEHOLDER_AD,
      link: "/category/perfumes",
    },
    {
      id: 2,
      title: "توصيل مجاني للطلبات فوق 200 ريال",
      image_url: PLACEHOLDER_AD,
      link: "/",
    },
  ],
  categories: MOCK_CATEGORIES,
  locale: "ar",
};

export const MOCK_CART = {
  data: {
    id: 1,
    items: [],
    items_count: 0,
    items_qty: 0,
    grand_total: 0,
    formatted_grand_total: "0.00 ر.س",
    sub_total: 0,
    formatted_sub_total: "0.00 ر.س",
  },
};

export const MOCK_WISHLIST = {
  data: [],
};

export const MOCK_PRODUCT_DETAILS = (id: number) => {
  const product = MOCK_PRODUCTS.data.find(p => p.id === id);
  return {
    data: product || {
      id,
      product_id: id,
      name: `منتج ${id}`,
      price: 100 * id,
      formatted_price: `${100 * id}.00 ر.س`,
      sku: `SKU-${id.toString().padStart(3, '0')}`,
      in_stock: true,
      inStock: true,
      new: false,
      base_image: { 
        url: PLACEHOLDER_PRODUCT,
        original_image_url: PLACEHOLDER_PRODUCT
      },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [1],
      reviews: { total: 10, average_rating: 4.5 },
      short_description: `وصف مختصر للمنتج ${id}`,
      description: `وصف تفصيلي للمنتج ${id}. هذا منتج عالي الجودة مصنوع بعناية فائقة.`,
      variants: [],
    },
  };
};

export const MOCK_CATEGORY_PRODUCTS = (categoryId: string | number) => ({
  data: MOCK_PRODUCTS.data.filter(p => 
    p.category_id.includes(Number(categoryId))
  ),
});

// Helper function to simulate API delay in development
export const mockDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

console.log(
  DISABLE_BACKEND_FETCH 
    ? "🚧 Backend fetches are DISABLED - using mock data" 
    : "✅ Backend fetches are ENABLED"
);

