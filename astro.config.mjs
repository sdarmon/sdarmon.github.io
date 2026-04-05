import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'; // AJOUT

export default defineConfig({
    site: 'https://sashadarmon.fr',
    integrations: [sitemap()], // AJOUT
});