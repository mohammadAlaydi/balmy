import { ReactNode } from 'react';
import { Control } from 'react-hook-form';

// Navigation types
export type NavLeaf = {
  title: string;
  path: string;
};

export type NavEntry =
  | { title: string; path: string; links?: never } // Single link
  | { title: string; links: NavLeaf[]; path?: never }; // Group with children

export type NavConfig = NavEntry[];

// Component types
export interface TSectionTitle {
  title: string;
  titleStyle?: string;
  subtitle?: string;
}

// Toast types for sonner
export interface ToastStyle {
  background?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  boxShadow?: string;
  position?: string;
  overflow?: string;
}

export interface ToastOptions {
  success?: {
    duration?: number;
    position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
    style?: ToastStyle;
    className?: string;
  };
  error?: {
    duration?: number;
    position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
    style?: ToastStyle;
    className?: string;
  };
  warning?: {
    duration?: number;
    position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
    style?: ToastStyle;
    className?: string;
  };
  info?: {
    duration?: number;
    position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
    style?: ToastStyle;
    className?: string;
  };
}

// Tabby Payment Types
export interface TabbyPaymentRequest {
  amount: string;
  currency: string;
  description: string;
  buyer: {
    name: string;
    email: string;
    phone: string;
  };
  order: {
    reference_id: string;
    items: TabbyOrderItem[];
  };
  payment_type: "installments" | "pay_later";
  lang: "ar" | "en";
}

export interface TabbyOrderItem {
  title: string;
  description?: string;
  quantity: number;
  unit_price: string;
  reference_id: string;
}

export interface TabbyPaymentResponse {
  id: string;
  status: string;
  payment_url: string;
  created_at: string;
  expires_at: string;
}

export interface TabbyInstallmentPlan {
  id: string;
  installments_count: number;
  installment_amount: number;
  total_amount: number;
  currency: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: "tabby_installments" | "tabby_pay_later" | "credit_card";
}
// Authentication types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  avatar?: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  message?: string;
}

// New types for external API integration
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

// Product types
export interface Product {
  id: number;
  product_id?: number; // Optional product_id for compatibility
  name: string;
  nameEn: string;
  price: number;
  priceEn: string;
  code: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  description?: string;
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
}

// Form types
export interface InputInterFace {
  containerStyle?: string;
  containerColSpan?: string;
  labelColSpan?: string;
  inputColSpan?: string;
  inputStyle?: string;
  inputPlaceholder?: string;
  fieldName: string;
  inputType?: string;
  labelText?: string;
  labelStyle?: string;
  inputId?: string;
  control?: Control<any>;
  value?: any;
}

export interface SelectInterFace {
  selectOptions: Array<{ label: string; value: string }>;
  containerStyle?: string;
  containerColSpan?: string;
  labelColSpan?: string;
  selectColSpan?: string;
  selectStyle?: string;
  fieldName: string;
  labelText?: string;
  labelStyle?: string;
  control?: Control<any>;
}
export interface CheckBoxOrRadioInterFace {
  inputId?: string;
  containerStyle?: string;
  checboxStyle?: string;
  fieldName: string;
  labelText?: string;
  labelStyle?: string;
  control?: Control<any>;
}
export interface ProductImage {
  original_image_url: string;
  medium_image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface ProductVariant {
  id: number;
  product_id: number; // Add this property for API compatibility
  sku?: string;
  name?: string;
  type?: string;
  slug?: string | null;
  price?: string;
  special_price?: string | null;
  description?: string | null;
  short_description?: string | null;
  status?: number;
  new?: boolean;
  featured?: boolean;
  locale?: string;
  channel?: string;
  size_label?: string;
  color_label?: string;
  size?: number;
  color?: number;
  base_image?: ProductImage;
  hovered_image?: ProductImage;
  gallary?: ProductImage[];
  reviews?: {
    total?: number;
    total_rating?: number;
    average_rating?: number | null;
  };
  in_stock?: boolean;
  parent_id?: number | null;
  total_quantity?: number;
  is_cart?: boolean;
}

export interface VariantSelection {
  color: number | null;
  size: number | null;
  variantId: number | null;
}

export interface ColorVariant {
  color: number;
  color_label: string;
  variants: ProductVariant[];
  base_image: ProductImage;
  in_stock: boolean;
}

export interface SizeVariant {
  size: number;
  size_label: string;
  variants: ProductVariant[];
  in_stock: boolean;
}

export interface ProductDetailsApiResponse {
  data: {
    id: number;
    sku: string;
    name: string;
    type: 'simple' | 'configurable';
    slug: string | null;
    price: string | null;
    special_price: string | null;
    description: string | null;
    short_description: string | null;
    status: number;
    new: boolean;
    featured: boolean;
    locale: string;
    channel: string;
    size_label: string | null;
    color_label: string | null;
    size: number | null;
    color: number | null;
    base_image: ProductImage;
    hovered_image: ProductImage;
    gallary: ProductImage[];
    reviews: {
      total: number;
      total_rating: number;
      average_rating: number | null;
    };
    in_stock: boolean;
    parent_id: number | null;
    total_quantity?: number;
    is_cart?: boolean;
    variants?: ProductVariant[];
    variants_labels?: {
      variants: Array<{
        variant_id: number;
        options: Array<{
          attribute: string; // e.g., 'color', 'size', 'brand'
          value: string | null;
        }>;
      }>;
      attributes: Record<string, Array<string | null>>; // { color: ['White'], size: ['L','XL'] }
    };
  };
}

// Type alias for backward compatibility
export type ProductDetailsResponse = ProductDetailsApiResponse;

// Image URLs type
export interface ImageUrls {
  original_image_url: string;
  medium_image_url: string;
  small_image_url: string;
}

export interface ApiProduct {
  id: number;
  product_id: number; // Add this property for API compatibility
  name: string;
  nameEn?: string;
  price: number | string;
  priceEn?: string;
  sku: string;
  code?: string;
  base_image?: ProductImage;
  hovered_image?: ProductImage;
  variants?: ProductVariant[];
  category?: string;
  in_stock?: boolean;
  inStock?: boolean;
  rating?: number;
  reviews?: {
    total?: number;
  };
  new?: boolean;
  featured?: boolean;
  // Formatted price strings from the Markatty transformer
  original_price?: number | string | null;
  special_price?: number | string | null;
  formatted_price?: string | null;
  formatted_original_price?: string | null;
  discount_percent?: number;
}

export interface ProductCardProps {
  product: ApiProduct;
  cardColSpan?: string;
}

export interface OrderData {
  id: string;
  status: string;
  shipping_method: string;
  shipping_amount: string;
  payment_title: string;
}

export interface SuccessData {
  data: {
    order: OrderData;
  };
}

export interface SuccessProps {
  data: SuccessData;
  isLoading: boolean
}
export interface ShadowLayerProps {
  children: ReactNode;
  layerStyle?: string;
  bgColor?: string;
  shadowStatus?: boolean;
}
