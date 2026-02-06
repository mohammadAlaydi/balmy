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
    const { phone, otp, type = 'login' } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({
            success: false,
            message: 'يرجى إدخال رقم الجوال ورمز التحقق'
        });
    }

    const url = `${config.api.baseUrl}/customer/verifyotp?storeId=${storeId}`;

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
                otp,
                type
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
            let errorMessage = data?.message || 'رمز التحقق غير صحيح';

            if (response.status === 401 || response.status === 400) {
                errorMessage = 'رمز التحقق غير صحيح أو منتهي الصلاحية';
            }

            return res.status(response.status).json({
                success: false,
                message: errorMessage
            });
        }

        // Check for success: false in response body
        if (data.success === false) {
            return res.status(400).json({
                success: false,
                message: data.message || 'رمز التحقق غير صحيح'
            });
        }

        res.status(200).json({
            success: true,
            message: data.message || 'تم التحقق بنجاح',
            ...data
        });
    } catch (error: any) {
        console.error('Verify OTP API Error:', error?.message || error);

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
