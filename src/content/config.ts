import { defineCollection, z } from "astro:content";
import { rssSchema } from "@astrojs/rss";

const blog = defineCollection({
	schema: rssSchema.extend({ tags: z.array(z.string()).optional() }),
});

export const collections = {
	blog,
};