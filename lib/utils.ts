import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalize image URLs coming from API responses.
 * - trims whitespace
 * - collapses multiple slashes in the pathname (e.g. `//storage/...` -> `/storage/...`)
 * Note: does NOT change protocol/hostname.
 */
export function normalizeRemoteImageUrl(input?: unknown): string | undefined {
  if (typeof input !== "string") return undefined;
  const value = input.trim();
  if (!value) return undefined;

  // Keep relative paths as-is, but normalize accidental `//` at the start.
  if (value.startsWith("/")) {
    return value.replace(/^\/{2,}/, "/");
  }

  // For absolute URLs, normalize only the pathname (avoid breaking `https://`).
  try {
    const url = new URL(value);
    url.pathname = url.pathname.replace(/\/{2,}/g, "/");
    return url.toString();
  } catch {
    // Best-effort fallback: collapse duplicate slashes excluding after protocol.
    return value.replace(/([^:]\/)\/+/g, "$1");
  }
}

export function isEnvagloCdnUrl(src?: string): boolean {
  if (!src) return false;
  return /^https?:\/\//i.test(src) && src.includes("erpv2.envaglo.net");
}
