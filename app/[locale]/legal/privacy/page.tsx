import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - فرادا",
  description: "سياسة الخصوصية لموقع فرادا",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            سياسة الخصوصية
          </h1>

          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                مقدمة
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نحن في شركة فرادا نلتزم بحماية خصوصيتك وأمان معلوماتك الشخصية.
                تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند زيارة
                موقعنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                المعلومات التي نجمعها
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نجمع معلومات مثل الاسم، عنوان البريد الإلكتروني، رقم الهاتف،
                والعنوان عند إنشاء حساب أو تقديم طلب. كما نجمع معلومات تقنية حول
                استخدام الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                كيفية استخدام المعلومات
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نستخدم معلوماتك لمعالجة الطلبات، التواصل معك، تحسين خدماتنا،
                وإرسال تحديثات حول المنتجات والعروض الخاصة (بموافقتك).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                مشاركة المعلومات
              </h2>
              <p className="text-gray-600 leading-relaxed">
                لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في
                الحالات المحدودة مثل معالجة الدفع أو الامتثال للقوانين.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                حماية المعلومات
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نستخدم تقنيات تشفير متقدمة لحماية معلوماتك الشخصية وبيانات
                الدفع. نطبق إجراءات أمان صارمة لمنع الوصول غير المصرح به.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ملفات تعريف الارتباط (Cookies)
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتذكر تفضيلاتك.
                يمكنك إدارة إعدادات ملفات تعريف الارتباط من خلال متصفحك.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                حقوقك
              </h2>
              <p className="text-gray-600 leading-relaxed">
                لديك الحق في الوصول إلى معلوماتك الشخصية وتحديثها أو حذفها.
                يمكنك أيضاً إلغاء الاشتراك في الرسائل التسويقية في أي وقت.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                التغييرات في السياسة
              </h2>
              <p className="text-gray-600 leading-relaxed">
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي
                تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                التواصل معنا
              </h2>
              <p className="text-gray-600 leading-relaxed">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر
                البريد الإلكتروني أو الهاتف: +966-55-766-5585
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 text-sm">
                آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
