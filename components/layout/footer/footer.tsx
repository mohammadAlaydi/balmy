import SectionTitle from "@/components/section-title";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="grid grid-cols-12 gap-8 p-8">
        {/* Contact Information */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="كيف تصل الينا" titleStyle="text-white/85" />
          <p className="text-sm text-white mb-2">
            طريق أنس ابن مالك، الصحافة، الرياض 13321
          </p>
          <Link href="tel:+966557665585" className="text-sm text-white block mb-2 hover:text-gray-300">
            +966-55-766-5585
          </Link>
          <Link href="mailto:info@farada.com" className="text-sm text-white block hover:text-gray-300">
            info@farada.com
          </Link>
        </div>

        {/* Working Hours */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="ساعات العمل" titleStyle="text-white/85" />
          <p className="text-sm text-white">طوال أيام الأسبوع</p>
          <p className="text-sm text-white">من 9 ص - إلي 6 م</p>
          <p className="text-sm text-white">الجمعة: مغلق</p>
          <p className="text-sm text-white">السبت: 10 ص - 4 م</p>
        </div>

        {/* Legal Pages */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="البنود القانونية" titleStyle="text-white/85" />
          <div className="space-y-2">
            <Link href="/legal/terms" className="block text-sm text-white hover:text-gray-300">
              شروط وأحكام الموقع
            </Link>
            <Link href="/legal/sale-terms" className="block text-sm text-white hover:text-gray-300">
              شروط وأحكام البيع
            </Link>
            <Link href="/legal/privacy" className="block text-sm text-white hover:text-gray-300">
              سياسة الخصوصية
            </Link>
            <Link href="/legal/cookies" className="block text-sm text-white hover:text-gray-300">
              سياسة ملفات الارتباط
            </Link>
          </div>
        </div>

        {/* About & Services */}
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle title="تعرف علينا أكثر" titleStyle="text-white/85" />
          <div className="space-y-2 mb-4">
            <Link href="/about/who-we-are" className="block text-sm text-white hover:text-gray-300">
              من نحن
            </Link>
            <Link href="/about/careers" className="block text-sm text-white hover:text-gray-300">
              وظائف فرادا
            </Link>
          </div>
          
          <SectionTitle title="بخدمتكم" titleStyle="text-white/85" />
          <div className="space-y-2">
            <Link href="/contact/contact-us" className="block text-sm text-white hover:text-gray-300">
              تواصل معنا
            </Link>
            <Link href="/services/shipping-info" className="block text-sm text-white hover:text-gray-300">
              معلومات الشحن
            </Link>
            <Link href="/services/return-policy" className="block text-sm text-white hover:text-gray-300">
              الإستبدال والإسترجاع
            </Link>
            <Link href="/services/faq" className="block text-sm text-white hover:text-gray-300">
              الأسئلة الأكثر شيوعاً
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Image */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <Image
            width={400}
            height={400}
            src="/assets/images/footer-image.webp"
            alt="footer-image"
            className="w-full"
          />
        </div>
      </div>

      <hr />
      <div className="flex justify-center items-center p-2">
        <Badge className="bg-transparent text-sm lg:text-base text-white">
          © 2025 جميع الحقوق محفوظة - مذاق القهوة
        </Badge>
      </div>
    </div>
  );
}
