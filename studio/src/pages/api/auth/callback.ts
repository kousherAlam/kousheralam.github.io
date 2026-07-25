import type { APIRoute } from 'astro';
import { config, requestBaseUrl } from '@/lib/config';
import { createSessionCookie, setSessionCookie, isAllowed } from '@/lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const base = requestBaseUrl(url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expectedState = cookies.get('oauth_state')?.value;
  cookies.delete('oauth_state', { path: '/' });

  if (!code || !state || state !== expectedState) {
    return new Response('Invalid OAuth state.', { status: 400 });
  }

  // Exchange the code for an access token. redirect_uri must match the one used at
  // /api/auth/login — both are derived from the request host, so they agree.
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: config.oauth.clientId,
      client_secret: config.oauth.clientSecret,
      code,
      redirect_uri: `${base}/api/auth/callback`,
    }),
  });
  const tokenJson = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!tokenJson.access_token) {
    return new Response(`OAuth exchange failed: ${tokenJson.error ?? 'unknown error'}`, { status: 401 });
  }

  // Identify the user.
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenJson.access_token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'kousheralam-studio',
    },
  });
  const user = (await userRes.json()) as { login?: string; name?: string; avatar_url?: string };
  if (!user.login || !isAllowed(user.login)) {
    return redirect('/login?error=forbidden');
  }

  const token = await createSessionCookie({
    login: user.login,
    name: user.name ?? user.login,
    avatar: user.avatar_url,
  });
  setSessionCookie(cookies, token, base.startsWith('https://'));
  return redirect('/');
};
