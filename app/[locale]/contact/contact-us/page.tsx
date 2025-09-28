"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { LuClock4 } from "react-icons/lu";
import { GrServices } from "react-icons/gr";

export default function page() {
  const t = useTranslations("contact-us");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed px-2">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-semibold">{t("contact-info")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3 sm:gap-5 space-x-4">
                  <FaPhoneAlt className="text-gray-300 border-2 border-gray-300 rounded-full p-1 text-2xl sm:text-3xl flex-shrink-0" />
                  <div>
                    <p className="text-sm sm:text-base text-muted-foreground">+966-55-766-5585</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {t("phone-available")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-5 space-x-4">
                  <IoIosMail className="text-gray-300 border-2 border-gray-300 rounded-full p-1 text-2xl sm:text-3xl flex-shrink-0" />
                  <div>
                    <p className="text-sm sm:text-base text-muted-foreground">info@farada.com</p>
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
                  <span className="text-sm sm:text-base text-muted-foreground">{t("friday")}</span>
                  <span className="text-sm sm:text-base font-semibold text-destructive">
                    {t("closed")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-muted-foreground">{t("saturday")}</span>
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

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-semibold">{t("send-message")}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{t("we-are-here-to-help-desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm sm:text-base">{t("first-name")}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder={t("first-name-placeholder")}
                      className="text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm sm:text-base">{t("last-name")}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder={t("last-name-placeholder")}
                      className="text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">{t("email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("email-placeholder")}
                    className="text-sm sm:text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm sm:text-base">{t("phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t("phone-placeholder")}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm sm:text-base">{t("subject")}</Label>
                  <Select name="subject" required>
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue placeholder={t("choose-subject")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general" className="text-sm sm:text-base">
                        {t("general-inquiry")}
                      </SelectItem>
                      <SelectItem value="order" className="text-sm sm:text-base">
                        {t("order-inquiry")}
                      </SelectItem>
                      <SelectItem value="product" className="text-sm sm:text-base">
                        {t("product-inquiry")}
                      </SelectItem>
                      <SelectItem value="complaint" className="text-sm sm:text-base">
                        {t("complaint")}
                      </SelectItem>
                      <SelectItem value="suggestion" className="text-sm sm:text-base">
                        {t("suggestion")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base">{t("message")}</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t("message-placeholder")}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
                    required
                  />
                </div>

                <Button type="submit" className="w-full text-sm sm:text-base" size="lg">
                  {t("send-message-button")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        {/* Bottom Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <Card className="bg-muted/50">
            <CardContent className="pt-6 px-4 sm:px-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                {t("we-are-here-to-help")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("we-are-here-to-help-desc")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
