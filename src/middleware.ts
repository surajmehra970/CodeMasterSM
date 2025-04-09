import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/api/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the requested path is a public route
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if the path is for static files (images, etc.)
  if (
    pathname.includes('_next') || 
    pathname.includes('favicon.ico') || 
    pathname.includes('images')
  ) {
    return NextResponse.next();
  }

  // Get the session token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If there's no token, redirect to the login page
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}; 