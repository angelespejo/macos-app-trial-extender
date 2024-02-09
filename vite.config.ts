/**
 * Vite config.
 *
 * @description Vite config.
 * @see https://vitejs.dev/config/
 */
import { sveltekit }    from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { internalIpV4 } from 'internal-ip'
import pkg              from './package.json'

// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec( process.env.TAURI_ENV_PLATFORM )
const host   = await internalIpV4()
const port   = 13129 // important for match with tauri.config.json
const server = {
	port, 
	strictPort : true,
	host       : mobile ? '0.0.0.0' : false,
	hmr        : mobile ? {
		protocol : 'ws',
		host,
		port,
	} : undefined,
}

export default defineConfig( {
	plugins : [
		sveltekit(),
	],
	server,
	preview : server,
	define  : {
		PKG : pkg,
	},
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
