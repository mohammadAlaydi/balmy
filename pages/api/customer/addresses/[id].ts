import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { addAuthHeader } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { storeId = config.store.id, id } = req.query; // id is the address ID
    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    addAuthHeader(req, headers);

    if (req.method === 'PUT') {
        // Update address
        // Markatty might use /customer/address/update/{id}
        const url = `${config.api.baseUrl}/customer/address/update/${id}?storeId=${storeId}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(req.body)
            });
            const data = await response.json();
            return res.status(response.status).json(data);
        } catch (error) {
            console.error('Update Address API Error:', error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    if (req.method === 'DELETE') {
        // Delete address
        const url = `${config.api.baseUrl}/customer/address/delete/${id}?storeId=${storeId}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            return res.status(response.status).json(data);
        } catch (error) {
            console.error('Delete Address API Error:', error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}
