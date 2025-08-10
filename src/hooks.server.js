/**
 * TODO.
 *
 * @description TODO.
 */

// @ts-nocheck
import {
	defaultLocale,
	loadTranslations,
	locales,
} from './_core/i18n/main'

import { building } from '$app/environment'

const routeRegex = new RegExp( /^\/[^.]*([?#].*)?$/ )

export const handle = async ( {
	event, resolve,
} ) => {

	// this is for cloudfalre build adapter
	// @see https://github.com/sveltejs/kit/issues/9386#issuecomment-1714660627
	if ( building ) return await resolve( event ) // bailing here allows the 404 page to build

	const {
		url, request, isDataRequest,
	} = event
	const {
		pathname, origin,
	}            = url

	// If this request is a route request
	if ( routeRegex.test( pathname ) ) {

		// Get defined locales
		const supportedLocales = locales.get().map( l => l.toLowerCase() )

		// Try to get locale from `pathname`.
		let locale = supportedLocales.find( l => l === `${pathname.match( /[^/]+?(?=\/|$)/ )}`.toLowerCase() )
		// We want to redirect the default locale to "no-locale" path
		if ( locale === defaultLocale && !request.headers.get( 'prevent-redirect' ) ) {

			const localeRegex = new RegExp( `^/${locale}` )
			const location    = `${pathname}`.replace( localeRegex, '' ) || '/'

			return new Response( undefined, {
				headers : { location },
				status  : 301,
			} )

			// If route locale is not supported

		}
		else if ( !locale ) {

			// Get user preferred locale if it's a direct navigation
			if ( !isDataRequest ) {

				locale = `${`${request.headers.get( 'accept-language' )}`.match( /[a-zA-Z]+?(?=-|_|,|;)/ )}`.toLowerCase()

			}

			// Set default locale if user preferred locale does not match
			if ( !supportedLocales.includes( locale ) ) locale = defaultLocale

			if ( locale === defaultLocale ) {

				const path       = `${pathname}`.replace( /\/$/, '' )
				const redirectTo = `${origin}/${locale}${path}${isDataRequest ? '/__data.json?x-sveltekit-invalidated=100' : ''}`

				// We want to prevent redirect to fetch data for the default locale
				request.headers.set( 'prevent-redirect', '1' )

				// Fetch the redirected route
				const response = await fetch( redirectTo, request )

				// Get response body and set html headers
				const data = await response.text()

				// Serve the redirected route.
				// In this case we don't have to set the html 'lang' attribute
				// as the default locale is already included in our app.html.
				return new Response( data, {
					...response,
					headers : {
						...response.headers,
						'Content-Type' : isDataRequest ? 'application/json' : 'text/html',
					},
				} )

			}

			// 301 redirect
			return new Response( undefined, {
				headers : { location: `/${locale}${pathname}` },
				status  : 301,
			} )

		}

		// Add html `lang` attribute
		return resolve( {
			...event,
			locals : { lang: locale },
		}, { transformPageChunk: ( { html } ) => html.replace( '%lang%', `${locale}` ) } )

	}

	return resolve( event )

}

export const handleError = async ( { event } ) => {

	const { locals } = event
	const { lang }   = locals

	await loadTranslations( lang, 'error' )

	return locals

}
