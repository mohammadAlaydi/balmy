/**
 * Transform Markatty API homepage response to frontend-compatible format
 * Maps bannerImages → sliders, carousel → product sections
 */

// Transform a single product from Markatty format to frontend format
export function transformProduct(product: any) {
    // Use formatedSpecialPrice if available, otherwise formattedPrice
    const hasDiscount = product.formatedSpecialPrice && product.formatedSpecialPrice !== '';
    const displayPrice = hasDiscount ? product.specialPrice : product.finalPrice;
    const originalPrice = hasDiscount ? product.price : null;

    // Calculate discount percentage if there's a special price
    let discountPercent = 0;
    if (hasDiscount && product.price > 0 && product.specialPrice > 0) {
        discountPercent = Math.round(((product.price - product.specialPrice) / product.price) * 100);
    }

    return {
        id: product.entityId,
        product_id: product.entityId,
        name: product.name,
        price: displayPrice,
        original_price: originalPrice,
        special_price: hasDiscount ? product.specialPrice : null,
        formatted_price: hasDiscount ? product.formatedSpecialPrice : product.formattedFinalPrice,
        formatted_original_price: hasDiscount ? product.formattedPrice : null,
        discount_percent: discountPercent,
        sku: product.sku || '',
        in_stock: product.isAvailable !== false,
        inStock: product.isAvailable !== false,
        new: product.isNew === 1,
        base_image: {
            url: product.thumbNail,
            original_image_url: product.thumbNail,
        },
        images: [
            { url: product.thumbNail, original_image_url: product.thumbNail },
            ...(product.imageGallery || []).map((img: any) => ({
                url: img.largeImage || img.mediumImage || img.smallImage,
                original_image_url: img.largeImage || img.mediumImage || img.smallImage,
            })),
        ],
        reviews: {
            total: 0,
            average_rating: parseFloat(product.rating) || 0,
        },
        rating: parseFloat(product.rating) || 0,
        short_description: product.shortDescription || '',
        description: product.shortDescription || '',
        variants: product.configurableData || [],
        typeId: product.typeId,
    };
}

// Transform banner images to sliders format
export function transformBanners(bannerImages: any[]) {
    if (!bannerImages || !Array.isArray(bannerImages)) return [];

    return bannerImages.map((banner) => ({
        id: banner.id,
        slider_path: banner.url,
        image: banner.url,
        title: banner.name || '',
        subtitle: '',
        link: banner.redirect_data?.url || '',
        redirect_type: banner.redirect_data?.type || 'external',
        redirect_id: banner.redirect_data?.id || 0,
    }));
}

// Transform carousel products to section format
export function transformCarousel(carouselData: any[]) {
    if (!carouselData || !Array.isArray(carouselData)) return {};

    const sections: Record<string, any[]> = {};

    carouselData.forEach((section) => {
        const type = section.type?.toLowerCase() || 'default';
        const products = (section.productList || []).map(transformProduct);

        // Map carousel types to frontend section names
        switch (type) {
            case 'featured':
                sections.featured_products = products;
                break;
            case 'new':
                sections.new_products = products;
                break;
            case 'top_sale':
            case 'bestseller':
                sections.best_sellers = products;
                break;
            case 'on_sale':
                sections.sale_products = products;
                break;
            default:
                // Store with the original type as key
                sections[type] = products;
        }
    });

    return sections;
}

// Transform featured categories to product sections
export function transformFeaturedCategories(categories: any[]) {
    if (!categories || !Array.isArray(categories)) return [];

    return categories.map((cat) => ({
        id: cat.categoryId,
        name: cat.categoryName,
        image: cat.image_url,
        products: (cat.productList || []).map(transformProduct),
    }));
}

// Main transformer: Convert Markatty homepage response to frontend format
export function transformHomepageData(data: any) {
    // Return empty structure if data is invalid
    if (!data || !data.success) {
        console.warn('⚠️ Invalid homepage data received:', data?.message || 'No data');
        return {
            sliders: [],
            featured_products: [],
            best_sellers: [],
            new_products: [],
            exclusive_products: [],
            sets_products: [],
            niche_products: [],
            men_products: [],
            women_products: [],
            unisex_products: [],
            brands_products: [],
            categories: [],
            featuredCategories: [],
            ads: [],
            galleryImages: [],
            promotions: [],
            cmsPages: [],
            storeName: '',
            storeDescription: '',
            cartCount: 0,
            defaultCurrency: 'EGP',
        };
    }

    const carouselSections = transformCarousel(data.carousel || []);
    const featuredCategories = transformFeaturedCategories(data.featuredCategories || []);

    // Get products from featured categories as the main product source
    const allFeaturedProducts = featuredCategories.flatMap((cat) => cat.products);

    return {
        // Sliders for hero section
        sliders: transformBanners(data.bannerImages || []),

        // Product sections from carousel
        featured_products: carouselSections.featured_products || allFeaturedProducts,
        best_sellers: carouselSections.best_sellers || [],
        new_products: carouselSections.new_products || [],

        // Additional sections (will be empty if not present in carousel)
        exclusive_products: carouselSections.exclusive || [],
        sets_products: carouselSections.sets || [],
        niche_products: carouselSections.niche || [],
        men_products: carouselSections.men || [],
        women_products: carouselSections.women || [],
        unisex_products: carouselSections.unisex || [],
        brands_products: carouselSections.brands || [],

        // Categories - with safe slug generation
        categories: (data.categories || []).map((cat: any) => ({
            id: cat.id,
            name: cat.name || '',
            slug: (cat.name || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
            hasChildren: cat.hasChildren,
            image: cat.thumbnail,
            banner_url: cat.banner,
        })),

        // Featured categories with their products
        featuredCategories,

        // Ads and banners
        ads: data.ads || [],
        galleryImages: transformBanners(data.gallaryList || []),
        promotions: data.promotions || [],

        // CMS Data
        cmsPages: data.cmsData || [],

        // Store metadata
        storeName: data.homeSEO?.meta_title || '',
        storeDescription: data.homeSEO?.meta_description || '',

        // Additional config
        cartCount: data.cartCount || 0,
        defaultCurrency: data.defaultCurrency || 'EGP',

        // Raw data for debugging
        _raw: data,
    };
}
