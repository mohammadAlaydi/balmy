# Internationalization (i18n) Setup

This project has been fully internationalized to support both Arabic (ar) and English (en) languages using Next.js with next-intl.

## Overview

The internationalization system is built on:
- **next-intl**: A powerful internationalization library for Next.js
- **Locale-based routing**: URLs include locale prefixes (e.g., `/ar/home`, `/en/home`)
- **Translation files**: JSON files containing all translatable content
- **Middleware**: Automatically handles locale detection and routing

## File Structure

```
├── messages/
│   ├── ar.json          # Arabic translations
│   └── en.json          # English translations
├── i18n/
│   └── request.ts       # Next-intl configuration
├── middleware.ts        # Locale middleware
├── next.config.ts       # Next.js with next-intl plugin
└── app/[locale]/        # Locale-based routing
```

## Configuration Files

### 1. Middleware (`middleware.ts`)
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always'
});
```

### 2. Next.js Config (`next.config.ts`)
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### 3. i18n Configuration (`i18n/request.ts`)
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale || 'ar',
    messages: (await import(`@/messages/${locale || 'ar'}.json`)).default,
  };
});
```

## Translation Files

### Structure
Translation files are organized in nested objects for better organization:

```json
{
  "navigation": {
    "home": "الرئيسية",
    "menu": "القائمة",
    "language": "اللغة"
  },
  "products": {
    "addToCart": "أضف للسلة",
    "product": "المنتج",
    "currency": "ر.س"
  },
  "contact": {
    "phone": "01097352356",
    "callToAction": "اتصل بنا اليوم",
    "discount": "خصومات تصل إلى 50%"
  }
}
```

### Key Translation Categories

1. **Navigation**: Menu items, language switcher
2. **Products**: Product names, actions, currency
3. **Contact**: Phone numbers, addresses, call-to-action text
4. **Legal**: Terms, privacy policy, sale terms
5. **Auth**: Login, register, form labels
6. **Footer**: Working hours, social media, copyright
7. **Home**: Page sections, featured products
8. **Search**: Search functionality, suggestions
9. **Cart**: Shopping cart related text
10. **Categories**: Product categories
11. **Services**: Service descriptions
12. **About**: Company information

## Usage in Components

### Basic Usage
```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("navigation");
  
  return (
    <div>
      <h1>{t("home")}</h1>
      <p>{t("menu")}</p>
    </div>
  );
}
```

### Nested Keys
```tsx
const t = useTranslations("legal.saleTerms");
return <h1>{t("title")}</h1>;
```

### Dynamic Content
```tsx
const t = useTranslations("products");
return <p>{t("addedToFavorites")} {productName}</p>;
```

## Language Switching

The language switcher is implemented in the header component:

```tsx
const languageItems = LANGUAGES.map((lang) => {
  const segments = pathname.split("/");
  segments[1] = lang.code;
  const newPath = segments.join("/");
  
  return {
    title: lang.title,
    onClick: () => router.push(newPath),
    className: lang.code === currentLocale ? "opacity-50 pointer-events-none" : "",
  };
});
```

## URL Structure

- **Arabic**: `/ar/home`, `/ar/products`, `/ar/contact`
- **English**: `/en/home`, `/en/products`, `/en/contact`
- **Default**: Automatically redirects to Arabic (`/ar`)

## Adding New Translations

### 1. Add to Translation Files
Add new keys to both `messages/ar.json` and `messages/en.json`:

```json
{
  "newSection": {
    "title": "عنوان جديد",
    "description": "وصف جديد"
  }
}
```

### 2. Use in Components
```tsx
const t = useTranslations("newSection");
return <h1>{t("title")}</h1>;
```

### 3. Update Static Data
If using static data, update the data structure to use translation keys:

```typescript
export const NEW_DATA = {
  title: "newSection.title",
  description: "newSection.description"
};
```

## Best Practices

### 1. Consistent Naming
- Use descriptive, hierarchical keys
- Group related translations together
- Use lowercase with dots for separation

### 2. Fallback Values
Always provide fallback values for missing translations:

```tsx
const t = useTranslations("products");
return <p>{product?.name || t("productName")}</p>;
```

### 3. Dynamic Content
For dynamic content, use interpolation:

```tsx
const t = useTranslations("products");
return <p>{t("addedToFavorites")} {productName}</p>;
```

### 4. Pluralization
For plural forms, use conditional logic:

```tsx
const t = useTranslations("cart");
return <p>{quantity === 1 ? t("item") : t("items")}</p>;
```

## Testing

### 1. Switch Languages
- Use the language switcher in the header
- Verify all text changes appropriately
- Check RTL/LTR layout switching

### 2. URL Testing
- Test direct navigation to both locales
- Verify default locale redirects
- Check 404 handling for invalid locales

### 3. Content Verification
- Ensure all hardcoded text is translated
- Verify product names, prices, and descriptions
- Check form labels and error messages

## Common Issues

### 1. Missing Translations
If a translation key is missing, the key itself will be displayed. Always add translations to both language files.

### 2. RTL Layout
Arabic content automatically uses RTL layout. Ensure proper CSS classes are applied:

```css
[dir="rtl"] .my-component {
  text-align: right;
}
```

### 3. Date and Number Formatting
For locale-specific formatting, use the `useLocale()` hook:

```tsx
import { useLocale } from "next-intl";

const locale = useLocale();
const formattedDate = new Date().toLocaleDateString(locale);
```

## Maintenance

### 1. Regular Updates
- Keep translation files synchronized
- Add new features with proper translations
- Remove unused translation keys

### 2. Translation Quality
- Ensure accurate translations
- Maintain consistent terminology
- Consider cultural context

### 3. Performance
- Lazy load translation files
- Use efficient key structures
- Minimize translation file size

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing)
- [RTL Layout Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

## Support

For questions or issues with internationalization:
1. Check the next-intl documentation
2. Review existing translation patterns
3. Ensure all language files are updated
4. Test with both locales
