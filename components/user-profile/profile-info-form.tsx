"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ProfileInfoForm() {
    return (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        الاسم الأول
                    </Label>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="MOHAMED"
                        className="w-full px-4 py-3 h-auto rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white focus:border-primary dark:focus:border-white transition-colors text-right placeholder:text-gray-400"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        الاسم الأخير
                    </Label>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="TAHA"
                        className="w-full px-4 py-3 h-auto rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white focus:border-primary dark:focus:border-white transition-colors text-right placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="dob" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        تاريخ الميلاد
                    </Label>
                    <Input
                        id="dob"
                        type="date"
                        placeholder="ادخل تاريخ الميلاد"
                        className="w-full px-4 py-3 h-auto rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white focus:border-primary dark:focus:border-white transition-colors text-right placeholder:text-gray-400 block"
                    />
                </div>
                <div className="space-y-2 relative">
                    <Label htmlFor="gender" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        الجنس
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full px-4 py-3 h-auto rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white focus:border-primary dark:focus:border-white transition-colors text-gray-500 dark:text-gray-300 bg-transparent cursor-pointer flex flex-row-reverse justify-between items-center">
                            <SelectValue placeholder="حدد نوع الجنس" className="text-right" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        البريد الالكتروني
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="TAHADESIGN82@GMAIL.COM"
                        className="w-full px-4 py-3 h-auto rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white focus:border-primary dark:focus:border-white transition-colors text-right placeholder:text-gray-400"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobile" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        رقم الجوال
                    </Label>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden dark:bg-surface-dark focus-within:ring-1 focus-within:ring-primary dark:focus-within:ring-white focus-within:border-primary dark:focus-within:border-white transition-colors h-[48px]"> {/* Added explicit height to match Input */}
                        <Input
                            id="mobile"
                            type="tel"
                            placeholder="552661093"
                            className="w-full px-4 py-3 h-full border-none focus:ring-0 dark:bg-surface-dark dark:text-white text-right placeholder:text-gray-400 ltr-placeholder shadow-none focus-visible:ring-0"
                        />
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 text-sm font-medium h-full flex items-center">
                            +966
                        </div>

                    </div>
                </div>
            </div>

            <div className="pt-6">
                <Button
                    type="button"
                    className="w-full bg-primary hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3.5 px-6 rounded-lg transition duration-300 shadow-md h-auto"
                >
                    حفظ المعلومات
                </Button>
            </div>
        </form>
    );
}
