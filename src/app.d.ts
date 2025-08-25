////////////////////////////////////////////////
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
////////////////////////////////////////////////

declare global {

	////////////////////////////////////////////////
	// APP
	////////////////////////////////////////////////
	namespace App {
		interface Locals { lang: string }
		// interface Error {
		// 	data : object | undefined
		// 	id   : string
		// }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	////////////////////////////////////////////////
	// VIEW TRANSITIONS
	// @see https://svelte.dev/blog/view-transitions
	////////////////////////////////////////////////
	interface ViewTransition {
		updateCallbackDone : Promise<void>
		ready              : Promise<void>
		finished           : Promise<void>
		skipTransition     : () => void
	}
	// eslint-disable-next-line @typescript-eslint/method-signature-style
	interface Document { startViewTransition( updateCallback: () => Promise<void> ): ViewTransition }

	////////////////////////////////////////////////
	// VARIABLES
	////////////////////////////////////////////////
	declare const APP_DATA: typeof import( '../vite.config' ).APP_DATA
}

export {}
