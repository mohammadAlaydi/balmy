export const DEFAULT_IMAGE_FALLBACK = "/assets/images/no-image.webp";

type ResolveImageSrcOptions = {
  fallback?: string;
};

/**
 * Normalizes image src coming from backend.
 * - Keeps absolute URLs as-is
 * - Converts protocol-relative URLs (//...) to https
 * - Converts relative paths to absolute using NEXT_PUBLIC_API_URL origin
 * - Preserves local public assets like /assets/**
 */
export function resolveImageSrc(
  src?: string | null,
  options: ResolveImageSrcOptions = {}
): string {
  const fallback = options.fallback ?? DEFAULT_IMAGE_FALLBACK;
  const value = (src ?? "").toString().trim();
  if (!value) return fallback;

  // data/blob URLs should pass through
  if (value.startsWith("data:") || value.startsWith("blob:")) return value;

  // Protocol-relative URL -> default to https
  if (value.startsWith("//")) return `https:${value}`;

  // Absolute URL
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  // Local public assets should stay local
  if (value.startsWith("/assets/")) return value;

  // Build absolute using API origin (API url may include /api path)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let apiOrigin: string | undefined;
  try {
    if (apiUrl) apiOrigin = new URL(apiUrl).origin;
  } catch {
    apiOrigin = undefined;
  }

  // If we don't have an API origin, best-effort: ensure leading slash
  if (!apiOrigin) return value.startsWith("/") ? value : `/${value}`;

  // If it's an absolute path, attach to API origin; otherwise join with a slash
  if (value.startsWith("/")) return `${apiOrigin}${value}`;
  return `${apiOrigin}/${value.replace(/^\/+/, "")}`;
}

