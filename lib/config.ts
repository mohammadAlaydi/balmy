export const config = {
  api: {
    baseUrl: 'https://shopik-loopik.markatty.com/mobikulhttp',
    token: process.env.api_token || process.env.NEXT_PUBLIC_MOBIKUL_API_TOKEN,
  },
  store: {
    id: process.env.bagistoStoreId || process.env.NEXT_PUBLIC_STORE_ID || '198',
    currency: process.env.bagistoCurrency || process.env.NEXT_PUBLIC_CURRENCY || 'EGP',
    locale: process.env.bagistoLocale || process.env.NEXT_PUBLIC_LOCALE || 'en',
  },
};
