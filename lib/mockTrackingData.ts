import { OrderTrackingData, OrderStatus, OrderStatusStep, SupportAgent } from "@/types/tracking.types";

// Sample support agent
export const mockSupportAgent: SupportAgent = {
    name: "محمد الخصار",
    title: "خدمة العملاء",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTw6yx36ij2CagA9mrBhRqde3LUHZZZpigXnxySKjbxiU-7__Kd_WG7cG_499dxOvOu7xH1Y6-hkrtIJovoSXXNEH1OBrsCqpHzxWyEdNFWFF4m2gYTXo_XFOr_zkJS5KarqerEjNmeyvkznBKDgGxirPE5F6n-BmvP6Te4YVJeCSW8y35UHL5b3zH54vYH55VM45OST-_eRPN9mM188c4Tu_AfD4ptubsjyxLyqdvdpzocPesqmbCHRV-YdmZczjAiO1uBcyxOmM",
    whatsappNumber: "+966501234567",
    phoneNumber: "+966501234567",
    isOnline: true,
};

// Generate status steps based on current status
function generateStatusSteps(currentStatus: OrderStatus): OrderStatusStep[] {
    const allSteps: OrderStatusStep[] = [
        {
            status: "received",
            label: "تم استلام الطلب",
            icon: "fas fa-clipboard-check",
            timestamp: "MAY 30, 2026",
            completed: true,
        },
        {
            status: "processing",
            label: "قيد التجهيـــــز",
            icon: "fas fa-box-open",
            timestamp: "MAY 30, 2026",
            completed: false,
        },
        {
            status: "shipped",
            label: "تم الشحـــــن",
            icon: "fas fa-truck-loading",
            timestamp: "MAY 30, 2026",
            completed: false,
        },
        {
            status: "in_transit",
            label: "في الطـــــريق",
            icon: "fas fa-shipping-fast",
            timestamp: "MAY 30, 2026",
            completed: false,
        },
        {
            status: "delivered",
            label: "تم التسليـــــم",
            icon: "fas fa-home",
            timestamp: "MAY 30, 2026",
            completed: false,
        },
    ];

    // Mark steps as completed based on current status
    const statusOrder: OrderStatus[] = ["received", "processing", "shipped", "in_transit", "delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return allSteps.map((step, index) => ({
        ...step,
        completed: index <= currentIndex,
    }));
}

// Mock tracking data generator
export function getMockTrackingData(identifier: string): OrderTrackingData | null {
    // Simulate different scenarios based on identifier
    const scenarios: Record<string, OrderStatus> = {
        "TRACK123456": "in_transit",
        "ORD789": "in_transit",
        "TEST001": "processing",
        "TEST002": "shipped",
        "TEST003": "delivered",
    };

    const currentStatus = scenarios[identifier] || "in_transit";

    return {
        trackingNumber: "TRACK123456",
        orderNumber: "ORD789",
        currentStatus,
        statusHistory: generateStatusSteps(currentStatus),
        estimatedDelivery: "2026-06-05",
        location: {
            lat: 24.7136,
            lng: 46.6753,
            address: "الرياض، المملكة العربية السعودية",
        },
        customerInfo: {
            name: "عميل تجريبي",
            phone: "0501234567",
            email: "customer@example.com",
        },
    };
}

// Simulate API call
export async function fetchTrackingData(
    identifier: string,
    method: "trackingNumber" | "orderWithContact"
): Promise<OrderTrackingData | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return mock data
    return getMockTrackingData(identifier);
}
