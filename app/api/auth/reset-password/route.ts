import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { findUserByEmail, updateUser } from '@/lib/mock-db';

// Validation schema
const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = resetPasswordSchema.parse(body);
    
    // Check if user exists
    const user = findUserByEmail(validatedData.email);
    if (!user) {
      return NextResponse.json(
        { message: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // TODO: In production, you would:
    // 1. Verify the reset code is valid and not expired
    // 2. Check if the code has been used
    // 3. Mark the code as used
    
    // For now, we'll simulate code verification
    if (validatedData.code.length === 6 && /^\d{6}$/.test(validatedData.code)) {
      // Hash the new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(validatedData.newPassword, saltRounds);
      
      // Update user's password
      updateUser(user.id, { password: hashedPassword });
      
      return NextResponse.json({
        message: 'Password reset successfully'
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
        { message: 'Validation error', errors: error.issues },
        { status: 400 }
      );
      
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
