import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        // Optionally allow GET for logout if preferred, but POST is safer
    }

    const { storeId = config.store.id } = req.query;

    // Note: Markatty might expect /extra/logout or similar. 
    // User doc says: /extra/logout or /extra/customcollection
    // We'll use /extra/logout

    const url = `${config.api.baseUrl}/extra/logout?storeId=${storeId}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    if (req.headers.authorization) {
        headers['Authorization'] = req.headers.authorization;
    }

    try {
        // Attempt upstream logout
        const response = await fetch(url, {
            method: 'POST', // or GET depending on Markatty
            headers
        });

        // Regardless of upstream success, we return success to client to clear local state
        const data = await response.json().catch(() => ({}));

        res.status(200).json({ success: true, message: "Logged out successfully", data });
    } catch (error) {
        // Even if upstream fails, client should consider itself logged out
        console.error('Logout API Error:', error);
        res.status(200).json({ success: true, message: "Logged out locally" });
    }
}
