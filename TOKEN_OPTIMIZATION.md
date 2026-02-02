# Token Optimization Strategy

⚠️ **CRITICAL FOR AI AGENTS:** This codebase is large. Reading unnecessary files or generating verbose code consumes token limits rapidly. Follow these strategies to remain efficient.

## 📉 Strategies for Token Conservation

### 1. Read Only What You Need
- **Do NOT** read the entire `package.json` unless checking specific version conflicts.
- **Do NOT** read `package-lock.json` or `build_log.txt`.
- **Do NOT** read `app/globals.css` unless debugging global style leaks.
- **Do NOT** read all files in a directory using `read_file` loops. Use `list_dir` first to target specific files.

### 2. Leverage Existing Components
Instead of generating this:
```tsx
// ❌ WRONG: Recreating a button
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
  Submit
</button>
```

Reference existing components:
```tsx
// ✅ CORRECT: Using existing component
import { Button } from "@/components/ui/button";

<Button>Submit</Button>
```
*Review `REUSABLE_COMPONENTS.md` before starting UI tasks.*

### 3. Efficient Search
- Use **Semantic Search** (`codebase_search`) for "How does the cart work?" instead of `grep`ing for "cart".
- Use **Grep** for finding specific symbol usages like `apiService.registerCustomer`.

### 4. Code Generation
- **Truncate Code:** When citing existing code, use `// ... existing code ...` for unchanged parts.
- **Import Aliases:** Use `@/` aliases to shorten import paths (e.g., `@/components/ui` instead of `../../components/ui`).

## 🚫 Files to Skip
Unless specifically relevant to your task, avoid reading:
- `node_modules/`
- `.next/`
- `public/assets/` (Binary/Image files)
- `package-lock.json`
- `next-env.d.ts`

## 🔍 Smart Context Gathering
1. **Understand the Task:** If asked to fix the login form, read `components/auth/login-form.tsx` and `store/slices/auth-slice.ts`. Don't read `app/layout.tsx`.
2. **Check Usage:** Before modifying a component, `grep` to see where it's used to avoid breaking changes.

## 📝 Pseudo-code Planning
Before generating full implementation code, outline your plan in pseudo-code or bullet points in the "Thought" process. This validates your approach without wasting tokens on incorrect code generation.
