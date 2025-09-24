"use client";

import { useTranslations } from "next-intl";

export default function SaleTermsPage() {
  
  const t = useTranslations("legal.sale-terms");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("title")}
          </h1>
          
          <div className="space-y-6 text-right">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("purchase-orders")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("purchase-orders-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("pricing-payment")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("pricing-payment-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("order-confirmation")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("order-confirmation-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("shipping-delivery")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("shipping-delivery-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("order-cancellation")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("order-cancellation-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("warranty")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("warranty-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("privacy-security")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("privacy-security-desc")}
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 text-sm">
                {t("contact-for-inquiries")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
