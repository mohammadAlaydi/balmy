import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { getAuthToken } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const storeId = (req.query.storeId as string) || config.store.id;
    const currency = config.store.currency || 'EGP';
    const locale = config.store.locale || 'ar';
    const apiToken = config.api.token;

    const headers: HeadersInit = {
        'api-token': apiToken || '',
    };


    const { itemId } = req.body;
    const cookieToken = getAuthToken(req);

    // Markatty expects ALL params as query string (matching Postman: checkout/removecartitem)
    const params = new URLSearchParams();
    params.append('storeId', storeId);
    params.append('quoteId', '0');
    params.append('currency', currency);
    params.append('locale', locale);
    if (itemId) params.append('itemId', String(itemId));
    if (cookieToken) params.append('token', cookieToken);

    const url = `${config.api.baseUrl}/checkout/removecartitem?${params.toString()}`;

    console.log('[RemoveFromCart] URL:', url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response from Markatty removefromcart:', text.substring(0, 300));
            return res.status(response.status || 500).json({
                success: false,
                message: 'Unexpected response from cart service'
            });
        }

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Remove from Cart API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
