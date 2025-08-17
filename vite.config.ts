/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/config/
 */

import { sveltekit }    from '@sveltejs/kit/vite'
import { internalIpV4 } from 'internal-ip'
import { defineConfig } from 'vite'

import appInfo    from './.dovenv/app.info'
import { member } from './.dovenv/contributors'
import pkg        from './package.json' with { type: 'json' }

import type { Members } from './.dovenv/types'

// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec( process.env.TAURI_ENV_PLATFORM )
const host   = await internalIpV4()
const port   = 13129 // important for match with tauri.config.json
const server = {
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
}

export const APP_DATA = {
	PKG             : pkg,
	CONTRIBUTORS    : member as Members,
	APP_INFORMATION : appInfo,
}

export default defineConfig( {
	// @ts-expect-error vite is not typed
	plugins   : [ sveltekit() ],
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
