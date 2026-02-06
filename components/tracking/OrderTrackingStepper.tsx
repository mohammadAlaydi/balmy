"use client";

import React from "react";
import { OrderStatus, OrderStatusStep } from "@/types/tracking.types";

export type TrackingStep = {
    label: string;
    date: string;
    status: "completed" | "pending";
    icon: React.ReactNode;
};

interface TrackingTimelineProps {
    steps?: TrackingStep[];
    statusHistory?: OrderStatusStep[];
    className?: string;
}

// Custom SVG icons matching the design
const IconOrderReceived = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
    </svg>
);

const IconPreparing = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z" />
    </svg>
);

const IconShipped = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
);

const IconInTransit = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
);

const IconDelivered = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

const statusIconMap: Record<OrderStatus, React.ReactNode> = {
    received: <IconOrderReceived />,
    processing: <IconPreparing />,
    shipped: <IconShipped />,
    in_transit: <IconInTransit />,
    delivered: <IconDelivered />,
};

const fallbackSteps: TrackingStep[] = [
    {
        label: "تم التسليـــم",
        date: "MAY 30.2026",
        status: "pending",
        icon: <IconDelivered />,
    },
    {
        label: "في الطـــريق",
        date: "MAY 30.2026",
        status: "pending",
        icon: <IconInTransit />,
    },
    {
        label: "تم الشحـــن",
        date: "MAY 30.2026",
        status: "completed",
        icon: <IconShipped />,
    },
    {
        label: "قيد التجهيـــز",
        date: "MAY 30.2026",
        status: "completed",
        icon: <IconPreparing />,
    },
    {
        label: "تم استلام الطلب",
        date: "MAY 30.2026",
        status: "completed",
        icon: <IconOrderReceived />,
    },
];

function mapStatusHistoryToSteps(statusHistory: OrderStatusStep[]): TrackingStep[] {
    return statusHistory.map((step) => ({
        label: step.label,
        date: step.timestamp ?? "",
        status: step.completed ? "completed" : "pending",
        icon: statusIconMap[step.status],
    }));
}

export default function TrackingTimeline({ steps, statusHistory, className }: TrackingTimelineProps) {
    const normalizedSteps =
        steps && steps.length > 0
            ? steps
            : statusHistory && statusHistory.length > 0
                ? mapStatusHistoryToSteps(statusHistory)
                : fallbackSteps;

    // Calculate progress percentage based on completed steps
    const completedCount = normalizedSteps.filter(s => s.status === "completed").length;
    const totalSteps = normalizedSteps.length;
    // Progress fills from right (RTL), so we calculate from the end
    const progressPercentage = totalSteps > 1 ? ((completedCount) / totalSteps) * 100 : 0;

    return (
        <div className={`w-full py-4 sm:py-6 md:py-8 mb-4 sm:mb-6 md:mb-8 ${className ?? ""}`} dir="rtl">
            <div className="px-2 sm:px-4">
                <div className="relative flex items-start justify-between min-w-[500px] sm:min-w-0">
                    {/* Background connecting line - gray, rounded, thicker */}
                    <div
                        className="absolute h-1 sm:h-[6px] bg-gray-300 rounded-full"
                        style={{
                            left: 'calc(10% + 16px)',
                            right: 'calc(10% + 16px)',
                            transform: 'translateY(-50%)',
                            top: '20px'
                        }}
                    />

                    {/* Progress overlay - green line based on completed steps */}
                    <div
                        className="absolute h-1 sm:h-[6px] bg-[#2E8B57] rounded-full transition-all duration-700 ease-in-out"
                        style={{
                            right: 'calc(10% + 16px)',
                            width: `calc((80% - 32px) * ${progressPercentage / 100})`,
                            transform: 'translateY(-50%)',
                            top: '20px'
                        }}
                    />

                    {/* Steps */}
                    {normalizedSteps.map((step, index) => {
                        const isCompleted = step.status === "completed";

                        return (
                            <div
                                key={`${step.label}-${index}`}
                                className="relative flex flex-1 flex-col items-center z-10"
                            >
                                {/* Step Icon Container - Responsive sizing */}
                                <div
                                    className={`
                                        relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl
                                        transition-all duration-500 ease-in-out
                                        ${isCompleted
                                            ? "bg-[#2E8B57] shadow-md"
                                            : "bg-gray-100 border-2 border-gray-300"
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            transition-colors duration-300 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5
                                            ${isCompleted ? "text-white" : "text-gray-400"}
                                        `}
                                    >
                                        {step.icon}
                                    </span>

                                    {/* Pulse animation for the current active step */}
                                    {index > 0 &&
                                        normalizedSteps[index - 1]?.status === "completed" &&
                                        step.status === "pending" && (
                                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#2E8B57] animate-ping opacity-30" />
                                        )}
                                </div>

                                {/* Step Label */}
                                <p
                                    className={`
                                        mt-2 sm:mt-4 text-[10px] sm:text-xs md:text-sm font-medium text-center whitespace-nowrap
                                        transition-colors duration-300
                                        ${isCompleted ? "text-gray-800" : "text-gray-400"}
                                    `}
                                >
                                    {step.label}
                                </p>

                                {/* Step Date */}
                                <p
                                    className={`
                                        mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] md:text-xs font-medium
                                        transition-colors duration-300
                                        ${isCompleted ? "text-gray-600" : "text-gray-400"}
                                    `}
                                >
                                    {step.date}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function TrackingTimelineExample() {
    return <TrackingTimeline steps={fallbackSteps} />;
}
