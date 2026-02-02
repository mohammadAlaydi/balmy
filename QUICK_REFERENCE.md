# Quick Reference

## ⚡ Common Operations

### Imports
```tsx
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link } from "@/i18n/routing"; // or next/link
```

### Redux Hooks
```tsx
const dispatch = useAppDispatch();
const { isAuthenticated } = useAppSelector((state) => state.auth);
const { cartItems } = useAppSelector((state) => state.cart);
```

### Toast Notifications
```tsx
import toast from "react-hot-toast";

toast.success("Success message");
toast.error("Error message");
```

### Form Handling
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});
```

## 🎨 Common Classes (Tailwind)

- **Flex Center:** `flex items-center justify-center`
- **Page Container:** `container mx-auto px-4 py-8`
- **Card:** `bg-white rounded-lg shadow p-4`
- **Text:** `text-sm text-gray-500`, `font-bold text-gray-900`

## 🛠️ Troubleshooting

**Issue: Styles not applying?**
- Check if the class is in `tailwind.config.js` safelist (unlikely) or if you're using dynamic class names incorrectly (use complete class names, don't construct them like `text-${color}`).

**Issue: API 401 Unauthorized?**
- Token might be expired. The system tries to auto-refresh. Check `lib/api-service.ts` refresh logic or the Next.js middleware.

**Issue: Translations missing?**
- Check `messages/ar.json` or `messages/en.json`. ensure the key exists.
