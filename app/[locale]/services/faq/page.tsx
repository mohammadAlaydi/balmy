import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الأسئلة الأكثر شيوعاً - فرادا",
  description: "إجابات على الأسئلة الأكثر شيوعاً حول منتجات وخدمات فرادا",
};

export default function FAQPage() {
  return (
    <div className="min-h-[65vh] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            الأسئلة الأكثر شيوعاً (FAQ)
          </h1>
          
          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                المنتجات والطلبات
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">كيف يمكنني طلب منتجات من فرادا؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        يمكنك طلب المنتجات عبر موقعنا الإلكتروني أو تطبيق الهاتف المحمول. اختر المنتجات المطلوبة، أضفها إلى سلة التسوق، ثم أكمل عملية الدفع. يمكنك أيضاً الطلب عبر الهاتف على الرقم +966-55-766-5585.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">ما هي طرق الدفع المتاحة؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        نقدم عدة طرق دفع: البطاقات الائتمانية والمدى، الدفع عند الاستلام، التحويل البنكي، والدفع عبر المحافظ الإلكترونية مثل STC Pay وApple Pay.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">هل يمكنني تعديل أو إلغاء طلبي؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        نعم، يمكنك تعديل أو إلغاء طلبك قبل بدء عملية الشحن. تواصل معنا على الفور عبر الهاتف أو البريد الإلكتروني. بعد بدء الشحن، يخضع الإلغاء لسياسة الإرجاع والاستبدال.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الشحن والتسليم
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">كم تستغرق مدة التسليم؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        مدة التسليم تختلف حسب المنطقة: الرياض (1-2 أيام عمل)، المدن الرئيسية (2-3 أيام عمل)، المناطق النائية (3-5 أيام عمل). نقدم أيضاً خدمة الشحن السريع للمناطق القريبة.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">هل الشحن مجاني؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        الشحن مجاني للرياض، و25 ريال للمدن الرئيسية، و35 ريال للمناطق النائية. الطلبات التي تزيد قيمتها عن 200 ريال تحصل على شحن مجاني لجميع المناطق.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">كيف يمكنني تتبع طلبي؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        ستتلقى رقم تتبع عبر البريد الإلكتروني والرسائل النصية. يمكنك استخدام هذا الرقم لتتبع حالة طلبك عبر موقعنا أو تطبيق الهاتف المحمول.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الإرجاع والاستبدال
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">ما هي سياسة الإرجاع؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام إذا كان معيباً أو لا يتطابق مع المواصفات. نقدم خيارات متعددة: استرداد المال، استبدال المنتج، أو رصيد في المتجر.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">كم تستغرق مدة معالجة الإرجاع؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        تستغرق معالجة الإرجاع من 5-9 أيام عمل: استلام المنتج (1-2 يوم)، فحص المنتج (1-2 يوم)، معالجة الطلب (3-5 أيام).
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الحساب والخصوصية
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">كيف يمكنني إنشاء حساب؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        يمكنك إنشاء حساب بسهولة عبر موقعنا أو تطبيق الهاتف المحمول. أدخل بريدك الإلكتروني ورقم الهاتف، ثم اتبع التعليمات لإكمال التسجيل.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">هل معلوماتي آمنة؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        نعم، نستخدم تقنيات تشفير متقدمة لحماية معلوماتك الشخصية وبيانات الدفع. نلتزم بسياسة خصوصية صارمة ولا نشارك معلوماتك مع أطراف ثالثة.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الخدمة والدعم
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">ما هي ساعات العمل؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        ساعات العمل: الأحد - الخميس من 9:00 صباحاً إلى 6:00 مساءً، السبت من 10:00 صباحاً إلى 4:00 مساءً، الجمعة مغلق.
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">كيف يمكنني التواصل مع خدمة العملاء؟</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        يمكنك التواصل معنا عبر الهاتف: +966-55-766-5585، البريد الإلكتروني: info@farada.com، أو عبر نموذج التواصل في موقعنا.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                لم تجد إجابة لسؤالك؟
              </h3>
              <p className="text-gray-600 mb-4">
                فريق خدمة العملاء لدينا متاح لمساعدتك في أي استفسار آخر
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="tel:+966557665585" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md w-full">
                  الهاتف : +966-55-766-5585
                </Link>
                <Link href="mailto:info@farada.com" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md w-full">
                  البريد الإلكتروني : info@farada.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
