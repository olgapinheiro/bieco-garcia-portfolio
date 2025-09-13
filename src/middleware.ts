import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/admin(.*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};