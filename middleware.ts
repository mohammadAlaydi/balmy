import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';


const handleI18nRouting = createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export default function middleware(request: any) {
  // First, let next-intl handle locale prefixing
  const response = handleI18nRouting(request);

  // Then, ensure '/en' or '/ar' redirect to '/{locale}/home'
  const pathname = request.nextUrl.pathname as string;
  const match = pathname.match(/^\/(en|ar)\/?$/);
  if (match) {
    const locale = match[1];
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/home`;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
  