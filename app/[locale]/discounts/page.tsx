"use client";

import React from 'react';
import HeaderBalmy from '@/components/balmy/header-balmy';

const brandsData = {
    A: ['AMERICANAIRLINES', 'AMERICAN EAGLE', 'ANTONIO BANDERAS', 'ARAMIS', 'ARZAVI', 'ARAMONO IGAN', 'AUTENTI'],
    B: ['BENTLEY', 'BOUCHERON', 'BURBERRY', 'BULGARI'],
    C: ['CACHAREL', 'CALVIN KLEIN', 'CAROLINA HERRERA', 'CARTIER', 'CERRUTI', 'CHANEL', 'CHOPARD', 'CHERVIGNON DUCK', 'CLINIQUE', 'COACH'],
    D: ['DAVIDOFF', 'DKNY', 'DOLCE GABBANA', 'DUNHILL'],
    E: ['BELGIUM', 'ESCENIFICATION', 'ESSENCE', 'ESTE LAUDER'],
    F: ['FIORUCI', 'FRANCK OLIVIER'],
    G: ['GIORGIO ARMANI', 'GIVENCHY', 'GUCCI', 'GUERLAIN', 'GUESS'],
    H: ['HERMES', 'HUGO BOSS', 'HUMMER'],
    I: ['ISSEY MIYAKE'],
    J: ['JAGUAR', 'JEAN PAUL GAULTIER', 'JENNIFER LOPEZ', 'JIMMY CHOO', 'JOOP', 'JOVAN', 'JUICY COUTURE'],
    K: ['KATY PERRY', 'KENZO OF THE TIGER', 'BENEFIT'],
    L: ['LACOSTE', 'LANCOME', 'LANVIN', 'LOEVAS', 'LOLITA'],
    M: ['MANDARA', 'MEXX', 'MOSCHINO', 'MERCEDES BENZ', 'MILLANI', 'MONT BLANC', 'MONTALE'],
    N: ['MARCHIO RODRIGUEZ', 'NAUTICA', 'NINA RICCI'],
    O: [],
    P: ['PACO RABANNE', 'PAUL LOREN', 'PRADA', 'PRADA'],
    Q: [],
    R: ['RALPH LAUREN', 'ROBERTO CAVALLI', 'ROCHAS'],
    S: ['S T DUPONT', 'SALVATORE FERRAGAM', 'SHOHADI', 'SWARND', 'ST DUPONT', 'SUNSET OVER', 'CLINIQUE'],
    T: ['THIERRY STREAM', 'THIERRY MUGLER', 'TIFFANY', 'TOMMY HILFIGER', 'TRU SPORT', 'TRUSSARDI'],
    U: [],
    V: ['VALENTINO', 'VAN CLEEF', 'VERSACE', 'VIKTOR ROLF'],
    W: ['WOW', 'WRANGLER'],
    X: ['XPEL'],
    Y: ['YVES SAINT LAURENT'],
    Z: ['ZADIG & VOLTAIRE', 'ZINO DAVIDOFF'],
};

export default function DiscountsPage() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="min-h-screen bg-white">
            {/* Header is provided by layout in balmy-fe, but balmy used a specific variant */}
            {/* We already updated RootLayout to use HeaderBalmy */}

            <div className="container mx-auto px-4 py-8" dir="rtl">
                {/* Breadcrumb - balmy-fe layout has BreadcrumbWrapper, 
            so we might not need to manually add it here if it's dynamic */}

                {/* Search Bar */}
                <div className="mb-8 max-w-4xl mx-auto">
                    <input
                        type="text"
                        placeholder="ابحث واستكشف معنا أكثر من 2000 متجر من التجار المفضلين"
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[var(--color-medium-gray)]"
                        dir="rtl"
                    />
                </div>

                {/* Alphabet Navigation */}
                <div className="flex flex-row-reverse justify-center items-center gap-4 md:gap-10 mb-12 flex-wrap text-xl md:text-3xl font-semibold" dir="ltr">
                    {alphabet.map((letter) => (
                        <a
                            key={letter}
                            href={`#${letter}`}
                            className="hover:text-[var(--color-medium-gray)] transition-colors"
                        >
                            {letter}
                        </a>
                    ))}
                </div>

                {/* Brands Table */}
                <div className="border border-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8" dir="ltr">
                        {alphabet.map((letter) => (
                            <div
                                key={letter}
                                id={letter}
                                className="border-r border-b border-gray-300 p-6 min-h-[200px] flex gap-4 pt-14"
                            >
                                <h2 className="text-4xl font-bold flex-shrink-0 text-[var(--color-black)]">{letter}</h2>

                                <ul className="space-y-2 flex-1 text-left">
                                    {brandsData[letter as keyof typeof brandsData]?.map((brand, index) => (
                                        <li
                                            key={index}
                                            className="text-xs text-[var(--color-medium-gray)] hover:text-black cursor-pointer uppercase"
                                        >
                                            {brand}
                                        </li>
                                    ))}
                                    {(!brandsData[letter as keyof typeof brandsData] || brandsData[letter as keyof typeof brandsData].length === 0) && (
                                        <li className="text-xs text-gray-400 italic">No brands</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
