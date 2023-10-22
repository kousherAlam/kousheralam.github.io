import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: 'https://kousheralam.github.io',
  server: {
    port: 3000,
    open: false,
  },
  integrations: [
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      applyBaseStyles: false
    }),
    mdx(),
    partytown(),
    sitemap(),
    prefetch(),
    react(),
  ]
});