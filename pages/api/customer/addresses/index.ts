import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id } = req.query;
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    if (req.method === 'POST') {
        // Create address
        const url = `${config.api.baseUrl}/customer/address/create?storeId=${storeId}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(req.body)
            });
            const data = await response.json();
            return res.status(response.status).json(data);
        } catch (error) {
            console.error('Create Address API Error:', error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}
