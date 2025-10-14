"use client";

import { useTranslations } from "next-intl";

export default function page() {

  const t = useTranslations("returnPolicy");
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("title")}
          </h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("commitment.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("commitment.description")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("returnConditions.title")}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{t("returnConditions.subtitle")}</h3>
                <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                  {t.raw("returnConditions.items").map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("nonReturnConditions.title")}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{t("nonReturnConditions.subtitle")}</h3>
                <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                  {t.raw("nonReturnConditions.items").map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("returnPeriod.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("returnPeriod.regularProducts.title")}</h3>
                  <p className="text-gray-600">{t("returnPeriod.regularProducts.period")}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("returnPeriod.electronicProducts.title")}</h3>
                  <p className="text-gray-600">{t("returnPeriod.electronicProducts.period")}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("howToReturn.title")}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {t.raw("howToReturn.steps").map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("returnOptions.title")}
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("returnOptions.moneyRefund.title")}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t("returnOptions.moneyRefund.description")}
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{t("returnOptions.moneyRefund.status")}</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("returnOptions.productReplacement.title")}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t("returnOptions.productReplacement.description")}
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{t("returnOptions.productReplacement.status")}</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{t("returnOptions.storeCredit.title")}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t("returnOptions.storeCredit.description")}
                  </p>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{t("returnOptions.storeCredit.status")}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("returnFees.title")}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2 text-gray-800">
                  <div className="flex justify-between">
                    <span>{t("returnFees.defectiveProduct")}</span>
                    <span className="font-semibold">{t("returnFees.defectiveProductFee")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("returnFees.noReasonReturn")}</span>
                    <span className="font-semibold">{t("returnFees.noReasonReturnFee")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("returnFees.shippingFees")}</span>
                    <span className="font-semibold">{t("returnFees.shippingFeesResponsibility")}</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("processingTime.title")}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t("processingTime.productReceipt")}</span>
                  <span className="font-semibold text-gray-800">{t("processingTime.productReceiptTime")}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t("processingTime.productInspection")}</span>
                  <span className="font-semibold text-gray-800">{t("processingTime.productInspectionTime")}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t("processingTime.orderProcessing")}</span>
                  <span className="font-semibold text-gray-800">{t("processingTime.orderProcessingTime")}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t("processingTime.totalTime")}</span>
                  <span className="font-semibold text-gray-600">{t("processingTime.totalTimePeriod")}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("importantInfo.title")}
              </h2>
              <div className="space-y-3">
                {t.raw("importantInfo.items").map((item: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2 space-x-reverse gap-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("contact.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("contact.description")}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800">
                  <strong>{t("contact.phone")}</strong> +966-55-766-5585<br/>
                  <strong>{t("contact.email")}</strong> returns@farada.com<br/>
                  <strong>{t("contact.workingHours")}</strong> {t("contact.workingHoursValue")}
                </p>
              </div>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-2">{t("helpSection.title")}</h3>
              <p className="text-gray-700 text-sm">
                {t("helpSection.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
