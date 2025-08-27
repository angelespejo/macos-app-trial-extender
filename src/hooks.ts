import type { Reroute } from '@sveltejs/kit'

import { deLocalizeUrl } from '$i18n/runtime'

export const reroute: Reroute = ( { url } ) => {

	return deLocalizeUrl( url ).pathname

}
