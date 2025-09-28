"use client";

import { useTranslations } from "next-intl";

export default function page() {
  
  const t = useTranslations("shippingInfo");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("title")}
          </h1>
          
          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("shippingAreas.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("shippingAreas.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("deliveryTime.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("deliveryTime.riyadh")}</h3>
                  <p className="text-gray-600">{t("deliveryTime.riyadhTime")}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("deliveryTime.majorCities")}</h3>
                  <p className="text-gray-600">{t("deliveryTime.majorCitiesTime")}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("deliveryTime.remoteAreas")}</h3>
                  <p className="text-gray-600">{t("deliveryTime.remoteAreasTime")}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("shippingCost.title")}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{t("shippingCost.riyadh")}</span>
                    <span className="font-semibold text-gray-800">{t("shippingCost.riyadhCost")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{t("shippingCost.majorCities")}</span>
                    <span className="font-semibold text-gray-800">{t("shippingCost.majorCitiesCost")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{t("shippingCost.remoteAreas")}</span>
                    <span className="font-semibold text-gray-800">{t("shippingCost.remoteAreasCost")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{t("shippingCost.freeShipping")}</span>
                    <span className="font-semibold text-gray-600">{t("shippingCost.freeShippingCost")}</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("shippingMethods.title")}
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("shippingMethods.express.title")}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t("shippingMethods.express.description")}
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{t("shippingMethods.express.tag")}</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("shippingMethods.standard.title")}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t("shippingMethods.standard.description")}
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{t("shippingMethods.standard.tag")}</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("shippingMethods.pickup.title")}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t("shippingMethods.pickup.description")}
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{t("shippingMethods.pickup.tag")}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("orderTracking.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("orderTracking.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("importantInfo.title")}
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-2 space-x-reverse gap-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">{t("importantInfo.shippingHours")}</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse gap-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">{t("importantInfo.deliveryAttempt")}</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse gap-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">{t("importantInfo.customDelivery")}</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse gap-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">{t("importantInfo.shippingInsurance")}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("internationalShipping.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("internationalShipping.description")}
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("shippingContact.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("shippingContact.description")}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800">
                  <strong>{t("shippingContact.phone")}</strong> +966-55-766-5585<br/>
                  <strong>{t("shippingContact.email")}</strong> shipping@farada.com<br/>
                  <strong>{t("shippingContact.workingHours")}</strong> {t("shippingContact.workingHoursValue")}
                </p>
              </div>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-2">{t("guarantee.title")}</h3>
              <p className="text-gray-700 text-sm">
                {t("guarantee.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
