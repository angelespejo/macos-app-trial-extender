import { invoke }           from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'

type DragParams = {
	element?         : Element | Document
	noDragSelectors? : string
}

import type { store } from '$core/store'

import {
	goto,
	onNavigate,
} from '$app/navigation'
import { page } from '$app/stores'

type WindowOpts = { store: typeof store }

export class Window {

	#opts

	constructor( opts: WindowOpts ) {

		this.#opts = opts

	}

	#drag( {
		element = undefined, noDragSelectors = undefined,
	}: DragParams ) {

		if ( !document ) throw Error( 'Document is not defined' )

		element         = element === undefined ? document : element
		noDragSelectors = noDragSelectors === undefined ? 'input, a, textarea, button, iframe, video, [role="link"]' : noDragSelectors

		element.addEventListener( 'mousedown', async e => {

			if ( e.target === null ) return

			// @ts-ignore
			if ( e.target.closest( noDragSelectors ) ) return

			try {

				await getCurrentWindow().startDragging()

			}
			catch ( _e ) {

				console.warn( 'error starting window drag', _e )

			}

		} )

	}

	async goTo( pageID: string ) {

		const currentWindow = await getCurrentWindow()
		const isVisible     = await currentWindow.isVisible()
		if ( !isVisible ) await currentWindow.show()

		const $page = this.#opts.store.get( page )
		pageID      = pageID.startsWith( '/' ) ? pageID : '/' + pageID
		goto( `/${$page.data.lang}${pageID}` )

		const isFocused = await currentWindow.isFocused()
		if ( !isFocused ) await currentWindow.setFocus()

	}

	isOnPage( pageID: string ) {

		const $page = this.#opts.store.get( page )

		const activeUrl = $page.url.pathname.replace( '/' + $page.data.lang, '' )
		const pageRoute = pageID === '' ? pageID : '/' + pageID

		return activeUrl === pageRoute

	}

	navTransitions() {

		onNavigate( navigation => {

			this.#opts.store.isNavigation.set( true )

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

	async init( ) {

		this.#drag( {} )
		const currentWindow = await getCurrentWindow()
		currentWindow.onFocusChanged( async e => {

			if ( !e.payload ) return

			const docIconExists = await invoke( 'get_icon_visibility' )
			if ( !docIconExists ) await invoke( 'icon_visibility', { showIcon: e.payload } )

			console.log( 'onFocusChanged', {
				event : e.payload,
				docIconExists,
			} )

		} )

		await currentWindow.onCloseRequested( async e => {

			e.preventDefault()
			await currentWindow.hide()
			await invoke( 'icon_visibility', { showIcon: false } )

			console.log( 'onCloseRequested', e )

		} )

	}

}
