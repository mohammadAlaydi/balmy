import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { addAuthHeader } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        storeId = config.store.id,
        categoryId,
        page = 1,
        locale = 'ar',
        quoteId = 0,
        width = 1080,
        mFactor = 2.625,
    } = req.query;

    if (!categoryId) {
        return res.status(400).json({ success: false, message: 'Category ID is required' });
    }

    // Markatty uses /catalog/categoryPageData (not categoryproducts)
    const queryParams = new URLSearchParams({
        storeId: storeId as string,
        categoryId: categoryId as string,
        page: page as string,
        locale: locale as string,
        quoteId: quoteId as string,
        width: width as string,
        mFactor: mFactor as string,
    });

    const url = `${config.api.baseUrl}/catalog/categoryPageData?${queryParams.toString()}`;
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    // Forward auth token from cookie
    addAuthHeader(req, headers);

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Category Products API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
