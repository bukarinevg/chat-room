import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/chat')) {
    const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_SECRET });

    if (!token) {
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
  }

  // Allow the request to proceed if the user is authenticated or the path is not protected
  return NextResponse.next();
}

// Configure middleware to match all paths under "/chat"
export const config = {
  matcher: ['/chat/:path*'],
};
