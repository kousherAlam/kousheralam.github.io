import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';

import tailwindcss from "@tailwindcss/vite";

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
    plugins: [tailwindcss()]
  }
});