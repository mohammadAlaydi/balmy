"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { User, ArrowRight } from "lucide-react";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

export default function VerifyOtpPageBalmy() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const phone = searchParams.get("phone") || "";
    const type = searchParams.get("type") || "login";

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError("");

        // Auto-focus next input
        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, '').slice(0, 5);
        const newOtp = [...otp];
        pastedData.split('').forEach((char, i) => {
            if (i < 5) newOtp[i] = char;
        });
        setOtp(newOtp);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const otpCode = otp.join("");
        if (otpCode.length < 5) {
            setError("يرجى إدخال رمز التحقق كاملاً");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/customer/verifyotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone,
                    otp: otpCode,
                    type
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "رمز التحقق غير صحيح");
            }

            toast.success(data.message || "تم التحقق بنجاح");

            // Redirect based on type
            if (type === "login") {
                router.push("/home");
            } else if (type === "register") {
                router.push("/home");
            } else {
                router.push("/login");
            }
        } catch (err: any) {
            const errorMsg = err.message || "حدث خطأ، يرجى المحاولة مرة أخرى";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setError("");
        setCanResend(false);
        setCountdown(60);

        try {
            const response = await fetch("/api/customer/sendotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, type }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "فشل في إعادة إرسال الرمز");
            }

            toast.success("تم إعادة إرسال رمز التحقق");
            setOtp(["", "", "", "", ""]);
        } catch (err: any) {
            setError(err.message || "فشل في إعادة إرسال الرمز");
            setCanResend(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
            <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
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
                <h1 className="text-2xl font-medium text-center mb-4 text-black" dir="rtl">
                    أدخل رمز التحقق
                </h1>

                {/* Phone Info */}
                <p className="text-sm text-gray-600 text-center mb-8" dir="rtl">
                    تم إرسال رمز التحقق إلى
                    <br />
                    <span className="font-medium text-black" dir="ltr">+966{phone}</span>
                </p>

                <form onSubmit={handleSubmit}>
                    {/* OTP Input Fields */}
                    <div className="flex justify-center gap-3 mb-6" dir="ltr">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 text-center text-2xl font-medium border border-gray-300 rounded-md focus:outline-none focus:border-black transition-colors"
                                maxLength={1}
                            />
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-sm mb-4 text-center" style={{ color: '#ef4444' }}>{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "جاري التحقق..." : "تأكيد"}
                    </button>
                </form>

                {/* Resend Timer */}
                <div className="text-center mt-6" dir="rtl">
                    {canResend ? (
                        <button
                            onClick={handleResend}
                            className="text-black font-medium hover:underline"
                        >
                            إعادة إرسال الرمز
                        </button>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            إعادة الإرسال بعد{" "}
                            <span className="font-medium text-black">
                                {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
