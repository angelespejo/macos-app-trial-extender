
import {
	Menu,
	PredefinedMenuItem,
	MenuItem,
	CheckMenuItem,
} from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'
import { open }     from '@tauri-apps/plugin-shell'

import type { store } from '$core/store'

import { PACKAGE_DATA } from '$const'
import { t }            from '$core/i18n'

type TrayOpts = {
	goto       : ( p:string ) => void
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
				id     : store.functionsIDs.openPage,
				text   : $t( `tray.${store.functionsIDs.openPage}` ),
				action : () => goto( '/' ),
			} ),
			reset : await MenuItem.new( {
				id     : store.functionsIDs.reset,
				text   : $t( `tray.${store.functionsIDs.reset}` ),
				action : () => resetTrial(),
			} ),
			automate : await CheckMenuItem.new( {
				id      : store.functionsIDs.automate,
				text    : $t( `tray.${store.functionsIDs.automate}` ),
				checked : this.#opts.store.get( store.automate ),
				action  : () => store.automate.toggle(),
			} ),
			settings : await MenuItem.new( {
				id     : store.pagesIds.settings,
				text   : $t( `tray.${store.pagesIds.settings}` ),
				action : () => goto( store.pagesIds.settings ),
			} ),
			info : await MenuItem.new( {
				id     : $t( `tray.${store.pagesIds.info}` ),
				text   : $t( `tray.${store.pagesIds.info}` ),
				action : () => goto( store.pagesIds.info ),
			} ),
			feedback : await MenuItem.new( {
				id     : store.functionsIDs.feedback,
				text   : '✯  ' + $t( `tray.${store.functionsIDs.feedback}` ),
				action : () => open( PACKAGE_DATA.homepage ),
			} ),
			issues : await MenuItem.new( {
				id     : store.functionsIDs.feedback,
				text   : '⚠︎  Report Issues',
				action : () => open( PACKAGE_DATA.bugs.url ),
			} ),
			support : await MenuItem.new( {
				id     : store.functionsIDs.support,
				text   : '❤︎  ' + $t( `tray.${store.functionsIDs.support}` ),
				action : () => open( PACKAGE_DATA.funding.url ),
			} ),
			quit : await PredefinedMenuItem.new( {
				item : 'Quit',
				text : $t( `tray.${store.functionsIDs.quit}` ),

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
