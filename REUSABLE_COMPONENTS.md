# Reusable Components Catalog

This document details the primary reusable components available in the codebase. Always prefer using these over creating new ones to maintain consistency and reduce token usage.

## 🧩 UI Primitives (`components/ui/`)
These components are foundational. They accept `className` props for customization but enforce the design system's base styles.

### `Button`
Standard button component with variants.
**Path:** `components/ui/button.tsx`

```tsx
import { Button } from "@/components/ui/button";

// Usage
<Button variant="default" size="lg" onClick={handleClick}>
  Click Me
</Button>

// Variants: default, destructive, outline, secondary, ghost, link, success
// Sizes: default, sm, lg, icon
```

### `Input`
Standard form input.
**Path:** `components/ui/input.tsx`

```tsx
import { Input } from "@/components/ui/input";

<Input type="email" placeholder="Email Address" />
```

*See also:* `checkbox.tsx`, `radio-group.tsx`, `select.tsx`, `slider.tsx`, `dialog.tsx`.

---

## 🧭 Navigation Components

### `Breadcrumb`
Displays the current page hierarchy.
**Path:** `components/Breadcrumb.tsx`

```tsx
import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";

const items: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Perfume", isCurrent: true }
];

<Breadcrumb items={items} />
```

### `Header` & `Footer`
Global navigation components.
**Path:** `components/Header.tsx`, `components/layout/footer/footer.tsx`

---

## 🛍️ Commerce Components

### `ProductCard`
The primary component for displaying product summaries in grids/lists.
**Path:** `components/ProductCard.tsx`

**Props:**
- `product`: The product object (optional if individual props are passed).
- `productName`, `price`, `oldPrice`, `imageUrl`, `rating`: Overrides for display.
- `onAddToCart`: Callback when add button is clicked.

**Example:**
```tsx
import ProductCard from "@/components/ProductCard";

<ProductCard 
  product={productData}
  onAddToCart={() => console.log('Added')}
/>
```

### `AddToCartBtn`
Standardized button for cart actions with loading state.
**Path:** `components/AddToCartBtn.tsx`

```tsx
import AddToCartBtn from "@/components/AddToCartBtn";

<AddToCartBtn 
  onClick={handleAdd}
  disabled={isLoading}
  label="Add to Cart"
/>
```

### `RiyalSymbol`
Standard currency symbol component to ensure consistency.
**Path:** `components/RiyalSymbol.tsx`

---

## 🎨 Balmy Design System (`components/balmy/`)
A specific set of themed components used for the "Balmy" brand identity.

- `CartSectionBalmy`
- `ProductDetailsBalmy`
- `HeroBalmy`

⚠️ **Note:** Use these only when implementing specific "Balmy" themed pages or sections. For generic pages, stick to `components/ui` and standard components.

---

## 💡 Best Practices

1. **Don't duplicate:** Check `components/ui` first.
2. **Composition:** Build complex UI by composing these primitives.
3. **Styling:** Use Tailwind utility classes via `className` prop to tweak appearance without modifying the component source.
4. **Icons:** Use `lucide-react` icons (standard import) or SVG icons from `public/assets`.
