import type { APIRoute } from 'astro';
import { config, oauthConfigured, requestBaseUrl } from '@/lib/config';

export const prerender = false;

export const GET: APIRoute = ({ url, redirect, cookies }) => {
  if (!oauthConfigured()) {
    return new Response('GitHub OAuth is not configured on this deployment.', { status: 500 });
  }
  const base = requestBaseUrl(url);

  // CSRF state — the cookie is set on this same host, so the callback (which lands
  // back on `base`) will receive it.
  const state = crypto.randomUUID();
  cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: base.startsWith('https://'),
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: config.oauth.clientId!,
    redirect_uri: `${base}/api/auth/callback`,
    scope: 'read:user',
    state,
    allow_signup: 'false',
  });
  return redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
};
