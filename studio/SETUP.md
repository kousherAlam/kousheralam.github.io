# Studio setup checklist

One-time setup to bring the Studio CMS online: a **GitHub App** (auth + commits) and a
**Vercel project** (hosting). Work top to bottom — there's a chicken-and-egg with the
callback URL, so you create the App first, deploy to get the Vercel URL, then fill in
the URL-dependent bits.

> **Merge PR #60 first** so `studio/` exists on `master` (Vercel builds from `master` by
> default). To test before merging, set the Vercel project's Production Branch to
> `worktree-upgrade-and-cms` instead.

Values you'll collect along the way (paste into Vercel in Part 5):

| Env var | Where it comes from |
| --- | --- |
| `GITHUB_APP_ID` | Part 2 |
| `GITHUB_OAUTH_CLIENT_ID` | Part 2 |
| `GITHUB_OAUTH_CLIENT_SECRET` | Part 2 |
| `GITHUB_APP_PRIVATE_KEY` | Part 2 (base64 of the PEM) |
| `GITHUB_APP_INSTALLATION_ID` | Part 3 |
| `SESSION_SECRET` | Part 5 (`openssl rand -hex 32`) |
| `PUBLIC_STUDIO_URL` | Part 4/6 (your Vercel URL) |

---

## Part 1 — Create the GitHub App

- [ ] Go to https://github.com/settings/apps → **New GitHub App**
- [ ] **Name**: `kousheralam-studio` (add a suffix if taken)
- [ ] **Homepage URL**: `https://kousheralam.github.io`
- [ ] **Callback URL**: placeholder for now → `http://localhost:4321/api/auth/callback`
- [ ] ✅ Check **Request user authorization (OAuth) during installation**
- [ ] **Webhook** → uncheck **Active**
- [ ] **Repository permissions → Contents → Read and write** (leave everything else "No access")
- [ ] **Where can this be installed?** → **Only on this account**
- [ ] **Create GitHub App**

## Part 2 — Grab the credentials

- [ ] Copy **App ID** → `GITHUB_APP_ID`
- [ ] Copy **Client ID** → `GITHUB_OAUTH_CLIENT_ID`
- [ ] **Generate a new client secret** → copy → `GITHUB_OAUTH_CLIENT_SECRET`
- [ ] **Private keys → Generate a private key** (downloads a `.pem`)
- [ ] Base64-encode the PEM for Vercel (single line, newlines preserved):
  ```bash
  base64 -w0 ~/Downloads/kousheralam-studio.*.private-key.pem   # macOS: base64 -i <file> | tr -d '\n'
  ```
  → the output is `GITHUB_APP_PRIVATE_KEY`

## Part 3 — Install the App on the repo

- [ ] App page → **Install App** → **Install** on your account
- [ ] **Only select repositories** → **kousheralam.github.io** → **Install**
- [ ] That's it — the Studio **auto-resolves the installation id** from the repo, so you
      do **not** need to copy it. (Setting `GITHUB_APP_INSTALLATION_ID` is optional; if you
      do set it, make sure it's correct or a mismatch causes `Not Found` token errors.)

## Part 4 — Create the Vercel project

- [ ] https://vercel.com → **Add New… → Project** → import `kousherAlam/kousheralam.github.io`
- [ ] **Root Directory → Edit → `studio`** (critical — builds the CMS, not the static site)
- [ ] Framework auto-detects **Astro**; leave build defaults
- [ ] Add env vars (Part 5) before/after first deploy, then note the assigned production URL

## Part 5 — Environment variables (Vercel → Settings → Environment Variables, Production)

Do **not** set `STUDIO_DEV`.

- [ ] `REPO_OWNER` = `kousherAlam`
- [ ] `REPO_NAME` = `kousheralam.github.io`
- [ ] `REPO_BRANCH` = `master`
- [ ] `CONTENT_DIR` = `src/content/articles`
- [ ] `ALLOWED_GITHUB_LOGINS` = `kousherAlam`
- [ ] `GITHUB_APP_ID` = *(Part 2)*
- [ ] `GITHUB_OAUTH_CLIENT_ID` = *(Part 2)*
- [ ] `GITHUB_OAUTH_CLIENT_SECRET` = *(Part 2)*
- [ ] `GITHUB_APP_PRIVATE_KEY` = *(base64 blob, Part 2)*
- [ ] `GITHUB_APP_INSTALLATION_ID` = *(optional — auto-resolved from the repo; leave unset unless you have a reason)*
- [ ] `SESSION_SECRET` = output of `openssl rand -hex 32`
- [ ] `PUBLIC_STUDIO_URL` = your **stable production alias**, e.g. `https://kousheralam-github-io.vercel.app` (no trailing slash). **Use the stable `*.vercel.app` alias, NOT a deployment-specific URL** like `…-iiet2tv2j-koushers-projects.vercel.app` — those change every deploy and break the login callback.
- [ ] **Deploy / Redeploy** and note the final production URL

## Part 6 — Point the callback URL at the real deployment

Always use the **same stable production alias** for all three of these — that's what makes the login cookie, the `redirect_uri`, and the callback land on one host.

- [ ] GitHub App → **General** → **Callback URL** = `https://kousheralam-github-io.vercel.app/api/auth/callback`
- [ ] `PUBLIC_STUDIO_URL` (Vercel) = `https://kousheralam-github-io.vercel.app` (same host, no trailing slash)
- [ ] Always open the Studio at that alias (not the deployment-specific `…-projects.vercel.app` URL)
- [ ] **Save** the App, then **Redeploy** in Vercel

> The login flow now derives its `redirect_uri` from the host you're actually
> browsing, so as long as you open the Studio at the alias registered as the GitHub
> App Callback URL, the OAuth handshake stays on one host and succeeds.

## Part 7 — Test end to end

- [ ] Open the Vercel URL → **Sign in with GitHub** → authorize
- [ ] Post list shows your existing articles
- [ ] Open/edit a post → live preview renders
- [ ] **Save draft** on a test post → content-only commit appears in the repo
- [ ] **Publish** a throwaway post → commits MDX + a `minor` changeset → release workflow runs (version bump → `vX.Y.Z` tag → Pages deploy)

## Part 8 — Disable preview deployments (production only)

By default Vercel builds a **preview deployment** for every branch push and pull
request. To only ever deploy production (the `master` branch) and skip all previews,
set an **Ignored Build Step** (this is the supported Vercel mechanism — `vercel.json`
can't express "production-only" on its own):

- [ ] Vercel → Project → **Settings → Git → Ignored Build Step**
- [ ] Choose **"Run my Bash command"** and enter:
  ```bash
  if [ "$VERCEL_ENV" = "production" ]; then exit 1; else exit 0; fi
  ```
  Exit code **1 = build proceeds** (production), **0 = build skipped** (previews). So
  production deploys and every preview is cancelled before it builds.
- [ ] (Optional) Also set **Settings → Git → Production Branch** to `master` if it isn't already.

> Alternative, per-branch: `vercel.json` supports `git.deploymentEnabled` (e.g.
> `{ "git": { "deploymentEnabled": { "some-branch": false } } }`), but branches you
> don't list still deploy, so the Ignored Build Step above is the reliable "no previews"
> switch.

---

## Troubleshooting

- **"OAuth is not configured"** on the login page → `GITHUB_OAUTH_CLIENT_ID/SECRET` missing, or the deploy predates setting them → redeploy.
- **GitHub `redirect_uri` mismatch** → the App's Callback URL ≠ `PUBLIC_STUDIO_URL` + `/api/auth/callback`.
- **"Invalid OAuth state"** → you started login on one host but the callback landed on another, so the `oauth_state` cookie wasn't sent back. Fix: register the GitHub App **Callback URL** for the exact stable alias you browse (e.g. `https://kousheralam-github-io.vercel.app/api/auth/callback`), and open the Studio at that same alias — not a deployment-specific `…-projects.vercel.app` URL. (The Studio now also auto-restarts a clean login if it detects a stale state or the App-install redirect, instead of erroring.)
- **`…?installation_id=…&setup_action=install` → "Invalid OAuth state"** → that's the GitHub App *install* redirect, not a login. It's now handled automatically (it kicks off a fresh login). Just make sure the App is installed on the repo, then sign in normally.
- **`Not Found - …create-an-installation-access-token-for-an-app`** → the GitHub App can't mint a token for the installation. The Studio now auto-resolves the installation from the repo; this error then means the **App isn't installed on `kousherAlam/kousheralam.github.io`** (do Part 3) or `GITHUB_APP_ID`/`GITHUB_APP_PRIVATE_KEY` don't belong to the installed App. If you set `GITHUB_APP_INSTALLATION_ID` manually and it's wrong, unset it.
- **"That GitHub account is not allowed"** → your login isn't in `ALLOWED_GITHUB_LOGINS`.
- **Publish 500 / "GitHub App is not configured"** → one of `GITHUB_APP_ID` / `GITHUB_APP_PRIVATE_KEY` / `GITHUB_APP_INSTALLATION_ID` is missing, or the PEM didn't decode → re-check the base64.
- **Vercel build fails with `Tsconfig not found astro/tsconfigs/base`** → the repo root `tsconfig.json` must not `extend` a bare `astro/...` preset (Vercel builds `studio/` without root `node_modules`, so it can't resolve). It's inlined on purpose — don't re-add the `extends`.

See [README.md](./README.md) for how the app works and local-dev mode.
