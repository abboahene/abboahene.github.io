import { defineConfig } from "astro/config";
import icon from "astro-icon";
import UnoCSS from 'unocss/astro'
import mdx from "@astrojs/mdx";
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: "https://abboahene.github.io",
  integrations: [UnoCSS({injectReset: true}), icon(), mdx()], 
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [transformerNotationDiff(), transformerNotationHighlight()],
    },
    remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
  }
});