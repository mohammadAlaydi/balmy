import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { addAuthHeader } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        storeId = config.store.id,
        currency = 'EGP',
        locale = 'en',
        width = '1000',
        mFactor = '2.5'
    } = req.query;

    const localeStr = Array.isArray(locale) ? locale[0] : locale;

    const url = `${config.api.baseUrl}/catalog/homepage?storeId=${storeId}&currency=${currency}&locale=${locale}&width=${width}&mFactor=${mFactor}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    addAuthHeader(req, headers);

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            res.status(response.status).json({ success: false, message: "Error fetching homepage" });
            return;
        }

        const data = await response.json();

        // Get first 4 categories only
        const allCategories = data.featuredCategories || [];
        const limitedCategories = allCategories.slice(0, 4);

        // Get single ad from backend (first one only)
        const ads = data.ads || [];
        const singleAd = ads.length > 0 ? ads[0] : null;

        // Build homeSections array with proper order:
        // Cat1 -> Cat2 -> PaymentInstallment -> Cat3 -> Partners -> Cat4 -> Ad -> Promotions
        const homeSections: any[] = [];

        // Category 1
        if (limitedCategories[0]) {
            homeSections.push({
                type: 'category',
                position: 1,
                data: limitedCategories[0]
            });
        }

        // Category 2
        if (limitedCategories[1]) {
            homeSections.push({
                type: 'category',
                position: 2,
                data: limitedCategories[1]
            });
        }

        // Payment Installment Banner with localized data
        homeSections.push({
            type: 'payment_installment',
            position: 3,
            data: {
                mainText: localeStr === 'ar' ? 'قسط مشترياتك على 4 دفعات' : 'Split your purchases into 4 payments',
                subText: localeStr === 'ar' ? 'من غير رسوم او غرامات' : 'Without fees or penalties',
                providers: ['tabby', 'tamara']
            }
        });

        // Category 3
        if (limitedCategories[2]) {
            homeSections.push({
                type: 'category',
                position: 4,
                data: limitedCategories[2]
            });
        }

        // Partners section with data from backend
        homeSections.push({
            type: 'partners',
            position: 5,
            data: {
                title: localeStr === 'ar' ? 'وجهتك الأولى للعطور العالمية الأصلية' : 'Your First Destination for Original International Perfumes',
                subtitle: localeStr === 'ar' ? 'الماركات العالمية الأخر مبيعاً في السعودية' : 'Top selling international brands in Saudi Arabia',
                partners: [
                    { id: 1, name: 'Rolex', logo: '/assets/images/18975-rolex-logo.png' },
                    { id: 2, name: 'Dior', logo: '/assets/images/Dior-Logo.jpg' },
                    { id: 3, name: 'Versace', logo: '/assets/images/Versace.png' },
                    { id: 4, name: 'Emporia', logo: '/assets/images/emporia-state-university.jpg' },
                    { id: 5, name: 'Brand', logo: '/assets/images/images.png' }
                ]
            }
        });

        // Category 4
        if (limitedCategories[3]) {
            homeSections.push({
                type: 'category',
                position: 6,
                data: limitedCategories[3]
            });
        }

        // Single Ad from backend
        if (singleAd) {
            homeSections.push({
                type: 'ad',
                position: 7,
                data: singleAd
            });
        }

        // Promotions section with data from backend
        homeSections.push({
            type: 'promotions',
            position: 8,
            data: {
                title: localeStr === 'ar' ? 'فروعنا في المملكة لأكثر من 30 عام' : 'Our branches in the Kingdom for over 30 years',
                subtitle: localeStr === 'ar' ? 'نخدم بخدمة أكثر من مليون عميل' : 'Serving over a million customers',
                items: [
                    {
                        id: 'secure',
                        icon: 'shield-check',
                        title: localeStr === 'ar' ? 'آمن ومضمون' : 'Safe & Secure',
                        description: ''
                    },
                    {
                        id: 'original',
                        icon: 'badge-check',
                        title: localeStr === 'ar' ? 'أصلي 100%' : '100% Original',
                        description: ''
                    },
                    {
                        id: 'satisfaction',
                        icon: 'thumbs-up',
                        title: localeStr === 'ar' ? 'رضاكم مضمون' : 'Satisfaction Guaranteed',
                        description: ''
                    },
                    {
                        id: 'free_shipping',
                        icon: 'truck',
                        title: localeStr === 'ar' ? 'شحن مجاني' : 'Free Shipping',
                        description: localeStr === 'ar' ? 'للطلبات التي تزيد قيمتها عن 299 ريال' : 'For orders over 299 SAR'
                    }
                ]
            }
        });

        // Return transformed response
        const transformedData = {
            ...data,
            featuredCategories: limitedCategories,
            homeSections,
            singleAd
        };

        res.status(200).json(transformedData);
    } catch (error) {
        console.error('Homepage API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


