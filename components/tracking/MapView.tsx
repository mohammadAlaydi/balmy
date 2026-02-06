"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Polyline,
} from "@react-google-maps/api";

// Types for location data
interface LatLng {
    lat: number;
    lng: number;
}

interface MapViewProps {
    destination?: LatLng & { address?: string };
    driverInitialPosition?: LatLng;
    onDriverPositionUpdate?: (position: LatLng) => void;
}

// Map container style - fullscreen responsive
const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    minHeight: "250px",
    borderRadius: "1.5rem",
};

// Default map options
const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        },
    ],
};

// Smooth animation configuration
const ANIMATION_DURATION = 1000; // ms
const POSITION_UPDATE_INTERVAL = 5000; // 5 seconds

// Default positions (Saudi Arabia - Riyadh area)
const DEFAULT_DESTINATION: LatLng = {
    lat: 24.7136,
    lng: 46.6753,
};

const DEFAULT_DRIVER_START: LatLng = {
    lat: 24.7236,
    lng: 46.6653,
};

// Simulated route waypoints for demo
const SIMULATED_ROUTE: LatLng[] = [
    { lat: 24.7236, lng: 46.6653 },
    { lat: 24.7216, lng: 46.6683 },
    { lat: 24.7196, lng: 46.6703 },
    { lat: 24.7176, lng: 46.6723 },
    { lat: 24.7156, lng: 46.6743 },
    { lat: 24.7136, lng: 46.6753 }, // Destination
];

// Custom hook for smooth marker animation
function useAnimatedPosition(targetPosition: LatLng) {
    const [currentPosition, setCurrentPosition] = useState<LatLng>(targetPosition);
    const animationRef = useRef<number | null>(null);
    const startPositionRef = useRef<LatLng>(targetPosition);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (
            currentPosition.lat === targetPosition.lat &&
            currentPosition.lng === targetPosition.lng
        ) {
            return;
        }

        startPositionRef.current = currentPosition;
        startTimeRef.current = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTimeRef.current;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const newLat =
                startPositionRef.current.lat +
                (targetPosition.lat - startPositionRef.current.lat) * easeProgress;
            const newLng =
                startPositionRef.current.lng +
                (targetPosition.lng - startPositionRef.current.lng) * easeProgress;

            setCurrentPosition({ lat: newLat, lng: newLng });

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [targetPosition.lat, targetPosition.lng]);

    return currentPosition;
}

// Main MapView Component
export default function MapView({
    destination = DEFAULT_DESTINATION,
    driverInitialPosition = DEFAULT_DRIVER_START,
    onDriverPositionUpdate,
}: MapViewProps) {
    // ========== TEMPORARY: Static iframe map ==========
    // Set to false to use the functional Google Maps implementation
    const USE_STATIC_MAP = true;

    if (USE_STATIC_MAP) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden h-full border border-border-light dark:border-border-dark relative shadow-sm">
                <iframe
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=API_KEY
                        &q=Space+Needle,Seattle+WA">
                </iframe>
                {/* Tracking Status Badge */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        تتبع مباشر
                    </span>
                </div>
            </div>
        );
    }
    // ========== END TEMPORARY ==========

    // Load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        id: "google-map-script",
    });

    // State
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [driverPosition, setDriverPosition] = useState<LatLng>(driverInitialPosition);
    const [routeWaypointIndex, setRouteWaypointIndex] = useState(0);
    const [isTracking, setIsTracking] = useState(true);

    // Animated driver position for smooth movement
    const animatedDriverPosition = useAnimatedPosition(driverPosition);

    // Route path for polyline
    const routePath = useMemo(() => {
        return [animatedDriverPosition, destination];
    }, [animatedDriverPosition, destination]);

    // Map load callback
    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);

        // Fit bounds to show both markers
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(driverInitialPosition);
        bounds.extend(destination);
        map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }, [driverInitialPosition, destination]);

    // Map unmount callback
    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // Simulate live tracking updates
    // This can be replaced with WebSocket, SSE, or polling
    useEffect(() => {
        if (!isTracking) return;

        const intervalId = setInterval(() => {
            setRouteWaypointIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex >= SIMULATED_ROUTE.length) {
                    setIsTracking(false);
                    return prevIndex;
                }

                const newPosition = SIMULATED_ROUTE[nextIndex];
                setDriverPosition(newPosition);
                onDriverPositionUpdate?.(newPosition);

                return nextIndex;
            });
        }, POSITION_UPDATE_INTERVAL);

        return () => clearInterval(intervalId);
    }, [isTracking, onDriverPositionUpdate]);

    // Auto-center map on driver (smooth pan)
    useEffect(() => {
        if (map && animatedDriverPosition) {
            map.panTo(animatedDriverPosition);
        }
    }, [map, animatedDriverPosition]);

    // Loading state
    if (loadError) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden h-full border border-border-light dark:border-border-dark flex items-center justify-center">
                <div className="text-center p-6">
                    <div className="text-red-500 text-4xl mb-3">⚠️</div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                        خطأ في تحميل الخريطة
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                        تأكد من صحة مفتاح Google Maps API
                    </p>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden h-full border border-border-light dark:border-border-dark flex items-center justify-center">
                <div className="text-center p-6">
                    <div className="animate-spin w-10 h-10 border-4 border-[#2E8B57] border-t-transparent rounded-full mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                        جاري تحميل الخريطة...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden h-full border border-border-light dark:border-border-dark relative shadow-sm">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={animatedDriverPosition}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions}
            >
                {/* Driver Marker (Moving) */}
                <Marker
                    position={animatedDriverPosition}
                    icon={{
                        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                <circle cx="20" cy="20" r="18" fill="#2E8B57" stroke="white" stroke-width="3"/>
                                <path d="M14 22h12M14 22l2-6h8l2 6M16 22v3h2v-3M22 22v3h2v-3M17 16h6" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        `),
                        scaledSize: new google.maps.Size(40, 40),
                        anchor: new google.maps.Point(20, 20),
                    }}
                    title="السائق"
                    zIndex={2}
                />

                {/* Destination Marker (Static) */}
                <Marker
                    position={destination}
                    icon={{
                        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="40" height="50">
                                <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z" fill="#E74C3C"/>
                                <circle cx="20" cy="18" r="8" fill="white"/>
                            </svg>
                        `),
                        scaledSize: new google.maps.Size(40, 50),
                        anchor: new google.maps.Point(20, 50),
                    }}
                    title="وجهة التسليم"
                    zIndex={1}
                />

                {/* Route Polyline */}
                <Polyline
                    path={routePath}
                    options={{
                        strokeColor: "#2E8B57",
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                        geodesic: true,
                    }}
                />
            </GoogleMap>

            {/* Tracking Status Badge */}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div
                    className={`w-3 h-3 rounded-full ${isTracking ? "bg-green-500 animate-pulse" : "bg-gray-400"
                        }`}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isTracking ? "تتبع مباشر" : "تم التوصيل"}
                </span>
            </div>

            {/* ETA Badge (Optional) */}
            {isTracking && (
                <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">الوقت المتوقع</p>
                    <p className="text-lg font-bold text-[#2E8B57]">
                        {Math.max(1, SIMULATED_ROUTE.length - routeWaypointIndex - 1) * 5} دقيقة
                    </p>
                </div>
            )}
        </div>
    );
}

// ===== INTEGRATION HELPERS =====
// These functions demonstrate how to integrate with real-time data sources

/**
 * WebSocket Integration Example:
 * 
 * const socket = new WebSocket('wss://your-tracking-server.com/driver/123');
 * 
 * socket.onmessage = (event) => {
 *     const data = JSON.parse(event.data);
 *     setDriverPosition({ lat: data.latitude, lng: data.longitude });
 * };
 */

/**
 * SSE (Server-Sent Events) Integration Example:
 * 
 * const eventSource = new EventSource('/api/tracking/driver/123');
 * 
 * eventSource.onmessage = (event) => {
 *     const data = JSON.parse(event.data);
 *     setDriverPosition({ lat: data.latitude, lng: data.longitude });
 * };
 */

/**
 * Polling Integration Example:
 * 
 * useEffect(() => {
 *     const fetchPosition = async () => {
 *         const res = await fetch('/api/tracking/driver/123');
 *         const data = await res.json();
 *         setDriverPosition({ lat: data.latitude, lng: data.longitude });
 *     };
 * 
 *     const intervalId = setInterval(fetchPosition, 5000);
 *     return () => clearInterval(intervalId);
 * }, []);
 */
