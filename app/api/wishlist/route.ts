import { NextRequest, NextResponse } from 'next/server';
import { makeAuthenticatedRequest } from '@/lib/auth-middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const response = await makeAuthenticatedRequest(
      `${API_URL}/v1/customer/wishlist`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || 'Failed to fetch wishlist' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Wishlist GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  try {
    const response = await makeAuthenticatedRequest(
      `${API_URL}/v1/customer/wishlist`,
      {
        method: 'HEAD',
      }
    );
    return new NextResponse(null, { status: response.status });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

