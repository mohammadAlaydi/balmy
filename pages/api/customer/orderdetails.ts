import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id, locale = config.store.locale, orderId } = req.query;

    if (!orderId) {
        return res.status(400).json({ success: false, message: 'Order ID is required' });
    }

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    const url = `${config.api.baseUrl}/customer/orderdetails?storeId=${storeId}&locale=${locale}&orderId=${orderId}`;

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Order Details API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
