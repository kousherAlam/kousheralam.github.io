import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Server-rendered CMS deployed to Vercel. Root Directory on Vercel = "studio/".
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  server: {
    port: 4321,
    open: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
