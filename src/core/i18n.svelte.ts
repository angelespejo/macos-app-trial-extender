import { get } from 'svelte/store'

import { onchangeState } from './_super/_shared/onchange.svelte'

import { goto }      from '$app/navigation'
import { page }      from '$app/state'
import {
	locale as localeStore,
	locales as localesStore,
	t as translation,
} from '$lib/i18n'

class i18nState {

	get locales() {

		return localesStore.get()

	}

	locale = $state( localeStore.get() )

	t = ( key: string ) => translation.get( key ) as string | undefined

	constructor( ) {

		localeStore.subscribe( l => this.locale = l )
		// translation.subscribe( t => this.t = translation.get )
		// localesStore.subscribe( l => this.locales = l )
		// onchangeState( async () => {

		// 	console.log( 'locale changed', this.locale )

		// } )

		$effect.root( () => {

			const { route } = page.data
			$effect( () => {

				const value = this.locale
				const path  = `/${value}${route}`
				console.log( 'locale change to', value )
				goto( path )

			} )

		} )

	}

}

export const i18n = new i18nState()

