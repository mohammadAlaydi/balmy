import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { storeId = config.store.id, locale = 'en' } = req.query;
    const apiToken = config.api.token;

    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    const url = `${config.api.baseUrl}/checkout/removefromcart`;

    // Body parsing: itemId
    const { itemId, token } = req.body;

    const bodyParams = new URLSearchParams();
    bodyParams.append('storeId', storeId as string);
    if (itemId) bodyParams.append('itemId', itemId.toString());
    if (token) bodyParams.append('token', token);

    try {
        const response = await fetch(url, {
            method: 'POST', // Usually removals are POST in many e-com APIs, or DELETE. Using POST as per common patterns unless specified otherwise.
            headers,
            body: bodyParams
        });

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
