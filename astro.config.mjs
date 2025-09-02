// astro.config.mjs
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://jonaszeihe.github.io",
  base: "/kyon",
  integrations: [mdx()]
});
