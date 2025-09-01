import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail } from '@/lib/mock-db';

// Validation schema
const verifyCodeSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = verifyCodeSchema.parse(body);
    
    // Check if user exists
    const user = findUserByEmail(validatedData.email);
    if (!user) {
      return NextResponse.json(
        { message: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // TODO: In production, you would:
    // 1. Check if the code exists in the database
    // 2. Verify the code hasn't expired
    // 3. Mark the code as used
    
    // For now, we'll simulate code verification
    // In a real app, you'd store codes in the database
    if (validatedData.code.length === 6 && /^\d{6}$/.test(validatedData.code)) {
      return NextResponse.json({
        message: 'Code verified successfully',
        verified: true
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid or expired code' },
        { status: 400 }
      );
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: (error as z.ZodError).errors },
        { status: 400 }
      );
    }
    
    console.error('Verify reset code error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
