import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail } from '@/lib/mock-db';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = forgotPasswordSchema.parse(body);
    
    // Check if user exists
    const user = findUserByEmail(validatedData.email);
    if (!user) {
      return NextResponse.json(
        { message: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // TODO: In production, you would:
    // 1. Generate a 6-digit reset code
    // 2. Store it in the database with expiration
    // 3. Send email with the code
    // 4. Rate limit the requests
    
    // For now, we'll simulate success
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log(`Password reset code for ${validatedData.email}: ${resetCode}`);
    
    // TODO: Send actual email here
    // await sendPasswordResetEmail(validatedData.email, resetCode);
    
    return NextResponse.json({
      message: 'Password reset code sent successfully',
      // In production, don't return the code in the response
      // This is just for development/testing
      code: resetCode
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
