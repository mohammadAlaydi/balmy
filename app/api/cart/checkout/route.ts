import { NextRequest, NextResponse } from 'next/server';
import { makeAuthenticatedRequest } from '@/lib/auth-middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const response = await makeAuthenticatedRequest(
      `${API_URL}/v1/customer/checkout/save-order`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Checkout failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
    
  }
}
