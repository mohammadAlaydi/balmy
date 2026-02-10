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

    const { storeId = config.store.id } = req.query;
    const currency = config.store.currency;
    const locale = config.store.locale;

    // Extract token from Authorization header or request body
    const authToken = req.headers.authorization?.replace('Bearer ', '') || req.body?.token;

    // Build query params for Markatty saveaccountinfo endpoint
    const params = new URLSearchParams();

    // Profile fields
    if (req.body.firstName || req.body.first_name) params.append('first_name', req.body.firstName || req.body.first_name);
    if (req.body.lastName || req.body.last_name) params.append('last_name', req.body.lastName || req.body.last_name);
    if (req.body.email) params.append('email', req.body.email);
    if (req.body.phone || req.body.mobile) params.append('mobile', req.body.phone || req.body.mobile);
    if (req.body.gender !== undefined) params.append('gender', req.body.gender === 'female' ? '1' : '0');
    if (req.body.dob) params.append('dob', req.body.dob);

    // Password change fields (default: no change)
    params.append('doChangeEmail', req.body.doChangeEmail || '0');
    params.append('doChangePassword', req.body.doChangePassword || '0');
    if (req.body.oldpassword) params.append('oldpassword', req.body.oldpassword);
    if (req.body.password) params.append('password', req.body.password);
    if (req.body.password_confirmation) params.append('password_confirmation', req.body.password_confirmation);

    // Auth and store params
    if (authToken) params.append('token', authToken);
    params.append('storeId', storeId as string);
    params.append('currency', currency);
    params.append('locale', locale);

    const url = `${config.api.baseUrl}/customer/saveaccountinfo?${params.toString()}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
    };

    addAuthHeader(req, headers);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response from Markatty profile:', text.substring(0, 300));
            return res.status(response.status || 500).json({
                success: false,
                message: 'Unexpected response from profile service'
            });
        }

        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Update Profile API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
