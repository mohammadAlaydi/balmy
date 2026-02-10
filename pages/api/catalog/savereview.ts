import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { addAuthHeader } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { storeId = config.store.id, locale = 'ar' } = req.query;
    const apiToken = config.api.token;

    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    addAuthHeader(req, headers);

    const url = `${config.api.baseUrl}/customer/savereview?storeId=${storeId}&locale=${locale}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Save Review API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
