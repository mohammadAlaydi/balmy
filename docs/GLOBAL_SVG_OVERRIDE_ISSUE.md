# Global SVG / Lucide Icon Override Issue

## Problem

`globals.css` contains aggressive global rules that override SVG icon styles:

```css
/* Line ~134 */
svg {
  fill: currentColor;
  color: currentColor;
}

/* Line ~140 — THE MAIN CULPRIT */
.lucide {
  color: currentColor !important;
  fill: none !important;          /* ← blocks ANY fill color */
  stroke: currentColor !important;
}
```

### Impact

- **Any lucide-react icon** that needs a custom `fill` (e.g. a filled heart, filled star, filled bookmark) will be invisible or show no color, because `fill: none !important` wins over inline styles, Tailwind classes, and React `style` props.
- The bare `svg { fill: currentColor }` also interferes with SVGs that intentionally use `fill="none"` (outline-style icons).

### Symptoms

| Symptom | Cause |
|---------|-------|
| Heart icon disappears when "active" | `fill: none !important` removes the red fill |
| Star rating icons show no fill | Same rule strips the gold/yellow fill |
| Icons lose color after page navigation | Global rule re-applies on hydration |

## Current Workaround

Use a **data-attribute selector** to beat the `!important`:

```css
/* globals.css */
.lucide[data-favourite-active="true"] {
  fill: #ef4444 !important;
  stroke: #ef4444 !important;
}
```

```tsx
// Component
<Heart data-favourite-active={active ? "true" : undefined} />
```

## Recommended Long-Term Fix

1. **Remove the global `.lucide` rule entirely** — lucide-react icons already default to `fill="none"` and `stroke="currentColor"` via their SVG attributes.
2. **Remove `svg { fill: currentColor }`** — this blanket rule conflicts with outline-style SVGs.
3. If specific icons need `fill: currentColor`, apply it via a utility class (e.g. `.icon-filled { fill: currentColor }`) instead of globally.

### Before removing, audit these icon usages:

- `components/balmy/header-balmy.tsx` — header action icons
- `components/ProductCard.tsx` — product card icons
- `components/balmy/product-info-balmy.tsx` — product detail icons
- Any component using `react-icons` (separate `.react-icons` rule exists)

## Files Involved

| File | Role |
|------|------|
| `app/[locale]/globals.css` (lines 133–156) | Source of the global override |
| `components/favourite-button.tsx` | Uses `data-favourite-active` workaround |
