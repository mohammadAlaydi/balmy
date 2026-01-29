"use client"

import { Rating, RatingButton } from "@/components/ui/rating"

export default function ComponentsTestPage() {
    return (
        <div className="min-h-screen p-8 bg-white">
            <div className="max-w-4xl mx-auto space-y-12">
                <h1 className="text-3xl font-bold mb-8">Rating Component Test</h1>

                {/* Test 1: Read-only with different values */}
                <div className="space-y-4 p-6 border rounded-lg">
                    <h2 className="text-xl font-semibold">Read-only Ratings</h2>

                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Rating: 5 stars</p>
                            <Rating readOnly value={5}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={32} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Rating: 4 stars</p>
                            <Rating readOnly value={4}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={32} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Rating: 3 stars</p>
                            <Rating readOnly value={3}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={32} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Rating: 2 stars</p>
                            <Rating readOnly value={2}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={32} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Rating: 1 star</p>
                            <Rating readOnly value={1}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={32} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Rating: 0 stars</p>
                            <Rating readOnly value={0}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={32} />
                                ))}
                            </Rating>
                        </div>
                    </div>
                </div>

                {/* Test 2: Different sizes */}
                <div className="space-y-4 p-6 border rounded-lg">
                    <h2 className="text-xl font-semibold">Different Sizes</h2>

                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Size: 16px</p>
                            <Rating readOnly value={4}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={16} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Size: 24px (default)</p>
                            <Rating readOnly value={4}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={24} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Size: 32px</p>
                            <Rating readOnly value={4}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={32} />
                                ))}
                            </Rating>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Size: 48px</p>
                            <Rating readOnly value={4}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} size={48} />
                                ))}
                            </Rating>
                        </div>
                    </div>
                </div>

                {/* Test 3: Interactive (not read-only) */}
                <div className="space-y-4 p-6 border rounded-lg">
                    <h2 className="text-xl font-semibold">Interactive Rating (Hover & Click)</h2>
                    <p className="text-sm text-gray-600">Try hovering and clicking the stars</p>

                    <Rating defaultValue={0} onValueChange={(val) => console.log('Rating changed:', val)}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <RatingButton key={i} size={32} />
                        ))}
                    </Rating>
                </div>

                {/* Debug info */}
                <div className="p-6 border rounded-lg bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
                    <div className="space-y-2 text-sm font-mono">
                        <p>Expected color: #FFC107 (golden yellow)</p>
                        <p>Component location: /components/ui/rating.tsx</p>
                        <p>Using inline styles for fill and color properties</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
