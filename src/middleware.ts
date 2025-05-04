import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const mockUserHasTenant = false;

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/store') ||
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/auth')) 
    {
    return NextResponse.next();
  }

  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const hasTenant = request.cookies.get('tenant_info') !== undefined;

  if (request.nextUrl.pathname.startsWith('/modules/dashboard') &&!hasTenant) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  if (request.nextUrl.pathname === '/onboarding' && hasTenant) {
    return NextResponse.redirect(new URL('/modules/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
}; 