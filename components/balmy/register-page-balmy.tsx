"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { User, Eye, EyeOff } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { register as registerAction, clearError } from "@/store/slices/auth-slice";
import Loading from "@/components/loading";
import toast from "react-hot-toast";

export default function RegisterPageBalmy() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isLoading: authLoading, error: authError } = useSelector(
        (state: RootState) => state.auth
    );

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Redirect if already authenticated
    if (isAuthenticated) {
        router.replace("/home");
        return <Loading fullScreen variant="spinner" size="xl" />;
    }

    if (authLoading) {
        return <Loading fullScreen variant="spinner" size="xl" />;
    }

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.first_name.trim()) {
            errors.first_name = "الاسم الأول مطلوب";
        }
        if (!formData.last_name.trim()) {
            errors.last_name = "اسم العائلة مطلوب";
        }
        if (!formData.email.trim()) {
            errors.email = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "البريد الإلكتروني غير صالح";
        }
        if (!formData.password) {
            errors.password = "كلمة المرور مطلوبة";
        } else if (formData.password.length < 8) {
            errors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
        }
        if (formData.password !== formData.password_confirmation) {
            errors.password_confirmation = "كلمتا المرور غير متطابقتين";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear field error on change
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: "" }));
        }
        setError("");
        dispatch(clearError());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Map form data to RegisterCredentials format (camelCase)
            const apiData = {
                firstName: formData.first_name,
                lastName: formData.last_name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.password_confirmation,
                phone: formData.phone || undefined,
            };

            await dispatch(registerAction(apiData)).unwrap();
            toast.success("تم إنشاء الحساب بنجاح");
            router.push("/home");
        } catch (err: any) {
            // Handle different error types with user-friendly messages
            let errorMessage = "حدث خطأ أثناء إنشاء الحساب";

            if (typeof err === "string") {
                // Check for common error patterns
                if (err.toLowerCase().includes("internal server error")) {
                    errorMessage = "عذراً، حدث خطأ في الخادم. يرجى المحاولة لاحقاً";
                } else if (err.toLowerCase().includes("email") && err.toLowerCase().includes("exist")) {
                    errorMessage = "البريد الإلكتروني مسجل مسبقاً";
                } else if (err.toLowerCase().includes("network")) {
                    errorMessage = "خطأ في الاتصال. تحقق من اتصالك بالإنترنت";
                } else {
                    errorMessage = err;
                }
            } else if (err?.message) {
                if (err.message.toLowerCase().includes("internal server error")) {
                    errorMessage = "عذراً، حدث خطأ في الخادم. يرجى المحاولة لاحقاً";
                } else {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = (fieldName: string) => `
        w-full border rounded-md px-4 py-3 focus:outline-none transition-colors
        ${fieldErrors[fieldName]
            ? "border-red-400 focus:border-red-500 bg-red-50"
            : "border-gray-300 focus:border-black"
        }
    `;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm">
                {/* User Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                        <User className="w-10 h-10 text-black" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-medium text-center mb-8 text-black" dir="rtl">
                    إنشاء حساب جديد
                </h1>

                {/* Register Form */}
                <form onSubmit={handleSubmit} dir="rtl">
                    {/* Name Fields Row */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">الاسم الأول</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className={inputClass("first_name")}
                                placeholder=""
                            />
                            {fieldErrors.first_name && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.first_name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">اسم العائلة</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className={inputClass("last_name")}
                                placeholder=""
                            />
                            {fieldErrors.last_name && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.last_name}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-2">البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass("email")}
                            placeholder="example@email.com"
                            dir="ltr"
                        />
                        {fieldErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-2">رقم الجوال (اختياري)</label>
                        <div className="flex border border-gray-300 rounded-md overflow-hidden" dir="ltr">
                            <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300 text-gray-600">
                                +966
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => handleChange({
                                    ...e,
                                    target: { ...e.target, value: e.target.value.replace(/\D/g, '') }
                                } as React.ChangeEvent<HTMLInputElement>)}
                                className="flex-1 px-4 py-3 focus:outline-none"
                                maxLength={10}
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-2">كلمة المرور</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={inputClass("password") + " pl-10"}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {fieldErrors.password && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-600 mb-2">تأكيد كلمة المرور</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className={inputClass("password_confirmation") + " pl-10"}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {fieldErrors.password_confirmation && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.password_confirmation}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {(error || authError) && (
                        <p className="text-sm mb-4 text-right" style={{ color: '#ef4444' }}>
                            {error || (authError?.includes("Internal Server Error")
                                ? "عذراً، حدث خطأ في الخادم. يرجى المحاولة لاحقاً"
                                : authError)}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-6" dir="rtl">
                    لديك حساب بالفعل؟{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-black font-medium hover:underline"
                    >
                        تسجيل الدخول
                    </button>
                </p>
            </div>
        </div>
    );
}
