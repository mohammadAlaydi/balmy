"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export interface ShippingFormData {
    city: string;
    recipientName: string;
    additionalInfo: string;
    phoneNumber: string;
    senderName: string;
}

export interface ShippingFormProps {
    onSubmit: (data: ShippingFormData) => void;
}

const saudiCities = [
    "الرياض",
    "جدة",
    "مكة المكرمة",
    "المدينة المنورة",
    "الدمام",
    "الخبر",
    "الظهران",
    "تبوك",
    "القطيف",
    "خميس مشيط",
    "بريدة",
    "حائل",
    "نجران",
    "جيزان",
    "الطائف",
];

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
    const [formData, setFormData] = useState<ShippingFormData>({
        city: "",
        recipientName: "",
        additionalInfo: "",
        phoneNumber: "552661093",
        senderName: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCityChange = (value: string) => {
        setFormData((prev) => ({ ...prev, city: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
            {/* Top Row: Recipient Info - 4 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* City Input (Right) */}
                <div className="space-y-2">
                    <Label
                        htmlFor="city"
                        className="text-sm font-medium text-gray-500 text-right justify-end"
                    >
                        مدينة المستلم
                    </Label>
                    <Select value={formData.city} onValueChange={handleCityChange} required>
                        <SelectTrigger
                            id="city"
                            className="w-full h-12 text-right border-gray-300 focus:ring-black focus:border-black"
                        >
                            <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                            {saudiCities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Recipient Name */}
                <div className="space-y-2">
                    <Label
                        htmlFor="recipientName"
                        className="text-sm font-medium text-gray-500 text-right justify-end"
                    >
                        اسم المستلم
                    </Label>
                    <Input
                        type="text"
                        id="recipientName"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        required
                        placeholder="أدخل اسم المستلم"
                        className="w-full h-12 text-right border-gray-300 placeholder:text-gray-400"
                        dir="rtl"
                    />
                </div>

                {/* Address Input (Middle) */}
                <div className="space-y-2">
                    <Label
                        htmlFor="additionalInfo"
                        className="text-sm font-medium text-gray-500 text-right justify-end"
                    >
                        *معلومات إضافية (الشارع، المبنى، رقم الشقة)
                    </Label>
                    <Input
                        type="text"
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        required
                        placeholder="أدخل العنوان التفصيلي"
                        className="w-full h-12 text-right border-gray-300 placeholder:text-gray-400"
                        dir="rtl"
                    />
                </div>

                {/* Phone Input (Left) */}
                <div className="space-y-2">
                    <Label
                        htmlFor="phoneNumber"
                        className="text-sm font-medium text-gray-500 text-right justify-end"
                    >
                        رقم هاتف المستلم
                    </Label>
                    <div className="relative flex items-center h-12">
                        <div className="absolute left-0 top-0 bottom-0 flex items-center gap-2 px-3 bg-gray-50 rounded-r-md border border-gray-300 border-l-0 h-full z-10">
                            <span className="text-xl">🇸🇦</span>
                            <span className="text-sm font-medium text-black">+966</span>
                        </div>
                        <PhoneInput
                            defaultCountry="sa"
                            hideDropdown={true}
                            disableDialCodeAndPrefix={true}
                            value={formData.phoneNumber}
                            onChange={(phone: string) =>
                                setFormData((prev) => ({ ...prev, phoneNumber: phone }))
                            }
                            inputClassName="w-full h-full pl-[110px] pr-4 border border-gray-300 text-left rounded-md"
                            inputProps={{
                                id: "phoneNumber",
                                name: "phoneNumber",
                                required: true,
                                dir: "ltr",
                                placeholder: "5XXXXXXXX",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Row: Sender Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-black text-right">
                    معلومات المرسل
                </h3>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Name Input */}
                    <Input
                        type="text"
                        id="senderName"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleChange}
                        required
                        placeholder="اسم المرسل"
                        className="flex-1 h-12 text-right border-gray-300 placeholder:text-gray-400"
                        dir="rtl"
                    />
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="h-12 w-full md:w-64 bg-black text-white font-bold text-base rounded-md hover:bg-gray-800 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                    >
                        ارسال الشحنة الى هذا العنوان
                    </button>
                </div>
            </div>
        </form>
    );
}
