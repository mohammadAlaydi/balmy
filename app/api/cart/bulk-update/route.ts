import { NextRequest, NextResponse } from 'next/server';
import { makeAuthenticatedRequest } from '@/lib/auth-middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { message: 'Items array is required' },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return NextResponse.json(
          { message: 'Each item must have valid productId and quantity' },
          { status: 400 }
        );
      }
    }

    const response = await makeAuthenticatedRequest(
      `${API_URL}/v1/customer/cart/bulk-update`,
      {
        method: 'PUT',
        body: JSON.stringify({ items }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to update cart quantities' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Bulk update cart quantities error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

