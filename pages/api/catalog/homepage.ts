import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        storeId = config.store.id,
        currency = config.store.currency,
        locale = config.store.locale,
        width = '1000',
        mFactor = '2.5'
    } = req.query;

    const url = `${config.api.baseUrl}/catalog/homepage?storeId=${storeId}&currency=${currency}&locale=${locale}&width=${width}&mFactor=${mFactor}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    // Add JWT token if present in request headers
    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            res.status(response.status).json({ success: false, message: "Error fetching homepage" });
            return;
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Homepage API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
