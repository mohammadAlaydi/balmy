import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id, locale = config.store.locale, currency = config.store.currency } = req.query;
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    // Assuming standard endpoint /checkout/shippingmethods or similar.
    // Documentation in MARKATTY_API.md lists: GET /api/checkout/shippingmethods
    const url = `${config.api.baseUrl}/checkout/shippingmethods?storeId=${storeId}&currency=${currency}&locale=${locale}`;

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Shipping Methods API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
