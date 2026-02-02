"use client";

import { Home, Gift, Lock, Store } from "lucide-react";

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
    estimateColorClass: string;
    Icon: typeof Home;
}

const deliveryOptions: DeliveryOption[] = [
    {
        id: "home",
        title: "توصيل للمنزل",
        description: "يمكنك استلام الطلب في المنزل\nاو مكان العمل الخاص بك",
        estimate: "ايام 1-4",
        estimateColorClass: "text-green-500",
        Icon: Home,
    },
    {
        id: "gift",
        title: "أرسال هدية",
        description: "يمكنك استلام الطلب في المنزل\nاو مكان العمل الخاص بك",
        estimate: "ايام 1-4",
        estimateColorClass: "text-green-500",
        Icon: Gift,
    },
    {
        id: "locker",
        title: "الخزائن الذكية",
        description: "نوصلها عنك لمن تحب",
        estimate: "ايام 1-4",
        estimateColorClass: "text-green-500",
        Icon: Lock,
    },
    {
        id: "branch",
        title: "استلام من اقرب فرع",
        description: "يمكنك استلام طلبك في الوقت المناسب لك\nمن خلال الفرع القريب منك",
        estimate: "ايام 1-4",
        estimateColorClass: "text-green-500",
        Icon: Store,
    },
];

export default function OrderTypeSelector({
    selectedType,
    onTypeChange,
}: OrderTypeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" dir="rtl">
            {deliveryOptions.map((option) => {
                const isSelected = selectedType === option.id;
                const Icon = option.Icon;

                return (
                    <label
                        key={option.id}
                        onClick={() => onTypeChange(option.id)}
                        className={`
                            cursor-pointer border rounded-lg p-6 transition flex flex-row items-center justify-between text-right group
                            ${isSelected
                                ? "border-black dark:border-white bg-white dark:bg-surface-dark ring-1 ring-black dark:ring-white"
                                : "border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white bg-white dark:bg-surface-dark"
                            }
                        `}
                    >
                        <div className="flex flex-col w-full pl-2 h-full">
                            <div className="flex items-center justify-start gap-2 mb-2">
                                <h3 className="font-bold text-lg text-black dark:text-white">{option.title}</h3>
                                <div className={`
                                    w-4 h-4 rounded-full border flex items-center justify-center
                                    ${isSelected ? "border-black bg-black dark:bg-white dark:border-white" : "border-gray-400 dark:border-gray-500"}
                                `}>
                                    {isSelected && <div className="w-1.5 h-1.5 bg-white dark:bg-black rounded-full" />}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 whitespace-pre-line leading-relaxed">
                                {option.description}
                            </p>
                            <span className={`text-xs font-bold mt-auto ${option.estimateColorClass}`}>
                                {option.estimate}
                            </span>
                        </div>
                        <div className="shrink-0 mr-2">
                            <Icon
                                className={`text-4xl w-12 h-12 transition-colors
                                    ${isSelected
                                        ? "text-black dark:text-white"
                                        : "text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white"
                                    }
                                `}
                                strokeWidth={2}
                            />
                        </div>
                        {/* Hidden input for accessibility */}
                        <input
                            type="radio"
                            name="shipping_method"
                            checked={isSelected}
                            readOnly
                            className="hidden"
                        />
                    </label>
                );
            })}
        </div>
    );
}
