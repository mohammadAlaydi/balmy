"use client";

import { useTranslations } from "next-intl";

export default function CookiesPage() {
  const t = useTranslations("legal.cookies");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("title")}
          </h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("what-are-cookies")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("what-are-cookies-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("types-of-cookies")}
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {t("essential-cookies")}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("essential-cookies-desc")}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {t("functional-cookies")}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("functional-cookies-desc")}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {t("analytics-cookies")}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("analytics-cookies-desc")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("how-we-use")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("how-we-use-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("third-party-cookies")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("third-party-cookies-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("cookie-management")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("cookie-management-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("disabling-cookies")}
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("browser-instructions")}
                </h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>
                    • Chrome: {t("chrome-instructions")}
                  </li>
                  <li>
                    • Firefox: {t("firefox-instructions")}
                  </li>
                  <li>• Safari: {t("safari-instructions")}</li>
                  <li>
                    • Edge: {t("edge-instructions")}
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("policy-updates")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("policy-updates-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("contact-us")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("contact-us-desc")}
              </p>
            </section>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 text-sm">
                {t("last-updated")}: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}