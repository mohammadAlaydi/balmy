"use client";

import React from "react";
import { OrderStatusStep } from "@/types/tracking.types";

interface OrderProgressBarProps {
    statusHistory: OrderStatusStep[];
}

export default function OrderProgressBar({ statusHistory }: OrderProgressBarProps) {
    // Calculate progress percentage based on completed steps
    const completedCount = statusHistory.filter(step => step.completed).length;
    const totalSteps = statusHistory.length;
    const progressPercentage = ((completedCount - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="relative mb-16 px-4">
            {/* Background Progress Line */}
            <div className="absolute top-5 left-[10%] right-[10%] h-1 bg-gray-200 dark:bg-gray-700 rounded -z-10"></div>

            {/* Active Progress Line */}
            <div
                className="absolute top-5 right-[10%] h-1 bg-status-green rounded -z-10 transition-all duration-500"
                style={{ width: `${progressPercentage * 0.8}%` }}
                dir="rtl"
            ></div>

            {/* Status Steps */}
            <div className="flex justify-between items-start text-center w-full">
                {statusHistory.map((step, index) => (
                    <div
                        key={step.status}
                        className={`flex flex-col items-center w-1/5 transition-all duration-300 ${!step.completed ? 'opacity-50 grayscale' : ''
                            }`}
                    >
                        {/* Step Icon Circle */}
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-3 shadow-md z-10 transition-colors duration-300 ${step.completed ? 'bg-status-green' : 'bg-gray-400'
                                }`}
                        >
                            <i className={step.icon}></i>
                        </div>

                        {/* Step Label */}
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                            {step.label}
                        </p>

                        {/* Timestamp */}
                        {step.timestamp && (
                            <p className="text-[10px] text-gray-500 font-bold mt-1">
                                {step.timestamp}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
