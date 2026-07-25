# kousheralam studio

An authenticated CMS for [kousheralam.github.io](https://kousheralam.github.io). Log in
with GitHub, browse your posts, write with a live MDX preview, and **Publish** — which
commits the post to the site repo and bumps the version so the GitHub Pages pipeline
ships it.

It's a small **Astro SSR** app meant to be deployed to **Vercel** with its Root
Directory set to `studio/`.

## How publishing works

1. You edit a post (frontmatter form + MDX source) with a live preview.
2. **Save draft** commits the `.mdx` file with `draft: true` (no release).
3. **Publish** makes a single commit containing the `.mdx` file **and** a `minor`
   changeset (`.changeset/cms-*.md`) with `draft: false`.
4. That push to `master` triggers the site's release workflow
   (`.github/workflows/astro.yml`): it consumes the changeset → bumps the version →
   creates a `vX.Y.Z` tag + GitHub Release → builds → deploys to GitHub Pages.

Writes are performed by a **GitHub App** installation token (server-side), never the
browser. Login uses the same App's OAuth flow and is restricted to the logins in
`ALLOWED_GITHUB_LOGINS`.

## Local development

```bash
cd studio
npm install
npm run dev   # http://localhost:4321
```

With `STUDIO_DEV=true` and no OAuth configured (see `.env.example`), the studio skips
login and reads/writes article files on your local filesystem
(`../src/content/articles`) and changesets in `../.changeset` — so you can try the
editor without creating the GitHub App first. **Never** set `STUDIO_DEV=true` in
production.

## Deploying to Vercel

1. **Create a GitHub App** (Settings → Developer settings → GitHub Apps):
   - Repository permission: **Contents → Read & write**.
   - Enable **Request user authorization (OAuth) during installation** (this gives you
     the OAuth client id/secret used for login).
   - Callback URL: `https://<your-studio>.vercel.app/api/auth/callback`.
   - Generate a **private key** (PEM) and note the **App ID**.
   - **Install** the App on the `kousheralam.github.io` repo; the installation id is the
     number in the install settings URL.
2. **Create the Vercel project** from this repo with **Root Directory = `studio/`**.
3. Set the environment variables from `.env.example` in Vercel (Production):
   `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY` (base64-encode the PEM, or paste with
   literal `\n`), `GITHUB_APP_INSTALLATION_ID`, `GITHUB_OAUTH_CLIENT_ID`,
   `GITHUB_OAUTH_CLIENT_SECRET`, `SESSION_SECRET` (`openssl rand -hex 32`),
   `ALLOWED_GITHUB_LOGINS`, `REPO_OWNER`, `REPO_NAME`, `REPO_BRANCH`, `CONTENT_DIR`,
   `PUBLIC_STUDIO_URL` (your Vercel URL). Do **not** set `STUDIO_DEV`.
4. Deploy. Visit the URL, sign in with GitHub, and publish.

## Preview fidelity

The live preview compiles MDX in the browser and renders **React** components (a
labeled placeholder stands in for `PhotoViewer` and any component it can't fully run
client-side). `.astro` components don't render in preview. The true, final render is
always the deployed GitHub Pages build.
