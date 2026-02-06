import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'PUT') {
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

    const url = `${config.api.baseUrl}/checkout/updatecart`;

    // Body parsing: itemId, qty
    const { itemId, qty, token } = req.body;

    const bodyParams = new URLSearchParams();
    bodyParams.append('storeId', storeId as string);
    if (itemId) bodyParams.append('itemId', itemId.toString());
    if (qty) bodyParams.append('qty', qty.toString());
    if (token) bodyParams.append('token', token);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: bodyParams
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Update Cart API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
