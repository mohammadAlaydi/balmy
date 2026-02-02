"use client";

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function ShippingPage() {
    const locale = useLocale();

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-gray-100 font-cairo antialiased transition-colors duration-200 min-h-screen">
            <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-16">
                {/* Breadcrumb */}
                <nav className="flex justify-start text-sm text-text-muted-light dark:text-gray-500 mb-10">
                    <Link href={`/${locale}/home`} className="hover:text-text-main-light dark:hover:text-white transition-colors">
                        الرئيسية
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-medium text-text-main-light dark:text-gray-200">الشحن القياسي</span>
                </nav>

                <main className="space-y-8">
                    {/* Standard Shipping */}
                    <section>
                        <h1 className="text-2xl md:text-3xl font-bold text-text-main-light dark:text-white mb-4">الشحن القياسي</h1>
                        <div className="space-y-2 text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                            <p>ساعة تجميع الطلبات داخل مدينة الرياض 24</p>
                            <p>يومين إلى أربعة أيام للطلبات خارج الرياض وداخل مدن المملكة (2-4)</p>
                        </div>
                    </section>

                    {/* Returns */}
                    <section>
                        <h2 className="text-xl font-bold text-text-main-light dark:text-gray-100 mb-3">الإسترجــــــاع</h2>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            الاستبدال والإسترجاع يكون متاحاً في غضون 14 يوما من تاريخ الشراء، طبقا لسياستنا.
                        </p>
                    </section>

                    {/* Shipping Info */}
                    <section>
                        <h2 className="text-xl font-bold text-text-main-light dark:text-gray-100 mb-3">معلومــــــــات الشحــــــن</h2>
                        <div className="space-y-4 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                            <p>
                                إلى عنوان التسليم داخل جميع المدن في المملكة العربية السعودية. سيطلب شريك الشحن Aramex سنقوم بشحن المنتج/ المنتجات التي طلبتك عبر الخاص بنا توقيعاً من جانبك (أو من شخص بالغ مفوض من قبلك) عند إستلام المنتجات. يرجى ملاحظة أننا لن نقوم بتسليم المنتجات إلى صناديق بريد الطرف الثالث. سنقوم بالتوصيل فقط أثناء أيام / ساعات العمل (وليس في عطلات نهاية الأسبوع أو العطلات الرسمية).
                            </p>
                            <p>
                                سيجري شريك الشحن محاولتين (2) لتسليم السليم الشحنة والحصول على توقيعك. التكرار هو محاولتان (2) متتاليتان واحدة كل يوم. بعد المحاولة الثالثة، سيتم إعادة الشحنة إلى متجر بالمي بالرياض.
                            </p>
                            <p>
                                يمكنك التحقق من تقدم طلبك من خلال الرابط الموجود في لوحة التحكم الخاصة بحسابك الشخصي أو عبر التواصل معنا.
                            </p>
                        </div>
                    </section>

                    {/* Introduction */}
                    <section>
                        <h2 className="text-xl font-bold text-text-main-light dark:text-gray-100 mb-3">مقدمة من شركة عطور بالمي للتجارة</h2>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                            تخضع هذه الوثيقة للإطار القانوني المنظم للتعامل بين شركة بالمي (يشار إليها فيما بعد بـ "الشركة") والعملاء الكرام في المملكة العربية السعودية، وذلك وفقاً لأنظمة وزارة التجارة السعودية ونظام التجارة الإلكترونية المعمول به.
                        </p>
                    </section>

                    {/* Definitions */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">التعريفات</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300">
                            <li><strong className="font-medium text-gray-700 dark:text-gray-200">الشركة:</strong> شركة بالمي للعطور التجارية.</li>
                            <li><strong className="font-medium text-gray-700 dark:text-gray-200">العميل:</strong> كل شخص طبيعي أو اعتباري يقوم بشراء منتجات من الشركة.</li>
                            <li><strong className="font-medium text-gray-700 dark:text-gray-200">المنتجات:</strong> جميع العطور ومنتجات الشركة المعروضة للبيع عبر المتجر الإلكتروني أو الفروع.</li>
                        </ul>
                    </section>

                    {/* General Terms */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">الأحكام العامة</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>تعتبر هذه الوثيقة ملزمة للطرفين بمجرد إتمام عملية الشراء.</li>
                            <li>يحق للشركة تعديل هذه الشروط في أي وقت بما يتوافق مع الأنظمة السعودية، ويتم الإعلان عنها عبر المتجر أو الموقع الإلكتروني.</li>
                        </ul>
                    </section>

                    {/* Payment Terms */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">آلية الشراء والدفع</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>تتم عمليات الشراء عبر الموقع الإلكتروني أو فروع الشركة.</li>
                            <li>وسائل الدفع المعتمدة: البطاقات الائتمانية، مدى، الدفع عند الاستلام (عند توفره)، إضافة إلى أنظمة الدفع الآجل (تابي، تمارا).</li>
                            <li>الشركة غير مسؤولة عن أي خطأ ناتج عن إدخال بيانات دفع غير صحيحة من العميل.</li>
                        </ul>
                    </section>

                    {/* Shipping Terms */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">الشحن والتسليم</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>يتم الشحن عبر شركات شحن معتمدة مثل (أرامكس).</li>
                            <li>مدة التسليم داخل المملكة من 2 إلى 5 أيام عمل (مع إمكانية اختلاف المدة حسب المدينة).</li>
                            <li>الشركة غير مسؤولة عن التأخير الناتج عن شركة الشحن بعد تسليم الطلب لها.</li>
                        </ul>
                    </section>

                    {/* Returns Policy */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">سياسة الاستبدال والإرجاع</h3>
                        <div className="space-y-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
                            <p><strong className="font-medium text-gray-700 dark:text-gray-200">المدة المسموح بها:</strong> يحق للعميل استرجاع أو استبدال المنتج خلال 7 أيام من تاريخ الاستلام في حال وجود عيب مصنعي أو تلف.</p>
                        </div>
                    </section>

                    {/* Exceptions */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">الاستثناءات</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>العطور المفتوحة أو المستخدمة لا تستبدل ولا تسترجع حفاظاً على الصحة العامة.</li>
                            <li>المنتجات المخفضة أو العروض الخاصة لا تستبدل ولا تسترجع إلا في حال وجود عيب مصنعي.</li>
                            <li>المنتجات المصممة أو المغلفة حسب الطلب غير قابلة للإرجاع.</li>
                        </ul>
                    </section>

                    {/* Refund Conditions */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">شروط الاسترجاع والاستبدال</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300">
                            <li>أن يكون المنتج في حالته الأصلية، غير مستخدم وغير مفتوح.</li>
                            <li>عدم تلف العبوة أو ضياع الملحقات.</li>
                            <li>إرفاق الفاتورة الأصلية.</li>
                        </ul>
                    </section>

                    {/* Shipping Costs */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">تكاليف الشحن</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>إذا كان سبب الإرجاع عيباً مصنعياً أو خطأ من الشركة، تتحمل الشركة تكاليف الشحن كاملة.</li>
                            <li>إذا كان الاسترجاع أو الاستبدال لرغبة العميل فقط، يتحمل العميل تكاليف الشحن (ذهاباً وإياباً).</li>
                            <li>في حال عدم استلام الشحنة وعودتها للشركة، يتحمل العميل رسوم إعادة الشحن.</li>
                            <li>(ملاحظة: في مرحلة الشحن لا يمكن إلغاؤه).</li>
                        </ul>
                        <p className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            في حال رفض طلب الإرجاع أو الاستبدال من قبل الشركة ورفض العميل استلام المنتج مرة أخرى، يحق للشركة التخلص من المنتج بعد 15 يوماً.
                        </p>
                    </section>

                    {/* Warranty */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">الضمان</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>تلتزم الشركة بتوفير منتجات أصلية وعالية الجودة.</li>
                            <li>في حال ثبوت وجود غش أو عدم مطابقة المنتج للمواصفات، يحق للعميل استرجاع كامل المبلغ وفق الأنظمة السعودية.</li>
                        </ul>
                    </section>

                    {/* Privacy */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">الخصوصية وحماية البيانات</h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            تلتزم الشركة بالحفاظ على بيانات العملاء وعدم مشاركتها مع أي طرف ثالث إلا بموافقة رسمية أو وفق ما تقتضيه الأنظمة السعودية.
                        </p>
                    </section>

                    {/* Tabby/Tamara Policy */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">سياسة الاستبدال والاسترجاع عبر "تابي" و"تمارا"</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>تسري نفس سياسة الشركة على المشتريات عبر "تابي" و"تمارا".</li>
                            <li>يتم استرداد المبالغ عبر وسيلة الدفع الأصلية فقط (وقد يتم استردادها نقداً).</li>
                            <li>قد تخصم رسوم إدارية من مزود الخدمة (تابي/تمارا).</li>
                            <li>تتم عملية الاسترداد وفق المدة الزمنية التي تحددها تابي أو تمارا.</li>
                            <li>في حال الشراء بالتقسيط، يتم تعديل أو إلغاء جدول الدفعات حسب سياسة الجهة الممولة، ويتحمل العميل أي التزامات إضافية.</li>
                        </ul>
                    </section>

                    {/* Legal Jurisdiction */}
                    <section>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-2">القانون والاختصاص القضائي</h3>
                        <ul className="list-none space-y-1 text-sm md:text-base text-gray-600 dark:text-gray-300 text-justify">
                            <li>تخضع هذه الشروط لأنظمة المملكة العربية السعودية.</li>
                            <li>في حال حدوث نزاع، يكون الفصل من اختصاص الجهات القضائية داخل المملكة.</li>
                        </ul>
                    </section>

                    {/* Company Details */}
                    <section className="border-t pt-8 mt-10 border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-text-main-light dark:text-gray-200 mb-4">بيانات الشركة</h3>
                        <ul className="list-none space-y-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">الاسم التجاري:</span> شركة عطور بالمي التجارية</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">العنوان:</span> [يضاف هنا]</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">واتساب:</span> <span dir="ltr">+966920016180</span></li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">هاتف:</span> <span dir="ltr">968003030030</span></li>
                        </ul>
                        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-justify">
                            ترخيص عطور بالمي: تطبيق أحكام نظام التجارة الإلكترونية في المملكة العربية السعودية بما يضمن للعميل كامل حقوقه وفق اللوائح والأنظمة المعمول بها.
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
