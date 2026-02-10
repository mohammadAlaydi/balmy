import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { addAuthHeader } from '@/lib/auth-cookies';

/**
 * GET /api/catalog/getCategorylist
 * 
 * Markatty does NOT have a standalone /catalog/categories endpoint.
 * Categories come from the homepage endpoint (/catalog/homepage).
 * This proxy fetches the homepage and extracts the categories array.
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        storeId = config.store.id,
        currency = 'EGP',
        locale = 'ar',
        width = '1080',
        mFactor = '2.625'
    } = req.query;

    // Fetch homepage to get categories (Markatty doesn't have a standalone categories endpoint)
    const url = `${config.api.baseUrl}/catalog/homepage?storeId=${storeId}&currency=${currency}&locale=${locale}&width=${width}&mFactor=${mFactor}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    addAuthHeader(req, headers);

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            res.status(response.status).json({ success: false, message: "Error fetching categories" });
            return;
        }

        const data = await response.json();

        // Extract categories from homepage data
        const categories = data.categories || [];

        res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        console.error('Categories API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
