import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ProfileSidebar from "@/components/user-profile/profile-sidebar";
import Breadcrumb from "@/components/Breadcrumb";

export default async function UserProfileLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="flex-grow container mx-auto px-4 lg:px-8 pb-10 pt-20 lg:pt-32">
                <div className="flex mb-10 text-sm text-gray-500 dark:text-gray-400">
                    <Breadcrumb
                        items={[
                            { label: "الرئيسية", href: "/" },
                            { label: "حسابي" }
                        ]}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Sidebar */}
                    <ProfileSidebar />

                    {/* Divider only on desktop */}
                    <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-700"></div>

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4">
                        {children}
                    </div>
                </div>
            </main>
        </NextIntlClientProvider>
    );
}
