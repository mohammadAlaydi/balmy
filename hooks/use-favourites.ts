"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "favourites";
const DEBOUNCE_MS = 300;

export interface FavouriteProduct {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    brand: string;
    oldPrice?: number;
    discount?: number;
    rating?: number;
    inStock?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                          Safe localStorage helpers                         */
/* -------------------------------------------------------------------------- */
function readStorage(): FavouriteProduct[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeStorage(items: FavouriteProduct[]) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
        // localStorage may be disabled — silently fail
    }
}

/* -------------------------------------------------------------------------- */
/*                            Custom event helper                             */
/* -------------------------------------------------------------------------- */
function dispatchFavouritesEvent() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("favourites-updated"));
}

/* -------------------------------------------------------------------------- */
/*                              useFavourites hook                            */
/* -------------------------------------------------------------------------- */
export default function useFavourites() {
    const [favourites, setFavourites] = useState<FavouriteProduct[]>([]);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ---- Hydrate from localStorage on mount ---- */
    useEffect(() => {
        setFavourites(readStorage());

        const handleUpdate = () => setFavourites(readStorage());
        window.addEventListener("favourites-updated", handleUpdate);
        return () => window.removeEventListener("favourites-updated", handleUpdate);
    }, []);

    /* ---- Persist whenever favourites change ---- */
    const persist = useCallback((next: FavouriteProduct[]) => {
        setFavourites(next);
        writeStorage(next);
        dispatchFavouritesEvent();
    }, []);

    /* ---- Public API ---- */

    const isFavourite = useCallback(
        (productId: number) => favourites.some((f) => f.id === productId),
        [favourites]
    );

    const addFavourite = useCallback(
        (product: FavouriteProduct) => {
            const next = [...favourites.filter((f) => f.id !== product.id), product];
            persist(next);
        },
        [favourites, persist]
    );

    const removeFavourite = useCallback(
        (productId: number) => {
            const next = favourites.filter((f) => f.id !== productId);
            persist(next);
        },
        [favourites, persist]
    );

    const toggleFavourite = useCallback(
        (product: FavouriteProduct): boolean => {
            // Debounce rapid clicks
            if (debounceRef.current) return isFavourite(product.id);
            debounceRef.current = setTimeout(() => {
                debounceRef.current = null;
            }, DEBOUNCE_MS);

            const alreadyFav = isFavourite(product.id);
            if (alreadyFav) {
                removeFavourite(product.id);
            } else {
                addFavourite(product);
            }
            return !alreadyFav; // returns the NEW state (true = now favourited)
        },
        [isFavourite, addFavourite, removeFavourite]
    );

    const clearAll = useCallback(() => {
        persist([]);
    }, [persist]);

    return {
        favourites,
        count: favourites.length,
        isFavourite,
        addFavourite,
        removeFavourite,
        toggleFavourite,
        clearAll,
    };
}
