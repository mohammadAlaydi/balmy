import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { storeId = config.store.id, locale = config.store.locale } = req.query;
    const apiToken = config.api.token;

    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/x-www-form-urlencoded' // Typically cart APIs use form data or JSON, sticking to implementation plan which mentions form data for some but JSON is safer usually. Let's start with JSON but support body parsing.
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    // Check if we need to pass data as form urlencoded as per user sample request for addtocart
    // "headers": { 'api-token': apiToken, 'Content-Type': 'application/x-www-form-urlencoded' }
    // body: new URLSearchParams({ productId, qty, token, storeId })

    const url = `${config.api.baseUrl}/checkout/addtocart`;

    // Prepare body for Markatty API
    // Incoming request body is likely JSON: { productId, qty, options }
    const { productId, qty, token } = req.body;

    const bodyParams = new URLSearchParams();
    bodyParams.append('storeId', storeId as string);
    if (productId) bodyParams.append('productId', productId);
    if (qty) bodyParams.append('qty', qty.toString());
    if (token) bodyParams.append('token', token); // Authorization token if passed in body

    // If there are configurable options, they might need special handling. 
    // For now, assuming standard add to cart.

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyParams
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Add to Cart API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
