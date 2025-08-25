/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/config/
 */

import { paraglideVitePlugin } from '@inlang/paraglide-js'
import unocss                  from '@svaio/unocss'
import {
	transformerDirectives,
	extractorSvelte,
	presetWind4,
} from '@svaio/unocss/utils'
import { sveltekit }    from '@sveltejs/kit/vite'
import { internalIpV4 } from 'internal-ip'
import {
	defineConfig,
	type UserConfig,
} from 'vite'

import appInfo from './.dovenv/app.info'
import {
	member,
	role,
} from './.dovenv/contributors'
import pkg       from './package.json' with { type: 'json' }
import { theme } from './src/styles/theme'
import tauriConf from './src-tauri/tauri.conf.json' with { type: 'json' }

import type { Members } from './.dovenv/types'

// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec( process.env.TAURI_ENV_PLATFORM )
const host   = await internalIpV4()
const port   = 13129 // important for match with tauri.config.json

const server: UserConfig['server'] = {
	port,
	strictPort : true,
	host       : mobile ? '0.0.0.0' : false,
	hmr        : mobile
		? {
			protocol : 'ws',
			host,
			port,
		}
		: undefined,
	fs : { allow: [ 'src-tauri/icons', 'docs' ] },
}

export const APP_DATA = {
	PKG                : pkg,
	CONTRIBUTORS_ROLES : role,
	CONTRIBUTORS       : member as Members,
	APP_INFORMATION    : appInfo,
	TAURI_CONFIG       : tauriConf,
}

export default defineConfig( {
	plugins : [
		unocss( {
			theme,
			presets : [
				presetWind4( {
					dark       : 'media',
					preflights : {
						reset : true,
						theme : 'on-demand',
					},
				} ),
			],
			content : { pipeline : { include : [
				/\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
				'src/**/*.{js,ts}',
				'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
			] } },
			extractors   : [ extractorSvelte() ],
			transformers : [ transformerDirectives() ],
		} ),
		sveltekit(),
		paraglideVitePlugin( {
			project : './project.inlang',
			outdir  : './src/locales',
		} ),
	],
	server,
	preview   : server,
	define    : { APP_DATA },
	envPrefix : [
		'VITE_',
		'TAURI_PLATFORM',
		'TAURI_ARCH',
		'TAURI_FAMILY',
		'TAURI_PLATFORM_VERSION',
		'TAURI_PLATFORM_TYPE',
		'TAURI_DEBUG',
	],
} )
