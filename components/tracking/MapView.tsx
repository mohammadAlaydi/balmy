"use client";

import React from "react";

interface MapViewProps {
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
}

export default function MapView({ location }: MapViewProps) {
    // Use the map image from the HTML
    const mapImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBbeX_rmE_qH6u8MIHkcyYfHfgTZODkdNg_LULWLVaP8djxA1jmIjdiWW75qw0d1190nTY3wj_HnOCkYvY2efHMHAzl8YEIcYXtUCVGJ5VYEF8tr7Fw5QiKAJNtZNLEcAFKRh_cTY8pHxk2n3Vte61ofz7zAifQGTPkQ2DWgDq9eoLCSn2Ix9SrqvCgi4FE3hmBxwcXnnz0kJQoJFzjjmjYJQixlZlFrVtXw5hQofWa0T2NEh8vQL6c-fJfbdvYh56PNGL7OxptraM";

    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden h-full border border-border-light dark:border-border-dark relative shadow-sm">
            <img
                alt="Map View"
                className="w-full h-full object-cover opacity-80 dark:opacity-60"
                src={mapImageUrl}
            />

            {/* Animated Location Marker */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <i className="fas fa-map-marker-alt text-red-500 text-3xl drop-shadow-lg animate-bounce"></i>
            </div>

            {/* Optional: Display address if provided */}
            {location?.address && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-200 text-center">
                        {location.address}
                    </p>
                </div>
            )}
        </div>
    );
}
