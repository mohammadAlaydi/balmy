import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { getAuthToken } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const storeId = (req.query.storeId as string) || config.store.id;
    const locale = config.store.locale || 'ar';
    const apiToken = config.api.token;

    const { itemId, productId, qty = 1 } = req.body;
    const cookieToken = getAuthToken(req) || req.body?.token;

    // Markatty: customer/wishlisttocart?token=X&storeId=X&itemId=X&qty=1&productId=X&locale=X
    const params = new URLSearchParams();
    params.append('storeId', storeId);
    params.append('locale', locale);
    if (itemId) params.append('itemId', String(itemId));
    if (productId) params.append('productId', String(productId));
    params.append('qty', String(qty));
    if (cookieToken) params.append('token', cookieToken);

    const url = `${config.api.baseUrl}/customer/wishlisttocart?${params.toString()}`;

    const headers: HeadersInit = {
        'api-token': apiToken || '',
    };

    console.log('[WishlistToCart] URL:', url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('[WishlistToCart] Non-JSON response (status ' + response.status + '):', text.substring(0, 300));
            return res.status(response.status || 500).json({
                success: false,
                message: 'Unexpected response from wishlist service'
            });
        }

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('WishlistToCart API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
