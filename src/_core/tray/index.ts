
import {
	Menu,
	PredefinedMenuItem,
	MenuItem,
	CheckMenuItem,
} from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'
import { open }     from '@tauri-apps/plugin-shell'

import type { store } from '$core/store'

import {
	FUNCTION_ID,
	PACKAGE_DATA,
	PAGE_ID,
} from '$const'
import { t } from '$core/i18n'

type TrayOpts = {
	goto       : ( p: string ) => void
	store      : typeof store
	resetTrial : () => Promise<void>
}
export class Tray {

	id = 'main'
	#opts

	constructor( opts: TrayOpts ) {

		this.#opts = opts

	}

	async init( ) {

		const tray = await TrayIcon.getById( this.id )
		const {
			goto, store, resetTrial,
		} = this.#opts
		const $t   = this.#opts.store.get( t )

		if ( !tray ) {

			console.error( 'Tray not found' )
			return

		}

		const menuItem = {
			open : await MenuItem.new( {
				id     : FUNCTION_ID.openPage,
				text   : $t( `tray.${FUNCTION_ID.openPage}` ),
				action : () => goto( '/' ),
			} ),
			reset : await MenuItem.new( {
				id     : FUNCTION_ID.reset,
				text   : $t( `tray.${FUNCTION_ID.reset}` ),
				action : () => resetTrial(),
			} ),
			automate : await CheckMenuItem.new( {
				id      : FUNCTION_ID.automate,
				text    : $t( `tray.${FUNCTION_ID.automate}` ),
				checked : this.#opts.store.get( store.automate ),
				action  : () => store.automate.toggle(),
			} ),
			settings : await MenuItem.new( {
				id     : PAGE_ID.settings,
				text   : $t( `tray.${PAGE_ID.settings}` ),
				action : () => goto( PAGE_ID.settings ),
			} ),
			info : await MenuItem.new( {
				id     : $t( `tray.${PAGE_ID.info}` ),
				text   : $t( `tray.${PAGE_ID.info}` ),
				action : () => goto( PAGE_ID.info ),
			} ),
			feedback : await MenuItem.new( {
				id     : FUNCTION_ID.feedback,
				text   : '✯  ' + $t( `tray.${FUNCTION_ID.feedback}` ),
				action : () => open( PACKAGE_DATA.homepage ),
			} ),
			issues : await MenuItem.new( {
				id     : FUNCTION_ID.feedback,
				text   : '⚠︎  Report Issue',
				action : () => open( PACKAGE_DATA.bugs.url ),
			} ),
			support : await MenuItem.new( {
				id     : FUNCTION_ID.support,
				text   : '❤︎  ' + $t( `tray.${FUNCTION_ID.support}` ),
				action : () => open( PACKAGE_DATA.funding.url ),
			} ),
			quit : await PredefinedMenuItem.new( {
				item : 'Quit',
				text : $t( `tray.${FUNCTION_ID.quit}` ),

			} ),
		}

		const separator = await PredefinedMenuItem.new( { item: 'Separator' } )

		const menu = await Menu.new( { items : [
			menuItem.open,
			separator,
			menuItem.reset,
			menuItem.automate,
			separator,
			menuItem.settings,
			menuItem.info,
			separator,
			menuItem.feedback,
			menuItem.issues,
			menuItem.support,
			separator,
			menuItem.quit,
		] } )
		tray.setMenu( menu )
		store.automate.subscribe( async value => {

			if ( value ) await menuItem.automate.setChecked( true )
			else await menuItem.automate.setChecked( false )

		} )

	}

}
