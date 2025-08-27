// import { sequence } from '@sveltejs/kit/hooks'

// import {
// 	handle as handlei18n,
// 	handleError as i18nHandleError,
// } from '$lib/i18n/hook'

// export const handle = sequence( handlei18n )
// export const handleError = i18nHandleError

import type { Handle } from '@sveltejs/kit'

import { paraglideMiddleware } from '$i18n/server'

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ( {
	event, resolve,
} ) =>
	paraglideMiddleware( event.request, ( {
		request: localizedRequest, locale,
	} ) => {

		event.request = localizedRequest
		return resolve( event, { transformPageChunk : ( { html } ) => {

			return html.replace( '%lang%', locale )

		} } )

	} )

export const handle: Handle = paraglideHandle
