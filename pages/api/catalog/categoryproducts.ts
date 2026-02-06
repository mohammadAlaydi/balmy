import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        storeId = config.store.id,
        locale = 'en',
        categoryId,
        page = 1,
        limit = 20,
        sort,
        filter
    } = req.query;

    if (!categoryId) {
        return res.status(400).json({ success: false, message: 'Category ID is required' });
    }

    // Construct query parameters
    const queryParams = new URLSearchParams({
        storeId: storeId as string,
        locale: locale as string,
        categoryId: categoryId as string,
        page: page as string,
        limit: limit as string
    });

    if (sort) queryParams.append('sort', sort as string);
    // Add other filters as needed

    const url = `${config.api.baseUrl}/catalog/categoryproducts?${queryParams.toString()}`;
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

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
