# Project Overview

## 🏗️ Architecture & Structure

This project is a modern e-commerce application built with **Next.js 15 (App Router)**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. It follows a feature-based architecture combined with a strong distinction between UI components and business logic.

### Technology Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI-like primitives
- **State Management:** Redux Toolkit (Global), React Hooks (Local)
- **Internationalization:** `next-intl` (Locale routing under `app/[locale]/`)
- **Forms:** `react-hook-form` + `zod`
- **Testing:** (Infrastructure present for frontend tests)

### Directory Structure

```
├── app/                  # Next.js App Router (Pages & API)
│   ├── [locale]/         # Localized routes (e.g., /en/login, /ar/login)
│   ├── api/              # Backend API Routes (Serverless functions)
│   └── globals.css       # Global styles and Tailwind directives
├── components/           # Shared UI components
│   ├── ui/               # Reusable UI primitives (Button, Input, Dialog)
│   ├── balmy/            # Design-system specific components ("Balmy" theme)
│   ├── features/         # Feature-specific components (Auth, Cart, Home)
│   └── ...               # Shared project components (Header, Footer, ProductCard)
├── features/             # Feature modules (Domain logic & components)
│   ├── auth/             # Authentication logic
│   ├── cart/             # Shopping cart logic
│   └── ...
├── lib/                  # Utilities and helpers
│   ├── api-service.ts    # ⚠️ Deprecated API service (use API routes instead)
│   └── utils.ts          # Common utility functions (cn, etc.)
├── store/                # Redux Store configuration
│   ├── slices/           # Redux slices (auth, cart, products)
│   └── hooks.ts          # Typed Redux hooks (useAppDispatch, useAppSelector)
└── public/               # Static assets
```

## 📐 Design Patterns

### 1. Component Composition
- **UI Primitives:** Located in `components/ui/`. These are presentational and headless (mostly based on Radix UI).
- **Feature Components:** Located in `features/` or `components/features/`. These connect UI primitives to Redux state and API logic.
- **Page Components:** Located in `app/[locale]/`. These act as the entry points and layout wrappers.

### 2. State Management
- **Global State:** Redux Toolkit is used for cart, authentication, and cross-component data.
- **Local State:** `useState` / `useReducer` for form inputs and simple toggles.
- **Server State:** Handled via direct API calls or Redux async thunks/RTK Query (migrating towards API routes).

### 3. API Communication
- **Legacy:** `lib/api-service.ts` (Class-based service). **Deprecated.**
- **Modern:** Next.js API Routes (`app/api/`) are the preferred method for interacting with the backend.
- **Pattern:** Frontend calls `app/api/...` which proxies/handles requests to the backend ERP/Service.

## 📁 File Naming Conventions
- **Components:** PascalCase (e.g., `ProductCard.tsx`, `AuthModal.tsx`)
- **Utilities/Hooks:** kebab-case (e.g., `use-cart.ts`, `api-service.ts`)
- **Folders:** kebab-case (e.g., `user-profile`, `contact-us`)

## 🚀 Key Workflows

### Authentication
- handled via `store/slices/auth-slice.ts` and `components/auth/`.
- Uses JWT tokens (refresh/access token flow).

### Shopping Cart
- Managed by `store/slices/cart-slice.ts`.
- Persists state and syncs with backend.

### Internationalization
- Routes are wrapped in `[locale]`.
- Translations stored in `messages/`.
- Usage: `useTranslations` hook from `next-intl`.
