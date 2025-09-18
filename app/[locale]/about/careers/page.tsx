"use client";

import { useTranslations } from "next-intl";

export default function CareersPage() {
  const t = useTranslations("careers");

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
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Join Our Team Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("joinTeam")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("joinTeamDesc")}
              </p>
            </div>
          </section>

          {/* Why Work With Farada Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              {t("whyWorkWithUs")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("dynamicEnvironment")}
                </h3>
                <p className="text-gray-700 text-center text-xs sm:text-sm">
                  {t("dynamicEnvironmentDesc")}
                </p>
              </div>

              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("developmentOpportunities")}
                </h3>
                <p className="text-gray-700 text-center text-xs sm:text-sm">
                  {t("developmentOpportunitiesDesc")}
                </p>
              </div>

              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("competitiveBenefits")}
                </h3>
                <p className="text-gray-700 text-center text-xs sm:text-sm">
                  {t("competitiveBenefitsDesc")}
                </p>
              </div>

              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("inclusiveCulture")}
                </h3>
                <p className="text-gray-700 text-center text-xs sm:text-sm">
                  {t("inclusiveCultureDesc")}
                </p>
              </div>
            </div>
          </section>

          {/* Available Jobs Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              {t("availableJobs")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                    {t("salesRepresentative")}
                  </h3>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {t("salesRepresentativeDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("fullTime")}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("riyadh")}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("experience2Plus")}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                    {t("warehouseSupervisor")}
                  </h3>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {t("warehouseSupervisorDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("fullTime")}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("riyadh")}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("experience3Plus")}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg">
                    {t("webDeveloper")}
                  </h3>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {t("webDeveloperDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("fullTime")}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("remote")}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    {t("experience2Plus")}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* How to Apply Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              {t("howToApply")}
            </h2>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <ol className="list-decimal list-inside space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base lg:text-lg">
                    <li>
                      {t("applyStep1")}{" "}
                      <span className="font-semibold text-gray-600">
                        careers@farada.com
                      </span>
                    </li>
                    <li>{t("applyStep2")}</li>
                    <li>{t("applyStep3")}</li>
                    <li>{t("applyStep4")}</li>
                  </ol>
                </div>
                <div className="bg-gray-700 text-white p-4 sm:p-6 rounded-xl">
                  <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                    {t("applicationTips")}
                  </h3>
                  <ul className="space-y-2 text-gray-200 text-sm sm:text-base">
                    <li>{t("tip1")}</li>
                    <li>{t("tip2")}</li>
                    <li>{t("tip3")}</li>
                    <li>{t("tip4")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Training & Development Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              {t("trainingDevelopment")}
            </h2>
            <div className="text-center">
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("trainingDevelopmentDesc")}
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              {t("contactUs")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 text-center">
              {t("contactUsDesc")}
            </p>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center">
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t("email")}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    careers@farada.com
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t("phone")}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    +966-55-766-5585
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {t("workingHours")}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("sundayThursday")}
                    <br />
                    9:00 ص - 6:00 م
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gray-800 text-white p-8 sm:p-10 lg:p-12 rounded-xl sm:rounded-2xl text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("joinUs")}
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-4 sm:mb-6 max-w-3xl mx-auto">
              {t("joinUsDesc")}
            </p>
            <button className="bg-white text-gray-800 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-200">
              {t("applyNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
