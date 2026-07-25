import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

import tailwindcss from "@tailwindcss/vite";

// Build-time metadata shown in the footer: the exact commit the site was built from
// and the package version. Computed here so `import.meta.env.COMMIT_HASH` /
// `PACKAGE_VERSION` are inlined into the build (Vite doesn't expose custom env vars).
let commitHash = "dev";
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch {
  /* not a git checkout — keep "dev" */
}
const pkgVersion = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")).version;

// https://astro.build/config
export default defineConfig({
  site: 'https://kousheralam.github.io',

  // Prefetch is built into Astro core (replaces the removed @astrojs/prefetch).
  prefetch: true,

  server: {
    port: 3000,
    open: false,
  },

  integrations: [
    mdx(),
    partytown(),
    sitemap(),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.COMMIT_HASH": JSON.stringify(commitHash),
      "import.meta.env.PACKAGE_VERSION": JSON.stringify(pkgVersion),
    },
  },
});