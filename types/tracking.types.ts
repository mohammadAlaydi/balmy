/**
 * Type definitions for Order Tracking functionality
 */

// Order status stages
export type OrderStatus =
    | "received"       // تم استلام الطلب
    | "processing"     // قيد التجهيز
    | "shipped"        // تم الشحن
    | "in_transit"     // في الطريق
    | "delivered";     // تم التسليم

// Status step info for progress bar
export interface OrderStatusStep {
    status: OrderStatus;
    label: string;
    icon: string; // Font Awesome icon class
    timestamp?: string; // ISO date string or formatted date
    completed: boolean;
}

// Complete tracking information
export interface OrderTrackingData {
    trackingNumber: string;
    orderNumber: string;
    currentStatus: OrderStatus;
    statusHistory: OrderStatusStep[];
    estimatedDelivery?: string;
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
    customerInfo?: {
        name: string;
        phone: string;
        email?: string;
    };
}

// Tracking method types
export type TrackingMethod = "trackingNumber" | "orderWithContact";

// Form data for tracking by tracking number
export interface TrackingFormByNumberData {
    trackingNumber: string;
}

// Form data for tracking by order number + contact
export interface TrackingFormByOrderData {
    orderNumber: string;
    contact: string; // phone or email
}

// Support agent info
export interface SupportAgent {
    name: string;
    title: string;
    image: string;
    whatsappNumber: string;
    phoneNumber: string;
    isOnline: boolean;
}

// API response type
export interface TrackingApiResponse {
    success: boolean;
    data?: OrderTrackingData;
    error?: string;
    message?: string;
}
