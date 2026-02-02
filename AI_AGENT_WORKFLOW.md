# AI Agent Workflow

## 🤖 Step-by-Step Workflow

Follow this process to ensure high-quality contributions:

### 1. 🧠 Analyze the Request
- **Identify Intent:** Is it a bug fix, new feature, or refactor?
- **Locate Context:** Use `codebase_search` to find relevant files.
- **Check Standards:** Refer to `DEVELOPMENT_GUIDELINES.md`.

### 2. 🔍 Exploration (Token Efficient)
- **Start Broad:** List relevant directories.
- **Drill Down:** Read *only* the specific files needed.
- **Map Dependencies:** Note imports and shared components.

### 3. 📝 Planning
- **Create Todos:** Use the `todo_write` tool for complex tasks.
- **Draft Solution:** Formulate the plan in your "Thought" block.
- **Verify:** Does this use existing components? (`REUSABLE_COMPONENTS.md`)

### 4. 💻 Implementation
- **Small Batches:** Edit one file at a time or logically grouped files.
- **Lint Check:** Run `read_lints` after substantive edits.
- **Consistency:** Match the style of surrounding code.

### 5. ✅ Verification
- **Self-Review:** specific check against `TOKEN_OPTIMIZATION.md`.
- **Explain:** Clearly explain what changed and why.

## 🌲 Decision Tree: "Where does this code go?"

- **Is it a reusable UI element?** -> `components/ui/`
- **Is it a page-specific section?** -> `components/features/[feature-name]/` or `components/[page-name]/`
- **Is it business logic?** -> `store/slices/` or `lib/`
- **Is it a global utility?** -> `lib/utils.ts`
- **Is it a new page?** -> `app/[locale]/[route-name]/page.tsx`

## ⚠️ Common Pitfalls to Avoid

1. **Re-implementing Fetch:** Do not write raw `fetch` calls with auth headers manually. Use the existing API helpers or Next.js API routes.
2. **Hardcoding Strings:** Always use `useTranslations` for UI text.
3. **Ignoring Mobile:** Always write Responsive Tailwind classes (`md:`, `lg:`).
4. **Modifying `globals.css`:** Avoid this unless absolutely necessary. Use Tailwind utilities.
