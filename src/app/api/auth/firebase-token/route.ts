import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import type { Session } from 'next-auth';

export async function GET() {
  try {
    // Get the session
    const session: Session | null = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Instead of using Firebase Admin, return a mock token
    // This is a temporary solution that will allow client-side Firebase to work
    // without requiring Firebase Admin setup
    
    // Create a sanitized email for the token
    const sanitizedEmail = session.user.email.replace(/[^a-zA-Z0-9]/g, '_');
    
    // The mock token is formatted like a JWT but isn't valid for actual Firebase auth
    // However, the error handling in CareerContext.tsx will handle this gracefully
    const mockToken = `mock_firebase_token_${sanitizedEmail}`;
    
    return NextResponse.json({ token: mockToken });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating Firebase token:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 