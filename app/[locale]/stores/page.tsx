"use client";

import { useLocale } from 'next-intl';
import Link from 'next/link';

interface Branch {
    id: string;
    city_code: string;
    city_name: string;
    address: string;
    email: string;
    whatsapp: string;
    phone: string;
}

const branches: Branch[] = [
    {
        id: "101",
        city_code: "101",
        city_name: "حفر الباطن - 101",
        address: "حي البلدية - طريق الملك فيصل",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "102",
        city_code: "102",
        city_name: "تبـــــــوك - 102",
        address: "حي المهرجان أ - مجمع الموسى",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "103",
        city_code: "103",
        city_name: "تبوك ميلاغــــرو - 103",
        address: "حي العليا - ميلاغرو بوتيك",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "105",
        city_code: "105",
        city_name: "تبــــوك بــارك - 105",
        address: "حي المروج الأمير - تبوك بارك مول",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "106",
        city_code: "106",
        city_name: "حائل سلطان - 106",
        address: "حي الجامعيين- حي الوسيطاء_طريق الأمير سلطان",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "107",
        city_code: "107",
        city_name: "حائل سكوير - 107",
        address: "حي الوسيطاء - مجمع سكوير",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "109",
        city_code: "109",
        city_name: "الريــــــاض - 109",
        address: "حي اليرموك - أطياف مول",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "110",
        city_code: "110",
        city_name: "نجران - رويال سنتر - 110",
        address: "حي العاثيبة - رويال سنتر",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "111",
        city_code: "111",
        city_name: "جازان كادي مول - 111",
        address: "حي الشاطئ - كادي مول",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "112",
        city_code: "112",
        city_name: "خميس مشيط - 112",
        address: "حي ام سراع - طريق الامير",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "113",
        city_code: "113",
        city_name: "الخالــــــــــدية - 113",
        address: "حي ال منجم - طريق الملك عبد العزيز",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "114",
        city_code: "114",
        city_name: "نجران الفيصلية - 114",
        address: "حي الفيصلية - طريق الملك عبد العزيز",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "115",
        city_code: "115",
        city_name: "العزام مول - 115",
        address: "الفيصلية طريق الملك عبدالعزيز",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "119",
        city_code: "119",
        city_name: "حائل النقرة - 119",
        address: "حي النقرة - طريق فهد العلي",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "121",
        city_code: "121",
        city_name: "نجــــــــران بارك - 121",
        address: "نجران - حي الاثايبة - طريق الملك عبد العزيز",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "122",
        city_code: "122",
        city_name: "حفر الباطن 2 - 122",
        address: "حي البلدية - حفر الباطن - طريق الملك فيصل",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "123",
        city_code: "123",
        city_name: "حائــــــــل زون - 123",
        address: "حائل - حي النقرة - مجمع حائل زون",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    },
    {
        id: "124",
        city_code: "124",
        city_name: "الباحـــــــــــــــة - 124",
        address: "حي الشفاء - الغنيم مول مقابل بوليفارد",
        email: "info@perfumtc.com",
        whatsapp: "+966552661093",
        phone: "+966552661093"
    }
];

export default function StoresPage() {
    const locale = useLocale();

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-cairo min-h-screen transition-colors duration-300">
            {/* Load Material Icons Outlined */}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />

            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                {/* Breadcrumb */}
                <div className="flex justify-end items-center mb-12 text-sm text-text-muted-light dark:text-text-muted-dark">
                    <nav className="flex items-center space-x-2 space-x-reverse">
                        <Link href={`/${locale}/home`} className="hover:text-stores-primary transition-colors">
                            الرئيسية
                        </Link>
                        <span className="text-xs">&gt;</span>
                        <span className="font-bold text-text-main-light dark:text-text-main-dark">الفروع</span>
                    </nav>
                </div>

                {/* Branches List */}
                <div className="space-y-10">
                    {branches.map((branch) => (
                        <div key={branch.id} className="group">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 text-text-main-light dark:text-white text-right">
                                {branch.city_name}
                            </h2>
                            <div className="bg-gray-50 dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-transparent dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                                    <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center text-center px-2">
                                        <span className="text-text-muted-light dark:text-text-muted-dark font-medium">
                                            {branch.address}
                                        </span>
                                    </div>
                                    <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                                    <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center text-center px-2">
                                        <span className="block text-text-main-light dark:text-white font-bold text-sm mb-1">
                                            البريد الإلكتروني
                                        </span>
                                        <a className="text-stores-primary text-sm hover:underline" href={`mailto:${branch.email}`}>
                                            {branch.email}
                                        </a>
                                    </div>
                                    <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                                    <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center text-center px-2">
                                        <span className="block text-text-main-light dark:text-white font-bold text-sm mb-1">
                                            واتس اب
                                        </span>
                                        <a className="text-stores-primary text-sm font-medium" dir="ltr" href={`https://wa.me/${branch.whatsapp.replace('+', '')}`}>
                                            {branch.whatsapp}
                                        </a>
                                    </div>
                                    <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                                    <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center text-center px-2">
                                        <span className="block text-text-main-light dark:text-white font-bold text-sm mb-1">
                                            جوال
                                        </span>
                                        <a className="text-stores-primary text-sm font-medium" dir="ltr" href={`tel:${branch.phone}`}>
                                            {branch.phone}
                                        </a>
                                    </div>
                                    <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                                    <div className="w-full md:w-24 flex items-center justify-center">
                                        <span className="material-icons-outlined text-stores-primary text-3xl opacity-80">location_on</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                /* Material Icons Outlined font family */
                .material-icons-outlined {
                    font-family: 'Material Icons Outlined';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;  /* Preferred icon size */
                    display: inline-block;
                    line-height: 1;
                    text-transform: none;
                    letter-spacing: normal;
                    word-wrap: normal;
                    white-space: nowrap;
                    direction: ltr;
            
                    /* Support for all WebKit browsers. */
                    -webkit-font-smoothing: antialiased;
                    /* Support for Safari and Chrome. */
                    text-rendering: optimizeLegibility;
            
                    /* Support for Firefox. */
                    -moz-osx-font-smoothing: grayscale;
            
                    /* Support for IE. */
                    font-feature-settings: 'liga';
                }
            `}</style>
        </div>
    );
}
