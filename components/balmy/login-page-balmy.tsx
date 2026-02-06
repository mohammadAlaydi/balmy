"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { User, Eye, EyeOff } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { login as loginAction, clearError } from "@/store/slices/auth-slice";
import Loading from "@/components/loading";
import toast from "react-hot-toast";

type LoginMode = "phone" | "email";

export default function LoginPageBalmy() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isLoading, error: authError } = useSelector(
        (state: RootState) => state.auth
    );

    const [loginMode, setLoginMode] = useState<LoginMode>("phone");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Redirect if already authenticated
    if (isAuthenticated) {
        router.replace("/home");
        return <Loading fullScreen variant="spinner" size="xl" />;
    }

    if (isLoading) {
        return <Loading fullScreen variant="spinner" size="xl" />;
    }

    const handlePhoneLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        dispatch(clearError());

        if (!phoneNumber || phoneNumber.length < 9) {
            setError("يرجى إدخال رقم جوال صحيح");
            return;
        }

        setIsSubmitting(true);

        try {
            // Call send OTP API
            const response = await fetch("/api/customer/sendotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: phoneNumber,
                    type: "login"
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "فشل في إرسال رمز التحقق");
            }

            toast.success(data.message || "تم إرسال رمز التحقق");
            // Navigate to OTP verification page
            router.push(`/verify-otp?phone=${phoneNumber}&type=login`);
        } catch (err: any) {
            const errorMsg = err.message || "حدث خطأ، يرجى المحاولة مرة أخرى";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        dispatch(clearError());

        if (!email || !password) {
            setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
            return;
        }

        setIsSubmitting(true);

        try {
            // Use Redux login action
            await dispatch(loginAction({ email, password })).unwrap();
            toast.success("تم تسجيل الدخول بنجاح");
            router.push("/home");
        } catch (err: any) {
            let errorMsg = "حدث خطأ في تسجيل الدخول";

            if (typeof err === "string") {
                if (err.toLowerCase().includes("internal server error")) {
                    errorMsg = "عذراً، حدث خطأ في الخادم. يرجى المحاولة لاحقاً";
                } else if (err.toLowerCase().includes("invalid") || err.toLowerCase().includes("incorrect")) {
                    errorMsg = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
                } else {
                    errorMsg = err;
                }
            } else if (err?.message) {
                errorMsg = err.message;
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
            <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm">
                {/* User Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                        <User className="w-10 h-10 text-black" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-medium text-center mb-8 text-black" dir="rtl">
                    تسجيل الدخـــول
                </h1>

                {loginMode === "phone" ? (
                    <>
                        {/* Phone Login Form */}
                        <form onSubmit={handlePhoneLogin} dir="rtl">
                            {/* Phone Label */}
                            <label className="block text-sm text-gray-600 mb-2 text-right">
                                رقم الجوال
                            </label>

                            {/* Phone Input with Country Code */}
                            <div className="flex border border-gray-300 rounded-md overflow-hidden mb-4" dir="ltr">
                                <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300 text-gray-600">
                                    +966
                                </div>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value.replace(/\D/g, ''));
                                        setError("");
                                    }}
                                    placeholder=""
                                    className="flex-1 px-4 py-3 text-right focus:outline-none text-black"
                                    maxLength={10}
                                    dir="ltr"
                                />
                            </div>

                            {/* Error Message */}
                            {(error || authError) && (
                                <p className="text-sm mb-4 text-right" style={{ color: '#ef4444' }}>{error || authError}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "جاري الإرسال..." : "دخول"}
                            </button>
                        </form>

                        {/* OTP Info Text */}
                        <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed" dir="rtl">
                            سيتم إرسال رمز التحقق (المكون من 5 أرقام) إلى رقم هاتفك
                            <br />
                            المسجل، عبر رسالة نصية
                        </p>

                        {/* Switch to Email Login */}
                        <button
                            onClick={() => {
                                setLoginMode("email");
                                setError("");
                            }}
                            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors mt-6"
                        >
                            تسجيل الدخول بالبريد الالكتروني
                        </button>
                    </>
                ) : (
                    <>
                        {/* Email Login Form */}
                        <form onSubmit={handleEmailLogin} dir="rtl">
                            {/* Email Label */}
                            <label className="block text-sm text-gray-600 mb-2 text-right">
                                البريد الإلكتروني
                            </label>

                            {/* Email Input */}
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                placeholder="example@email.com"
                                className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-black text-left"
                                dir="ltr"
                            />

                            {/* Password Label */}
                            <label className="block text-sm text-gray-600 mb-2 text-right">
                                كلمة المرور
                            </label>

                            {/* Password Input */}
                            <div className="relative mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 pr-10 focus:outline-none focus:border-black"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Error Message */}
                            {(error || authError) && (
                                <p className="text-sm mb-4 text-right" style={{ color: '#ef4444' }}>{error || authError}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "جاري الدخول..." : "دخول"}
                            </button>
                        </form>

                        {/* Forgot Password Link */}
                        <button
                            onClick={() => router.push("/forgot-password")}
                            className="w-full text-gray-600 text-sm mt-4 hover:text-black transition-colors"
                        >
                            نسيت كلمة المرور؟
                        </button>

                        {/* Switch to Phone Login */}
                        <button
                            onClick={() => {
                                setLoginMode("phone");
                                setError("");
                            }}
                            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors mt-6"
                        >
                            تسجيل الدخول برقم الجوال
                        </button>
                    </>
                )}

                {/* Register Link */}
                <p className="text-center text-sm text-gray-600 mt-6" dir="rtl">
                    ليس لديك حساب؟{" "}
                    <button
                        onClick={() => router.push("/register")}
                        className="text-black font-medium hover:underline"
                    >
                        إنشاء حساب جديد
                    </button>
                </p>
            </div>
        </div>
    );
}
