import type { APIRoute } from 'astro';
import { config, oauthConfigured } from '@/lib/config';

export const prerender = false;

export const GET: APIRoute = ({ redirect, cookies }) => {
  if (!oauthConfigured()) {
    return new Response('GitHub OAuth is not configured on this deployment.', { status: 500 });
  }
  // CSRF state.
  const state = crypto.randomUUID();
  cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: config.studioUrl.startsWith('https://'),
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: config.oauth.clientId!,
    redirect_uri: `${config.studioUrl}/api/auth/callback`,
    scope: 'read:user',
    state,
    allow_signup: 'false',
  });
  return redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
};
