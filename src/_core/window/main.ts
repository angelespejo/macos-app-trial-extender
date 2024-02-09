/**
 * Todo.
 *
 * @description Todo.
 */

import { window as tauriWindow } from '@tauri-apps/api'

type DragParams = {
    element?: Element | Document
    noDragSelectors?: string
} 

export class Window {

	drag( { element = undefined, noDragSelectors = undefined }: DragParams ){
        
		if( !document ) throw Error( 'Document is not defined' )
		
		element         = element === undefined ? document : element
		noDragSelectors = noDragSelectors === undefined ? 'input, a, textarea, button, iframe, video, [role="link"]' : noDragSelectors
		
		element.addEventListener( 'mousedown', async e => {

			if( e.target === null ) return
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if ( e.target.closest( noDragSelectors ) ) return
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if( window.__TAURI__ ) await tauriWindow.appWindow.startDragging()

		} )
	
	}
	
	onSystemtray( cb: ( args:{ type: string, data: string } ) => void ){

		window?.addEventListener( 'system-tray-event', ( event: Event ) => {

			const customEvent = event as CustomEvent
			if ( customEvent && customEvent.detail && customEvent.detail.from === 'system-tray' ) {
				
				cb( {
					type : customEvent.detail.type as string, 
					data : customEvent.detail.data as string,
				} )
			
			}

		} )
	
	}

}
