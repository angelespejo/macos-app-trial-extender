
/**
 * Svelte config.
 *
 * @description Svelte config.
 * @see https://kit.svelte.dev/docs/configuration
 * @see https://github.com/sveltejs/vite-plugin-svelte
 */
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// compilerOptions : { experimental: { async: true } },
	preprocess : {},
	kit        : {
		adapter : adapter( {
			pages    : 'build',
			assets   : 'build',
			fallback : 'index.html', // Must be index for tauri app
		} ),
		alias : {
			$const   : './src/const',
			$locales : './src/locales',
			$core    : './src/core/index.svelte.ts',
			$assets  : './src/lib/assets',
			$styles  : './src/styles',
			$i18n    : './src/lib/i18n',
			// src    : 'src',
		},
	},
}

export default config
