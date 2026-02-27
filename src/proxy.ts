import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { useIsLoggedInQuery } from './hooks';
import { guestOnlyRoutes, publicRoutes, protectedRoutes } from './proxy/routes';
import { isLoggedInHeaderKey } from './proxy/const';

export const proxy = async (req: NextRequest) => {
  const isLoggedIn = !!(await useIsLoggedInQuery.queryFn());

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(isLoggedInHeaderKey, String(isLoggedIn));

  const isGuestOnlyPath = guestOnlyRoutes.some(path => req.nextUrl.pathname.startsWith(path));
  const isPublicPath = publicRoutes.some(path => {
    if (path === '/') return req.nextUrl.pathname === path;

    return req.nextUrl.pathname.startsWith(path);
  });
  const isProtectedPath = protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path));

  if (isGuestOnlyPath && isLoggedIn) return NextResponse.redirect(new URL('/', req.url));

  const isGuestAccessingProtectedRoute = !isGuestOnlyPath && !isLoggedIn;
  if (isGuestAccessingProtectedRoute && (!isPublicPath || isProtectedPath)) {
    const fromPath = encodeURI(req.nextUrl.pathname + req.nextUrl.search);
    if (!!fromPath) {
      const newURL = new URL('/login', req.url);
      newURL.searchParams.set('from', fromPath);

      return NextResponse.redirect(newURL);
    }

    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
};

export const config = {
  matcher: ['/((?!api|_next|assets|favicon.ico|robots.txt|sitemap.xml).*)'],
};
