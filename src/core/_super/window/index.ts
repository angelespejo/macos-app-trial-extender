import { getCurrentWindow } from '@tauri-apps/api/window'

import { onNavigate } from '$app/navigation'

type DragParams = {
	element?         : Element | Document
	noDragSelectors? : string
}

export class Window {

	constructor( ) { }

	#window : ReturnType<typeof getCurrentWindow> | undefined

	async get() {

		if ( this.#window ) return this.#window
		this.#window = await getCurrentWindow()

		return this.#window

	}

	/**
	 * Adds a mouse event listener to the element to start dragging the window when the user clicks on it.
	 *
	 * @param {DragParams}         [opts]                 - Options for `addDragging`.
	 * @param {Element | Document} [opts.element]         - The element to add the event listener to.
	 * @param {string}             [opts.noDragSelectors] - A CSS selector string to specify elements that should not trigger window dragging.
	 * @example
	 * const w = new Window()
	 * w.addDragging({
	 *   element: document.body,
	 *   noDragSelectors: 'input, a, textarea, button, iframe, video, [role="link"]'
	 * })
	 */
	addDragging( {
		element = undefined,
		noDragSelectors = undefined,
	}: DragParams = {} ) {

		if ( !document ) throw Error( 'Document is not defined' )

		element         = element === undefined ? document : element
		noDragSelectors = noDragSelectors === undefined ? 'input, a, textarea, button, iframe, video, [role="link"]' : noDragSelectors

		element.addEventListener( 'mousedown', async e => {

			if ( e.target === null ) return

			// @ts-ignore
			if ( e.target.closest( noDragSelectors ) ) return

			try {

				const w = await this.get()
				w.startDragging()

			}
			catch ( _e ) {

				console.warn( 'error starting window drag', _e )

			}

		} )

	}

	addViewTransition() {

		onNavigate( navigation => {

			// @ts-ignore
			if ( !document.startViewTransition ) return

			return new Promise( resolve => {

				// @ts-ignore
				document.startViewTransition( async () => {

					resolve()
					await navigation.complete

				} )

			} )

		} )

	}

	async onFocusChanged( cb: ( data:{ focused: boolean } ) => Promise<void> ) {

		const w        = await this.get()
		const unlisten = await w.onFocusChanged( e => cb( { focused: e.payload } ) )
		window.addEventListener( 'unload', () => unlisten() )
		return { unlisten }

	}

	async onCloseRequested( cb: () => Promise<void> ) {

		const w        = await this.get()
		const unlisten = await w.onCloseRequested( async e => {

			e.preventDefault()
			await cb()

		} )
		window.addEventListener( 'unload', () => unlisten() )

		return { unlisten }

	}

}
