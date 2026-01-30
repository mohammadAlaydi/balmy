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
    // Category 1: الماركــــــات (Brands)
    {
      id: 1,
      product_id: 1,
      name: "ديور سوفاج - Dior Sauvage",
      price: 650,
      formatted_price: "650.00 ر.س",
      sku: "BRAND-001",
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
      category_id: [1, 4],
      reviews: { total: 125, average_rating: 4.9 },
      short_description: "عطر رجالي فاخر من ديور",
      description: "ديور سوفاج - عطر رجالي أيقوني يجمع بين الأناقة والقوة. رائحة منعشة وجذابة تدوم طوال اليوم.",
      variants: [],
    },
    {
      id: 2,
      product_id: 2,
      name: "شانيل رقم 5 - Chanel No 5",
      price: 850,
      formatted_price: "850.00 ر.س",
      sku: "BRAND-002",
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
      category_id: [1, 5],
      reviews: { total: 342, average_rating: 5.0 },
      short_description: "عطر نسائي كلاسيكي من شانيل",
      description: "شانيل رقم 5 - أيقونة العطور النسائية. عطر أنثوي راقي بلمسة كلاسيكية خالدة.",
      variants: [],
    },
    {
      id: 3,
      product_id: 3,
      name: "توم فورد أود وود - Tom Ford Oud Wood",
      price: 1200,
      formatted_price: "1200.00 ر.س",
      sku: "BRAND-003",
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
      category_id: [1, 6, 7],
      reviews: { total: 98, average_rating: 4.8 },
      short_description: "عطر نيش فاخر للجنسين",
      description: "توم فورد أود وود - عطر نيش فاخر يجمع بين العود الكمبودي والتوابل الشرقية.",
      variants: [],
    },

    // Category 2: العــــــروض (Offers)
    {
      id: 4,
      product_id: 4,
      name: "عطر فيكتوريا سيكريت - خصم 40%",
      price: 180,
      formatted_price: "180.00 ر.س",
      sku: "OFFER-001",
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
      category_id: [2, 5],
      reviews: { total: 267, average_rating: 4.5 },
      short_description: "عرض خاص - وفر 120 ريال",
      description: "عطر نسائي منعش من فيكتوريا سيكريت. عرض لفترة محدودة فقط!",
      variants: [],
    },
    {
      id: 5,
      product_id: 5,
      name: "مجموعة العود الملكي - عرض 2+1",
      price: 450,
      formatted_price: "450.00 ر.س",
      sku: "OFFER-002",
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
      category_id: [2, 9],
      reviews: { total: 89, average_rating: 4.7 },
      short_description: "اشتري 2 واحصل على الثالث مجاناً",
      description: "مجموعة عود ملكي فاخر - عرض استثنائي لفترة محدودة.",
      variants: [],
    },

    // Category 3: الأكثــر مبيعـــاً (Best Sellers)
    {
      id: 6,
      product_id: 6,
      name: "عطر الرصاصي - هوكاج",
      price: 320,
      formatted_price: "320.00 ر.س",
      sku: "BEST-001",
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
      category_id: [3, 4],
      reviews: { total: 542, average_rating: 4.9 },
      short_description: "الأكثر مبيعاً - أكثر من 5000 مبيعة",
      description: "عطر رجالي شرقي فاخر من الرصاصي. الاختيار الأول للعملاء.",
      variants: [],
    },
    {
      id: 7,
      product_id: 7,
      name: "دهن العود الكمبودي الفاخر",
      price: 890,
      formatted_price: "890.00 ر.س",
      sku: "BEST-002",
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
      category_id: [3, 6],
      reviews: { total: 412, average_rating: 5.0 },
      short_description: "الأكثر طلباً - دهن عود أصلي",
      description: "دهن عود كمبودي نادر وفاخر. المنتج الأكثر مبيعاً في فئته.",
      variants: [],
    },
    {
      id: 8,
      product_id: 8,
      name: "لاتافا كلون - Lattafa Clone",
      price: 220,
      formatted_price: "220.00 ر.س",
      sku: "BEST-003",
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
      category_id: [3, 6],
      reviews: { total: 689, average_rating: 4.8 },
      short_description: "الأكثر مبيعاً للجنسين",
      description: "عطر للجنسين بجودة عالية وسعر مناسب. أكثر من 7000 عميل راضٍ.",
      variants: [],
    },

    // Category 4: رجـــالي (Men's)
    {
      id: 9,
      product_id: 9,
      name: "بلو دو شانيل - Bleu de Chanel",
      price: 720,
      formatted_price: "720.00 ر.س",
      sku: "MEN-001",
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
      category_id: [4, 1],
      reviews: { total: 234, average_rating: 4.9 },
      short_description: "عطر رجالي فاخر ومنعش",
      description: "بلو دو شانيل - عطر رجالي أنيق يجمع بين الانتعاش والأناقة.",
      variants: [],
    },
    {
      id: 10,
      product_id: 10,
      name: "عود المبخر الملكي",
      price: 580,
      formatted_price: "580.00 ر.س",
      sku: "MEN-002",
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
      category_id: [4],
      reviews: { total: 156, average_rating: 4.7 },
      short_description: "عود فاخر للرجال",
      description: "عود ملكي أصيل برائحة رجولية قوية ومميزة.",
      variants: [],
    },

    // Category 5: نســائي (Women's)
    {
      id: 11,
      product_id: 11,
      name: "لانكوم لا في إست بيل - La Vie Est Belle",
      price: 680,
      formatted_price: "680.00 ر.س",
      sku: "WOMEN-001",
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
      category_id: [5, 1],
      reviews: { total: 298, average_rating: 4.9 },
      short_description: "عطر نسائي راقي من لانكوم",
      description: "لا فيي إست بيل - عطر نسائي زهري فاخر برائحة ساحرة ومميزة.",
      variants: [],
    },
    {
      id: 12,
      product_id: 12,
      name: "ديور جادور - J'adore",
      price: 750,
      formatted_price: "750.00 ر.س",
      sku: "WOMEN-002",
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
      category_id: [5, 1],
      reviews: { total: 412, average_rating: 5.0 },
      short_description: "عطر نسائي كلاسيكي من ديور",
      description: "جادور - عطر نسائي فاخر برائحة زهرية أنثوية خالدة.",
      variants: [],
    },
    {
      id: 13,
      product_id: 13,
      name: "دهن الورد الطائفي",
      price: 420,
      formatted_price: "420.00 ر.س",
      sku: "WOMEN-003",
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
      category_id: [5],
      reviews: { total: 187, average_rating: 4.8 },
      short_description: "دهن ورد طبيعي 100%",
      description: "دهن الورد الطائفي الأصلي - رائحة نسائية طبيعية ومميزة.",
      variants: [],
    },

    // Category 6: للجنســين (Unisex)
    {
      id: 14,
      product_id: 14,
      name: "جو مالون وود سيج - Jo Malone Wood Sage",
      price: 950,
      formatted_price: "950.00 ر.س",
      sku: "UNISEX-001",
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
      category_id: [6, 1],
      reviews: { total: 167, average_rating: 4.8 },
      short_description: "عطر فاخر للجنسين",
      description: "جو مالون وود سيج - عطر عصري ومنعش يناسب الجميع.",
      variants: [],
    },
    {
      id: 15,
      product_id: 15,
      name: "عطر العنبر الملكي",
      price: 380,
      formatted_price: "380.00 ر.س",
      sku: "UNISEX-002",
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
      category_id: [6],
      reviews: { total: 223, average_rating: 4.7 },
      short_description: "عطر شرقي للجنسين",
      description: "عطر العنبر الملكي - رائحة شرقية فاخرة تناسب الرجال والنساء.",
      variants: [],
    },

    // Category 7: نيــــش (Niche)
    {
      id: 16,
      product_id: 16,
      name: "كريد أفينتوس - Creed Aventus",
      price: 1500,
      formatted_price: "1500.00 ر.س",
      sku: "NICHE-001",
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
      category_id: [7, 4],
      reviews: { total: 312, average_rating: 5.0 },
      short_description: "عطر نيش أسطوري",
      description: "كريد أفينتوس - أفخر عطر نيش رجالي في العالم. رمز للنجاح والتميز.",
      variants: [],
    },
    {
      id: 17,
      product_id: 17,
      name: "بايريدو بلانش - Byredo Blanche",
      price: 1350,
      formatted_price: "1350.00 ر.س",
      sku: "NICHE-002",
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
      category_id: [7, 5],
      reviews: { total: 145, average_rating: 4.9 },
      short_description: "عطر نيش نسائي راقي",
      description: "بايريدو بلانش - عطر نيش نسائي فاخر بلمسة عصرية مميزة.",
      variants: [],
    },

    // Category 8: حصــــري (Exclusive)
    {
      id: 18,
      product_id: 18,
      name: "عود الملوك الخاص",
      price: 2200,
      formatted_price: "2200.00 ر.س",
      sku: "EXCL-001",
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
      category_id: [8],
      reviews: { total: 45, average_rating: 5.0 },
      short_description: "إصدار حصري محدود",
      description: "عود الملوك - إصدار حصري محدود من أندر أنواع العود الكمبودي.",
      variants: [],
    },
    {
      id: 19,
      product_id: 19,
      name: "لويس فويتون - إصدار خاص",
      price: 1800,
      formatted_price: "1800.00 ر.س",
      sku: "EXCL-002",
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
      category_id: [8, 6],
      reviews: { total: 67, average_rating: 4.9 },
      short_description: "عطر حصري من لويس فويتون",
      description: "عطر حصري للجنسين من مجموعة لويس فويتون الفاخرة. إصدار محدود.",
      variants: [],
    },

    // Category 9: اطقم ومجموعات (Sets & Collections)
    {
      id: 20,
      product_id: 20,
      name: "مجموعة هدايا VIP الفاخرة",
      price: 1250,
      formatted_price: "1250.00 ر.س",
      sku: "SET-001",
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
      category_id: [9],
      reviews: { total: 189, average_rating: 4.9 },
      short_description: "مجموعة هدايا فاخرة - 5 قطع",
      description: "مجموعة VIP تحتوي على عطر فاخر، دهن عود، بخور، مسك، ومبخرة. الهدية المثالية.",
      variants: [],
    },
    {
      id: 21,
      product_id: 21,
      name: "طقم العناية الرجالي",
      price: 850,
      formatted_price: "850.00 ر.س",
      sku: "SET-002",
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
      category_id: [9, 4],
      reviews: { total: 234, average_rating: 4.8 },
      short_description: "طقم عناية شامل للرجال",
      description: "طقم رجالي متكامل: عطر 100مل، دش جل، بلسم بعد الحلاقة، ديودرنت.",
      variants: [],
    },
    {
      id: 22,
      product_id: 22,
      name: "مجموعة العود الملكية",
      price: 1650,
      formatted_price: "1650.00 ر.س",
      sku: "SET-003",
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
      category_id: [9],
      reviews: { total: 123, average_rating: 5.0 },
      short_description: "مجموعة عود فاخرة - 4 أنواع",
      description: "مجموعة العود الملكية تحتوي على 4 أنواع مختلفة من أجود أنواع العود.",
      variants: [],
    },

    // Additional products for variety
    {
      id: 23,
      product_id: 23,
      name: "عطر أرماني كود - Armani Code",
      price: 520,
      formatted_price: "520.00 ر.س",
      sku: "BRAND-004",
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
      category_id: [1, 4],
      reviews: { total: 287, average_rating: 4.7 },
      short_description: "عطر رجالي أنيق من أرماني",
      description: "أرماني كود - عطر رجالي كلاسيكي بلمسة عصرية جذابة.",
      variants: [],
    },
    {
      id: 24,
      product_id: 24,
      name: "يفيس سان لوران بلاك أوبيوم",
      price: 690,
      formatted_price: "690.00 ر.س",
      sku: "BRAND-005",
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
      category_id: [1, 4, 3],
      reviews: { total: 456, average_rating: 4.9 },
      short_description: "من الأكثر مبيعاً عالمياً",
      description: "بلاك أوبيوم - عطر رجالي غامض وجذاب من إيف سان لوران.",
      variants: [],
    },
    // New products to fill up home sections to 4 items each
    {
      id: 25,
      product_id: 25,
      name: "عطر فرزاتشي إيروس - Versace Eros",
      price: 480,
      formatted_price: "480.00 ر.س",
      sku: "OFFER-003",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [2, 4],
      reviews: { total: 156, average_rating: 4.8 },
      short_description: "عرض خاص - عطر الانتعاش",
      description: "فرزاتشي إيروس - عطر يجسد قوة الحب والعاطفة.",
      variants: [],
    },
    {
      id: 26,
      product_id: 26,
      name: "باكو رابان ون مليون - 1 Million",
      price: 410,
      formatted_price: "410.00 ر.س",
      sku: "OFFER-004",
      in_stock: true,
      inStock: true,
      new: false,
      base_image: { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [2, 4],
      reviews: { total: 890, average_rating: 4.7 },
      short_description: "عرض مغري - عطر الفخامة",
      description: "باكو رابان ون مليون - عطر الرجل الذي لا يقهر.",
      variants: [],
    },
    {
      id: 27,
      product_id: 27,
      name: "عطر ميمو باريس - Memo Paris Marfa",
      price: 1350,
      formatted_price: "1350.00 ر.س",
      sku: "NICHE-003",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [7, 6],
      reviews: { total: 45, average_rating: 4.9 },
      short_description: "نيش فاخر - عطر الصحراء",
      description: "ميمو باريس مارفا - رحلة عطرية في أعماق الصحراء.",
      variants: [],
    },
    {
      id: 28,
      product_id: 28,
      name: "عطر عمّان الفاخر - Amouage Interlude",
      price: 1100,
      formatted_price: "1100.00 ر.س",
      sku: "NICHE-004",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [7, 4],
      reviews: { total: 78, average_rating: 5.0 },
      short_description: "نيش شرقي - قوة العطر",
      description: "أمواج انترلود - عطر يجسد الفوضى المنظمة.",
      variants: [],
    },
    {
      id: 29,
      product_id: 29,
      name: "عطر روجا دوف - Roja Dove Elysium",
      price: 1650,
      formatted_price: "1650.00 ر.س",
      sku: "EXCL-003",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [8, 4],
      reviews: { total: 34, average_rating: 5.0 },
      short_description: "حصري - قمة الرقي",
      description: "روجا دوف إليسيوم - عطر الصفوة والمشاهير.",
      variants: [],
    },
    {
      id: 30,
      product_id: 30,
      name: "عطر كلايف كريستيان - Clive Christian X",
      price: 2800,
      formatted_price: "2800.00 ر.س",
      sku: "EXCL-004",
      in_stock: true,
      inStock: true,
      new: true,
      base_image: { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [8, 4],
      reviews: { total: 22, average_rating: 4.9 },
      short_description: "حصري - أغلى عطور العالم",
      description: "كلايف كريستيان X - تجربة عطرية لا مثيل لها.",
      variants: [],
    },
    {
      id: 31,
      product_id: 31,
      name: "طقم السفر الفاخر",
      price: 550,
      formatted_price: "550.00 ر.س",
      sku: "SET-004",
      in_stock: true,
      inStock: true,
      new: false,
      base_image: { url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT },
      images: [{ url: PLACEHOLDER_PRODUCT, original_image_url: PLACEHOLDER_PRODUCT }],
      category_id: [9, 6],
      reviews: { total: 112, average_rating: 4.6 },
      short_description: "مجموعة السفر - عطور مصغرة",
      description: "طقم يحتوي على 5 عطور مصغرة تناسب السفر والتنقل.",
      variants: [],
    },
  ],
};

export const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "الماركــــــات",
    slug: "brands",
    meta_title: "أشهر الماركات العالمية",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 2,
    name: "العــــــروض",
    slug: "offers",
    meta_title: "عروض حصرية",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 3,
    name: "الأكثــر مبيعـــاً",
    slug: "best-sellers",
    meta_title: "المنتجات الأكثر مبيعاً",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 4,
    name: "رجـــالي",
    slug: "men",
    meta_title: "عطور ومنتجات رجالية",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 5,
    name: "نســائي",
    slug: "women",
    meta_title: "عطور ومنتجات نسائية",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 6,
    name: "للجنســين",
    slug: "unisex",
    meta_title: "عطور للجنسين",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 7,
    name: "نيــــش",
    slug: "niche",
    meta_title: "عطور نيش فاخرة",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 8,
    name: "حصــــري",
    slug: "exclusive",
    meta_title: "منتجات حصرية",
    banner_url: PLACEHOLDER_CATEGORY,
    image: PLACEHOLDER_CATEGORY,
    children: [],
  },
  {
    id: 9,
    name: "اطقم ومجموعات",
    slug: "sets-collections",
    meta_title: "أطقم ومجموعات فاخرة",
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
  featured_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(2)),
  best_sellers: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(3)),
  exclusive_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(8)),
  sets_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(9)),
  niche_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(7)),
  brands_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(1)),
  men_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(4)),
  women_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(5)),
  unisex_products: MOCK_PRODUCTS.data.filter(p => p.category_id.includes(6)),
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

