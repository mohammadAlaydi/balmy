import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { addAuthHeader } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id, locale = 'en', page = 1, limit = 20 } = req.query;
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    addAuthHeader(req, headers);

    const url = `${config.api.baseUrl}/customer/orderlist?storeId=${storeId}&locale=${locale}&pageNumber=${page}&limit=${limit}`;

    try {
        const response = await fetch(url, { headers });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response from Markatty orderlist:', text.substring(0, 300));
            return res.status(response.status || 500).json({
                success: false,
                message: 'Unexpected response from order service'
            });
        }

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Order List API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
