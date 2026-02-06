"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

type Step = "email" | "otp" | "newPassword";

export default function ForgotPasswordPageBalmy() {
    const router = useRouter();

    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSendResetCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("يرجى إدخال البريد الإلكتروني");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("البريد الإلكتروني غير صالح");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/customer/forgotpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "فشل في إرسال رمز التحقق");
            }

            toast.success(data.message || "تم إرسال رمز التحقق");
            setStep("otp");
        } catch (err: any) {
            const errorMsg = err.message || "حدث خطأ، يرجى المحاولة مرة أخرى";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!otp || otp.length < 4) {
            setError("يرجى إدخال رمز التحقق الصحيح");
            return;
        }

        // Move to password reset step
        setStep("newPassword");
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (newPassword.length < 8) {
            setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("كلمتا المرور غير متطابقتين");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/customer/resetpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    otp,
                    newPassword
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "فشل في إعادة تعيين كلمة المرور");
            }

            toast.success(data.message || "تم إعادة تعيين كلمة المرور بنجاح");
            router.push("/login");
        } catch (err: any) {
            const errorMsg = err.message || "حدث خطأ، يرجى المحاولة مرة أخرى";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTitle = () => {
        switch (step) {
            case "email": return "استعادة كلمة المرور";
            case "otp": return "أدخل رمز التحقق";
            case "newPassword": return "كلمة المرور الجديدة";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
            <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm">
                {/* Back Button */}
                <button
                    onClick={() => {
                        if (step === "email") {
                            router.push("/login");
                        } else if (step === "otp") {
                            setStep("email");
                        } else {
                            setStep("otp");
                        }
                    }}
                    className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
                    dir="rtl"
                >
                    <ArrowRight className="w-5 h-5 ml-1" />
                    رجوع
                </button>

                {/* User Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                        <User className="w-10 h-10 text-black" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-medium text-center mb-8 text-black" dir="rtl">
                    {getTitle()}
                </h1>

                {step === "email" && (
                    <form onSubmit={handleSendResetCode} dir="rtl">
                        <label className="block text-sm text-gray-600 mb-2">
                            البريد الإلكتروني
                        </label>
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

                        {error && (
                            <p className="text-sm mb-4 text-right" style={{ color: '#ef4444' }}>{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "جاري الإرسال..." : "إرسال رمز التحقق"}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4" dir="rtl">
                            سيتم إرسال رمز التحقق إلى بريدك الإلكتروني
                        </p>
                    </form>
                )}

                {step === "otp" && (
                    <form onSubmit={handleVerifyOtp} dir="rtl">
                        <p className="text-sm text-gray-600 text-center mb-4">
                            تم إرسال رمز التحقق إلى
                            <br />
                            <span className="font-medium text-black">{email}</span>
                        </p>

                        <label className="block text-sm text-gray-600 mb-2">
                            رمز التحقق
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value.replace(/\D/g, ''));
                                setError("");
                            }}
                            placeholder="00000"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-black text-center text-2xl tracking-widest"
                            maxLength={6}
                            dir="ltr"
                        />

                        {error && (
                            <p className="text-sm mb-4 text-right" style={{ color: '#ef4444' }}>{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                        >
                            تأكيد
                        </button>

                        <button
                            type="button"
                            onClick={handleSendResetCode}
                            className="w-full text-gray-600 text-sm mt-4 hover:text-black transition-colors"
                        >
                            إعادة إرسال الرمز
                        </button>
                    </form>
                )}

                {step === "newPassword" && (
                    <form onSubmit={handleResetPassword} dir="rtl">
                        <label className="block text-sm text-gray-600 mb-2">
                            كلمة المرور الجديدة
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-black"
                        />

                        <label className="block text-sm text-gray-600 mb-2">
                            تأكيد كلمة المرور
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-black"
                        />

                        {error && (
                            <p className="text-sm mb-4 text-right" style={{ color: '#ef4444' }}>{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "جاري الحفظ..." : "تغيير كلمة المرور"}
                        </button>
                    </form>
                )}

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-6" dir="rtl">
                    تذكرت كلمة المرور؟{" "}
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
