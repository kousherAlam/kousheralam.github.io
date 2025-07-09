import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from '@astrojs/sitemap';

import prefetch from "@astrojs/prefetch";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://kousheralam.github.io',

  server: {
    port: 3000,
    open: false,
  },

  integrations: [
    mdx(),
    partytown(),
    sitemap(),
    prefetch(),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});