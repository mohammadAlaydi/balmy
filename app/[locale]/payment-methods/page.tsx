"use client";

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function PaymentMethodsPage() {
    const locale = useLocale();

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-cairo min-h-screen transition-colors duration-300 antialiased flex flex-col items-center">
            <main className="w-full max-w-5xl px-6 py-10 md:px-12 md:py-16">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-text-muted-light dark:text-text-muted-dark mb-12">
                    <Link href={`/${locale}/home`} className="hover:text-text-main-light dark:hover:text-white transition-colors">
                        الرئيسية
                    </Link>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">/</span>
                    <span className="font-medium text-text-main-light dark:text-text-main-dark">طرق الدفع</span>
                </nav>

                {/* Page Title */}
                <div className="mb-12 relative inline-block">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-text-main-light dark:text-white mb-2">
                        طرق الدفع لدينا
                    </h1>
                    <div className="h-1 w-16 bg-gray-800 dark:bg-gray-400 absolute -bottom-2 right-0"></div>
                </div>

                <div className="space-y-10 text-right leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                    {/* Credit Card Section */}
                    <section>
                        <h2 className="text-lg md:text-xl font-bold text-text-main-light dark:text-white mb-4">
                            بطاقة الائتمان :
                        </h2>
                        <div className="space-y-4 text-sm md:text-base">
                            <p>
                                تعتمد شركة <span className="font-bold">بالمي</span> شركات العطور وسيلة الدفع الآمن باستخدام بطاقات الائتمان كخيار الدفع المفضل. ونحرص على حماية بيانات بطاقات الائتمان الخاصة بعملائنا من خلال استخدام أحدث تقنيات التشفير الإلكتروني، بما يضمن أعلى مستويات الأمان أثناء عمليات الدفع. كما تلتزم <span className="font-bold">بالمي</span> شركات العطور بتوفير تجربة تسوق آمنة وموثوقة عبر موقعها الإلكتروني.
                            </p>
                            <p>
                                نقبل حالياً بطاقات الائتمان من نوع فيزا كارد وماستر كارد، ولا تترتب أي رسوم إضافية عند الدفع باستخدام بطاقات الائتمان.
                                <br />
                                الدفع نقداً عند الاستلام
                            </p>
                            <p className="mt-4">
                                كما أننا نقبل بالدفع النقدي عند تسليم المشتريات، كوسيلة بديلة للدفع باستخدام بطاقة الائتمان.
                                <br />
                                باستخدامك هذه الوسيلة، فسيكون بإمكانك الدفع نقداً عند استلامك للمنتجات التي طلبتها.
                            </p>
                        </div>
                    </section>

                    {/* Apple Pay Section */}
                    <section>
                        <h2 className="text-lg md:text-xl font-bold text-text-main-light dark:text-white mb-4">
                            آبل بـــاي :
                        </h2>
                        <p className="text-sm md:text-base">
                            أجدد طرق الدفع المقدمة من قولدن سنت للحصول على أسرع وسيلة للدفع ولإكمال طلبك بأقل وقت ممكن.
                        </p>
                    </section>

                    {/* Tamara & Tabby Section */}
                    <section>
                        <h2 className="text-lg md:text-xl font-bold text-text-main-light dark:text-white mb-4">
                            تمــــارا & تابــــي
                        </h2>
                        <p className="text-sm md:text-base">
                            أصبحت تجربة التسوق أكثر سهولة ومرونة، اشتر ما تحتاجه وادفع بكل راحة، حيث تتيح لك خدمة تمارا خيار الدفع خلال 30 يومًا أو تقسيط المبلغ إلى ثلاث دفعات متساوية دون أي فوائد.
                        </p>
                    </section>

                    {/* Tasheel Section */}
                    <section>
                        <h2 className="text-lg md:text-xl font-bold text-text-main-light dark:text-white mb-4">
                            تساهيل : ( التقسيط البنكي لعملاء مصرف الراجحي )
                        </h2>
                        <div className="space-y-4 text-sm md:text-base">
                            <p>
                                توفر <span className="font-bold">بالمي</span> شركات العطور خدمة «تساهيل»، وهي خدمة التقسيط البنكي المتاحة للطلبات التي تبلغ قيمتها 350 ريالاً أو أكثر. تتيح هذه الخدمة للعملاء إمكانية سداد قيمة الطلب على أقساط شهرية ميسرة عند استخدام بطاقة ائتمان أو بطاقة مدى صادرة من مصرف الراجحي.
                            </p>
                            <p className="font-bold text-text-main-light dark:text-white mt-4">
                                5 خطوات بسيطة قم بتحويل مشترياتك إلى خدمة تساهيل عبر تطبيق مصرف الراجحي
                            </p>
                            <ul className="list-none space-y-1 mr-2">
                                <li>- بعد إتمام الشراء، افتح تطبيق مصرف الراجحي.</li>
                                <li>- اختر بطاقتك الائتمانية.</li>
                                <li>- من قائمة مزايا البطاقة اختر "تساهيل".</li>
                                <li>- انقر على "أنشئ خطة التقسيط المطلوبة".</li>
                                <li>- قم باختيار المعاملة/المعاملات المحددة التي ترغب في تقسيطها.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Security FAQ 1 */}
                    <section className="pt-6 border-t border-gray-100 dark:border-gray-800 text-text-muted-light dark:text-text-muted-dark">
                        <h2 className="text-lg md:text-xl font-bold text-text-main-light dark:text-white mb-4">
                            هل يُعد إدخال وحفظ بيانات بطاقتي الائتمانية على موقع بالمي شركات العطور إجراءً آمناً؟
                        </h2>
                        <div className="space-y-2 text-sm md:text-base">
                            <p>
                                إن إضافة وحفظ معلومات بطاقتك الائتمانية على بالمي شركات العطور ما هو إلا لتسهيل تجربة التسوق الخاصة بك عند إتمام عملية الدفع. بهذه الميزة، لن تضطر إلى إعادة معلومات البطاقة في كل مرة تقوم فيها بالشراء.
                            </p>
                            <p>
                                كن مطمئناً، فإن معلومات بطاقتك الائتمانية ستتم حمايتها باستخدام أحدث تقنيات التشفير الإلكتروني، جميع معلوماتك بأمان ولا يمكن الوصول إليها من قبل أي طرف ثالث.
                            </p>
                        </div>
                    </section>

                    {/* Security FAQ 2 */}
                    <section className="pt-6">
                        <h2 className="text-lg md:text-xl font-bold text-text-main-light dark:text-white mb-4">
                            هل موقع قولدن سنت آمن للدفع عبر الإنترنت؟
                        </h2>
                        <div className="space-y-4 text-sm md:text-base">
                            <p>
                                نضمن لك <span className="font-bold">بالمي</span> شركات العطور تجربة تسوق آمنة 100%. لا يتم تخزين أرقام بطاقات الائتمان على أنظمتنا، كما يتم تشفير تفاصيل الدفع قبل نقلها باستخدام أحدث تقنيات التشفير الالكتروني التي تتبع أعلى معايير الأمان. كما نتبع أدق البروتوكولات لنضمن أن المعلومات الشخصية لعملائنا لا يتم كشفها لطرف ثالث.
                            </p>
                            <p>
                                من جهتك كعميل، فإن عليك حماية كلمة السر الخاصة بك وعدم مشاركتها مع الآخرين حفاظاً على معلوماتك الشخصية وتفاصيل بطاقاتك الائتمانية. نحن نستخدم معلوماتك الشخصية فقط لأغراض تتعلق بتلبية طلباتك، ولا نكشف هذه المعلومات لأي طرف ثالث تحت أي ظرف من الظروف. لمزيد من المعلومات حول هذا الموضوع يرجى مراجعة الشروط والأحكام.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <div className="w-full h-20 bg-transparent"></div>
        </div>
    );
}
