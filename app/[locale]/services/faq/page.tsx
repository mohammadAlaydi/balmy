"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function page() {
  
  const t = useTranslations("faq");
  
  return (
    <div className="min-h-[65vh] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("title")}
          </h1>

          <div className="space-y-6 ">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("products-orders")}
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("how-to-order")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("how-to-order-answer")}
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("payment-methods")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("payment-methods-answer")}
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("modify-cancel-order")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("modify-cancel-order-answer")}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("shipping-delivery")}
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("delivery-time")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("delivery-time-answer")}
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("free-shipping")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("free-shipping-answer")}
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("track-order")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("track-order-answer")}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("returns-exchanges")}
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("return-policy")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("return-policy-answer")}
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("return-processing-time")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("return-processing-time-answer")}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("account-privacy")}
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("create-account")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("create-account-answer")}
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("data-security")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("data-security-answer")}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("service-support")}
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("working-hours")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("working-hours-answer")}
                      </p>
                    </div>
                  </details>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                      <span className="font-semibold text-gray-800">{t("contact-customer-service")}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        {t("contact-customer-service-answer")}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </section>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t("no-answer-found")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("customer-service-available")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link  prefetch={true} href="tel:+966557665585" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md w-full">
                  {t("phone")}
                </Link>
                <Link  prefetch={true} href="mailto:info@farada.com" className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md w-full">
                  {t("email")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
