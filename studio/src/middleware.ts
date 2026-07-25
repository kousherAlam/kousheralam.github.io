import { defineMiddleware } from 'astro:middleware';
import { readSession, isAllowed } from '@/lib/auth';

const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/callback'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Allow public auth routes and framework assets through.
  if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/_')) {
    return next();
  }

  const session = await readSession(context.cookies);
  const authed = session && isAllowed(session.login);

  if (!authed) {
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }
    return context.redirect('/login');
  }

  // Make the session available to pages via Astro.locals.
  context.locals.session = session!;
  return next();
});
