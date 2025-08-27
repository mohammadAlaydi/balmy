import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الإرجاع والاستبدال - فرادا",
  description: "سياسة الإرجاع والاستبدال في متجر فرادا",
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            سياسة الإرجاع والاستبدال
          </h1>
          
          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                التزامنا تجاه رضاك
              </h2>
              <p className="text-gray-600 leading-relaxed">
                في فرادا، نؤمن بأهمية رضا العميل. نقدم سياسة إرجاع واستبدال شفافة وعادلة لضمان تجربة تسوق ممتعة ومطمئنة لجميع عملائنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                شروط الإرجاع
              </h2>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">يمكن إرجاع المنتج في الحالات التالية:</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• المنتج معيب أو تالف عند الاستلام</li>
                  <li>• المنتج لا يتطابق مع المواصفات المعلنة</li>
                  <li>• المنتج غير مناسب أو لا يلبي التوقعات</li>
                  <li>• خطأ في الطلب من جانبنا</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                شروط عدم الإرجاع
              </h2>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">لا يمكن إرجاع المنتج في الحالات التالية:</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• المنتجات الغذائية المفتوحة أو المستخدمة</li>
                  <li>• المنتجات التالفة بسبب سوء الاستخدام</li>
                  <li>• المنتجات المفقودة أو المنسية</li>
                  <li>• المنتجات التي تم شراؤها بأسعار مخفضة خاصة</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                فترة الإرجاع
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-blue-800 mb-2">المنتجات العادية</h3>
                  <p className="text-blue-600">14 يوم من تاريخ الاستلام</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-green-800 mb-2">المنتجات الإلكترونية</h3>
                  <p className="text-green-600">7 أيام من تاريخ الاستلام</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                كيفية طلب الإرجاع
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>تواصل معنا عبر الهاتف أو البريد الإلكتروني خلال فترة الإرجاع</li>
                  <li>قدم رقم الطلب وسبب الإرجاع</li>
                  <li>سنقوم بتقييم طلبك والرد عليك خلال 24 ساعة</li>
                  <li>في حالة الموافقة، سنرسل لك تعليمات الإرجاع</li>
                  <li>أرسل المنتج إلينا مع جميع الملحقات والتغليف الأصلي</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                خيارات الإرجاع
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">استرداد المال</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    استرداد كامل المبلغ المدفوع (باستثناء رسوم الشحن)
                  </p>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">متاح</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">استبدال المنتج</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    استبدال المنتج بمنتج آخر من نفس القيمة
                  </p>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">متاح</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">رصيد في المتجر</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    رصيد يمكن استخدامه في مشتريات مستقبلية
                  </p>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">متاح</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                رسوم الإرجاع
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="space-y-2 text-yellow-800">
                  <div className="flex justify-between">
                    <span>إرجاع المنتج المعيب:</span>
                    <span className="font-semibold">مجاناً</span>
                  </div>
                  <div className="flex justify-between">
                    <span>إرجاع المنتج بدون سبب:</span>
                    <span className="font-semibold">25 ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم الشحن:</span>
                    <span className="font-semibold">على العميل</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                مدة معالجة الإرجاع
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">استلام المنتج:</span>
                  <span className="font-semibold text-gray-800">1-2 يوم عمل</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">فحص المنتج:</span>
                  <span className="font-semibold text-gray-800">1-2 يوم عمل</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">معالجة الطلب:</span>
                  <span className="font-semibold text-gray-800">3-5 أيام عمل</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">إجمالي المدة:</span>
                  <span className="font-semibold text-blue-600">5-9 أيام عمل</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                معلومات مهمة
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">يجب أن يكون المنتج في حالته الأصلية مع جميع الملحقات والتغليف</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">نوصي بتوثيق حالة المنتج عند الإرسال</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">سيتم إخطارك عبر البريد الإلكتروني عند استلام المنتج</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">يمكنك تتبع حالة طلب الإرجاع عبر حسابك</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                التواصل بخصوص الإرجاع
              </h2>
              <p className="text-gray-600 leading-relaxed">
                إذا كان لديك أي أسئلة حول سياسة الإرجاع أو تحتاج إلى مساعدة، يمكنك التواصل معنا:
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  <strong>الهاتف:</strong> +966-55-766-5585<br/>
                  <strong>البريد الإلكتروني:</strong> returns@farada.com<br/>
                  <strong>ساعات العمل:</strong> الأحد - الخميس، 9:00 ص - 6:00 م
                </p>
              </div>
            </section>

            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
              <h3 className="font-semibold text-green-800 mb-2">نحن هنا لمساعدتك</h3>
              <p className="text-green-700 text-sm">
                هدفنا هو ضمان رضاك التام. إذا لم تكن راضياً عن منتجك، سنعمل معك لإيجاد الحل المناسب
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
