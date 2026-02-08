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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
        });
    }

    // Markatty login requires: username (not email), password, company_id
    const params = new URLSearchParams({
        username: email,
        password,
        company_id: config.company.markattyCompanyId,
    });

    console.log('[Login] Request URL:', `${config.api.baseUrl}/customer/login?username=${email}&password=***&company_id=${config.company.markattyCompanyId}`);

    const url = `${config.api.baseUrl}/customer/login?${params.toString()}`;

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
            console.log('[Login] Markatty response status:', response.status, 'data:', JSON.stringify(data).substring(0, 500));
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
            const errorMessage = data?.message || data?.error || 'فشل في تسجيل الدخول';

            if (response.status === 401 || response.status === 403) {
                return res.status(401).json({
                    success: false,
                    message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
                });
            }

            if (response.status === 404) {
                return res.status(404).json({
                    success: false,
                    message: 'الحساب غير موجود. يرجى التحقق من البريد الإلكتروني'
                });
            }

            return res.status(response.status).json({
                success: false,
                message: errorMessage
            });
        }

        // Check for success: false in the response body (Markatty returns 200 with success: false for invalid credentials)
        if (data.success === false) {
            return res.status(401).json({
                success: false,
                message: data.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            });
        }

        // Success - store JWT in httpOnly cookie
        if (data.token) {
            setAuthCookie(res, data.token);
        }

        res.status(200).json({
            success: true,
            message: data.message || 'تم تسجيل الدخول بنجاح',
            data: {
                firstName: data.customerName?.split(' ')[0] || '',
                lastName: data.customerName?.split(' ').slice(1).join(' ') || '',
                email: data.customerEmail || email,
                phone: data.customerMobile || '',
                cartCount: data.cartCount || 0,
            }
        });
    } catch (error: any) {
        console.error('Login API Error:', error?.message || error);

        // More specific error messages
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
