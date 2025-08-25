import { get } from 'svelte/store'

import { Tray as TraySuper } from './_super/tray'
import { settings }          from './settings.svelte'

import type { Os } from './_super/os'

import {
	FUNCTION_ID,
	PAGE_ID,
	DATA,
} from '$const'
import {
	t,
	locale,
} from '$lib/i18n'

type TrayOpts = {
	os         : Os
	goto       : ( p: string ) => void
	resetTrial : () => Promise<void>
}

export class Tray {

	#opts

	constructor( opts: TrayOpts ) {

		this.#opts = opts

	}

	#getTransKeys() {

		const trans = get( t ) as ( key: string ) => string

		return {
			open     : trans( `tray.${FUNCTION_ID.openPage}` ),
			reset    : trans( `tray.${FUNCTION_ID.reset}` ),
			automate : trans( `tray.${FUNCTION_ID.automate}` ),
			settings : '⚙︎  ' + trans( `tray.${PAGE_ID.settings}` ),
			info     : 'ℹ︎  ' + trans( `tray.${PAGE_ID.info}` ),
			feedback : '✯  ' + trans( `tray.${FUNCTION_ID.feedback}` ),
			issues   : '⚠︎  ' + trans( `tray.${FUNCTION_ID.issues}` ),
			support  : '❤︎  ' + trans( `tray.${FUNCTION_ID.support}` ),
			quit     : trans( `tray.${FUNCTION_ID.quit}` ),
		}

	}

	async init( ) {

		const text = this.#getTransKeys()
		const tray = new TraySuper( {
			id      : DATA.TAURI_CONFIG.app.trayIcon.id,
			tooltip : DATA.PKG.extra.productNameLong,
			menu    : {
				[FUNCTION_ID.openPage] : {
					text   : text.open,
					action : () => this.#opts.goto( PAGE_ID.info ),
				},
				separator           : { action: 'Separator' },
				[FUNCTION_ID.reset] : {
					text   : text.reset,
					action : () => this.#opts.resetTrial(),
				},
				[FUNCTION_ID.automate] : {
					text    : text.automate,
					checked : settings.automate.current,
					action  : () => this.#opts.goto( PAGE_ID.infoHow ),
				},
				separator2 : { action: 'Separator' },
				submenu    : {
					text   : 'More',
					action : {
						[PAGE_ID.settings] : {
							text   : text.settings,
							action : () => this.#opts.goto( PAGE_ID.settings ),
						},
						[PAGE_ID.info] : {
							text   : text.info,
							action : () => this.#opts.goto( PAGE_ID.info ),
						},
						separatorSub           : { action: 'Separator' },
						[FUNCTION_ID.feedback] : {
							text   : text.feedback,
							action : () => this.#opts.os.open( DATA.PKG.homepage ),
						},
						[FUNCTION_ID.issues] : {
							text   : text.issues,
							action : () => this.#opts.os.open( DATA.PKG.bugs.url ),
						},
						[FUNCTION_ID.support] : {
							text   : text.support,
							action : () => this.#opts.os.open( DATA.PKG.funding.url ),
						},
					},
				},
				separator3         : { action: 'Separator' },
				[FUNCTION_ID.quit] : {
					text   : text.quit,
					action : 'Quit',
				},

			},
		} )

		locale.subscribe( () => {

			const key = this.#getTransKeys()
			tray.getItem( FUNCTION_ID.automate )?.setText( key.automate )
			tray.getItem( FUNCTION_ID.openPage )?.setText( key.open )
			tray.getItem( FUNCTION_ID.reset )?.setText( key.reset )
			tray.getItem( PAGE_ID.settings )?.setText( key.settings )
			tray.getItem( PAGE_ID.info )?.setText( key.info )
			tray.getItem( FUNCTION_ID.feedback )?.setText( key.feedback )
			tray.getItem( FUNCTION_ID.issues )?.setText( key.issues )
			tray.getItem( FUNCTION_ID.support )?.setText( key.support )
			tray.getItem( FUNCTION_ID.quit )?.setText( key.quit )

		} )

		const updateChecked = async ( value: boolean ) => {

			const menuItem = await tray.getItem( FUNCTION_ID.automate )
			// @ts-ignore
			const set = async ( value: boolean ) => await menuItem?.setChecked?.( value )
			if ( value ) await set( true )
			else await set( false )

			return value

		}

		$effect.root( () => {

			$effect( () => {

				updateChecked( settings.automate.current )

			} )

		} )

		await tray.init()

	}

}
