import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // Category products endpoint might not require authentication, but we'll include token if available
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_URL}/v1/category-products/${params.categoryId}`, {
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
            const retry = await fetch(`${API_URL}/v1/category-products/${params.categoryId}`, {
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
              { message: retryData.message || 'Failed to fetch category products' },
              { status: retry.status }
            );
          }
        } catch {}
      }

      return NextResponse.json(
        { message: data.message || 'Failed to fetch category products' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Get category products error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
