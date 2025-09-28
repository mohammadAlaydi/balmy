"use client";

import { useTranslations } from "next-intl";

export default function page() {
  
  const t = useTranslations("legal.privacy");

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
                {t("introduction")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("introduction-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("information-collected")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("information-collected-desc")}
              </p>
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
                {t("information-sharing")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("information-sharing-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("information-protection")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("information-protection-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("cookies")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("cookies-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("your-rights")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("your-rights-desc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("policy-changes")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t("policy-changes-desc")}
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
