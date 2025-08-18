
import { error } from '@sveltejs/kit'

export const load = async ( { url } ) => {

	const Core = ( await import( '../_core' ) ).Core
	const core = new Core()

	try {

		const { pathname } = url

		const {
			route, lang,
		} = await core.init( { pathname } )

		return {
			route,
			lang,
			store                : core.store,
			t                    : core.i18n.t,
			locale               : core.i18n.locale,
			locales              : core.i18n.locales,
			resetTrial           : core.reset.removeFiles.bind( core.reset ),
			goTo                 : core.window.goTo.bind( core.window ),
			navTransitions       : core.window.navTransitions.bind( core.window ),
			changeToSystemLocale : core.changeToSystemLocale.bind( core ),
			isOnPage             : core.window.isOnPage.bind( core.window ),
		}

	}
	catch ( e ) {

		console.log( e )
		const msg = typeof e === 'object' && e !== null
			&& 'message' in e && typeof e.message === 'string'
			? e.message
			: ''

		error( 505, msg )

	}

}

// @see https://tauri.app/v1/guides/getting-started/setup/sveltekit
export const prerender = 'auto' // must be true for i18n
export const ssr = false
