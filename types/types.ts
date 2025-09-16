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
  control?: any;
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
  control?: any;
}
export interface CheckBoxOrRadioInterFace {
  inputId?: string;
  containerStyle?: string;
  checboxStyle?: string;
  fieldName: string;
  labelText?: string;
  labelStyle?: string;
  control?: object;
}
interface ProductImage {
  original_image_url: string;
}

export interface ProductVariant {
  id: number;
  base_image?: ProductImage;
  hovered_image?: ProductImage;
}

export interface ApiProduct {
  id: number;
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
}
export interface ShadowLayerProps {
  children: ReactNode;
  layerStyle?: string;
  bgColor?: string;
  shadowStatus?: boolean;
}
