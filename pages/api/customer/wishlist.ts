import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id, locale = 'en', currency = 'EGP' } = req.query;
    const apiToken = config.api.token;

    // Extract token from Authorization header or body
    const authToken = req.headers.authorization?.replace('Bearer ', '') || req.body?.token;

    try {
        if (req.method === 'GET') {
            // GET /customer/wishlist - Fetch wishlist items
            const url = `${config.api.baseUrl}/customer/wishlist?storeId=${storeId}&currency=${currency}&locale=${locale}${authToken ? `&token=${authToken}` : ''}`;
            const headers: HeadersInit = {
                'api-token': apiToken || '',
                'Content-Type': 'application/json'
            };

            const response = await fetch(url, { headers });
            const data = await response.json();
            if (!response.ok) return res.status(response.status).json(data);
            return res.status(200).json(data);
        }

        if (req.method === 'POST') {
            // POST /catalog/addtowishlist - Add product to wishlist
            const { productId, token } = req.body;
            const userToken = token || authToken;

            const url = `${config.api.baseUrl}/catalog/addtowishlist`;
            const headers: HeadersInit = {
                'api-token': apiToken || '',
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const bodyParams = new URLSearchParams();
            bodyParams.append('productId', productId?.toString() || '');
            bodyParams.append('storeId', storeId as string);
            if (userToken) bodyParams.append('token', userToken);

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: bodyParams
            });
            const data = await response.json();
            return res.status(response.status).json(data);
        }

        if (req.method === 'DELETE') {
            // POST /customer/removefromwishlist - Remove item from wishlist
            const { itemId, productId, token } = req.body;
            const userToken = token || authToken;

            const url = `${config.api.baseUrl}/customer/removefromwishlist`;
            const headers: HeadersInit = {
                'api-token': apiToken || '',
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const bodyParams = new URLSearchParams();
            // Use itemId (wishlist item ID) if available, otherwise productId
            bodyParams.append('itemId', (itemId || productId)?.toString() || '');
            bodyParams.append('storeId', storeId as string);
            if (userToken) bodyParams.append('token', userToken);

            const response = await fetch(url, {
                method: 'POST', // Markatty uses POST for remove operations
                headers,
                body: bodyParams
            });
            const data = await response.json();
            return res.status(response.status).json(data);
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('Wishlist API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
