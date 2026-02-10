# Workspace Rules — Balmy E-Commerce

> These rules apply specifically to the **Balmy e-commerce** Next.js project.

---

## 1. Project Context

| Key | Value |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS |
| **State** | Redux Toolkit |
| **UI Libraries** | Radix UI, Framer Motion |
| **Forms** | React Hook Form |
| **i18n** | next-intl (ar, en, tr) |
| **API** | Markatty backend (proxied) |

---

## 2. Directory Structure Conventions

```
app/                     # Next.js App Router pages
  [locale]/              # Locale-prefixed routes (ar, en, tr)
components/              # Reusable UI components (PascalCase files)
features/                # Feature-specific slices and components
hooks/                   # Custom React hooks (use*.ts)
lib/                     # Shared utilities, API helpers
store/                   # Redux slices and store configuration
types/                   # TypeScript type definitions
messages/                # i18n translation JSON files (ar.json, en.json, tr.json)
public/                  # Static assets (images, fonts)
```

---

## 3. Component Rules

### 3.1 File Naming
- **[CRITICAL]** React components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- **[CRITICAL]** Hooks: `useCamelCase.ts` (e.g., `useCart.ts`)
- **[IMPORTANT]** Utilities: `camelCase.ts` (e.g., `formatPrice.ts`)
- **[IMPORTANT]** Types: `camelCase.ts` or co-located in the component file

### 3.2 Component Structure
```typescript
// 1. Imports (external → internal → types → styles)
// 2. Type definitions (Props interface)
// 3. Component function
// 4. Helper functions (private to the module)
// 5. Export
```

### 3.3 Component Size
- **[IMPORTANT]** Max 200 lines per component file. Extract sub-components if larger.
- **[IMPORTANT]** Max 50 lines per function/handler inside a component.
- **[RECOMMENDED]** Extract complex logic into custom hooks.

---

## 4. State Management Rules

- **[CRITICAL]** Use Redux Toolkit slices in `store/` — no raw Redux.
- **[CRITICAL]** API calls go through RTK Query or thunks, never inside components.
- **[IMPORTANT]** Local-only state (form inputs, toggles) stays in `useState` — do NOT put in Redux.
- **[IMPORTANT]** Guest data (cart, favorites) persists via `localStorage`.
- **[RECOMMENDED]** Selector functions in the slice file, exported and reusable.

---

## 5. i18n / Translation Rules

- **[CRITICAL]** No hardcoded Arabic, English, or Turkish strings in component files.
- **[CRITICAL]** All user-facing text must use `useTranslations()` from `next-intl`.
- **[IMPORTANT]** Translation keys: `namespace.sectionName.keyName` (dot-separated, camelCase).
- **[IMPORTANT]** When adding a new string, add it to **all three** JSON files: `ar.json`, `en.json`, `tr.json`.
- **[IMPORTANT]** Use `text-start` / `text-end` instead of `text-left` / `text-right` for RTL support.
- **[CRITICAL]** Never use `dir="rtl"` on individual elements — direction is set globally by locale.

---

## 6. Styling Rules (Tailwind CSS)

- **[CRITICAL]** Use Tailwind utility classes — no inline `style={}` except for dynamic values.
- **[IMPORTANT]** Responsive design: mobile-first (`sm:`, `md:`, `lg:` breakpoints).
- **[IMPORTANT]** Use logical properties for RTL: `ms-*` / `me-*` instead of `ml-*` / `mr-*`.
- **[IMPORTANT]** Also use `ps-*` / `pe-*` instead of `pl-*` / `pr-*`.
- **[RECOMMENDED]** Group utility classes: layout → spacing → typography → colors → effects.
- **[RECOMMENDED]** Extract repeated class combinations into Tailwind `@apply` or component variants.

---

## 7. API Integration Rules

- **[CRITICAL]** All API calls go through the Next.js proxy (`/api/...`) — never call the backend directly from the client.
- **[CRITICAL]** Include `bagistoStoreId` and auth token where required.
- **[IMPORTANT]** Handle loading, error, and empty states for every API call.
- **[IMPORTANT]** Type all API responses — no `any` types.
- **[RECOMMENDED]** Use consistent error shapes: `{ message: string; code?: string }`.

---

## 8. Error Handling in This Project

```typescript
// ✅ GOOD — typed error, actionable message
try {
  const data = await fetchProducts(categoryId);
  return data;
} catch (error) {
  console.error(`[fetchProducts] Failed for category ${categoryId}:`, error);
  throw new Error(`Unable to load products. Please try again later.`);
}

// ❌ BAD — swallowed error, generic message
try {
  const data = await fetchProducts(categoryId);
  return data;
} catch {
  return null;
}
```

---

## 9. Performance Rules

- **[IMPORTANT]** Use Next.js `Image` component — never raw `<img>`.
- **[IMPORTANT]** Lazy-load below-the-fold sections with `dynamic(() => import(...))`.
- **[RECOMMENDED]** Memoize expensive list renders with `React.memo`.
- **[RECOMMENDED]** Debounce search/filter inputs (300ms).

---

## 10. Testing Rules

- **[IMPORTANT]** New components should have at least a smoke test (renders without crashing).
- **[IMPORTANT]** API route handlers should have integration tests for success + error cases.
- **[RECOMMENDED]** Use React Testing Library for component tests.
- **[RECOMMENDED]** Use MSW (Mock Service Worker) for API mocking in tests.

---

## Appendix: Quick Checklist Before Submitting Changes

- [ ] No hardcoded strings — all text uses `useTranslations()`
- [ ] Translations added to all three locale files (ar, en, tr)
- [ ] Uses logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`)
- [ ] No `dir="rtl"` on individual elements
- [ ] API calls go through the proxy, not directly to backend
- [ ] API responses are fully typed — no `any`
- [ ] Loading, error, and empty states handled
- [ ] Components are under 200 lines
- [ ] `next/image` used instead of `<img>`
- [ ]  Build passes: `npm run build`
