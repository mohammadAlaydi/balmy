import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id } = req.query;

    const url = `${config.api.baseUrl}/customer/get?storeId=${storeId}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    try {
        const response = await fetch(url, { headers });

        // Pass through status
        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Customer Profile API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
