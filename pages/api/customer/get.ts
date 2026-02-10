import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { getAuthToken } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const storeId = (req.query.storeId as string) || config.store.id;
    const currency = config.store.currency || 'EGP';
    const locale = config.store.locale || 'ar';
    const apiToken = config.api.token;

    // Get auth token from httpOnly cookie
    const token = getAuthToken(req);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated'
        });
    }

    // Use accountinfodata endpoint for user profile info
    const params = new URLSearchParams({
        token,
        storeId,
        currency,
        locale,
    });

    const url = `${config.api.baseUrl}/customer/accountinfodata?${params.toString()}`;

    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    try {
        console.log('[Profile] Fetching accountinfodata...');
        const response = await fetch(url, { headers });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response from Markatty accountinfodata:', text.substring(0, 300));
            return res.status(response.status || 500).json({
                success: false,
                message: 'Unexpected response from customer service'
            });
        }

        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        // Map accountinfodata response to our user data format
        const userData = {
            success: data.success,
            data: {
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                phone: data.mobile || '',
                gender: data.genderValue || '',
                dateOfBirth: data.DOBValue || '',
                middleName: data.middleName || '',
                // Include visibility/requirement flags for form rendering
                isMobileVisible: data.isMobileVisible || false,
                isMobileRequired: data.isMobileRequired || false,
                isDOBVisible: data.isDOBVisible || false,
                isDOBRequired: data.isDOBRequired || false,
                isGenderVisible: data.isGenderVisible || false,
                isGenderRequired: data.isGenderRequired || false,
                dateFormat: data.dateFormat || '',
            }
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error('[GET] Customer API Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
