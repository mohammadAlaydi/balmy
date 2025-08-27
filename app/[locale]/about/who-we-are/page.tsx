"use client";

import { useTranslations } from "next-intl";

export default function WhoWeArePage() {
  const t = useTranslations("whoWeAre");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brown-600 to-amber-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-brown-100 max-w-3xl mx-auto leading-relaxed px-4">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Our Story Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("ourStory")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("ourStoryDesc")}
              </p>
            </div>
          </section>

          {/* Vision & Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-blue-200">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-3 sm:mb-4">
                  {t("ourVision")}
                </h2>
                <p className="text-blue-700 leading-relaxed text-sm sm:text-base">
                  {t("ourVisionDesc")}
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-green-200">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800 mb-3 sm:mb-4">
                  {t("ourMission")}
                </h2>
                <p className="text-green-700 leading-relaxed text-sm sm:text-base">
                  {t("ourMissionDesc")}
                </p>
              </div>
            </section>
          </div>

          {/* Our Values Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              {t("ourValues")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-blue-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("quality")}
                </h3>
                <p className="text-blue-700 text-center text-xs sm:text-sm">
                  {t("qualityDesc")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-green-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("honesty")}
                </h3>
                <p className="text-green-700 text-center text-xs sm:text-sm">
                  {t("honestyDesc")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-purple-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("innovation")}
                </h3>
                <p className="text-purple-700 text-center text-xs sm:text-sm">
                  {t("innovationDesc")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-orange-800 mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  {t("customerService")}
                </h3>
                <p className="text-orange-700 text-center text-xs sm:text-sm">
                  {t("customerServiceDesc")}
                </p>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("ourExperience")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("ourExperienceDesc")}
              </p>
            </div>
          </section>

          {/* Community Commitment Section */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-green-200">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("communityCommitment")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("communityCommitmentDesc")}
              </p>
            </div>
          </section>

          {/* Future Section */}
          <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("ourFuture")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("ourFutureDesc")}
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-brown-500 to-amber-600 text-white p-8 sm:p-10 lg:p-12 rounded-xl sm:rounded-2xl text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("joinUsCoffee")}
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-brown-100 mb-4 sm:mb-6 max-w-3xl mx-auto">
              {t("joinUsCoffeeDesc")}
            </p>
            <button className="bg-white text-brown-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-200">
              {t("learnMore")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
