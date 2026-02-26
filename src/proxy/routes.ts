export const guestOnlyRoutes = ['/login', '/signup', '/forgot-password', '/verify-otp'] as const;
export const publicRoutes = ['/', '/explore', '/people', '/posts', '/profiles'] as const;

export const protectedRoutes = ['/posts/saved'] as const;
