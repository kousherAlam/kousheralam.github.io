# Changesets

This folder drives versioning and releases for the site.

- Each change adds a markdown "changeset" here describing the bump (`major` / `minor` / `patch`).
- On push to `master`, the release workflow (`.github/workflows/astro.yml`) consumes
  any pending changesets: it bumps `package.json`, updates `CHANGELOG.md`, creates a
  `vX.Y.Z` git tag + GitHub Release, then builds and deploys to GitHub Pages.

## Adding a changeset

Locally, run:

```
npm run change
```

The Studio CMS adds a `minor` changeset automatically every time you **Publish** a post.

Learn more: https://github.com/changesets/changesets
