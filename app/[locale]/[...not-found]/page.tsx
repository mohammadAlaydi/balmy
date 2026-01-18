"use client";

import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {

    const t = useTranslations("not-found");

    return (
        <div className="text-center animate-fadeIn min-h-[60vh] flex flex-col items-center justify-center px-4">
            <img
                src="https://yemca-services.net/404.png"
                alt="404 Illustration"
                className="mx-auto w-80 animate-[float_3s_infinite] shadow-xl rounded-lg"
            />
            <h1 className="text-7xl font-extrabold text-red-500 mt-6">
                {t("looks-like-you-re-lost")}
            </h1>
            <p className="text-xl text-gray-700 mt-2">
                {t("we-cant-seem-to-find-the-page-you-re-looking-for")}
            </p>
            <Link
                href="/"
                className="mt-6 inline-block bg-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-red-700"
            >
                {t("return-home")}
            </Link>
        </div>
    )
} 

