/**
 * TODO.
 *
 * @description TODO.
 */

import { error } from '@sveltejs/kit'

// eslint-disable-next-line jsdoc/require-description
/** @type { import('@sveltejs/kit').Load } */
export const load = async ( { url } ) => {

	const Core = ( await import( '../_core/main' ) ).Core
	const core = new Core()

	try{

		core.init()		
		
		const { pathname }    = url
		const { route, lang } =  await core.i18n.layoutFunct( pathname )

		return {
			route, 
			lang,
			store          : core.store,
			t              : core.i18n.t,
			locale         : core.i18n.locale,
			locales        : core.i18n.locales,
			resetTrial     : core.resetTrial.bind( core ),
			goTo           : core.goTo.bind( core ),
			pkg            : core.pkg,
			navTransitions : core.navTransitions.bind( core ),
			isOnPage       : core.isOnPage.bind( core ),
		}
	
	}catch( e ){

		console.log( e )
		const msg = typeof e === 'object' && e !== null &&
			'message' in e && typeof e.message === 'string' 
			? e.message : ''
		
		error( 505, msg )
	
	}

}
// @see https://tauri.app/v1/guides/getting-started/setup/sveltekit
export const prerender = 'auto' // must be true for i18n
export const ssr = false
