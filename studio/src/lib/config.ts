// Centralized, typed access to Studio configuration from environment variables.
// Server-only module (never imported by client islands).

// In local development, Vite/Astro does not expose non-PUBLIC vars on import.meta.env
// nor load .env into process.env, so load it explicitly. In production (Vercel) the
// vars come straight from process.env and there is no .env file (loadEnvFile no-ops).
try {
  (process as any).loadEnvFile?.();
} catch {
  /* no .env file present (e.g. production) — ignore */
}

function env(key: string): string | undefined {
  const v = process.env[key] ?? (import.meta.env as Record<string, string | undefined>)[key];
  return v === '' ? undefined : v;
}

export const config = {
  repo: {
    owner: env('REPO_OWNER') ?? 'kousherAlam',
    name: env('REPO_NAME') ?? 'kousheralam.github.io',
    branch: env('REPO_BRANCH') ?? 'master',
    contentDir: env('CONTENT_DIR') ?? 'src/content/articles',
  },
  allowedLogins: (env('ALLOWED_GITHUB_LOGINS') ?? 'kousherAlam')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
  oauth: {
    clientId: env('GITHUB_OAUTH_CLIENT_ID'),
    clientSecret: env('GITHUB_OAUTH_CLIENT_SECRET'),
  },
  app: {
    appId: env('GITHUB_APP_ID'),
    privateKey: normalizePrivateKey(env('GITHUB_APP_PRIVATE_KEY')),
    installationId: env('GITHUB_APP_INSTALLATION_ID'),
  },
  sessionSecret: env('SESSION_SECRET') ?? 'insecure-dev-secret-change-me',
  studioUrl: (env('PUBLIC_STUDIO_URL') ?? 'http://localhost:4321').replace(/\/$/, ''),
  isDev: (env('STUDIO_DEV') ?? '').toLowerCase() === 'true',
};

/**
 * The public base URL to use for OAuth redirects, derived from the *incoming request*
 * so the cookie host, the `redirect_uri`, and the callback host are always the same
 * host the user is actually browsing (prevents "Invalid OAuth state" when
 * PUBLIC_STUDIO_URL points at a different Vercel URL than the one in use).
 * Falls back to PUBLIC_STUDIO_URL only if the request host is unavailable.
 */
export function requestBaseUrl(url: URL): string {
  const host = url.host;
  if (!host) return config.studioUrl;
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return `${url.protocol}//${host}`;
  }
  // Vercel terminates TLS; the public origin is always https.
  return `https://${host}`;
}

/** Default thumbnail used when a post doesn't specify one (generated, on-brand). */
export const DEFAULT_THUMBNAIL_SRC = '/assets/images/default-thumbnail.png';
export const DEFAULT_THUMBNAIL_ALT = 'kousheralam.github.io';

/** True when GitHub OAuth login is configured. */
export function oauthConfigured(): boolean {
  return Boolean(config.oauth.clientId && config.oauth.clientSecret);
}

/** True when the GitHub App (repo write) credentials are configured. The
 * installation id is resolved from the repo at runtime, so it is not required. */
export function appConfigured(): boolean {
  return Boolean(config.app.appId && config.app.privateKey);
}

/**
 * In local dev mode (STUDIO_DEV=true) with OAuth NOT configured, the Studio
 * bypasses login and reads/writes article files from the local filesystem.
 */
export function localMode(): boolean {
  return config.isDev && !oauthConfigured();
}

/** Accept a PEM either raw, with literal "\n", or base64-encoded. */
function normalizePrivateKey(raw?: string): string | undefined {
  if (!raw) return undefined;
  if (raw.includes('BEGIN') && raw.includes('PRIVATE KEY')) {
    return raw.replace(/\\n/g, '\n');
  }
  // Assume base64-encoded PEM.
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    if (decoded.includes('PRIVATE KEY')) return decoded;
  } catch {
    /* fall through */
  }
  return raw.replace(/\\n/g, '\n');
}
