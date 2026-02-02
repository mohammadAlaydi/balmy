"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface ShippingFormData {
    city: string;
    recipientName: string; // Not in new design explicitly, but good to keep or remove as per visual match. Visual design has "City", "Additional Info", "Phone". No "Recipient Name" in the main grid but "Sender Name" below. Wait, HTML shows "مدينة المستلم", "*معلومات إضافية", "رقم هاتف المستلم". No recipient name field in the top row.
    // The previous code had recipientName in top row. The HTML has 3 items in top row.
    additionalInfo: string;
    phoneNumber: string;
    senderName: string;
    senderPhone: string;
}

export interface ShippingFormProps {
    onSubmit: (data: ShippingFormData) => void;
}

const saudiCities = [
    "الرياض",
    "جدة",
    "الدمام",
    "مكة المكرمة",
    "المدينة المنورة",
];

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
    const [formData, setFormData] = useState<ShippingFormData>({
        city: "",
        recipientName: "", // Keeping for state compatibility but might not render
        additionalInfo: "",
        phoneNumber: "",
        senderName: "",
        senderPhone: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">

            {/* City Select */}
            <div className="md:col-span-1">
                <label className="block text-xs text-gray-400 mb-1 text-right">مدينة المستلم</label>
                <div className="relative">
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 appearance-none focus:ring-black focus:border-black text-right"
                    >
                        <option value=""></option>
                        {saudiCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-500">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="md:col-span-1">
                <label className="block text-xs text-gray-400 mb-1 text-right">*معلومات إضافية (الشارع، المبنى، رقم الشقة)</label>
                <input
                    type="text"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:ring-black focus:border-black text-right"
                />
            </div>

            {/* Recipient Phone */}
            <div className="md:col-span-1">
                <label className="block text-xs text-gray-400 mb-1 text-right">رقم هاتف المستلم</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                    <div className="px-3 flex items-center border-l border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 h-[46px]">
                        <img
                            alt="Saudi Flag"
                            className="w-6 h-auto ml-2"
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" // Using a standard public URL for the flag or could use the one from the HTML if accessible
                        />
                    </div>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full border-0 py-3 px-4 text-left text-gray-700 dark:text-gray-300 bg-transparent focus:ring-0 h-[46px]"
                        dir="ltr"
                        placeholder="+966 55xxxxxxx"
                    />
                </div>
            </div>

            {/* Sender Info Section */}
            <div className="md:col-span-3 mt-4">
                <h4 className="font-bold mb-3 text-right text-black dark:text-white">معلومات المرسل</h4>
                <div className="flex flex-col md:flex-row items-end gap-6">
                    <div className="w-full md:w-1/2">
                        <label className="block text-xs text-gray-400 mb-1 text-right">اسم المرسل</label>
                        <input
                            type="text"
                            name="senderName"
                            value={formData.senderName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 focus:ring-black focus:border-black text-right"
                        />
                    </div>
                    {/* Submit Button in place of sender phone */}
                    <div className="w-full md:w-auto">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 bg-black text-white py-3.5 rounded-lg font-bold text-base hover:opacity-90 transition shadow-lg whitespace-nowrap"
                        >
                            ارسال الشحنة الى هذا العنوان
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
