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
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    style?: ToastStyle;
    className?: string;
  };
  error?: {
    duration?: number;
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    style?: ToastStyle;
    className?: string;
  };
  warning?: {
    duration?: number;
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    style?: ToastStyle;
    className?: string;
  };
  info?: {
    duration?: number;
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
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
  payment_type: 'installments' | 'pay_later';
  lang: 'ar' | 'en';
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
  paymentMethod: 'tabby_installments' | 'tabby_pay_later' | 'credit_card';
}
