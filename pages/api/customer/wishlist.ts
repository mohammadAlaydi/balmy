import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id, locale = config.store.locale, currency = config.store.currency } = req.query;
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    try {
        if (req.method === 'GET') {
            const url = `${config.api.baseUrl}/customer/wishlist?storeId=${storeId}&currency=${currency}&locale=${locale}`;
            const response = await fetch(url, { headers });
            const data = await response.json();
            if (!response.ok) return res.status(response.status).json(data);
            return res.status(200).json(data);
        }

        if (req.method === 'POST') {
            // Add to wishlist
            // Markatty API often uses /customer/wishlist/add or similar, but let's assume standard REST or map to specific endpoint
            // The user plan mentioned /customer/wishlist for parameters: token, storeId, currency. That sounds like GET.
            // For add: /checkout/addtowishlist or /wishlist/add.
            // Let's assume typical Markatty pattern or what I defined in plan.
            // Plan: POST /api/customer/wishlist -> Proxies to Markatty's add endpoint.
            // Let's try /customer/wishlist/add if standard, or check documentation provided.
            // Docs provided: "/customer/wishlist Parameters: token, storeId, currency." -> GET
            // Docs didn't explicitly detail Add/Remove wishlist URL in the "Sample Requests" section but listed "wishlist → cart" in checklist.
            // Assumption: POST to /customer/wishlist adds, DELETE removes OR specific endpoints.
            // Common Mobikul/Bagisto: /customer/wishlist/add/{productId} or body.

            // I will use /customer/wishlist/add and /customer/wishlist/remove for now which is safer guess than method overloading on same URL if not RESTful.
            // But to keep my local API clean:
            // POST /api/customer/wishlist -> Adds item
            // DELETE /api/customer/wishlist -> Removes item

            const { productId } = req.body;
            const url = `${config.api.baseUrl}/customer/wishlist/add/${productId}?storeId=${storeId}`; // Guessing path
            // If it fails I'll fix it. User said "Full Markatty API ... /customer/wishlist".

            const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(req.body) });
            const data = await response.json();
            return res.status(response.status).json(data);
        }

        if (req.method === 'DELETE') {
            const { productId } = req.body; // or query param
            const url = `${config.api.baseUrl}/customer/wishlist/remove/${productId}?storeId=${storeId}`;
            const response = await fetch(url, { method: 'DELETE', headers });
            const data = await response.json();
            return res.status(response.status).json(data);
        }

        return res.status(405).json({ success: false, message: 'Method not allowed' });

    } catch (error) {
        console.error('Wishlist API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
