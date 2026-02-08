import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';
import { setAuthCookie } from '@/lib/auth-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { storeId = config.store.id } = req.query;
    // Body should contain firstName, lastName, email, password, etc.

    // Map camelCase to snake_case for Markatty API
    const { firstName, lastName, email, password, confirmPassword, phone } = req.body;

    // Markatty API expects data as query parameters, not JSON body
    const params = new URLSearchParams({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        password: password || '',
        is_subscribed: 'true',
        token: '0',
        company_id: config.company.markattyCompanyId,
        storeId: String(storeId),
        currency: config.store.currency || 'SAR',
        locale: config.store.locale || 'ar',
    });

    const url = `${config.api.baseUrl}/customer/createaccount?${params.toString()}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            // Non-JSON response - likely an HTML error page
            const text = await response.text();
            console.error('Non-JSON response from Markatty:', text.substring(0, 500));
            return res.status(500).json({
                success: false,
                message: 'عذراً، حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً'
            });
        }

        if (!response.ok) {
            // Handle specific error cases
            let errorMessage = data?.message || 'فشل في إنشاء الحساب';

            // Check for email already exists
            if (errorMessage.toLowerCase().includes('email') &&
                (errorMessage.toLowerCase().includes('exist') || errorMessage.toLowerCase().includes('taken') || errorMessage.toLowerCase().includes('already'))) {
                errorMessage = 'البريد الإلكتروني مسجل مسبقاً';
            }

            // Check for password issues  
            if (errorMessage.toLowerCase().includes('password') && errorMessage.toLowerCase().includes('match')) {
                errorMessage = 'كلمتا المرور غير متطابقتين';
            }

            return res.status(response.status).json({
                success: false,
                message: errorMessage
            });
        }

        // Check if Markatty returns success: false in body
        if (data.success === false) {
            let errorMessage = data.message || 'فشل في إنشاء الحساب';

            if (errorMessage.toLowerCase().includes('email') &&
                (errorMessage.toLowerCase().includes('exist') || errorMessage.toLowerCase().includes('taken'))) {
                errorMessage = 'البريد الإلكتروني مسجل مسبقاً';
            }

            return res.status(400).json({
                success: false,
                message: errorMessage
            });
        }

        // Store JWT in httpOnly cookie
        if (data.token) {
            setAuthCookie(res, data.token);
        }

        res.status(200).json({
            success: true,
            message: data.message || 'تم إنشاء الحساب بنجاح',
            data: {
                firstName: data.customerName?.split(' ')[0] || firstName || '',
                lastName: data.customerName?.split(' ').slice(1).join(' ') || lastName || '',
                email: data.customerEmail || email,
                phone: data.customerMobile || '',
                cartCount: data.cartCount || 0,
            }
        });
    } catch (error: any) {
        console.error('Registration API Error:', error?.message || error);

        if (error?.code === 'ECONNREFUSED' || error?.code === 'ENOTFOUND') {
            return res.status(503).json({
                success: false,
                message: 'تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً'
            });
        }

        if (error?.name === 'AbortError' || error?.code === 'ETIMEDOUT') {
            return res.status(504).json({
                success: false,
                message: 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى'
            });
        }

        res.status(500).json({
            success: false,
            message: 'عذراً، حدث خطأ في الخادم. يرجى المحاولة لاحقاً'
        });
    }
}
