# Theme & Styling Guide

## 🎨 System Architecture

The project uses **Tailwind CSS** as the styling engine. The theme is configured in `tailwind.config.js` and extends the default Tailwind palette with semantic color names and specific design tokens.

### Key Configuration
- **Dark Mode:** Class-based (`darkMode: 'class'`).
- **Fonts:** Uses CSS variables (e.g., `var(--font-cairo)`).
- **Border Radius:** Controlled by `var(--radius)`.

## 🌈 Color Palette

We use a semantic color system based on HSL variables for primitives and hex codes for specific design tokens.

### Semantic Colors (Themed)
Usage: `bg-primary`, `text-destructive`, `border-input`

| Class | Description |
|-------|-------------|
| `primary` | Main brand color (usually dark/black in this theme) |
| `secondary` | Secondary actions |
| `destructive` | Error states, delete actions |
| `muted` | Subtitles, disabled text |
| `accent` | Highlighted elements |
| `background` | Page background |
| `card` | Card background |

### Balmy Design Tokens (Specific)
These are custom colors defined in `tailwind.config.js` for the specific brand identity.

- `bg-accent-red`: `#ef4444`
- `bg-light-gray`, `bg-medium-gray`, `bg-dark-gray`
- `bg-gold`

**Example:**
```tsx
<div className="bg-primary text-primary-foreground p-4 rounded-lg">
  <span className="text-accent-red">Sale!</span>
</div>
```

## 🔤 Typography

- **Font Family:** Cairo (via `next/font` and CSS variable `--font-cairo`).
- **Direction:** RTL support is built-in (app generally runs in `dir="rtl"`).

## 📐 Layout & Spacing

### Container
Use the standard container for page content centering.
```tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

### Grid System
Tailwind's grid system is preferred over Flexbox for 2D layouts.
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Product Cards */}
</div>
```

## 🖌️ CSS Conventions

1. **Utility First:** Avoid writing custom CSS in `.css` files. Use Tailwind classes.
2. **`cn` Utility:** Always use the `cn` utility (Classnames + Tailwind Merge) when accepting `className` props.

```tsx
import { cn } from "@/lib/utils";

export function MyComponent({ className }: { className?: string }) {
  return <div className={cn("bg-white p-4", className)}>...</div>;
}
```

3. **Global Styles:** Only defined in `app/globals.css`. Do not add component-specific styles here.

## 📱 Responsive Design

Mobile-first approach.
- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)
- `xl:` (1280px)

**Guideline:** Design for mobile first, then add breakpoints.
```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
```
