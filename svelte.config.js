import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: false,
    },
    paths: {
      // base: dev ? '' : '/bulatok.github.io',
    },
    prerender: {
      default: true,
    },
  },
};

export default config;
