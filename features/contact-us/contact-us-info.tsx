import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";

export default function ContactUsInfo({ t }: { t: any }) {
    
  return (
    <div className="space-y-6">
      {/* Contact Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            {t("contact-info")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3 sm:gap-5 space-x-4">
            <FaPhoneAlt className="text-gray-300 border-2 border-gray-300 rounded-full p-1 text-2xl sm:text-3xl flex-shrink-0" />
            <div>
              <p className="text-sm sm:text-base text-muted-foreground">
                +966-55-766-5585
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t("phone-available")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-5 space-x-4">
            <IoIosMail className="text-gray-300 border-2 border-gray-300 rounded-full p-1 text-2xl sm:text-3xl flex-shrink-0" />
            <div>
              <p className="text-sm sm:text-base text-muted-foreground">
                info@farada.com
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t("email-response")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:gap-5 space-x-4">
            <FaLocationDot className="text-gray-300 border-2 border-gray-300 rounded-full p-1 text-2xl sm:text-3xl flex-shrink-0" />
            <div>
              <p className="text-sm sm:text-base text-muted-foreground">
                طريق أنس ابن مالك، الصحافة، الرياض 13321
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t("address-country")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Working Hours Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <LuClock4 className="text-gray-300 border-2 border-gray-300 rounded-full p-1 text-2xl sm:text-3xl" />
            {t("working-hours")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-muted-foreground">
              {t("sunday-thursday")}
            </span>
            <span className="text-sm sm:text-base font-semibold text-foreground">
              9:00 ص - 6:00 م
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-muted-foreground">
              {t("friday")}
            </span>
            <span className="text-sm sm:text-base font-semibold text-destructive">
              {t("closed")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-muted-foreground">
              {t("saturday")}
            </span>
            <span className="text-sm sm:text-base font-semibold text-foreground">
              10:00 ص - 4:00 م
            </span>
          </div>
        </CardContent>
      </Card>
      {/* Services Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <GrServices className="text-gray-300 border-2 border-gray-300 rounded-full p-1 text-2xl sm:text-3xl" />
            {t("services-we-provide")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-muted-foreground">
                {t("coffee-sales")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-muted-foreground">
                {t("customer-service")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-muted-foreground">
                {t("product-consultation")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-muted-foreground">
                {t("problem-solving")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
