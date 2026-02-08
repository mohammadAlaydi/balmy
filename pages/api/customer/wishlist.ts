import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { getAuthToken } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const storeId = (req.query.storeId as string) || config.store.id;
    const locale = (req.query.locale as string) || config.store.locale || 'ar';
    const currency = (req.query.currency as string) || config.store.currency || 'EGP';
    const apiToken = config.api.token;

    // Extract token from cookie or body fallback
    const authToken = getAuthToken(req) || req.body?.token;

    // Markatty uses api-token header only (NOT Authorization: Bearer)
    const headers: HeadersInit = {
        'api-token': apiToken || '',
    };

    try {
        if (req.method === 'GET') {
            // GET /customer/wishlist - Fetch wishlist items
            // Postman: {{url}}mobikulhttp/customer/wishlist?token=X&storeId=X&locale=X&currency=X
            const params = new URLSearchParams({
                storeId,
                locale,
                currency,
            });
            if (authToken) params.append('token', authToken);

            const url = `${config.api.baseUrl}/customer/wishlist?${params.toString()}`;
            console.log('[Wishlist GET] URL:', url);

            const response = await fetch(url, { headers });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('[Wishlist GET] Non-JSON response (status ' + response.status + '):', text.substring(0, 300));
                return res.status(response.status || 500).json({
                    success: false,
                    message: 'Unexpected response from wishlist service'
                });
            }

            const data = await response.json();
            if (!response.ok) return res.status(response.status).json(data);
            return res.status(200).json(data);
        }

        if (req.method === 'POST') {
            // POST /catalog/addtowishlist - Add product to wishlist
            // Postman: All params as query string
            const { productId, token } = req.body;
            const userToken = token || authToken;

            const params = new URLSearchParams({
                storeId,
            });
            if (productId) params.append('productId', String(productId));
            if (userToken) params.append('token', userToken);

            const url = `${config.api.baseUrl}/catalog/addtowishlist?${params.toString()}`;
            console.log('[Wishlist POST] URL:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers,
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('[Wishlist POST] Non-JSON response (status ' + response.status + '):', text.substring(0, 300));
                return res.status(response.status || 500).json({
                    success: false,
                    message: 'Unexpected response from wishlist service'
                });
            }

            const data = await response.json();
            return res.status(response.status).json(data);
        }

        if (req.method === 'DELETE') {
            // POST /customer/removefromwishlist - Remove item from wishlist
            // Postman: All params as query string
            const { itemId, productId, token } = req.body;
            const userToken = token || authToken;

            const params = new URLSearchParams({
                storeId,
            });
            params.append('itemId', String(itemId || productId || ''));
            if (userToken) params.append('token', userToken);

            const url = `${config.api.baseUrl}/customer/removefromwishlist?${params.toString()}`;
            console.log('[Wishlist DELETE] URL:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers,
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('[Wishlist DELETE] Non-JSON response (status ' + response.status + '):', text.substring(0, 300));
                return res.status(response.status || 500).json({
                    success: false,
                    message: 'Unexpected response from wishlist service'
                });
            }

            const data = await response.json();
            return res.status(response.status).json(data);
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('Wishlist API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
