// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		/**
		 * FOR GLOUDFLARE
		 *
		 * @see https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/
		 */
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface Locals {}
		// interface Platform {
		// 	env: {
		// 		COUNTER: DurableObjectNamespace;
		// 	};
		// 	context: {
		// 		waitUntil(promise: Promise<any>): void;
		// 	};
		// 	caches: CacheStorage & { default: Cache }
		// }
		// interface Session {}
		// interface Stuff {}
	}
	declare const PKG: typeof import( '../package.json' )
	declare const CONTRIBUTORS: typeof import( '../.dovenv/contributors' ).member
	declare const APP_INFORMATION: typeof import( '../.dovenv/app.info' ).default
}

export {}
