/**
 * Type definitions for Order/Checkout components
 */

// Delivery Types
export type DeliveryType = "home" | "gift" | "locker" | "branch";

// Shipping Form Data
export interface ShippingFormData {
  city: string;
  recipientName: string;
  extraInfo: string;
  phoneNumber: string; // 9 digits without country code
  senderName: string;
}

// Order Summary Data
export interface OrderSummaryData {
  subtotal: number;
  discount?: number;
  tax?: number;
  shippingCost?: number;
  grandTotal: number;
}

// Complete Order Data
export interface OrderData extends ShippingFormData {
  deliveryType: DeliveryType;
  items: OrderItem[];
  summary: OrderSummaryData;
  couponCode?: string;
}

// Order Item (optional, for future use)
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

// Delivery Option (internal type)
export interface DeliveryOption {
  id: DeliveryType;
  title: string;
  description: string;
  estimate: string;
  cost?: number;
}

// API Response Types (for future backend integration)
export interface OrderSubmissionResponse {
  success: boolean;
  orderId?: string;
  message?: string;
  error?: string;
}

export interface CouponValidationResponse {
  valid: boolean;
  discountAmount?: number;
  discountPercentage?: number;
  message?: string;
}
