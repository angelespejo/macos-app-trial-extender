// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		/**
		 * FOR GLOUDFLARE
		 * @see https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/
		 */
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
	declare const PKG: typeof import('../package.json');
}

export {};
