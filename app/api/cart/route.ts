import { NextRequest, NextResponse } from 'next/server';
import { makeAuthenticatedRequest } from '@/lib/auth-middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get cart products
export async function GET() {
  try {
    const response = await makeAuthenticatedRequest(`${API_URL}/v1/customer/cart`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch cart' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Clear all cart items
export async function DELETE() {
  try {
    const response = await makeAuthenticatedRequest(`${API_URL}/v1/customer/cart/remove`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to clear cart' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Clear cart error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
