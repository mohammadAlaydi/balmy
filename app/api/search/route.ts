import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    // Get search params from query
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const locale = searchParams.get('locale') || 'ar';

    // Build the search URL
    let searchUrl = `${API_URL}/v1/categorysearch?locale=${locale}`;
    if (query) searchUrl += `&q=${encodeURIComponent(query)}`;
    if (category) searchUrl += `&category=${encodeURIComponent(category)}`;

    // Search endpoint might not require authentication, but we'll include token if available
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized and refresh token exists, attempt one refresh then retry once
      if (response.status === 401 && refreshToken && accessToken) {
        try {
          const refreshResp = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: 'POST',
          });
          if (refreshResp.ok) {
            const retry = await fetch(searchUrl, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${cookieStore.get('accessToken')?.value ?? ''}`,
                'Accept': 'application/json',
              },
            });
            const retryData = await retry.json();
            if (retry.ok) {
              return NextResponse.json(retryData);
            }
            return NextResponse.json(
              { message: retryData.message || 'Failed to search products' },
              { status: retry.status }
            );
          }
        } catch {}
      }

      return NextResponse.json(
        { message: data.message || 'Failed to search products' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Search products error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
