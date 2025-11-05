import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorComponent({
  t,
  error,
  locale,
}: {
  t: any;
  error: any;
  locale: string;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {t("errorTitle")}
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>

        {error.includes("Please login") && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
            <p className="text-red-800 text-sm">
              <strong>{t("authentication-required")}</strong>
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <Button asChild variant="outline">
            <Link href={`/${locale}/auth/login`} prefetch={true}>
              {t("loginAgain")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
