import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Call backend login API
    const response = await fetch(`${API_URL}/v1/customer/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    // Extract access token
    const accessToken = data.token || data.accessToken || data.access_token;

    // Set httpOnly cookie if token exists
    if (accessToken) {
      const cookieStore = cookies();
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      console.log('Access token stored in cookie');
    } else {
      console.warn('No access token received from backend');
    }

    // Return user data and token
    return NextResponse.json({
      data: data.data,
      token: accessToken, // included for debugging
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
