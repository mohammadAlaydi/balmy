import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  // Used when no locale matches
  defaultLocale: 'ar',
  // Always include locale prefix
  localePrefix: 'always'
});
export const config = {
  // Match all routes except static files and Next.js internals
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'],
};