import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    return NextResponse.json({
      hasAccessToken: !!accessToken,
      accessTokenLength: accessToken?.length || 0,
      // Don't return actual token for security
      accessTokenPreview: accessToken ? `${accessToken.substring(0, 10)}...` : null,
      refreshFlow: 'Uses current access token to get new access token',
    });
  } catch (error) {
    console.error('Debug tokens error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
