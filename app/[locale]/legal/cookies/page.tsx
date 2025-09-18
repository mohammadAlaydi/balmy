import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة ملفات تعريف الارتباط - فرادا",
  description: "سياسة ملفات تعريف الارتباط (Cookies) لموقع فرادا",
};

export default function CookiesPage() {
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            سياسة ملفات تعريف الارتباط (Cookies)
          </h1>
          
          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ما هي ملفات تعريف الارتباط؟
              </h2>
              <p className="text-gray-600 leading-relaxed">
                ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا. تساعد هذه الملفات في تحسين تجربة التصفح وتقديم خدمات مخصصة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                أنواع ملفات تعريف الارتباط التي نستخدمها
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">ملفات تعريف الارتباط الأساسية</h3>
                  <p className="text-gray-600 text-sm">
                    ضرورية لعمل الموقع بشكل صحيح، مثل حفظ تفضيلات اللغة والمنطقة الزمنية.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">ملفات تعريف الارتباط الوظيفية</h3>
                  <p className="text-gray-600 text-sm">
                    تحسن تجربة المستخدم من خلال تذكر تفضيلاتك وإعداداتك.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">ملفات تعريف الارتباط التحليلية</h3>
                  <p className="text-gray-600 text-sm">
                    تساعدنا في فهم كيفية استخدام الموقع لتحسين الخدمات.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                كيفية استخدام ملفات تعريف الارتباط
              </h2>
              <p className="text-gray-600 leading-relaxed">
                نستخدم ملفات تعريف الارتباط لتذكر تفضيلاتك، تحليل حركة المرور، تحسين أداء الموقع، وتقديم محتوى مخصص بناءً على اهتماماتك.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ملفات تعريف الارتباط من أطراف ثالثة
              </h2>
              <p className="text-gray-600 leading-relaxed">
                قد نستخدم خدمات من أطراف ثالثة مثل Google Analytics أو أدوات الدفع التي تضع ملفات تعريف الارتباط الخاصة بها. تخضع هذه الملفات لسياسات الخصوصية الخاصة بتلك الشركات.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                إدارة ملفات تعريف الارتباط
              </h2>
              <p className="text-gray-600 leading-relaxed">
                يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك. يمكنك حذف ملفات تعريف الارتباط الموجودة أو منع وضع ملفات جديدة. ملاحظة: قد يؤثر تعطيل بعض ملفات تعريف الارتباط على وظائف الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                كيفية تعطيل ملفات تعريف الارتباط
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">تعليمات المتصفحات الشائعة:</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Chrome: الإعدادات → الخصوصية والأمان → ملفات تعريف الارتباط</li>
                  <li>• Firefox: الخيارات → الخصوصية والأمان → ملفات تعريف الارتباط</li>
                  <li>• Safari: التفضيلات → الخصوصية → ملفات تعريف الارتباط</li>
                  <li>• Edge: الإعدادات → ملفات تعريف الارتباط وأذونات الموقع</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                تحديثات سياسة ملفات تعريف الارتباط
              </h2>
              <p className="text-gray-600 leading-relaxed">
                قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشريعية. سيتم نشر أي تغييرات على هذه الصفحة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                التواصل معنا
              </h2>
              <p className="text-gray-600 leading-relaxed">
                إذا كان لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط، يرجى التواصل معنا عبر البريد الإلكتروني أو الهاتف: +966-55-766-5585
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 text-sm">
                آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
