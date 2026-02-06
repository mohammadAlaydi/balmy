export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_MOBIKUL_BASE_URL || 'https://flowerscosmetics.markatty.com/mobikulhttp',
    token: process.env.NEXT_PUBLIC_MOBIKUL_API_TOKEN || 'a197869e3439f6afbcc17c87152466f7',
  },
  company: {
    id: process.env.NEXT_PUBLIC_COMPANY_ID || '9031',
    url: process.env.NEXT_PUBLIC_COMPANY_URL || 'https://flowerscosmatics.shop/',
  },
  store: {
    id: process.env.NEXT_PUBLIC_STORE_ID || '8993',
    currency: process.env.NEXT_PUBLIC_CURRENCY || 'EGP',
    locale: process.env.NEXT_PUBLIC_LOCALE || 'ar',
  },
};
