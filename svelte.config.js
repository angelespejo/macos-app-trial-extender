/**
 * Svelte config.
 *
 * @description Svelte config.
 * @see https://kit.svelte.dev/docs/configuration
 * @see https://github.com/sveltejs/vite-plugin-svelte
 */
import adapter            from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// import lang from './src/_locales/lang.js'
// const supportedLocales = Object.keys( lang )
// const adapterConfig = {
// 	pages    : 'build',
// 	assets   : 'build',
// 	fallback : 'index.html', // Must be index for tauri app
// }

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess : vitePreprocess(),
	kit        : {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter : adapter( {
			pages    : 'build',
			assets   : 'build',
			fallback : 'index.html', // Must be index for tauri app
		} ),
		// prerender : {
		// 	// NOTE: You can modify your exported error pages here.
		// 	entries : supportedLocales.reduce( ( acc, locale ) => [
		// 		...acc,
		// 		`/${locale}/`, 
		// 		`/${locale}/settings`, 
		// 		`/${locale}/info`, 
		// 		// `/${locale}/401`, 
		// 		// `/${locale}/403`, 
		// 		// `/${locale}/404`, 
		// 		// `/${locale}/500`,
		// 	], [
		// 		'*',
		// 	] ),
		// },
	},
}

export default config
