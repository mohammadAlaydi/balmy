"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { getCurrentUser } from "@/store/slices/auth-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

export default function ProfileInfoForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, accessToken } = useSelector((state: RootState) => state.auth);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Pre-populate form with user data from Redux store
    useEffect(() => {
        if (user) {
            setFirstName((user as any).firstName || (user as any).firstname || "");
            setLastName((user as any).lastName || (user as any).lastname || "");
            setEmail(user.email || "");
            setPhone(user.phone || (user as any).mobile || "");
            setDob((user as any).dob || (user as any).dateOfBirth || "");
            setGender((user as any).gender || "");
        }
    }, [user]);

    const handleSave = async () => {
        console.log('[PROFILE] Save clicked!');
        alert('Save clicked! Token: ' + (accessToken ? accessToken.substring(0, 15) + '...' : 'NONE'));
        setIsSaving(true);

        try {
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };
            if (accessToken && accessToken !== "stored-in-cookie") {
                headers["Authorization"] = `Bearer ${accessToken}`;
            }

            const body = {
                firstName,
                lastName,
                email,
                phone,
                dob,
                gender,
            };
            console.log('[PROFILE] Sending body:', body);

            const response = await fetch("/api/customer/profile", {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify(body),
            });

            console.log('[PROFILE] Response status:', response.status);
            const data = await response.json();
            console.log('[PROFILE] Response data:', data);

            if (!response.ok) {
                toast.error(data.message || "فشل في تحديث الملف الشخصي");
                return;
            }

            toast.success(data.message || "تم تحديث الملف الشخصي بنجاح");

            // Refresh user data in Redux store
            dispatch(getCurrentUser());
        } catch (error: any) {
            console.error('[PROFILE] Error:', error);
            toast.error(error?.message || "حدث خطأ أثناء تحديث الملف الشخصي");
        } finally {
            setIsSaving(false);
        }
    };

    const inputClassName = "w-full px-4 py-3 h-auto rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white focus:border-primary dark:focus:border-white transition-colors text-right placeholder:text-gray-400";

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        الاسم الأول
                    </Label>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder="أدخل الاسم الأول"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClassName}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        الاسم الأخير
                    </Label>
                    <Input
                        id="lastName"
                        type="text"
                        placeholder="أدخل الاسم الأخير"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClassName}
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
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className={`${inputClassName} block`}
                    />
                </div>
                <div className="space-y-2 relative">
                    <Label htmlFor="gender" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        الجنس
                    </Label>
                    <Select value={gender} onValueChange={setGender}>
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
                        placeholder="أدخل البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClassName}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobile" className="block text-sm font-bold text-gray-700 dark:text-gray-300 text-right">
                        رقم الجوال
                    </Label>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden dark:bg-surface-dark focus-within:ring-1 focus-within:ring-primary dark:focus-within:ring-white focus-within:border-primary dark:focus-within:border-white transition-colors h-[48px]">
                        <Input
                            id="mobile"
                            type="tel"
                            placeholder="أدخل رقم الجوال"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-primary hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3.5 px-6 rounded-lg transition duration-300 shadow-md h-auto"
                >
                    {isSaving ? (
                        <BeatLoader color="#fff" size={8} />
                    ) : (
                        "حفظ المعلومات"
                    )}
                </Button>
            </div>
        </div>
    );
}
