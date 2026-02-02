# Development Guidelines

## 📜 Code Style & Formatting

- **Linter:** ESLint is configured. Respect the rules.
- **Formatter:** Prettier (implied by codebase consistency).
- **Naming:**
  - Components: `PascalCase`
  - Functions/Variables: `camelCase`
  - Files: `kebab-case`
- **Imports:**
  - Group external imports (React, Next.js) first.
  - Internal imports (Components, Hooks, Lib) second.
  - Style imports last.
  - Use absolute imports (`@/`) where possible.

## 🛠️ Component Creation Workflow

1. **Check Reusability:** Look in `components/ui` first.
2. **Scaffold:** Create the file in the appropriate directory (`components/` for shared, `features/` for domain-specific).
3. **Props:** Define an interface for props. Use `cn` for `className` merging.
4. **Logic:** Keep logic simple. Move complex state to Redux or custom hooks.
5. **Internationalization:** Wrap text in `t('key')` using `useTranslations`.

## 📦 State Management Patterns

- **Global Server Data:** Fetch in `app/api/` or `app/[locale]/page.tsx`, pass to Client Components or hydrate Redux.
- **Global Client Data:** Use Redux (`useAppDispatch`, `useAppSelector`).
  - Auth, Cart, Favorites are all in Redux.
- **Form State:** Use `react-hook-form` + `zod` schema validation.

## 🔌 API Integration

**DEPRECATED:** `lib/api-service.ts`
**RECOMMENDED:** Next.js API Routes

1. Create a route handler in `app/api/my-feature/route.ts`.
2. Call the backend service from the server-side route.
3. Fetch this internal API from your frontend component using `fetch` or a wrapper.

```tsx
// Frontend Component
const handleSubmit = async (data) => {
  const res = await fetch('/api/my-feature', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const result = await res.json();
}
```

## 🐛 Error Handling

- **API:** Wrap calls in `try/catch`. Check `response.ok`.
- **UI:** Use `react-hot-toast` or `sonner` for user notifications.
  ```tsx
  import toast from "react-hot-toast";
  toast.error("Something went wrong");
  ```
- **Boundaries:** Use Error Boundaries for critical sections (Next.js handles this via `error.tsx`).

## 🧪 Testing

- Ensure critical flows (Checkout, Login) are tested manually if automated tests aren't running.
- Use `components-test` directory for trying out isolated components during dev.

## 🔄 Git Workflow

- **Branching:** Feature branches.
- **Commits:** Semantic messages (e.g., `feat: add user profile`, `fix: cart calculation`).
- **PRs:** Review code against these guidelines before merging.
