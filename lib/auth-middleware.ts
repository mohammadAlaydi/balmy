import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || null;
}

async function refreshAccessToken(currentAccessToken: string): Promise<string | null> {
  try {
    if (!API_URL) return null;

    const response = await fetch(`${API_URL}/v1/customer/refresh-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${currentAccessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const newAccessToken = data?.token || data?.accessToken || data?.access_token;

    if (!newAccessToken) return null;

    const cookieStore = await cookies();
    cookieStore.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return newAccessToken;
  } catch (error) {
    console.error('Auth middleware refresh error:', error);
    return null;
  }
}

export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {},
  retryCount: number = 0
): Promise<Response> {
  const token = await getAuthToken();
  
  if (!token) {
    // Gracefully return 401 so API routes can propagate proper status
    return new Response(
      JSON.stringify({ message: 'Authentication required' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const buildHeaders = (accessToken: string) => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...(options.headers || {}),
  });

  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(token),
  });

  // Silent refresh & retry once on 401 from backend
  if (response.status === 401 && retryCount === 0) {
    const newToken = await refreshAccessToken(token);
    if (newToken) {
      return makeAuthenticatedRequest(url, options, retryCount + 1);
    }
  }

  return response;
}

export function withAuth(handler: (request: NextRequest) => Promise<Response>) {
  return async (request: NextRequest) => {
    try {
      const token = await getAuthToken();
      
      if (!token) {
        return Response.json(
          { message: 'Authentication required' },
          { status: 401 }
        );
      }

      return handler(request);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return Response.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
