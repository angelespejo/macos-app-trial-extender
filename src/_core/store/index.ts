import {
	get,
	writable,
} from 'svelte/store'
import { persisted } from 'svelte-persisted-store'

import {
	APP_ID,
	FUNCTION_ID,
	PAGE_ID,
} from '../../const'

const persistedBool = ( id: string, initValue: boolean = false ) => {

	const storeId = APP_ID + '-' + id
	const value   = persisted( storeId, initValue, {
		storage  : 'session', // 'session' for sessionStorage, defaults to 'local'
		syncTabs : true, // choose wether to sync localStorage across tabs, default is true
	} )

	// const value  = writable( initValue )
	const toggle = () => value.update( n => {

		if ( typeof n === 'boolean' ) return !n
		return false

	} )

	return {
		...value,
		toggle,
	}

}

export const store = {
	get,
	appID        : APP_ID,
	pagesIds     : PAGE_ID,
	functionsIDs : FUNCTION_ID,
	isNavigation : writable( false ),
	autostart    : persistedBool( 'autostart', false ), // The default value must be false so that the user can decide for himself whether it is necessary to activate this option
	notification : persistedBool( 'notification', false ),
	automate     : persistedBool( 'automate', false ),

}
