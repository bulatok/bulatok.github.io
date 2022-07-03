import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

    adapter: adapter({
		// default options are shown
		pages: "build",
		assets: "build",
		fallback: null,
	  }),

	kit: {
		adapter: adapter(),
		paths:{
			base: dev ? '' : 'https://github.com/bulatok/bulatok.github.io',
		}
	}
};

export default config;
