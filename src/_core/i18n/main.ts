/**
 * TYPES.
 *
 * @description File for set core types.
 * @see https://github.com/sveltekit-i18n/lib/tree/master/examples
 */

import { dev }            from '$app/environment'
import i18n               from 'sveltekit-i18n'
import localeTranslations from '../../_locales'
import { derived }        from 'svelte/store'

const i18nObj = new i18n( {
	log : {
		level : dev ? 'warn' : 'error', 
	},
	translations : localeTranslations,
} )

export const { 
	t, 
	locale, 
	locales, 
	loading, 
	addTranslations, 
	loadTranslations,
	translations, 
	setRoute, 
	setLocale,
} = i18nObj

export const defaultLocale = 'en'

export const currLocaleRoute = derived( locale, $locale => {

	return $locale === defaultLocale ? '/' : '/' + $locale

} )

export const layoutFunct = async ( pathname: string ) =>{

	const lang  = `${pathname.match( /\w+?(?=\/|$)/ ) || defaultLocale}`
	const route = pathname.replace( new RegExp( `^/${lang}` ), '' )
	
	await loadTranslations( lang, route )

	const trans = translations.get()
	
	await setLocale( lang )
	await setRoute( route )

	addTranslations( trans )

	return {
		route,
		lang,
	}

}

// Translations logs
loading.subscribe( async $loading => {

	if ( $loading ) {

		// console.log( 'Loading translations...' )
		await loading.toPromise()
		// console.log( 'Updated translations', translations.get() )
	
	}

} )

