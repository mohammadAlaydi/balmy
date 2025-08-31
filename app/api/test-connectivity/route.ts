import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      return NextResponse.json(
        { 
          error: 'API URL not configured',
          message: 'Please check your .env file for NEXT_PUBLIC_API_URL'
        },
        { status: 500 }
      );
    }

    const results = {
      apiUrl,
      timestamp: new Date().toISOString(),
      tests: [] as any[]
    };

    // Test 1: Basic connectivity to customer get endpoint
    try {
      console.log('Testing endpoint:', `${apiUrl}/api/v1/customer/get`);
      const testResponse = await fetch(`${apiUrl}/api/v1/customer/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      results.tests.push({
        endpoint: '/api/v1/customer/get',
        method: 'GET',
        success: true,
        status: testResponse.status,
        statusText: testResponse.statusText,
        headers: Object.fromEntries(testResponse.headers.entries())
      });
    } catch (error: any) {
      results.tests.push({
        endpoint: '/api/v1/customer/get',
        method: 'GET',
        success: false,
        error: error.message,
        errorType: error.constructor.name
      });
    }

    // Test 2: Test with OPTIONS request to check CORS
    try {
      const corsResponse = await fetch(`${apiUrl}/api/v1/customer/get`, {
        method: 'OPTIONS',
        headers: {
          'Origin': 'http://localhost:3000',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        },
      });
      
      results.tests.push({
        endpoint: '/api/v1/customer/get',
        method: 'OPTIONS',
        success: true,
        status: corsResponse.status,
        statusText: corsResponse.statusText,
        corsHeaders: {
          'Access-Control-Allow-Origin': corsResponse.headers.get('Access-Control-Allow-Origin'),
          'Access-Control-Allow-Methods': corsResponse.headers.get('Access-Control-Allow-Methods'),
          'Access-Control-Allow-Headers': corsResponse.headers.get('Access-Control-Allow-Headers')
        }
      });
    } catch (error: any) {
      results.tests.push({
        endpoint: '/api/v1/customer/get',
        method: 'OPTIONS',
        success: false,
        error: error.message,
        errorType: error.constructor.name
      });
    }

    // Test 3: Test a simple endpoint that might exist
    try {
      const simpleResponse = await fetch(`${apiUrl}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      results.tests.push({
        endpoint: '/',
        method: 'GET',
        success: true,
        status: simpleResponse.status,
        statusText: simpleResponse.statusText
      });
    } catch (error: any) {
      results.tests.push({
        endpoint: '/',
        method: 'GET',
        success: false,
        error: error.message,
        errorType: error.constructor.name
      });
    }

    // Determine overall success
    const successfulTests = results.tests.filter(test => test.success);
    const overallSuccess = successfulTests.length > 0;

    return NextResponse.json({
      success: overallSuccess,
      message: overallSuccess ? 'Some API endpoints are accessible' : 'All API endpoints failed',
      ...results
    });

  } catch (error) {
    console.error('Test connectivity error:', error);
    return NextResponse.json(
      { 
        error: 'Connectivity test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        apiUrl: process.env.NEXT_PUBLIC_API_URL || 'Not configured'
      },
      { status: 500 }
    );
  }
}
