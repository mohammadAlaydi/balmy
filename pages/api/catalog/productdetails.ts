import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id, locale = config.store.locale, productId } = req.query;

    if (!productId) {
        return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const url = `${config.api.baseUrl}/catalog/productdetails?storeId=${storeId}&locale=${locale}&productId=${productId}`;
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Product Details API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
