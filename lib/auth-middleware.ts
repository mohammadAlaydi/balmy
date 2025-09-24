import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  return cookieStore.get('accessToken')?.value || null;
}

export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
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
