
import { layoutFunct } from '$lib/i18n'

export const load = async ( { url } ) => {

	const {
		route, lang,
	} = await layoutFunct( url.pathname )
	console.log( {
		route,
		lang,
	} )
	return {
		route,
		lang,
	}

}

export const prerender = 'auto'
export const ssr = false
