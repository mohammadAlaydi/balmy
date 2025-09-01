import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Test proxy: Received request');
    
    const body = await request.json();
    console.log('Test proxy: Request body:', body);
    
    // Simulate a successful response
    return NextResponse.json({
      success: true,
      message: 'Test proxy endpoint working',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Test proxy: Error occurred:', error);
    return NextResponse.json(
      { 
        error: 'Test proxy failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Test proxy: Received GET request');
    
    return NextResponse.json({
      success: true,
      message: 'Test proxy GET endpoint working',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Test proxy GET: Error occurred:', error);
    return NextResponse.json(
      { 
        error: 'Test proxy GET failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
