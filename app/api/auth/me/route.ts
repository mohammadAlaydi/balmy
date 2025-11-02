import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {

    let token = request.cookies.get('accessToken')?.value;
    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_URL}/v1/customer/get`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized, attempt one refresh then retry once
      if (response.status === 401) {
        try {
          const refreshResp = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: 'POST',
          });
          if (refreshResp.ok) {
            const retry = await fetch(`${API_URL}/v1/customer/get`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${request.cookies.get('accessToken')?.value ?? ''}`,
                'Accept': 'application/json',
              },
            });
            const retryData = await retry.json();
            if (retry.ok) {
              return NextResponse.json(retryData);
            }
            return NextResponse.json(
              { message: retryData.message || 'Failed to get user info' },
              { status: retry.status }
            );
          }
        } catch {}
      }

      return NextResponse.json(
        { message: data.message || 'Failed to get user info' },
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