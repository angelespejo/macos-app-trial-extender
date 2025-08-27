import { onchangeState }  from './_super/_shared/onchange.svelte'
import { persistedState } from './_super/_shared/persisted.svelte'
import {
	appWindow,
	os,
}  from './_super.svelte'

import { goto }              from '$app/navigation'
import { page as pageState } from '$app/state'
import { PAGE_ID }           from '$const'
import {
	locales,
	localizeHref,
	setLocale,
	getLocale,
	deLocalizeUrl,
	isLocale,
} from '$i18n/runtime'

const _goto = async ( pageID: string, opts?:Parameters<typeof goto>[1] & { locale?: string } ) => {

	const w         = await appWindow.get()
	const isVisible = await w.isVisible()
	if ( !isVisible ) await w.show()

	const {
		locale, ...gotoOpts
	} = opts || {}

	const url = localizeHref( pageID, { locale: locale || getLocale() } )

	await goto( url, gotoOpts )

	const isFocused = await w.isFocused()
	if ( !isFocused ) await w.setFocus()

}

export const changeToSystemLocale = async () => {

	const availableLocales = locales
	const locale           = await os.getLocale()
	if ( !locale ) return
	for ( const l of availableLocales ) {

		if ( l === locale ) return await updateLocale( l )
		if ( l.startsWith( locale ) ) return await updateLocale( l )

	}
	return

}
const updateLocale = async ( to: typeof locales[number] ) => {

	setLocale( to, { reload: true } )

	// await _goto( deLocalizeUrl( window.location.href ).pathname, { locale: to } )

}

class Page {

	locales = locales
	locale = persistedState( {
		key          : 'locale',
		initialValue : getLocale(),
		options      : { storage: 'session' },
	} )

	t = $state( () => {} )

	current = $derived.by( () => {

		const current = deLocalizeUrl( pageState.url ).pathname.replace( '/', '' )
		return {
			[PAGE_ID.settings] : current === PAGE_ID.settings,
			home               : current === '',
			[PAGE_ID.info]     : current === PAGE_ID.info,
		}

	} )

	constructor() {

		onchangeState( async () => console.log( { t: this.t } ) )
		onchangeState( async () => console.log( { currentPage: this.current } ) )
		onchangeState( async () => {

			const to   = this.locale.current
			const from = getLocale()

			if ( !to ) return
			if ( !isLocale( to ) ) return
			if ( to === from ) return

			await updateLocale( to )
			// this.t = m['home.tableSoftware']( undefined, { locale: to } )
			console.log( {
				title     : 'locale changed',
				from,
				to,
				newLocale : getLocale(),
				href      : window.location.href,
			} )

		} )

	}

	goto = _goto

}

export const page = new Page()
