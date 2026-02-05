import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Add import at the top
import { useLocale } from 'next-intl';

export default function FooterBalmy() {
    const locale = useLocale();

    return (
        <footer
            dir="rtl"
            className="bg-dark-gray-4 text-white w-full font-cairo"
        >
            {/* Main Content Section */}
            <div className="container mx-auto px-6 py-12 lg:py-16">
                {/* 3-Column Layout with Space Between */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">

                    {/* Column 1 - Customer Service (Right) */}
                    <div className="space-y-6">
                        <h3 className="text-xl lg:text-2xl font-bold mb-4">
                            خدمة العملاء
                        </h3>
                        <nav className="space-y-3">
                            <Link
                                href={`/${locale}/shipping`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                الأسئلة الأكثر تكراراً
                            </Link>
                            <Link
                                href={`/${locale}/about-us`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                من نحن
                            </Link>
                            <Link
                                href={`/${locale}/payment-methods`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                طرق الدفع
                            </Link>
                            <Link
                                href={`/${locale}/track-order`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                تتبع طلبك
                            </Link>
                        </nav>

                        {/* VAT Badge */}
                        <div className="mt-6 inline-flex items-center gap-3 bg-green/10 border border-green rounded-lg px-4 py-3">
                            <div className="w-12 h-12 bg-green rounded-md flex items-center justify-center">
                                <span className="text-white font-bold text-sm">VAT</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-light-gray-3">الرقم الضريبي</span>
                                <span className="text-sm font-semibold text-white">310233337700003</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 - About Us (Center) */}
                    <div className="space-y-6">
                        <h3 className="text-xl lg:text-2xl font-bold mb-4">
                            من نحن
                        </h3>
                        <nav className="space-y-3">
                            <Link
                                href={`/${locale}/stores`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                متاجرنا
                            </Link>
                            <Link
                                href={`/${locale}/about-us`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                الانضمام لفريق بالمي شركات العطور
                            </Link>
                            <Link
                                href={`/${locale}/shipping`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                الخصوصية و شروط الاستخدام
                            </Link>
                            <Link
                                href={`/${locale}/shipping`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                سياسة الشحن والاستبدال والاسترجاع والدفع والإلغاء
                            </Link>
                            <Link
                                href={`/${locale}/shipping`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                مركز الدعم
                            </Link>
                            <Link
                                href={`/${locale}/report-violation`}
                                className="block text-light-gray-3 hover:text-white transition-colors duration-300"
                            >
                                الإبلاغ عن الممارسات غير القانونية
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3 - Working Hours (Left) */}
                    <div className="space-y-6">
                        <h3 className="text-xl lg:text-2xl font-bold mb-4">
                            مواعيد الدوام
                        </h3>
                        <div className="text-light-gray-3 space-y-2">
                            <p className="text-base">طوال أيام الأسبوع</p>
                            <p className="text-sm">من 9 ص - إلى 11:30 ص</p>
                            <p className="text-sm">من 3:30 م - إلى 11:30 م</p>
                        </div>

                        {/* Logo/Badge Placeholder */}
                        <div className="mt-6 inline-flex items-center gap-3 bg-purple/10 border border-purple rounded-lg px-4 py-3">
                            <div className="w-12 h-12 bg-purple rounded-md flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l5.5 3.44v6.76L12 17.82l-5.5-3.44V7.62L12 4.18z" />
                                    <path d="M12 8l-3 2v4l3 2 3-2v-4l-3-2zm0 1.64l1.5.94v2.84l-1.5.94-1.5-.94v-2.84l1.5-.94z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-light-gray-3">موثق لدى منصة الأعمال</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Copyright Section */}
            <div className="border-t border-light-gray-6/20">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-light-gray-3">
                        {/* Right Side - Copyright */}
                        <p className="text-center md:text-right">
                            الحقوق محفوظة | 2025 لشركات العطور بالمي : وجهتك الأولى للعطور العالمية الأصلية
                        </p>

                        {/* Left Side - Registration Number */}
                        <p className="text-center md:text-left whitespace-nowrap">
                            السجل التجاري : 5950112917
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
