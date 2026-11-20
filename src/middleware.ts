export { default } from 'next-auth/middleware';
export const config = { matcher: ['/home/:path*', '/schedule/:path*', '/students/:path*', '/finances/:path*', '/profile/:path*', '/settings/:path*'] };
