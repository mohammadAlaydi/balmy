import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("user-profile");
    return {
        title: t("notifications") || "Notifications",
    };
}

export default function NotificationsPage() {
    return (
        <div className="bg-white dark:bg-surface-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[400px]">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">الإشعارات</h2>
            <p className="text-gray-500 dark:text-gray-400">لا توجد إشعارات حالياً.</p>
        </div>
    );
}
