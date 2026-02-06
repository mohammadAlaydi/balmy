import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@/lib/config';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { storeId = config.store.id } = req.query;
    const { phone, type = 'login' } = req.body;

    if (!phone) {
        return res.status(400).json({
            success: false,
            message: 'يرجى إدخال رقم الجوال'
        });
    }

    const url = `${config.api.baseUrl}/customer/sendotp?storeId=${storeId}`;

    const apiToken = config.api.token;
    const headers: HeadersInit = {
        'api-token': apiToken || '',
        'Content-Type': 'application/json'
    };

    // Format phone number
    const formattedPhone = phone.startsWith('+966') ? phone : `+966${phone}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                mobile: formattedPhone,
                type // 'login', 'register', 'forgotpassword'
            })
        });

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response from Markatty:', text.substring(0, 500));
            return res.status(500).json({
                success: false,
                message: 'عذراً، حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً'
            });
        }

        if (!response.ok) {
            const errorMessage = data?.message || 'فشل في إرسال رمز التحقق';
            return res.status(response.status).json({
                success: false,
                message: errorMessage
            });
        }

        // Check for success: false in response body
        if (data.success === false) {
            return res.status(400).json({
                success: false,
                message: data.message || 'فشل في إرسال رمز التحقق'
            });
        }

        res.status(200).json({
            success: true,
            message: data.message || 'تم إرسال رمز التحقق بنجاح',
            ...data
        });
    } catch (error: any) {
        console.error('Send OTP API Error:', error?.message || error);

        if (error?.code === 'ECONNREFUSED' || error?.code === 'ENOTFOUND') {
            return res.status(503).json({
                success: false,
                message: 'تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً'
            });
        }

        res.status(500).json({
            success: false,
            message: 'عذراً، حدث خطأ في الخادم. يرجى المحاولة لاحقاً'
        });
    }
}
