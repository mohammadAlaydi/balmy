import SectionTitle from "@/components/section-title";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="grid grid-cols-12  ">
        <div className="col-span-12 lg:col-span-6 grid grid-cols-12 justify-end">
          <div className="col-span-12 lg:col-span-5">
            <SectionTitle title="كيف تصل الينا" titleStyle="text-white/85" />
            <p className="text-sm text-white">
              طريق أنس ابن مالك، الصحافة، الرياض 13321
            </p>
            <Link href="#" className="text-sm text-white">
              +966-55-766-5585
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <SectionTitle title="ساعات العمل" titleStyle="text-white/85" />
            <p className="text-sm text-white">طوال أيام الأسبوع</p>
            <p className="text-sm text-white">من 9 ص - إلي 11:30 ص</p>
            <p className="text-sm text-white">من 3:30 م - إلي 11:30 م</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Image
            width={400}
            height={400}
            src="/assets/images/footer-image.webp"
            alt="footer-image"
            className="w-full "
          />
        </div>
      </div>
      <hr />
      <div className=" flex justify-center items-center p-2">
        <Badge className="bg-transparent text-sm lg:text-base text-white">
          © 2025 جميع الحقوق محفوظة - مذاق القهوة
        </Badge>
      </div>
    </div>
  );
}
