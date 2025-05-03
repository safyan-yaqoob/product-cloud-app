import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dummy data - replace with actual auth/tenant check
const mockUserHasTenant = false;

export function middleware(request: NextRequest) {
    debugger
  // Skip middleware for public routes and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/store') ||
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/auth')
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated (in real implementation, verify session/token)
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Get tenant info from localStorage (mock storage)
  const hasTenant = request.cookies.get('tenant_info') !== undefined;

  // If user is on dashboard but has no tenant, redirect to onboarding
  if (
    request.nextUrl.pathname.startsWith('/modules/dashboard') &&
    !hasTenant
  ) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // If user is on onboarding but already has a tenant, redirect to dashboard
  if (
    request.nextUrl.pathname === '/onboarding' &&
    hasTenant
  ) {
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