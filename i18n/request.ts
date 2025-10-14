import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Validate locale and fallback to 'ar' if not provided or invalid
  const supportedLocales = ['ar', 'en'] as const;
  const requestedLocale = locale && supportedLocales.includes(locale as any) ? locale : 'ar';
  
  return {
    locale: requestedLocale,
    messages: (await import(`@/messages/${requestedLocale}.json`)).default,
  };
});
