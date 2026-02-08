import { serialize, parse } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const TOKEN_NAME = 'auth_token';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Set the auth token as an httpOnly cookie
 */
export function setAuthCookie(res: NextApiResponse, token: string) {
    const cookie = serialize(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: MAX_AGE,
        path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
}

/**
 * Get the auth token from the request cookies
 */
export function getAuthToken(req: NextApiRequest): string | undefined {
    // Next.js Pages Router automatically parses cookies into req.cookies
    return req.cookies?.[TOKEN_NAME];
}

/**
 * Clear the auth cookie
 */
export function clearAuthCookie(res: NextApiResponse) {
    const cookie = serialize(TOKEN_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: -1,
        path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
}

/**
 * Add Bearer token to headers from cookie, returns the headers object
 */
export function addAuthHeader(req: NextApiRequest, headers: HeadersInit): HeadersInit {
    const token = getAuthToken(req);
    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}
