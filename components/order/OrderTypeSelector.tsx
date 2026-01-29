"use client";

import { Home, Gift, Lock, Store } from "lucide-react";
import { useState } from "react";

export type DeliveryType = "home" | "gift" | "locker" | "branch";

export interface OrderTypeSelectorProps {
    selectedType: DeliveryType;
    onTypeChange: (type: DeliveryType) => void;
}

interface DeliveryOption {
    id: DeliveryType;
    title: string;
    description: string;
    estimate: string;
    Icon: typeof Home;
}

const deliveryOptions: DeliveryOption[] = [
    {
        id: "home",
        title: "توصيل للمنزل",
        description: "استلم طلبك في منزلك",
        estimate: "1-4 أيام",
        Icon: Home,
    },
    {
        id: "gift",
        title: "أرسال هدية",
        description: "أرسل هدية لشخص عزيز",
        estimate: "2-5 أيام",
        Icon: Gift,
    },
    {
        id: "locker",
        title: "الخزائن الذكية",
        description: "استلم من خزانة ذكية",
        estimate: "1-3 أيام",
        Icon: Lock,
    },
    {
        id: "branch",
        title: "استلام من اقرب فرع",
        description: "استلم من الفرع الأقرب",
        estimate: "اليوم نفسه",
        Icon: Store,
    },
];

export default function OrderTypeSelector({
    selectedType,
    onTypeChange,
}: OrderTypeSelectorProps) {
    return (
        <div className="w-full" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {deliveryOptions.map((option) => {
                    const isSelected = selectedType === option.id;
                    const Icon = option.Icon;

                    return (
                        <button
                            key={option.id}
                            onClick={() => onTypeChange(option.id)}
                            className={`
                relative p-6 rounded-lg border-2 transition-all duration-300
                hover:shadow-lg hover:scale-[1.02]
                ${isSelected
                                    ? "border-black bg-light-gray/30 shadow-md"
                                    : "border-light-gray-2 bg-white hover:border-light-gray-4"
                                }
              `}
                        >
                            {/* Radio button - top left */}
                            <div className="absolute top-4 left-4">
                                <div
                                    className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected
                                            ? "border-black bg-black"
                                            : "border-light-gray-4 bg-white"
                                        }
                `}
                                >
                                    {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </div>
                            </div>

                            {/* Icon - top right */}
                            <div className="flex justify-end mb-4">
                                <div
                                    className={`
                  p-3 rounded-lg
                  ${isSelected
                                            ? "bg-black text-white"
                                            : "bg-light-gray text-medium-gray"
                                        }
                `}
                                >
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-right space-y-2">
                                <h3 className="text-lg font-bold text-black">{option.title}</h3>
                                <p className="text-sm text-medium-gray">{option.description}</p>
                                <p className="text-sm font-semibold text-green">
                                    {option.estimate}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
