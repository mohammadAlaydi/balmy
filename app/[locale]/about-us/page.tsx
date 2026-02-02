"use client";

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutUsPage() {
    const locale = useLocale();

    return (
        <div className="bg-background-light dark:bg-background-dark font-cairo text-text-main-light dark:text-gray-100 transition-colors duration-300 antialiased min-h-screen">
            <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center text-sm text-text-muted-light dark:text-gray-500 mb-16">
                    <Link href={`/${locale}/home`} className="hover:text-text-main-light dark:hover:text-gray-300 transition-colors">
                        الرئيسية
                    </Link>
                    <span className="mx-2 text-xs opacity-50">&gt;</span>
                    <span className="text-text-muted-light dark:text-gray-300 font-medium">من نحن</span>
                </nav>

                <div className="space-y-16">
                    {/* Journey Section */}
                    <section className="relative">
                        <div className="mb-6 inline-block relative group">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-main-light dark:text-white pb-2 relative z-10">
                                رحلتنـــــــا
                            </h2>
                        </div>
                        <p className="text-lg leading-loose text-gray-600 dark:text-gray-300 max-w-3xl text-justify md:text-right font-light">
                            قبل أكثر من ثلاثين عاماً، كانت هناك فكرة بسيطة تحركها شغف لا ينطفئ: أن نجعل عالم العطور في متناول الجميع، بجودة استثنائية ولمسة فاخرة من متجر صغير إلى شبكة تضم أكثر من 18 فرعاً في أنحاء المملكة العربية السعودية. كبرت بالمي مع عملائها، ورحلتنا ما زالت تُكتب بنفحات من الإبداع والرقي.
                        </p>
                    </section>

                    {/* Mission Section */}
                    <section className="relative">
                        <div className="mb-6 inline-block relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-main-light dark:text-white pb-2 relative z-10">
                                رسالتنــــــا
                            </h2>
                        </div>
                        <p className="text-lg leading-loose text-gray-600 dark:text-gray-300 max-w-3xl text-justify md:text-right font-light">
                            تقديم أرقى وأصلي العطور العالمية، مع تجربة تسوق استثنائية تدمج بين الفخامة، الجودة، والسعر المناسب.
                        </p>
                    </section>

                    {/* Vision Section */}
                    <section className="relative">
                        <div className="mb-6 inline-block relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-main-light dark:text-white pb-2 relative z-10">
                                رؤيتنـــــــا
                            </h2>
                        </div>
                        <p className="text-lg leading-loose text-gray-600 dark:text-gray-300 max-w-3xl text-justify md:text-right font-light">
                            أن نكون الوجهة الأولى لعشاق العطور في المملكة، حيث يجد كل عميل عطره الذي يروي حكايته ويعكس شخصيته.
                        </p>
                    </section>
                </div>

                {/* Why Choose Balmy Section */}
                <div className="mt-24 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <h2 className="text-3xl font-bold text-text-main-light dark:text-white mb-10 text-right">
                        لمــــاذا تختــــار بالمــــي؟
                    </h2>
                    <ul className="space-y-6 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold text-text-main-light dark:text-white">تنوع يناسب الجميع :</span> روائح كلاسيكية راقية، عطور شرقية أصيلة، ونفحات عصرية مبتكرة.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold text-text-main-light dark:text-white">أكثر من 500 ماركة عالمية و 15,000 منتج أصلي،</span> تحت سقف واحد.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold text-text-main-light dark:text-white">شبكة فروع واسعة</span> تضم أكثر من 18 فرعاً لتكون دائماً بالقرب منك.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold text-text-main-light dark:text-white">خبرة تمتد لأكثر من 30 عاماً</span> في عالم العطور.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold text-text-main-light dark:text-white">خدمة عملاء مميزة</span> تهتم بتجربتك قبل وأثناء وبعد الشراء.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold text-text-main-light dark:text-white">منتجات حصرية</span> لا تجدها إلا لدينا.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0"></span>
                            <p className="text-lg leading-relaxed">
                                <span className="font-bold text-text-main-light dark:text-white">تغليف فاخر</span> يجعل عطرك هدية مثالية لكل مناسبة.
                            </p>
                        </li>
                    </ul>
                </div>
            </main>
            <div className="h-2 w-full bg-gradient-to-l from-gray-200 to-transparent dark:from-gray-800 dark:to-transparent mt-12 opacity-30"></div>
        </div>
    );
}
