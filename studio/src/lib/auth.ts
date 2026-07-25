import { SignJWT, jwtVerify } from 'jose';
import type { APIContext, AstroCookies } from 'astro';
import { config, localMode } from './config';

const COOKIE = 'studio_session';
const alg = 'HS256';

export interface Session {
  login: string;
  name?: string;
  avatar?: string;
}

function secret(): Uint8Array {
  return new TextEncoder().encode(config.sessionSecret);
}

export async function createSessionCookie(session: Session): Promise<string> {
  return await new SignJWT({ ...session })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret());
}

export async function readSession(cookies: AstroCookies): Promise<Session | null> {
  // Local dev bypass: act as the first allowed owner without logging in.
  if (localMode()) {
    return { login: config.allowedLogins[0] ?? 'local-dev', name: 'Local Dev' };
  }
  const token = cookies.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.login !== 'string') return null;
    return {
      login: payload.login,
      name: payload.name as string | undefined,
      avatar: payload.avatar as string | undefined,
    };
  } catch {
    return null;
  }
}

export function setSessionCookie(cookies: AstroCookies, token: string): void {
  cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: config.studioUrl.startsWith('https://'),
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(COOKIE, { path: '/' });
}

/** Owner allow-list check. */
export function isAllowed(login: string): boolean {
  return config.allowedLogins.includes(login.toLowerCase());
}

/** Guard for API routes: returns the session or a 401 Response. */
export async function requireSession(context: APIContext): Promise<Session | Response> {
  const session = await readSession(context.cookies);
  if (!session || !isAllowed(session.login)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }
  return session;
}
