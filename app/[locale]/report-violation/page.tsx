"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function ReportViolationPage() {
    const locale = useLocale();

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-cairo min-h-screen transition-colors duration-300">
            {/* Load Material Symbols for icons */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex justify-start text-xs sm:text-sm text-text-muted-light dark:text-text-muted-dark mb-8">
                    <Link href={`/${locale}/home`} className="hover:text-report-blue cursor-pointer transition-colors">
                        الرئيسية
                    </Link>
                    <span className="mx-2">&gt;</span>
                    <span className="font-semibold text-text-main-light dark:text-text-main-dark">
                        الإبلاغ عن الممارسات غير القانونية
                    </span>
                </nav>

                <main className="w-full">
                    {/* Header */}
                    <div className="text-center mb-10 space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-main-light dark:text-text-main-dark">
                            نموذج الإبلاغ عن الممارسات المخالفة
                        </h1>
                        <p className="text-xs sm:text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark max-w-3xl mx-auto">
                            حرصًا من <span className="font-bold text-black dark:text-white">بالـمي</span>، شركات العطور على ترسيخ مبادئ النزاهة والشفافية والامتثال للأنظمة والتعليمات السارية في المملكة العربية السعودية، فقد تم اعتماد هذا النموذج لتمكين الموظفين والأطراف ذات العلاقة من الإبلاغ عن أي ممارسات مشتبه بها أو أي سلوك غير قانوني أو غير أخلاقي، سواء كانت هذه الممارسات فعلية أو محتملة الحدوث أو محل اشتباه بوقوعها داخل أي من <span className="font-bold text-black dark:text-white">بالـمي</span> شركات العطور.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="max-w-4xl mx-auto space-y-6 pb-20">
                        {/* City Selection */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label
                                htmlFor="city"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right"
                            >
                                مدينة المخالفة
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <select
                                    id="city"
                                    className="w-full appearance-none bg-white dark:bg-surface-dark border border-report-border-light dark:border-border-dark rounded-DEFAULT pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-report-blue focus:border-transparent transition-shadow text-text-muted-light dark:text-text-muted-dark"
                                    defaultValue=""
                                >
                                    <option value="" disabled>اختـر المدينــة</option>
                                    <option value="riyadh">الرياض</option>
                                    <option value="jeddah">جدة</option>
                                    <option value="dammam">الدمام</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-400">
                                    <span className="material-symbols-outlined text-xl">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Violation Type */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label
                                htmlFor="type"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right"
                            >
                                نوع المخالفة
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <select
                                    id="type"
                                    className="w-full appearance-none bg-white dark:bg-surface-dark border border-report-border-light dark:border-border-dark rounded-DEFAULT pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-report-blue focus:border-transparent transition-shadow text-text-muted-light dark:text-text-muted-dark"
                                    defaultValue=""
                                >
                                    <option value="" disabled>اختـر من القائمــة</option>
                                    <option value="fraud">احتيال</option>
                                    <option value="theft">سرقة</option>
                                    <option value="harassment">تحرش</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-400">
                                    <span className="material-symbols-outlined text-xl">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Reporting About */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label
                                htmlFor="reporting-about"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right"
                            >
                                البــــــــــــلاغ عن
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <select
                                    id="reporting-about"
                                    className="w-full appearance-none bg-white dark:bg-surface-dark border border-report-border-light dark:border-border-dark rounded-DEFAULT pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-report-blue focus:border-transparent transition-shadow text-text-muted-light dark:text-text-muted-dark"
                                    defaultValue=""
                                >
                                    <option value="" disabled>اختـر من القائمــة</option>
                                    <option value="employee">موظف</option>
                                    <option value="manager">مدير</option>
                                    <option value="external">طرف خارجي</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-400">
                                    <span className="material-symbols-outlined text-xl">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Violator Name */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label
                                htmlFor="violator-name"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right"
                            >
                                اسم المخالف او أي بيانات عنه
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <select
                                    id="violator-name"
                                    className="w-full appearance-none bg-white dark:bg-surface-dark border border-report-border-light dark:border-border-dark rounded-DEFAULT pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-report-blue focus:border-transparent transition-shadow text-text-muted-light dark:text-text-muted-dark"
                                    defaultValue=""
                                >
                                    <option value="" disabled>اختـر من القائمــة</option>
                                    <option value="known">معروف</option>
                                    <option value="unknown">غير معروف</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-400">
                                    <span className="material-symbols-outlined text-xl">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                            <label
                                htmlFor="details"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right pt-2"
                            >
                                تفاصيل المخالفة
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <textarea
                                    id="details"
                                    rows={6}
                                    className="w-full bg-white dark:bg-surface-dark border border-report-border-light dark:border-border-dark rounded-DEFAULT px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-report-blue focus:border-transparent transition-shadow placeholder-gray-300 resize-none"
                                    placeholder="اكتــب هنـــــا"
                                ></textarea>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label
                                htmlFor="date"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right"
                            >
                                تاريــــخ المخالفة
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <input
                                    type="date"
                                    id="date"
                                    className="w-full bg-white dark:bg-surface-dark border border-report-blue dark:border-blue-400 rounded-DEFAULT px-4 py-3 text-sm text-left focus:outline-none focus:ring-2 focus:ring-report-blue focus:border-transparent transition-shadow text-text-muted-light dark:text-text-muted-dark ltr-text"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right">
                                تحميل ملف اختيـــاري
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <label
                                    htmlFor="file-upload"
                                    className="flex justify-center items-center w-full bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-medium py-3 rounded-DEFAULT cursor-pointer transition-colors text-sm shadow-sm"
                                >
                                    <span>ارفق الملــف مــن هنـــــا</span>
                                    <input type="file" id="file-upload" className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* Data Sharing Consent */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right leading-tight">
                                هل ترغب بمشاركة بياناتك<br />مع شركات العطور بالـمي
                            </label>
                            <div className="w-full md:w-3/4 flex justify-start gap-6 items-center">
                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <span className="text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200">
                                        نعم
                                    </span>
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="share_data"
                                            id="yes"
                                            className="peer sr-only"
                                        />
                                        <label
                                            htmlFor="yes"
                                            className="block w-6 h-6 rounded-full border border-gray-300 dark:border-gray-500 cursor-pointer peer-checked:border-report-blue peer-checked:bg-white peer-checked:after:content-[''] peer-checked:after:block peer-checked:after:w-3 peer-checked:after:h-3 peer-checked:after:bg-report-blue peer-checked:after:rounded-full peer-checked:after:absolute peer-checked:after:top-1.5 peer-checked:after:right-1.5 hover:border-gray-400 transition-colors"
                                        ></label>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <span className="text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200">
                                        لا
                                    </span>
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="share_data"
                                            id="no"
                                            className="peer sr-only"
                                            defaultChecked
                                        />
                                        <label
                                            htmlFor="no"
                                            className="block w-6 h-6 rounded-full border border-gray-300 dark:border-gray-500 cursor-pointer peer-checked:border-report-blue peer-checked:bg-white peer-checked:after:content-[''] peer-checked:after:block peer-checked:after:w-3 peer-checked:after:h-3 peer-checked:after:bg-report-blue peer-checked:after:rounded-full peer-checked:after:absolute peer-checked:after:top-1.5 peer-checked:after:right-1.5 hover:border-gray-400 transition-colors"
                                        ></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label
                                htmlFor="name"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right"
                            >
                                الاســـــــــــــــــم
                            </label>
                            <div className="w-full md:w-3/4 relative">
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-white dark:bg-surface-dark border border-report-border-light dark:border-border-dark rounded-DEFAULT px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-report-blue focus:border-transparent transition-shadow"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                            <label
                                htmlFor="phone"
                                className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right"
                            >
                                رقــــم الجـــــوال
                            </label>
                            <div className="w-full md:w-3/4 relative flex flex-row-reverse border border-report-border-light dark:border-border-dark rounded-DEFAULT bg-white dark:bg-surface-dark overflow-hidden focus-within:ring-2 focus-within:ring-report-blue focus-within:border-transparent transition-shadow">
                                <div className="w-20 border-r border-report-border-light dark:border-border-dark flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-text-muted-light dark:text-text-muted-dark text-sm" dir="ltr">
                                    +966
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="552661093"
                                    className="w-full flex-1 border-none bg-transparent px-4 py-3 text-sm text-left focus:ring-0 text-text-main-light dark:text-text-main-dark outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* Declaration */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-6 pt-4">
                            <label className="w-full md:w-1/4 text-sm font-bold text-text-main-light dark:text-text-main-dark mb-2 md:mb-0 text-right">
                                اقـــــــــــــــرار
                            </label>
                            <div className="w-full md:w-3/4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
                                أقر بأن المعلومات الواردة في هذا الإبلاغ صحيحة قدر علمي، وأنني أقدمه بحسن نية، مع علمي والإلزامي بأن الشركات تحافظ على سرية البلاغات وعدم اتخاذ أي إجراء انتقامي ضد المبلغ، وذلك وفقا للأنظمة والسياسات المعتمدة.
                            </div>
                        </div>

                        {/* Submit Button (Implied but nice to have, although user said exact match, the form ends without one in the snippet? Ah, the snippet is partial or maybe just a form layout. The screenshot usually implies a submit. I'll stick to the HTML. The HTML ends after the declaration. I will NOT add a submit button if it's not in the HTML provided, to be EXACT.) */}
                    </form>
                </main>
            </div>

            <style jsx global>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
            position: absolute;
            left: 10px;
        }
        /* Custom scrollbar to match the original */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
        }
        .dark ::-webkit-scrollbar-thumb {
            background-color: #4b5563;
        }
      `}</style>
        </div>
    );
}
