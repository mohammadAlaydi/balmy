import { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط وأحكام البيع - فرادا",
  description: "شروط وأحكام البيع في متجر فرادا",
};

export default function SaleTermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            شروط وأحكام البيع
          </h1>
          
          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                طلبات الشراء
              </h2>
              <p className="text-gray-600 leading-relaxed">
                عند تقديم طلب شراء، فإنك تؤكد أن جميع المعلومات المقدمة صحيحة وكاملة. نحتفظ بالحق في رفض أي طلب إذا كانت المعلومات غير صحيحة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الأسعار والدفع
              </h2>
              <p className="text-gray-600 leading-relaxed">
                جميع الأسعار معروضة بالريال السعودي وتشمل ضريبة القيمة المضافة. الأسعار عرضة للتغيير دون إشعار مسبق. يجب دفع المبلغ كاملاً عند تقديم الطلب.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                تأكيد الطلب
              </h2>
              <p className="text-gray-600 leading-relaxed">
                سيتم إرسال تأكيد الطلب عبر البريد الإلكتروني بعد استلام الدفع. لا يعتبر الطلب ملزماً إلا بعد إرسال تأكيد الطلب.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الشحن والتسليم
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نقدم خدمة الشحن لجميع مناطق المملكة العربية السعودية. تتراوح مدة التسليم من 1-3 أيام عمل حسب المنطقة. قد تتأخر مدة التسليم في المناطق النائية.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                إلغاء الطلبات
              </h2>
              <p className="text-gray-600 leading-relaxed">
                يمكن إلغاء الطلب قبل بدء عملية الشحن. بعد بدء الشحن، يخضع الإلغاء لسياسة الإرجاع والاستبدال.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الضمان
              </h2>
              <p className="text-gray-600 leading-relaxed">
                جميع منتجاتنا مضمونة ضد عيوب التصنيع. يغطي الضمان فترة محددة تختلف حسب نوع المنتج. لا يغطي الضمان الأضرار الناتجة عن الاستخدام غير الصحيح.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                الخصوصية والأمان
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نلتزم بحماية معلوماتك الشخصية وبيانات الدفع. جميع المعاملات تتم عبر قنوات آمنة ومشفرة لحماية أمانك.
              </p>
            </section>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 text-sm">
                لاستفسارات إضافية حول شروط البيع، يرجى التواصل معنا على الرقم: +966-55-766-5585
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
