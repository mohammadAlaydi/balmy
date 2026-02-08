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


    const token = getAuthToken(req);
    const params = new URLSearchParams({
        storeId,
        quoteId: '0',
        currency,
        locale,
    });
    if (token) params.append('token', token);

    const url = `${config.api.baseUrl}/checkout/emptycart?${params.toString()}`;

    console.log('[EmptyCart] URL:', url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response from Markatty emptycart:', text.substring(0, 300));
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
        console.error('Empty Cart API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
