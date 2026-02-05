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
        cmsId
    } = req.query;

    let url = `${config.api.baseUrl}/extra/cmsdata?storeId=${storeId}&currency=${currency}&locale=${locale}`;
    if (cmsId) {
        url += `&cmsId=${cmsId}`;
    }

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

        if (!response.ok) {
            res.status(response.status).json({ success: false, message: "Error fetching CMS data" });
            return;
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('CMS Data API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
