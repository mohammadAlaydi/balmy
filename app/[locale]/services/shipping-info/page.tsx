import { Metadata } from "next";

export const metadata: Metadata = {
  title: "معلومات الشحن - فرادا",
  description: "معلومات حول خدمات الشحن والتسليم في فرادا",
};

export default function ShippingInfoPage() {

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            معلومات الشحن
          </h1>
          
          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                مناطق الشحن
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نقدم خدمة الشحن لجميع مناطق المملكة العربية السعودية، بما في ذلك المدن الرئيسية والمناطق النائية. نضمن وصول طلبك بأمان وسرعة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                مدة التسليم
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">الرياض</h3>
                  <p className="text-gray-600">1-2 أيام عمل</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">المدن الرئيسية</h3>
                  <p className="text-gray-600">2-3 أيام عمل</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">المناطق النائية</h3>
                  <p className="text-gray-600">3-5 أيام عمل</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                تكلفة الشحن
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">الرياض:</span>
                    <span className="font-semibold text-gray-800">مجاناً</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">المدن الرئيسية:</span>
                    <span className="font-semibold text-gray-800">25 ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">المناطق النائية:</span>
                    <span className="font-semibold text-gray-800">35 ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">الطلبات فوق 200 ريال:</span>
                    <span className="font-semibold text-gray-600">شحن مجاني</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                طرق الشحن المتاحة
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">الشحن السريع</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    توصيل خلال 24 ساعة للمناطق القريبة من الرياض
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">تكلفة إضافية</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">الشحن العادي</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    الشحن القياسي لجميع المناطق
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">متضمن</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">الاستلام من المتجر</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    استلام الطلب من متجرنا في الرياض
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">مجاناً</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                تتبع الطلب
              </h2>
              <p className="text-gray-600 leading-relaxed">
                بعد إرسال طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني والرسائل النصية. يمكنك استخدام هذا الرقم لتتبع حالة طلبك عبر موقعنا أو تطبيق الهاتف المحمول.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                معلومات مهمة
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">يتم الشحن من الأحد إلى الخميس من الساعة 9:00 صباحاً إلى 6:00 مساءً</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">في حالة عدم وجودك في المنزل، سيتم ترك الطلب مع الجار أو إعادة المحاولة</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">يمكنك تحديد موعد تسليم مخصص عند إتمام الطلب</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">نقدم تأمين على الشحن لجميع الطلبات</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الشحن الدولي
              </h2>
              <p className="text-gray-600 leading-relaxed">
                حالياً نقدم خدمة الشحن للمملكة العربية السعودية فقط. نخطط لتوسيع خدماتنا لتشمل دول مجلس التعاون الخليجي في المستقبل القريب.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                التواصل بخصوص الشحن
              </h2>
              <p className="text-gray-600 leading-relaxed">
                إذا كان لديك أي استفسارات حول الشحن أو تريد تحديث معلومات التوصيل، يمكنك التواصل معنا:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800">
                  <strong>الهاتف:</strong> +966-55-766-5585<br/>
                  <strong>البريد الإلكتروني:</strong> shipping@farada.com<br/>
                  <strong>ساعات العمل:</strong> الأحد - الخميس، 9:00 ص - 6:00 م
                </p>
              </div>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-2">نضمن وصول طلبك بأمان</h3>
              <p className="text-gray-700 text-sm">
                نستخدم أفضل شركات الشحن ونطبق أعلى معايير الجودة لضمان وصول طلبك في حالة ممتازة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
