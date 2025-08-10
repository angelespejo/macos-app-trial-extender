/**
 * Todo.
 *
 * @description Todo.
 */
import {
	get,
	writable,
} from 'svelte/store'
import { persisted } from 'svelte-persisted-store'

const appID        = PKG.extra.ids.app
const pagesIds     = PKG.extra.ids.pages
const functionsIDs = PKG.extra.ids.functions

const persistedBool = ( id: string, initValue: boolean = false ) => {

	const storeId = appID + '-' + id
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
	appID,
	pagesIds,
	functionsIDs,
	isNavigation : writable( false ),
	autostart    : persistedBool( 'autostart', true ),
	notification : persistedBool( 'notification', false ),
	automate     : persistedBool( 'automate', false ),

}
