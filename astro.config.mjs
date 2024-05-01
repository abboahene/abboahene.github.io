import { defineConfig } from "astro/config";
import icon from "astro-icon";
import UnoCSS from 'unocss/astro';
import mdx from "@astrojs/mdx";
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://abboahene.github.io",
  integrations: [UnoCSS({
    injectReset: true
  }), icon(), mdx(), react()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [transformerNotationDiff(), transformerNotationHighlight()]
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});