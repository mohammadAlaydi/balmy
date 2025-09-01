"use client";

import { useTranslations } from "next-intl";

export default function ContactUsPage() {
  const t = useTranslations("contactUs");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("contactInfo")}
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{t("phone")}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">+966-55-766-5585</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{t("phoneAvailable")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{t("email")}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">info@farada.com</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{t("emailResponse")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{t("address")}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">طريق أنس ابن مالك، الصحافة، الرياض 13321</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{t("addressCountry")}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("workingHours")}
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm sm:text-base">{t("sundayThursday")}</span>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">9:00 ص - 6:00 م</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm sm:text-base">{t("friday")}</span>
                  <span className="text-red-600 font-semibold text-sm sm:text-base">{t("closed")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm sm:text-base">{t("saturday")}</span>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base">10:00 ص - 4:00 م</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("servicesWeProvide")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("coffeeSales")}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("customerService")}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("productConsultation")}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("problemSolving")}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Form */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t("sendMessage")}
            </h2>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    {t("firstName")}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={t("firstNamePlaceholder")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    {t("lastName")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder={t("lastNamePlaceholder")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("phonePlaceholder")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  {t("subject")}
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  required
                >
                  <option value="">{t("chooseSubject")}</option>
                  <option value="general">{t("generalInquiry")}</option>
                  <option value="order">{t("orderInquiry")}</option>
                  <option value="product">{t("productInquiry")}</option>
                  <option value="complaint">{t("complaint")}</option>
                  <option value="suggestion">{t("suggestion")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t("messagePlaceholder")}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base resize-vertical"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-gray-300"
              >
                {t("sendMessageButton")}
              </button>
            </form>
          </section>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t("weAreHereToHelp")}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("weAreHereToHelpDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
