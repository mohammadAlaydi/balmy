import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'No refresh token' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_URL}/v1/customer/refresh-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Token refresh failed' },
        { status: response.status }
      );
    }

    // Rotate tokens: set new access token and optionally new refresh token
    const newAccessToken = data.token || data.accessToken || data.access_token;
    const newRefreshToken = data.refreshToken || data.refresh_token;

    if (newAccessToken) {
      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
    }

    if (newRefreshToken) {
      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return NextResponse.json({
      message: data.message || 'Token refreshed successfully',
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}