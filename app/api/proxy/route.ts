import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.error('Proxy: API URL not configured');
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Proxy: Received request body:', body);
    
    const { endpoint, method = 'POST', data, headers = {} } = body;

    if (!endpoint) {
      console.error('Proxy: Endpoint is required');
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    const targetUrl = `${apiUrl}${endpoint}`;
    console.log(`Proxy: Making request to: ${targetUrl}`);
    console.log('Proxy: Request details:', { method, data, headers });

    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log('Proxy: Response status:', response.status);
    console.log('Proxy: Response headers:', Object.fromEntries(response.headers.entries()));

    const responseData = await response.json().catch(() => ({}));
    console.log('Proxy: Response data:', responseData);

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      headers: Object.fromEntries(response.headers.entries())
    });

  } catch (error) {
    console.error('Proxy: Error occurred:', error);
    return NextResponse.json(
      { 
        error: 'Proxy request failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.error('Proxy GET: API URL not configured');
      return NextResponse.json(
        { error: 'API URL not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      console.error('Proxy GET: Endpoint query parameter is required');
      return NextResponse.json(
        { error: 'Endpoint query parameter is required' },
        { status: 400 }
      );
    }

    const targetUrl = `${apiUrl}${endpoint}`;
    console.log(`Proxy GET: Making request to: ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Proxy GET: Response status:', response.status);

    const responseData = await response.json().catch(() => ({}));

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      headers: Object.fromEntries(response.headers.entries())
    });

  } catch (error) {
    console.error('Proxy GET: Error occurred:', error);
    return NextResponse.json(
      { 
        error: 'Proxy GET request failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
