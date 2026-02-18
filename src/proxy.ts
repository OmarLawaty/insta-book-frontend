import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { useIsLoggedInQuery } from './hooks';
import { guestOnlyRoutes } from './proxy/routes';

export const proxy = async (req: NextRequest) => {
  const isLoggedIn = !!(await useIsLoggedInQuery.queryFn());
  const isGuestOnlyPath = guestOnlyRoutes.some(path => req.nextUrl.pathname.startsWith(path));

  if (isGuestOnlyPath && isLoggedIn) return NextResponse.redirect(new URL('/', req.url));

  const isGuestAccessingProtectedRoute = !isGuestOnlyPath && !isLoggedIn;
  if (isGuestAccessingProtectedRoute) {
    const fromPath = encodeURI(req.nextUrl.pathname + req.nextUrl.search);
    if (!!fromPath) {
      const newURL = new URL('/login', req.url);
      newURL.searchParams.set('from', fromPath);

      return NextResponse.redirect(newURL);
    }

    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next|assets|favicon.ico).*)'],
};
