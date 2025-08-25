import { getCurrentWindow } from '@tauri-apps/api/window'
import { get }              from 'svelte/store'

import {
	goto,
	onNavigate,
} from '$app/navigation'
import { page } from '$app/stores'

type DragParams = {
	element?         : Element | Document
	noDragSelectors? : string
}

class Page {

	#getWindow
	suffix

	constructor( opts:	{
		getWindow : () => Promise<ReturnType<typeof getCurrentWindow>>
		suffix?   : string
	} )	{

		this.#getWindow = opts.getWindow
		this.suffix     = opts.suffix ? ( opts.suffix.startsWith( '/' ) ? opts.suffix : '/' + opts.suffix ) : ''

	}

	getCurrent( ) {

		const $page = get( page )
		return $page.url.pathname.replace( '/' + this.suffix, '' )

	}

	async goto( pageID: string ) {

		const w         = await this.#getWindow()
		const isVisible = await w.isVisible()
		if ( !isVisible ) await w.show()

		pageID     = pageID.startsWith( '/' ) ? pageID : '/' + pageID
		const path = `${this.suffix}${pageID}`

		console.log( { goto : {
			id : pageID,
			path,
			isVisible,
		} } )

		goto( `${this.suffix}${pageID}` )

		const isFocused = await w.isFocused()
		if ( !isFocused ) await w.setFocus()

	}

	isOn( pageID: string ) {

		const activeUrl = this.getCurrent( )
		const pageRoute = pageID === '' ? pageID : '/' + pageID

		return activeUrl === pageRoute

	}

}

export class Window {

	page
	constructor( opts: { suffix?: string } ) {

		this.page = new Page( {
			getWindow : this.get.bind( this ),
			...opts,
		} )

	}

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
