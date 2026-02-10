---
description: Standard workflows for the Balmy e-commerce Next.js project
---

# Workspace Workflows — Balmy E-Commerce

> Step-by-step procedures tailored to this project's stack.

---

## 1. Adding a New Page

1. **Create the route** — Add `app/[locale]/your-page/page.tsx`.
2. **Create the client component** — `components/YourPageContent.tsx`.
3. **Add translations** — Add keys to `messages/ar.json`, `messages/en.json`, `messages/tr.json`.
4. **Use translations** — `const t = useTranslations('yourPage')` in the component.
5. **Add navigation** — Update `MainNavBar` or relevant links.
6. **Verify** — Check all three locales render correctly.

---

## 2. Adding a New Component

1. **Create the file** — `components/YourComponent.tsx` (PascalCase).
2. **Define props interface** — At the top of the file, exported.
3. **Implement** — Use Tailwind classes, logical properties (`ms-`, `me-`, `text-start`).
4. **No hardcoded strings** — All text via `useTranslations()`.
5. **Export** — Named export by default.

```typescript
// Template
'use client';

import { useTranslations } from 'next-intl';

interface YourComponentProps {
  title: string;
  onAction?: () => void;
}

export function YourComponent({ title, onAction }: YourComponentProps) {
  const t = useTranslations('yourNamespace');

  return (
    <div className="flex items-center gap-4 p-4">
      <h2 className="text-lg font-semibold text-start">{title}</h2>
      {onAction && (
        <button onClick={onAction} className="btn-primary">
          {t('actionLabel')}
        </button>
      )}
    </div>
  );
}
```

---

## 3. Adding a New API Proxy Route

1. **Create** — `app/api/your-endpoint/route.ts`.
2. **Implement handler** — Forward the request to the Markatty backend.
3. **Include auth** — Pass the token from cookies/headers.
4. **Type the response** — Define or reuse types in `types/`.
5. **Error handling** — Return proper HTTP status codes and error messages.

```typescript
// Template
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization');
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/your-endpoint`, {
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || 'Request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[your-endpoint] Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 4. Adding a New Redux Slice

1. **Create the slice** — `store/yourSlice.ts`.
2. **Define types** — State shape, action payloads.
3. **Create selectors** — Export selectors from the same file.
4. **Register** — Add the reducer to `store/index.ts`.
5. **Connect** — Use `useSelector` and `useDispatch` in components.

```typescript
// Template
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YourState {
  items: YourItem[];
  loading: boolean;
  error: string | null;
}

const initialState: YourState = {
  items: [],
  loading: false,
  error: null,
};

const yourSlice = createSlice({
  name: 'your',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<YourItem[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Selectors
export const selectYourItems = (state: RootState) => state.your.items;
export const selectYourLoading = (state: RootState) => state.your.loading;

export const { setItems, setLoading, setError } = yourSlice.actions;
export default yourSlice.reducer;
```

---

## 5. Adding Translations

// turbo-all

1. Open `messages/ar.json` and add the new keys under the appropriate namespace.
2. Open `messages/en.json` and add the English translations for the same keys.
3. Open `messages/tr.json` and add the Turkish translations for the same keys.
4. **Verify keys match** — All three files must have identical key structures.
5. **Use in component** — `const t = useTranslations('namespace')` → `t('key')`.

```json
// Example: adding a "checkout" namespace
{
  "checkout": {
    "title": "إتمام الطلب",
    "emptyCart": "سلة التسوق فارغة",
    "placeOrder": "إتمام الشراء"
  }
}
```

---

## 6. Adding a New Feature (Full End-to-End)

1. **Plan** — Identify all files to create/modify (component, slice, API route, translations).
2. **Types first** — Define TypeScript types/interfaces in `types/`.
3. **API route** — Create the proxy route in `app/api/`.
4. **Redux slice** — Create the state management slice in `store/`.
5. **Component** — Build the UI component in `components/`.
6. **Page** — Wire it into the page in `app/[locale]/`.
7. **Translations** — Add all strings to all three locale files.
8. **Verify** — Build passes, all three locales render correctly.

---

## 7. Debugging Checklist

When something breaks:

1. **Check the terminal** — Read the Next.js dev server output for errors.
2. **Check the browser console** — Client-side errors, network failures.
3. **Check the API response** — Use browser DevTools Network tab or curl.
4. **Check translations** — Missing keys show up as the key name in the UI.
5. **Check Redux state** — Use Redux DevTools to inspect the store.
6. **Check types** — Run `npx tsc --noEmit` to catch type errors.

---

## 8. Deployment Verification

Before considering changes ready for deployment:

// turbo-all

1. Run `npx tsc --noEmit` — No TypeScript errors.
2. Run `npm run build` — Build completes successfully.
3. Test all three locales: `/ar/`, `/en/`, `/tr/`.
4. Test responsive layouts: mobile, tablet, desktop.
5. Test guest user flow (no auth token).
6. Test authenticated user flow.
