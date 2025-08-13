import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeRaw from "rehype-raw";
import customEmbeds from "astro-custom-embeds";
import remarkEmbedYouTube from "./src/utils/remark-embed-youtube.js";



// https://astro.build/config
export default defineConfig({
  site: 'https://mayaasoift.github.io/myblog/',
  base: '/myblog/',
  integrations: [tailwind(), sitemap(),customEmbeds()],
  markdown: {
    remarkPlugins: [remarkEmbedYouTube],
    rehypePlugins: [rehypeRaw]
  },
});