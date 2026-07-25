# kousheralam.github.io

Personal site and blog of **Kousher Alam**, live at
**https://kousheralam.github.io**. A static [Astro](https://astro.build) site
deployed to GitHub Pages, plus an optional authenticated CMS ([`studio/`](./studio))
for writing and publishing posts from the browser.

## Tech stack

- **Astro 7** (static output) with **React 19** islands and **MDX** content
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Changesets** for versioning + git-tag releases
- **GitHub Actions** → **GitHub Pages** for deployment

## Getting started

```bash
npm install
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

## Project structure

```text
src/
├─ content/
│  ├─ articles/          # blog posts & projects as .mdx (nested folders allowed)
│  └─ ../content.config.ts  # collection schema (Content Layer API, glob loader)
├─ components/           # Astro + React components (Hero, Experience, cards, …)
├─ layouts/Base.astro    # page shell (head, GTM, container)
├─ pages/
│  ├─ index.astro        # home (hero, certifications, post list)
│  └─ [...id].astro      # a page per article, keyed by content id
└─ utils/AppConfig.ts    # site data: bio, skills, certifications, experience
public/assets/           # images and static blog assets
studio/                  # optional browser CMS (deployed separately to Vercel)
```

Site-wide content (bio, skills, work experience, certifications, social links)
lives in [`src/utils/AppConfig.ts`](./src/utils/AppConfig.ts). The Work Experience
section computes the **total years/months** automatically from those entries.

## Writing posts

Each post is an `.mdx` file in `src/content/articles/` with this frontmatter
(validated by the collection schema):

```yaml
---
title: My Post Title
description: Optional summary
published: 2024-11-16        # YYYY-MM-DD
thumbnail:
  src: /assets/blog/…/thumb.png
  alt: Thumbnail description
draft: false                 # draft: true hides it in production
type: Article                # Article | Project
---
```

Posts render at `/<id>`, where the id is the file's basename (e.g.
`security/pki.mdx` → `/pki`). React components can be embedded via MDX
(`import PhotoViewer from "@/components/PhotoViewer"`).

Two ways to author:

1. **By hand** — add/edit the `.mdx` file and commit (see releases below).
2. **Studio CMS** — log in, write with a live preview, and hit Publish. See
   [`studio/README.md`](./studio/README.md).

## Versioning & releases

Versioning is **fully automated**: every push to `master` cuts a new version, git
**tag**, and **GitHub Release** — no manual step required.

On push to `master`, [`.github/workflows/astro.yml`](./.github/workflows/astro.yml)
runs one pipeline: determine the version bump → bump `package.json` + `CHANGELOG.md`
→ create the `vX.Y.Z` tag + GitHub Release → build → deploy to GitHub Pages.

The **bump type** is chosen like this:

- If there are pending **Changesets** (`.changeset/*.md`), they set the bump — the
  Studio CMS adds a **minor** changeset on every Publish, and you can add one locally
  with `npm run change` (major/minor/patch).
- If there are **no** changesets, the pipeline creates an automatic **patch** bump so
  the push still gets its own version + tag + Release.

So: publishing a post → minor bump; any other merge to `master` → at least a patch
bump. Started at the **v1.0.0** baseline.

## Studio CMS

[`studio/`](./studio) is a standalone Astro SSR app (deployed to Vercel) that lets
the owner log in with GitHub, browse posts, and publish to this repo. It is
independent of the static site build. Setup and environment variables are documented
in [`studio/README.md`](./studio/README.md).
