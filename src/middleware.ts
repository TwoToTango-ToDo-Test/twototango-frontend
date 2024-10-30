import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  console.log('Middleware called:', request.url);

  const token = request.cookies.get('token')?.value;

  if (!token) {
    console.log('Token not found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'nodetest');
    const { payload } = await jwtVerify(token, secretKey);

    console.log('Decoded token:', payload);
  } catch (error) {
    console.error('Token validation failed:', (error as Error).message);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup|.*\\..*).*)',
  ],
};
