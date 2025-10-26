import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_URL}/v1/customer/get`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized and refresh token exists, attempt one refresh then retry once
      if (response.status === 401 && refreshToken) {
        try {
          const refreshResp = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: 'POST',
          });
          if (refreshResp.ok) {
            const retry = await fetch(`${API_URL}/v1/customer/get`, {
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
              { message: retryData.message || 'Failed to get customer profile' },
              { status: retry.status }
            );
          }
        } catch {}
      }

      return NextResponse.json(
        { message: data.message || 'Failed to get customer profile' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Get customer profile error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${API_URL}/v1/customer/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized and refresh token exists, attempt one refresh then retry once
      if (response.status === 401 && refreshToken) {
        try {
          const refreshResp = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: 'POST',
          });
          if (refreshResp.ok) {
            const retry = await fetch(`${API_URL}/v1/customer/profile`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${cookieStore.get('accessToken')?.value ?? ''}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            });
            const retryData = await retry.json();
            if (retry.ok) {
              return NextResponse.json(retryData);
            }
            return NextResponse.json(
              { message: retryData.message || 'Failed to update customer profile' },
              { status: retry.status }
            );
          }
        } catch {}
      }

      return NextResponse.json(
        { message: data.message || 'Failed to update customer profile' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Update customer profile error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
