import { NextResponse } from 'next/server';
import { makeAuthenticatedRequest } from '@/lib/auth-middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function DELETE() {
  try {
    const response = await makeAuthenticatedRequest(
      `${API_URL}/v1/customer/wishlist/all`,
      {
        method: 'DELETE',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || 'Failed to clear wishlist' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Wishlist CLEAR error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

