import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { useCurrentUserQuery } from './hooks';
import { guestOnlyRoutes } from './proxy/routes';

export const proxy = async (req: NextRequest) => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).toString();

  const isTokenValid = !!(await useCurrentUserQuery.queryFn(cookieHeader).catch(() => false));
  const isGuestOnlyPath = guestOnlyRoutes.some(path => req.nextUrl.pathname.startsWith(path));

  if (isGuestOnlyPath && isTokenValid) return NextResponse.redirect(new URL('/', req.url));

  const isGuestAccessingProtectedRoute = !isGuestOnlyPath && !isTokenValid;
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
