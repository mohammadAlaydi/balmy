import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/v1/customer/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    // Set httpOnly cookies with the tokens
    const cookieStore = await cookies();
    const accessToken = data.token || data.accessToken || data.access_token;
    const refreshToken = data.refreshToken || data.refresh_token;

    if (accessToken) {
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
    }

    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // Typically longer-lived than access token
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    // Return user data without tokens
    return NextResponse.json({
      data: data.data,
      message: data.message,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}