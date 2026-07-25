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
- [ ] Copy the number from the resulting URL `.../settings/installations/<ID>` → `GITHUB_APP_INSTALLATION_ID`

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
- [ ] `GITHUB_APP_INSTALLATION_ID` = *(Part 3)*
- [ ] `SESSION_SECRET` = output of `openssl rand -hex 32`
- [ ] `PUBLIC_STUDIO_URL` = your Vercel URL, e.g. `https://kousheralam-studio.vercel.app` (no trailing slash)
- [ ] **Deploy / Redeploy** and note the final production URL

## Part 6 — Point the callback URL at the real deployment

- [ ] GitHub App → **General** → **Callback URL** = `<your-vercel-url>/api/auth/callback`
- [ ] Ensure `PUBLIC_STUDIO_URL` in Vercel matches that base URL exactly (no trailing slash)
- [ ] **Save** the App, then **Redeploy** in Vercel

## Part 7 — Test end to end

- [ ] Open the Vercel URL → **Sign in with GitHub** → authorize
- [ ] Post list shows your existing articles
- [ ] Open/edit a post → live preview renders
- [ ] **Save draft** on a test post → content-only commit appears in the repo
- [ ] **Publish** a throwaway post → commits MDX + a `minor` changeset → release workflow runs (version bump → `vX.Y.Z` tag → Pages deploy)

---

## Troubleshooting

- **"OAuth is not configured"** on the login page → `GITHUB_OAUTH_CLIENT_ID/SECRET` missing, or the deploy predates setting them → redeploy.
- **GitHub `redirect_uri` mismatch** → the App's Callback URL ≠ `PUBLIC_STUDIO_URL` + `/api/auth/callback`.
- **"That GitHub account is not allowed"** → your login isn't in `ALLOWED_GITHUB_LOGINS`.
- **Publish 500 / "GitHub App is not configured"** → one of `GITHUB_APP_ID` / `GITHUB_APP_PRIVATE_KEY` / `GITHUB_APP_INSTALLATION_ID` is missing, or the PEM didn't decode → re-check the base64.

See [README.md](./README.md) for how the app works and local-dev mode.
