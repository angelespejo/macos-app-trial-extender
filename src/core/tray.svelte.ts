import { onchangeState }     from './_super/_shared/onchange.svelte'
import { Tray as TraySuper } from './_super/tray'
import { os }                from './_super.svelte'
import { page }              from './page.svelte'
import { reset }             from './reset.svelte'
import { settings }          from './settings.svelte'

import {
	FUNCTION_ID,
	PAGE_ID,
	DATA,
} from '$const'
import { m } from '$i18n/messages'

class Tray {

	#getTransKeys() {

		return {
			more     : m[`tray.more`](),
			open     : m[`tray.${FUNCTION_ID.openPage}`](),
			reset    : m[`tray.${FUNCTION_ID.reset}`](),
			automate : m[`tray.${FUNCTION_ID.automate}`](),
			settings : '⚙︎  ' + m[`tray.${PAGE_ID.settings}`](),
			home     : '✦  ' + m[`tray.home`](),
			info     : 'ℹ︎  ' + m[`tray.${PAGE_ID.info}`](),
			feedback : '✯  ' + m[`tray.${FUNCTION_ID.feedback}`](),
			issues   : '⚠︎  ' + m[`tray.${FUNCTION_ID.issues}`](),
			support  : '❤︎  ' + m[`tray.${FUNCTION_ID.support}`](),
			quit     : m[`tray.${FUNCTION_ID.quit}`](),
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
					action : () => page.goto( PAGE_ID.info ),
				},
				separator           : { action: 'Separator' },
				[FUNCTION_ID.reset] : {
					text   : text.reset,
					action : () => reset.removeFiles(),
				},
				[FUNCTION_ID.automate] : {
					text    : text.automate,
					checked : settings.automate.current,
					action  : () => page.goto( PAGE_ID.infoHow ),
				},
				separator2 : { action: 'Separator' },
				submenu    : {
					text   : text.more,
					action : {
						home : {
							text   : text.home,
							action : () => page.goto( '/' ),
						},
						[PAGE_ID.settings] : {
							text   : text.settings,
							action : () => page.goto( PAGE_ID.settings ),
						},
						[PAGE_ID.info] : {
							text   : text.info,
							action : () => page.goto( PAGE_ID.info ),
						},
						separatorSub           : { action: 'Separator' },
						[FUNCTION_ID.feedback] : {
							text   : text.feedback,
							action : () => os.open( DATA.PKG.homepage ),
						},
						[FUNCTION_ID.issues] : {
							text   : text.issues,
							action : () => os.open( DATA.PKG.bugs.url ),
						},
						[FUNCTION_ID.support] : {
							text   : text.support,
							action : () => os.open( DATA.PKG.funding.url ),
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

		// locale.subscribe( () => {

		// 	const key = this.#getTransKeys()
		// 	tray.getItem( FUNCTION_ID.automate )?.setText( key.automate )
		// 	tray.getItem( FUNCTION_ID.openPage )?.setText( key.open )
		// 	tray.getItem( FUNCTION_ID.reset )?.setText( key.reset )
		// 	tray.getItem( PAGE_ID.settings )?.setText( key.settings )
		// 	tray.getItem( PAGE_ID.info )?.setText( key.info )
		// 	tray.getItem( FUNCTION_ID.feedback )?.setText( key.feedback )
		// 	tray.getItem( FUNCTION_ID.issues )?.setText( key.issues )
		// 	tray.getItem( FUNCTION_ID.support )?.setText( key.support )
		// 	tray.getItem( FUNCTION_ID.quit )?.setText( key.quit )

		// } )

		const updateChecked = async ( value: boolean ) => {

			const menuItem = await tray.getItem( FUNCTION_ID.automate )
			// console.log( 'updateChecked', value, menuItem )
			// @ts-ignore
			const set = async ( value: boolean ) => await menuItem?.setChecked?.( value )
			if ( value ) await set( true )
			else await set( false )

			// return value

		}
		// const disableItem = async ( value?: ( 'home' | typeof PAGE_ID.settings | typeof PAGE_ID.info ) ) => {

		// 	console.log( value );

		// 	// @ts-ignore
		// 	( await tray.getItem( 'home' ) )?.setEnabled?.( value === 'home' ? false : true );
		// 	// @ts-ignore
		// 	( await tray.getItem( PAGE_ID.settings ) )?.setEnabled?.( value === PAGE_ID.settings ? false : true );
		// 	// @ts-ignore
		// 	( await tray.getItem( PAGE_ID.info ) )?.setEnabled?.( value === PAGE_ID.info ? false : true )

		// }

		// const updateItemVisibility = async ( c: typeof page.current ) => {

		// 	const isVisible = await ( await appWindow.get() ).isVisible()
		// 	console.log( 'isVisible', isVisible, c )
		// 	if ( !isVisible ) {

		// 		await disableItem()
		// 		return

		// 	}
		// 	else {

		// 		if ( c.home ) await disableItem( 'home' )
		// 		else if ( c[PAGE_ID.settings] ) await disableItem( PAGE_ID.settings )
		// 		else if ( c[PAGE_ID.info] ) await disableItem( PAGE_ID.info )
		// 		else await disableItem()

		// 	}

		// }

		onchangeState( () => updateChecked( settings.automate.current ) )
		// onchangeState( () => updateItemVisibility( page.current ) )
		await tray.init()

	}

}
export const tray = new Tray()
