import {
	defaultLocale,
	loadTranslations,
	locales,
} from './index'

import type {
	Handle,
	HandleServerError,
} from '@sveltejs/kit'

import { building } from '$app/environment'

const routeRegex = new RegExp( /^\/[^.]*([?#].*)?$/ )

/**
 * Handles localization and redirection for incoming requests.
 *
 * - Allows API requests to pass through unchanged.
 * - Extracts locale from the URL if present.
 * - If a valid locale is found in the URL, it sets it in `event.locals` and updates the HTML `lang` attribute.
 * - If no locale is found in the URL:
 * - Attempts to detect the user's preferred language from the `Accept-Language` header.
 * - If the preferred language is supported, redirects the user to the corresponding localized route.
 * - If no valid preferred language is found, redirects to the default locale.
 * - Ensures proper localization behavior for both full page loads and data requests.
 *
 * @param   {object}                               options         - The request handling options.
 * @param   {import('@sveltejs/kit').RequestEvent} options.event   - The request event object.
 * @param   {Function}                             options.resolve - A function to resolve the request.
 * @returns {Promise<Response>}                                    The processed response with locale adjustments.
 */
export const handle: Handle = async ( {
	event, resolve,
} ) => {

	if ( building ) return await resolve( event )

	const {
		url, request, isDataRequest,
	} = event

	const { pathname } = url

	// Allow API requests to pass through without modification
	if ( pathname.startsWith( '/api' ) ) return await resolve( event )
	if ( !routeRegex.test( pathname ) ) return resolve( event )

	// Get the list of supported locales
	const supportedLocales = locales.get().map( l => l.toLowerCase() )

	// Extract the locale from the URL if present
	const locale = supportedLocales.find(
		l => l === `${pathname.match( /[^/]+?(?=\/|$)/ )}`.toLowerCase(),
	)

	// If the URL already contains a valid locale, do not redirect
	if ( locale ) {

		event.locals = { lang: locale }
		return resolve( event, { transformPageChunk: ( { html } ) => html.replace( '%lang%', `${locale}` ) } )

	}

	// If there is no locale in the URL, use the user's preferred language
	if ( !isDataRequest ) {

		const preferredLocale = `${request.headers.get( 'accept-language' )}`.match(
			/[a-zA-Z]+?(?=-|_|,|;)/,
		)?.[0]?.toLowerCase()

		// If the preferred language is supported, redirect to that version
		if ( preferredLocale && supportedLocales.includes( preferredLocale ) ) {

			return new Response( undefined, {
				headers : { location: `/${preferredLocale}${pathname}` },
				status  : 301,
			} )

		}

	}

	// If no valid preferred language is found, redirect to the default locale
	return new Response( undefined, {
		headers : { location: `/${defaultLocale}${pathname}` },
		status  : 301,
	} )

}

// @ts-ignore
export const handleError: HandleServerError = async ( { event } ) => {

	const { locals } = event
	const { lang }   = locals

	await loadTranslations( lang, '/error' )

	return locals

}
