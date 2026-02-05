import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("user-profile");
    return {
        title: t("pending-orders") || "Pending Orders",
    };
}

export default function PendingOrdersPage() {
    return (
        <div className="bg-white dark:bg-surface-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[400px]">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">طلبات بانتظار الدفع</h2>
            <p className="text-gray-500 dark:text-gray-400">لا توجد طلبات معلقة.</p>
        </div>
    );
}
